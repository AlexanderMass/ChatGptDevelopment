import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import {
  deleteCheckInMetricsOutsideProjectScope,
  findLastCheckInMetricDate,
  insertCheckInMetrics
} from "../database/checkInMetricRepository.js";
import { findProjects, updateRepositoryContextFlag } from "../database/projectRepository.js";
import { createLogger } from "../logging/logger.js";
import { hasChatGptContext } from "./repositoryContextService.js";

const execFileAsync = promisify(execFile);
const logger = createLogger("gitAnalysisService");

export async function analyzeGitData() {
  const projects = await findProjects();
  const projectResults = [];

  logger.info("git.analysis.started", {
    projectCount: projects.length
  });

  for (const project of projects) {
    const projectResult = {
      projectId: project.projectId,
      name: project.name,
      repositories: [],
      newCheckInMetrics: 0
    };

    for (const repository of project.repositories ?? []) {
      const repositoryResult = await analyzeRepository(project, repository);
      projectResult.repositories.push(repositoryResult);
      projectResult.newCheckInMetrics += repositoryResult.newCheckInMetrics;
    }

    projectResults.push(projectResult);
  }

  const result = {
    projects: projectResults,
    newCheckInMetrics: projectResults.reduce(
      (sum, project) => sum + project.newCheckInMetrics,
      0
    )
  };

  logger.info("git.analysis.completed", result);
  return result;
}

async function analyzeRepository(project, repository) {
  const repositoryHasChatGptContext = await hasChatGptContext(repository.path);
  await updateRepositoryContextFlag(repository.repositoryId, repositoryHasChatGptContext);
  await deleteCheckInMetricsOutsideProjectScope(repository.repositoryId, project.startDate, project.endDate);

  const lastMetricDate = await findLastCheckInMetricDate(repository.repositoryId);
  const commits = await readRelevantCommits(project, repository, lastMetricDate);
  const metrics = [];

  for (const commit of commits) {
    metrics.push(await readCheckInMetric(repository, commit));
  }

  const insertedCount = await insertCheckInMetrics(metrics);

  return {
    repositoryId: repository.repositoryId,
    name: repositoryName(repository),
    path: repository.path,
    hasChatGptContext: repositoryHasChatGptContext,
    newCheckInMetrics: insertedCount
  };
}

async function readRelevantCommits(project, repository, lastMetricDate) {
  const projectStart = startOfDay(project.startDate);
  const projectEnd = endOfDay(project.endDate);
  const lastMetric = parseStoredDateTime(lastMetricDate);
  const gitLogArgs = [
    "log",
    "--format=%H%x1f%cI%x1f%s%x1f%P",
    "--reverse",
    "HEAD"
  ];

  if (projectStart) {
    gitLogArgs.push(`--since=${projectStart.toISOString()}`);
  }

  if (projectEnd) {
    gitLogArgs.push(`--until=${projectEnd.toISOString()}`);
  }

  const commitLines = await readGitLines(repository.path, gitLogArgs);

  return commitLines
    .map(parseCommitLine)
    .filter(Boolean)
    .filter((commit) => isCommitInAnalysisWindow(commit, projectStart, projectEnd, lastMetric));
}

function isCommitInAnalysisWindow(commit, projectStart, projectEnd, lastMetric) {
  if (projectStart && commit.commitDate < projectStart) {
    return false;
  }

  if (projectEnd && commit.commitDate > projectEnd) {
    return false;
  }

  if (lastMetric && commit.commitDate <= lastMetric) {
    return false;
  }

  return true;
}

async function readCheckInMetric(repository, commit) {
  const [numstatLines, trackedFileLines] = await Promise.all([
    readGitLines(repository.path, ["show", "--numstat", "--format=", "--no-renames", commit.commitHash]),
    readGitLines(repository.path, ["ls-tree", "-r", "--name-only", commit.commitHash])
  ]);
  const fileStats = parseNumstat(numstatLines);

  return {
    repositoryId: repository.repositoryId,
    commitHash: commit.commitHash,
    commitDate: formatDateTime(commit.commitDate),
    messageSubject: commit.messageSubject || null,
    changedFileCount: fileStats.changedFileCount,
    addedLineCount: fileStats.addedLineCount,
    deletedLineCount: fileStats.deletedLineCount,
    netLineChange: fileStats.addedLineCount - fileStats.deletedLineCount,
    churnLineCount: fileStats.addedLineCount + fileStats.deletedLineCount,
    trackedFileCount: trackedFileLines.length,
    isMergeCommit: commit.parentHashes.length > 1
  };
}

function parseCommitLine(line) {
  const [commitHash, commitDateValue, messageSubject = "", parentHashText = ""] = line.split("\u001f");
  const commitDate = new Date(commitDateValue);

  if (!commitHash || Number.isNaN(commitDate.getTime())) {
    return null;
  }

  return {
    commitHash,
    commitDate,
    messageSubject,
    parentHashes: parentHashText.split(" ").filter(Boolean)
  };
}

function parseNumstat(lines) {
  return lines.reduce(
    (stats, line) => {
      const [addedValue, deletedValue, filePath] = line.split("\t");

      if (!filePath) {
        return stats;
      }

      const addedLineCount = Number.parseInt(addedValue, 10);
      const deletedLineCount = Number.parseInt(deletedValue, 10);

      stats.changedFileCount += 1;
      stats.addedLineCount += Number.isNaN(addedLineCount) ? 0 : addedLineCount;
      stats.deletedLineCount += Number.isNaN(deletedLineCount) ? 0 : deletedLineCount;
      return stats;
    },
    {
      changedFileCount: 0,
      addedLineCount: 0,
      deletedLineCount: 0
    }
  );
}

async function readGitLines(repositoryPath, args) {
  const { stdout } = await execFileAsync("git", ["-C", repositoryPath, ...args], {
    windowsHide: true
  });

  return stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function startOfDay(value) {
  if (!value) {
    return null;
  }

  return new Date(`${String(value).slice(0, 10)}T00:00:00`);
}

function endOfDay(value) {
  if (!value) {
    return null;
  }

  return new Date(`${String(value).slice(0, 10)}T23:59:59`);
}

function parseStoredDateTime(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${String(value).replace(" ", "T")}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateTime(date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function repositoryName(repository) {
  return path.basename(repository.path);
}
