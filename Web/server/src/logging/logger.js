import fs from "node:fs";
import path from "node:path";
import { serverConfig } from "../config/serverConfig.js";

const logDirectory = path.join(serverConfig.projectRoot, "Web", "server", "logs");
const logFilePath = path.join(logDirectory, "api.log");

export function logInfo(message, context = {}) {
  writeLogEntry("INFO", message, context);
}

export function logError(message, error, context = {}) {
  writeLogEntry("ERROR", message, {
    ...context,
    errorMessage: error?.message,
    errorStack: error?.stack
  });
}

export function getLogFilePath() {
  return logFilePath;
}

export function createLogger(serviceName) {
  return {
    info(message, context = {}) {
      writeLogEntry("INFO", message, context, serviceName);
    },
    warning(message, context = {}) {
      writeLogEntry("WARNING", message, context, serviceName);
    },
    error(message, error, context = {}) {
      writeLogEntry(
        "ERROR",
        message,
        {
          ...context,
          errorMessage: error?.message,
          errorStack: error?.stack
        },
        serviceName
      );
    },
    debug(message, context = {}) {
      writeLogEntry("DEBUG", message, context, serviceName);
    }
  };
}

function writeLogEntry(level, message, context, serviceName = undefined) {
  fs.mkdirSync(logDirectory, { recursive: true });

  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: serviceName,
    message,
    context
  };

  fs.appendFileSync(logFilePath, `${JSON.stringify(entry)}\n`, "utf8");
}
