import {
  findProjectById,
  findProjects,
  insertProject,
  updateProjectRecord
} from "../database/projectRepository.js";

export async function listProjects() {
  return findProjects();
}

export async function getProject(projectId) {
  return findProjectById(projectId);
}

export async function createProject(projectInput) {
  return insertProject(normalizeNewProject(projectInput));
}

export async function updateProject(projectId, projectInput) {
  return updateProjectRecord(projectId, normalizeExistingProject(projectInput));
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
    endDate: null
  };
}

function normalizeExistingProject(projectInput) {
  return {
    description: String(projectInput.description ?? "").trim(),
    startDate: normalizeDate(projectInput.startDate),
    endDate: normalizeDate(projectInput.endDate)
  };
}

function normalizeDate(value) {
  const dateValue = String(value ?? "").trim();
  return dateValue || null;
}
