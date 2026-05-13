import mysql from "mysql2/promise";
import { serverConfig } from "../config/serverConfig.js";
import { createLogger } from "../logging/logger.js";

const logger = createLogger("mysqlConnection");

let connectionPool;

export function getConnectionPool() {
  if (!connectionPool) {
    logger.info("mysql.pool.creating", {
      host: serverConfig.database.host,
      port: serverConfig.database.port,
      database: serverConfig.database.database,
      user: serverConfig.database.user
    });

    connectionPool = mysql.createPool({
      host: serverConfig.database.host,
      port: serverConfig.database.port,
      database: serverConfig.database.database,
      user: serverConfig.database.user,
      password: serverConfig.database.password,
      waitForConnections: true,
      connectionLimit: 5,
      namedPlaceholders: true,
      dateStrings: true
    });
  }

  return connectionPool;
}
