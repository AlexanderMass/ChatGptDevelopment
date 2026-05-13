import { getConnectionPool } from "./mysqlConnection.js";
import { createLogger } from "../logging/logger.js";

const logger = createLogger("projectRepository");

const projectSelectColumns = `
  projectId,
  name,
  description,
  status,
  startDate,
  endDate
`;

export async function findProjects() {
  logger.info("project.list.loading");

  const [rows] = await getConnectionPool().query(
    `
      SELECT ${projectSelectColumns}
      FROM chat_gpt_project
      ORDER BY startDate DESC, projectId DESC
    `
  );

  return Promise.all(rows.map(async (row) => withRepositories(mapProjectRow(row))));
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

  return rows[0] ? withRepositories(mapProjectRow(rows[0])) : null;
}

export async function insertProject(projectInput) {
  logger.info("project.create.persisting", {
    project: projectInput
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

  const project = await findProjectById(result.insertId);
  await syncProjectRepositories(project.projectId, projectInput.repositories);
  return findProjectById(project.projectId);
}

export async function updateProjectRecord(projectId, projectInput) {
  logger.info("project.update.persisting", {
    projectId,
    project: projectInput
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

  await syncProjectRepositories(projectId, projectInput.repositories);
  return findProjectById(projectId);
}

async function syncProjectRepositories(projectId, repositories = []) {
  const pool = getConnectionPool();
  const [existingRows] = await pool.execute(
    `
      SELECT repositoryId, path
      FROM git_repository
      WHERE projectId = :projectId
    `,
    { projectId }
  );
  const nextRepositoriesByPath = new Map(repositories.map((repository) => [repository.path, repository]));

  for (const existingRepository of existingRows) {
    if (!nextRepositoriesByPath.has(existingRepository.path)) {
      await pool.execute(
        `
          DELETE FROM git_repository
          WHERE repositoryId = :repositoryId
        `,
        { repositoryId: existingRepository.repositoryId }
      );
    }
  }

  for (const repository of repositories) {
    const existingRepository = existingRows.find((row) => row.path === repository.path);

    if (existingRepository) {
      await updateProjectRepository(existingRepository.repositoryId, repository);
    } else {
      await insertProjectRepository(projectId, repository);
    }
  }
}

async function insertProjectRepository(projectId, repository) {
  await getConnectionPool().execute(
    `
      INSERT INTO git_repository (
        projectId,
        path,
        remoteUrl,
        firstCheckInDate,
        lastCheckInDate,
        checkInCount
      )
      VALUES (
        :projectId,
        :path,
        :remoteUrl,
        :firstCheckInDate,
        :lastCheckInDate,
        :checkInCount
      )
    `,
    mapRepositoryStatementParameters({ projectId, repository })
  );
}

async function updateProjectRepository(repositoryId, repository) {
  await getConnectionPool().execute(
    `
      UPDATE git_repository
      SET
        remoteUrl = :remoteUrl,
        firstCheckInDate = :firstCheckInDate,
        lastCheckInDate = :lastCheckInDate,
        checkInCount = :checkInCount
      WHERE repositoryId = :repositoryId
    `,
    mapRepositoryStatementParameters({ repositoryId, repository })
  );
}

function mapRepositoryStatementParameters({ projectId = undefined, repositoryId = undefined, repository }) {
  return {
    projectId,
    repositoryId,
    path: repository.path,
    remoteUrl: repository.remoteUrl || null,
    firstCheckInDate: repository.firstCheckInDate || null,
    lastCheckInDate: repository.lastCommitDate || null,
    checkInCount: repository.checkInCount || 0
  };
}

async function withRepositories(project) {
  const [rows] = await getConnectionPool().execute(
    `
      SELECT
        repositoryId,
        path,
        remoteUrl,
        firstCheckInDate,
        lastCheckInDate,
        checkInCount
      FROM git_repository
      WHERE projectId = :projectId
      ORDER BY lastCheckInDate DESC, repositoryId DESC
    `,
    { projectId: project.projectId }
  );

  return {
    ...project,
    repositories: rows.map((row) => ({
      repositoryId: row.repositoryId,
      path: row.path,
      remoteUrl: row.remoteUrl ?? "",
      firstCheckInDate: row.firstCheckInDate ?? "",
      lastCommitDate: row.lastCheckInDate ?? "",
      checkInCount: row.checkInCount ?? 0
    }))
  };
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
