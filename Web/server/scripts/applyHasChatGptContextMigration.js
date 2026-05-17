import { getConnectionPool } from "../src/database/mysqlConnection.js";
import { hasChatGptContext } from "../src/services/repositoryContextService.js";

const pool = getConnectionPool();

try {
  const [rows] = await pool.query(
    `
      SELECT COUNT(*) AS columnCount
      FROM information_schema.columns
      WHERE table_schema = DATABASE()
        AND table_name = 'git_repository'
        AND column_name = 'hasChatGptContext'
    `
  );

  if (Number(rows[0]?.columnCount ?? 0) === 0) {
    await pool.query(
      `
        ALTER TABLE git_repository
          ADD COLUMN hasChatGptContext BOOLEAN NOT NULL DEFAULT FALSE
          AFTER checkInCount
      `
    );
    console.log("added hasChatGptContext");
  } else {
    console.log("hasChatGptContext already exists");
  }

  const [repositories] = await pool.query(
    `
      SELECT repositoryId, path
      FROM git_repository
    `
  );

  for (const repository of repositories) {
    const hasContext = await hasChatGptContext(repository.path);
    await pool.execute(
      `
        UPDATE git_repository
        SET hasChatGptContext = :hasChatGptContext
        WHERE repositoryId = :repositoryId
      `,
      {
        repositoryId: repository.repositoryId,
        hasChatGptContext: hasContext ? 1 : 0
      }
    );
  }

  console.log(`updated ${repositories.length} repository context flags`);
} finally {
  await pool.end();
}
