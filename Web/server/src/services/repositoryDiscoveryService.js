import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { serverConfig } from "../config/serverConfig.js";
import { createLogger } from "../logging/logger.js";

const execFileAsync = promisify(execFile);
const logger = createLogger("repositoryDiscoveryService");
const ignoredDirectoryNames = new Set([
  ".git",
  "dist",
  "node_modules",
  "__pycache__",
  ".venv",
  "venv"
]);

export async function listAvailableRepositories() {
  const repositoryPaths = await findGitRepositories(serverConfig.repositoryRoot);
  const repositories = await Promise.all(repositoryPaths.map(readRepositoryInfo));

  return repositories
    .filter(Boolean)
    .sort((left, right) => compareDateDescending(left.lastCommitDate, right.lastCommitDate));
}

async function findGitRepositories(rootDirectory) {
  const repositories = [];

  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const hasGitMarker = entries.some((entry) => entry.name === ".git");

    if (hasGitMarker) {
      repositories.push(directory);
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || ignoredDirectoryNames.has(entry.name)) {
        continue;
      }

      await visit(path.join(directory, entry.name));
    }
  }

  await visit(rootDirectory);
  return repositories;
}

async function readRepositoryInfo(repositoryPath) {
  try {
    const [firstCheckInDate, lastCommitDate, remoteUrl, checkInCount] = await Promise.all([
      readFirstOptionalGitLine(repositoryPath, ["log", "--format=%cI", "--reverse", "HEAD"]),
      readOptionalGitValue(repositoryPath, ["log", "-1", "--format=%cI"]),
      readOptionalGitValue(repositoryPath, ["config", "--get", "remote.origin.url"]),
      readOptionalGitValue(repositoryPath, ["rev-list", "--count", "HEAD"])
    ]);

    return {
      path: repositoryPath,
      name: path.basename(repositoryPath),
      remoteUrl: remoteUrl || "",
      firstCheckInDate: firstCheckInDate || "",
      lastCommitDate: lastCommitDate || "",
      checkInCount: Number(checkInCount || "0")
    };
  } catch (error) {
    logger.warning("repository.discovery.skipped", {
      repositoryPath,
      errorMessage: error.message
    });
    return null;
  }
}

async function readFirstOptionalGitLine(repositoryPath, args) {
  const output = await readOptionalGitValue(repositoryPath, args);
  return output.split(/\r?\n/).find(Boolean)?.trim() ?? "";
}

async function readOptionalGitValue(repositoryPath, args) {
  try {
    const { stdout } = await execFileAsync("git", ["-C", repositoryPath, ...args], {
      windowsHide: true
    });

    return stdout.trim();
  } catch {
    return "";
  }
}

function compareDateDescending(leftDate, rightDate) {
  return new Date(rightDate || 0).getTime() - new Date(leftDate || 0).getTime();
}
