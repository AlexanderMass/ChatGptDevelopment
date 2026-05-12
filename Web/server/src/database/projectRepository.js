import { getConnectionPool } from "./mysqlConnection.js";
import { logInfo } from "../logging/logger.js";

const projectSelectColumns = `
  projectId,
  name,
  description,
  status,
  startDate,
  endDate
`;

export async function findProjects() {
  logInfo("Loading project list");

  const [rows] = await getConnectionPool().query(
    `
      SELECT ${projectSelectColumns}
      FROM chat_gpt_project
      ORDER BY startDate DESC, projectId DESC
    `
  );

  return rows.map(mapProjectRow);
}

export async function findProjectById(projectId) {
  const [rows] = await getConnectionPool().execute(
    `
      SELECT ${projectSelectColumns}
      FROM chat_gpt_project
      WHERE projectId = :projectId
    `,
    { projectId }
  );

  return rows[0] ? mapProjectRow(rows[0]) : null;
}

export async function insertProject(projectInput) {
  logInfo("Creating project", {
    name: projectInput.name,
    startDate: projectInput.startDate
  });

  const [result] = await getConnectionPool().execute(
    `
      INSERT INTO chat_gpt_project (
        name,
        description,
        status,
        startDate,
        endDate
      )
      VALUES (
        :name,
        :description,
        :status,
        :startDate,
        :endDate
      )
    `,
    {
      name: projectInput.name,
      description: projectInput.description || null,
      status: projectInput.status,
      startDate: projectInput.startDate || null,
      endDate: projectInput.endDate || null
    }
  );

  return findProjectById(result.insertId);
}

export async function updateProjectRecord(projectId, projectInput) {
  logInfo("Updating project", {
    projectId,
    startDate: projectInput.startDate,
    endDate: projectInput.endDate
  });

  await getConnectionPool().execute(
    `
      UPDATE chat_gpt_project
      SET
        description = :description,
        startDate = :startDate,
        endDate = :endDate
      WHERE projectId = :projectId
    `,
    {
      projectId,
      description: projectInput.description || null,
      startDate: projectInput.startDate || null,
      endDate: projectInput.endDate || null
    }
  );

  return findProjectById(projectId);
}

function mapProjectRow(row) {
  return {
    projectId: row.projectId,
    name: row.name,
    description: row.description ?? "",
    status: row.status,
    startDate: row.startDate ?? "",
    endDate: row.endDate ?? ""
  };
}
