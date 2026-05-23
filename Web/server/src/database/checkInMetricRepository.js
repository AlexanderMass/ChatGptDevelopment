import { getConnectionPool } from "./mysqlConnection.js";

export async function findCheckInMetricsByProjectId(projectId) {
  const [rows] = await getConnectionPool().execute(
    `
      SELECT
        p.projectId,
        p.name AS projectName,
        r.repositoryId,
        r.path AS repositoryPath,
        m.checkInMetricId,
        m.commitHash,
        m.commitDate,
        m.messageSubject,
        m.changedFileCount,
        m.addedLineCount,
        m.deletedLineCount,
        m.netLineChange,
        m.churnLineCount,
        m.trackedFileCount,
        m.isMergeCommit
      FROM chat_gpt_project p
      INNER JOIN git_repository r
        ON r.projectId = p.projectId
      INNER JOIN check_in_metric m
        ON m.repositoryId = r.repositoryId
      WHERE p.projectId = :projectId
        AND (
          p.startDate IS NULL
          OR m.commitDate >= TIMESTAMP(p.startDate, '00:00:00')
        )
        AND m.commitDate <= CASE
          WHEN p.endDate IS NULL THEN NOW()
          ELSE TIMESTAMP(p.endDate, '23:59:59')
        END
      ORDER BY m.commitDate DESC, m.checkInMetricId DESC
    `,
    { projectId }
  );

  return rows.map((row) => ({
    projectId: row.projectId,
    projectName: row.projectName,
    repositoryId: row.repositoryId,
    repositoryName: repositoryName(row.repositoryPath),
    repositoryPath: row.repositoryPath,
    checkInMetricId: row.checkInMetricId,
    commitHash: row.commitHash,
    commitDate: row.commitDate,
    messageSubject: row.messageSubject ?? "",
    changedFileCount: row.changedFileCount,
    addedLineCount: row.addedLineCount,
    deletedLineCount: row.deletedLineCount,
    netLineChange: row.netLineChange,
    churnLineCount: row.churnLineCount,
    trackedFileCount: row.trackedFileCount,
    isMergeCommit: Boolean(row.isMergeCommit)
  }));
}

export async function findCheckInMetricGitReference(projectId, checkInMetricId) {
  const [rows] = await getConnectionPool().execute(
    `
      SELECT
        m.checkInMetricId,
        m.commitHash,
        r.repositoryId,
        r.path AS repositoryPath
      FROM check_in_metric m
      INNER JOIN git_repository r
        ON r.repositoryId = m.repositoryId
      INNER JOIN chat_gpt_project p
        ON p.projectId = r.projectId
      WHERE p.projectId = :projectId
        AND m.checkInMetricId = :checkInMetricId
    `,
    {
      projectId,
      checkInMetricId
    }
  );

  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    checkInMetricId: row.checkInMetricId,
    commitHash: row.commitHash,
    repositoryId: row.repositoryId,
    repositoryPath: row.repositoryPath
  };
}

export async function findLastCheckInMetricDate(repositoryId) {
  const [rows] = await getConnectionPool().execute(
    `
      SELECT MAX(commitDate) AS lastMetricDate
      FROM check_in_metric
      WHERE repositoryId = :repositoryId
    `,
    { repositoryId }
  );

  return rows[0]?.lastMetricDate ?? null;
}

export async function deleteCheckInMetricsOutsideProjectScope(repositoryId, projectStartDate, projectEndDate) {
  await getConnectionPool().execute(
    `
      DELETE FROM check_in_metric
      WHERE repositoryId = :repositoryId
        AND (
          (
            :projectStartDate IS NOT NULL
            AND commitDate < TIMESTAMP(:projectStartDate, '00:00:00')
          )
          OR (
            :projectEndDate IS NOT NULL
            AND commitDate > TIMESTAMP(:projectEndDate, '23:59:59')
          )
        )
    `,
    {
      repositoryId,
      projectStartDate: projectStartDate || null,
      projectEndDate: projectEndDate || null
    }
  );
}

export async function insertCheckInMetrics(metrics) {
  let insertedCount = 0;

  for (const metric of metrics) {
    const [result] = await getConnectionPool().execute(
      `
        INSERT IGNORE INTO check_in_metric (
          repositoryId,
          commitHash,
          commitDate,
          messageSubject,
          changedFileCount,
          addedLineCount,
          deletedLineCount,
          netLineChange,
          churnLineCount,
          trackedFileCount,
          isMergeCommit
        )
        VALUES (
          :repositoryId,
          :commitHash,
          :commitDate,
          :messageSubject,
          :changedFileCount,
          :addedLineCount,
          :deletedLineCount,
          :netLineChange,
          :churnLineCount,
          :trackedFileCount,
          :isMergeCommit
        )
      `,
      metric
    );

    insertedCount += result.affectedRows;
  }

  return insertedCount;
}

function repositoryName(repositoryPath) {
  return String(repositoryPath ?? "").split(/[\\/]/).pop() || "";
}
