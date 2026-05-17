import { findCheckInMetricsByProjectId } from "../database/checkInMetricRepository.js";
import {
  findProjectById,
  findProjects,
  insertProject,
  updateProjectRecord
} from "../database/projectRepository.js";
import { createLogger } from "../logging/logger.js";
import { hasChatGptContext } from "./repositoryContextService.js";

const logger = createLogger("projectService");

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
