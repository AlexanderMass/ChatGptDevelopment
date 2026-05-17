import path from "node:path";
import {
  findProjectById,
  findProjectsWithChatGptContext,
  findRepositoryById
} from "../database/projectRepository.js";
import { createLogger } from "../logging/logger.js";
import {
  findChatGptContextDirectory,
  listRepositoryGitPaths,
  readRepositoryFileContent
} from "./repositoryContextService.js";

const logger = createLogger("cockpitService");

export async function listCockpitProjects() {
  const projects = await findProjectsWithChatGptContext();

  logger.info("cockpit.projects.loaded", {
    projectCount: projects.length
  });

  return projects;
}

export async function getProjectContextTree(projectId) {
  const project = await findProjectById(projectId);

  if (!project) {
    return null;
  }

  const repositoryTrees = [];

  for (const repository of project.repositories.filter((entry) => entry.hasChatGptContext)) {
    const contextDirectory = await findChatGptContextDirectory(repository.path);

    if (!contextDirectory) {
      continue;
    }

    const gitPaths = await listRepositoryGitPaths(repository.path);
    const contextFiles = gitPaths.filter((gitPath) => gitPath.startsWith(`${contextDirectory}/`));

    repositoryTrees.push({
      id: `repository:${repository.repositoryId}`,
      type: "repository",
      label: repositoryName(repository.path),
      repositoryId: repository.repositoryId,
      children: [
        {
          id: `directory:${repository.repositoryId}:${contextDirectory}`,
          type: "directory",
          label: contextDirectory,
          repositoryId: repository.repositoryId,
          gitPath: contextDirectory,
          children: buildTreeNodes(repository.repositoryId, contextDirectory, contextFiles)
        }
      ]
    });
  }

  logger.info("cockpit.context.tree.loaded", {
    projectId,
    repositoryCount: repositoryTrees.length
  });

  return {
    projectId: project.projectId,
    name: project.name,
    children: repositoryTrees
  };
}

export async function getContextFileContent(repositoryId, gitPath) {
  const repository = await findRepositoryById(repositoryId);

  if (!repository || !repository.hasChatGptContext) {
    return null;
  }

  const contextDirectory = await findChatGptContextDirectory(repository.path);

  if (!contextDirectory || !gitPath.startsWith(`${contextDirectory}/`)) {
    return null;
  }

  const content = await readRepositoryFileContent(repository.path, gitPath);

  return {
    repositoryId: repository.repositoryId,
    gitPath,
    fileName: path.basename(gitPath),
    content
  };
}

function buildTreeNodes(repositoryId, contextDirectory, gitPaths) {
  const root = [];

  for (const gitPath of gitPaths) {
    const relativePath = gitPath.slice(contextDirectory.length + 1);
    const segments = relativePath.split("/").filter(Boolean);
    let currentChildren = root;
    let currentPath = contextDirectory;

    segments.forEach((segment, index) => {
      currentPath = `${currentPath}/${segment}`;
      const isFile = index === segments.length - 1;
      let node = currentChildren.find((entry) => entry.label === segment && entry.type === (isFile ? "file" : "directory"));

      if (!node) {
        node = {
          id: `${isFile ? "file" : "directory"}:${repositoryId}:${currentPath}`,
          type: isFile ? "file" : "directory",
          label: segment,
          repositoryId,
          gitPath: currentPath,
          children: isFile ? undefined : []
        };
        currentChildren.push(node);
      }

      if (!isFile) {
        currentChildren = node.children;
      }
    });
  }

  return sortTreeNodes(root);
}

function sortTreeNodes(nodes) {
  return nodes
    .map((node) => ({
      ...node,
      children: node.children ? sortTreeNodes(node.children) : undefined
    }))
    .sort((left, right) => {
      if (left.type !== right.type) {
        return left.type === "directory" ? -1 : 1;
      }

      return left.label.localeCompare(right.label, "de");
    });
}

function repositoryName(repositoryPath) {
  return path.basename(repositoryPath);
}
