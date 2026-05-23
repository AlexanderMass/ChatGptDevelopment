import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  findCheckInMetricGitReference,
  findCheckInMetricsByProjectId
} from "../database/checkInMetricRepository.js";
import {
  findProjectById,
  findProjects,
  insertProject,
  updateProjectRecord
} from "../database/projectRepository.js";
import { createLogger } from "../logging/logger.js";
import { hasChatGptContext } from "./repositoryContextService.js";

const logger = createLogger("projectService");
const execFileAsync = promisify(execFile);

export async function listProjects() {
  return findProjects();
}

export async function getProject(projectId) {
  return findProjectById(projectId);
}

export async function listProjectCheckInMetrics(projectId) {
  const project = await findProjectById(projectId);

  if (!project) {
    return null;
  }

  return findCheckInMetricsByProjectId(projectId);
}

export async function listCheckInMetricFiles(projectId, checkInMetricId) {
  const metricReference = await findCheckInMetricGitReference(projectId, checkInMetricId);

  if (!metricReference) {
    return null;
  }

  const files = await readCommitFiles(metricReference.repositoryPath, metricReference.commitHash);

  return {
    checkInMetricId: metricReference.checkInMetricId,
    commitHash: metricReference.commitHash,
    repositoryId: metricReference.repositoryId,
    files
  };
}

export async function getCheckInMetricFileDiff(projectId, checkInMetricId, filePath) {
  const metricReference = await findCheckInMetricGitReference(projectId, checkInMetricId);

  if (!metricReference || !filePath) {
    return null;
  }

  const diffText = await readCommitFileDiff(
    metricReference.repositoryPath,
    metricReference.commitHash,
    filePath
  );

  return {
    checkInMetricId: metricReference.checkInMetricId,
    commitHash: metricReference.commitHash,
    repositoryId: metricReference.repositoryId,
    filePath,
    rows: parseUnifiedDiff(diffText)
  };
}

export async function createProject(projectInput) {
  const project = await enrichProjectRepositories(normalizeNewProject(projectInput));

  logger.info("project.create.normalized", {
    project
  });

  return insertProject(project);
}

export async function updateProject(projectId, projectInput) {
  const project = await enrichProjectRepositories(normalizeExistingProject(projectInput));

  logger.info("project.update.normalized", {
    projectId,
    project
  });

  return updateProjectRecord(projectId, project);
}

function normalizeNewProject(projectInput) {
  const name = String(projectInput.name ?? "").trim();

  if (!name) {
    throw new Error("Projektname ist erforderlich.");
  }

  return {
    name,
    description: String(projectInput.description ?? "").trim(),
    status: "active",
    startDate: normalizeDate(projectInput.startDate),
    endDate: null,
    repositories: normalizeRepositories(projectInput.repositories)
  };
}

function normalizeExistingProject(projectInput) {
  return {
    description: String(projectInput.description ?? "").trim(),
    startDate: normalizeDate(projectInput.startDate),
    endDate: normalizeDate(projectInput.endDate),
    repositories: normalizeRepositories(projectInput.repositories)
  };
}

function normalizeDate(value) {
  const dateValue = String(value ?? "").trim();
  return dateValue || null;
}

function normalizeRepositories(repositories) {
  if (!Array.isArray(repositories)) {
    return [];
  }

  return repositories
    .filter((repository) => repository?.path)
    .map((repository) => ({
      path: String(repository.path).trim(),
      remoteUrl: String(repository.remoteUrl ?? "").trim(),
      firstCheckInDate: normalizeDateTime(repository.firstCheckInDate),
      lastCommitDate: normalizeDateTime(repository.lastCommitDate),
      checkInCount: Number(repository.checkInCount ?? 0),
      hasChatGptContext: Boolean(repository.hasChatGptContext)
    }));
}

async function enrichProjectRepositories(project) {
  const repositories = await Promise.all(
    project.repositories.map(async (repository) => ({
      ...repository,
      hasChatGptContext: await hasChatGptContext(repository.path)
    }))
  );

  return {
    ...project,
    repositories
  };
}

function normalizeDateTime(value) {
  const dateValue = String(value ?? "").trim();

  if (!dateValue) {
    return null;
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 19).replace("T", " ");
}

async function readCommitFiles(repositoryPath, commitHash) {
  const { stdout } = await execFileAsync(
    "git",
    ["-C", repositoryPath, "show", "--name-status", "--format=", "-M", commitHash],
    {
      windowsHide: true
    }
  );

  return stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseNameStatusLine)
    .filter(Boolean);
}

async function readCommitFileDiff(repositoryPath, commitHash, filePath) {
  const { stdout } = await execFileAsync(
    "git",
    [
      "-C",
      repositoryPath,
      "show",
      "--format=",
      "--find-renames",
      "--unified=80",
      commitHash,
      "--",
      filePath
    ],
    {
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 10
    }
  );

  return stdout;
}

function parseNameStatusLine(line) {
  const [status, firstPath, secondPath] = line.split("\t");

  if (!status || !firstPath) {
    return null;
  }

  return {
    status,
    path: secondPath || firstPath,
    previousPath: secondPath ? firstPath : ""
  };
}

function parseUnifiedDiff(diffText) {
  const rows = [];
  let deletedLines = [];
  let addedLines = [];

  for (const line of diffText.split(/\r?\n/)) {
    if (
      !line ||
      line.startsWith("diff --git ") ||
      line.startsWith("index ") ||
      line.startsWith("--- ") ||
      line.startsWith("+++ ") ||
      line.startsWith("rename from ") ||
      line.startsWith("rename to ") ||
      line.startsWith("similarity index ")
    ) {
      flushChangedRows(rows, deletedLines, addedLines);
      deletedLines = [];
      addedLines = [];
      continue;
    }

    if (line.startsWith("@@")) {
      flushChangedRows(rows, deletedLines, addedLines);
      deletedLines = [];
      addedLines = [];
      rows.push({
        type: "hunk",
        oldText: line,
        newText: line
      });
      continue;
    }

    if (line.startsWith("-")) {
      deletedLines.push(line.slice(1));
      continue;
    }

    if (line.startsWith("+")) {
      addedLines.push(line.slice(1));
      continue;
    }

    flushChangedRows(rows, deletedLines, addedLines);
    deletedLines = [];
    addedLines = [];
    rows.push({
      type: "context",
      oldText: line.startsWith(" ") ? line.slice(1) : line,
      newText: line.startsWith(" ") ? line.slice(1) : line
    });
  }

  flushChangedRows(rows, deletedLines, addedLines);
  return rows;
}

function flushChangedRows(rows, deletedLines, addedLines) {
  const rowCount = Math.max(deletedLines.length, addedLines.length);

  for (let index = 0; index < rowCount; index += 1) {
    const oldText = deletedLines[index] ?? "";
    const newText = addedLines[index] ?? "";

    rows.push({
      type: oldText && newText ? "changed" : oldText ? "deleted" : "added",
      oldText,
      newText
    });
  }
}
