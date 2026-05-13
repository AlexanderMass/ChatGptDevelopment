import { getConnectionPool } from "./mysqlConnection.js";

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
