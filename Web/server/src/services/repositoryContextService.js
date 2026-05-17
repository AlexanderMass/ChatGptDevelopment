import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createLogger } from "../logging/logger.js";

const execFileAsync = promisify(execFile);
const logger = createLogger("repositoryContextService");
const contextDirectoryNames = new Set([
  "chatgptcontext",
  "chatgpt-context",
  "chatgpt context",
  "chatgptkontext",
  "chatgpt-kontext",
  "chatgpt kontext"
]);

export async function hasChatGptContext(repositoryPath) {
  return Boolean(await findChatGptContextDirectory(repositoryPath));
}

export async function findChatGptContextDirectory(repositoryPath) {
  if (!repositoryPath) {
    return "";
  }

  try {
    const gitPaths = await listRepositoryGitPaths(repositoryPath);

    return gitPaths.map(readContextDirectoryName).find(Boolean) ?? "";
  } catch (error) {
    logger.warning("repository.context.check.failed", {
      repositoryPath,
      errorMessage: error.message
    });
    return "";
  }
}

export async function listRepositoryGitPaths(repositoryPath) {
  const { stdout } = await execFileAsync("git", ["-C", repositoryPath, "ls-tree", "-r", "--name-only", "HEAD"], {
    windowsHide: true
  });

  return stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function readRepositoryFileContent(repositoryPath, gitPath) {
  const { stdout } = await execFileAsync("git", ["-C", repositoryPath, "show", `HEAD:${gitPath}`], {
    maxBuffer: 1024 * 1024 * 8,
    windowsHide: true
  });

  return stdout;
}

function readContextDirectoryName(gitPath) {
  const firstSegment = gitPath.split("/")[0]?.trim().toLowerCase();

  if (!firstSegment || !contextDirectoryNames.has(firstSegment)) {
    return "";
  }

  return gitPath.split("/")[0]?.trim() ?? "";
}
