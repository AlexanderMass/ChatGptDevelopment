import http from "node:http";
import { serverConfig } from "./config/serverConfig.js";
import { sendError, sendJson } from "./http/jsonResponse.js";
import { createLogger, getLogFilePath } from "./logging/logger.js";
import { handleCockpitRoute } from "./routes/cockpitRoutes.js";
import { handleGitAnalysisRoute } from "./routes/gitAnalysisRoutes.js";
import { handleHealthRoute } from "./routes/healthRoutes.js";
import { handleLogRoute } from "./routes/logRoutes.js";
import { handleProjectRoute } from "./routes/projectRoutes.js";
import { handleRepositoryRoute } from "./routes/repositoryRoutes.js";

const quietRequestPaths = new Set(["/api/health", "/api/server-log"]);
const logger = createLogger("apiServer");

function applyCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function handleRequest(request, response, config) {
  applyCorsHeaders(response);

  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host ?? `${config.host}:${config.port}`}`);

  if (await handleHealthRoute(request, response, requestUrl, config)) {
    return;
  }

  if (await handleProjectRoute(request, response, requestUrl, config)) {
    return;
  }

  if (await handleRepositoryRoute(request, response, requestUrl)) {
    return;
  }

  if (await handleCockpitRoute(request, response, requestUrl)) {
    return;
  }

  if (await handleGitAnalysisRoute(request, response, requestUrl)) {
    return;
  }

  if (await handleLogRoute(request, response, requestUrl)) {
    return;
  }

  sendError(response, 404, "API-Pfad wurde nicht gefunden.");
}

export function createApiServer(config = serverConfig) {
  return http.createServer(async (request, response) => {
    const startTime = Date.now();

    response.on("finish", () => {
      const requestUrl = new URL(request.url, `http://${request.headers.host ?? `${config.host}:${config.port}`}`);

      if (quietRequestPaths.has(requestUrl.pathname)) {
        return;
      }

      logger.info("api.request.completed", {
        method: request.method,
        url: request.url,
        statusCode: response.statusCode,
        durationMs: Date.now() - startTime
      });
    });

    try {
      await handleRequest(request, response, config);
    } catch (error) {
      logger.error("api.request.failed", error, {
        method: request.method,
        url: request.url
      });
      sendError(response, 500, "Unerwarteter Fehler im API-Service.", error.message);
    }
  });
}

export function startServer(config = serverConfig) {
  const server = createApiServer(config);

  server.listen(config.port, config.host, () => {
    logger.info("api.started", {
      host: config.host,
      port: config.port,
      databaseHost: config.database.host,
      databaseName: config.database.database,
      logFilePath: getLogFilePath()
    });
    console.log(`ChatGPT Development API listens on http://${config.host}:${config.port}`);
    console.log(`API log file: ${getLogFilePath()}`);
  });

  return server;
}

if (process.argv[1]?.replace(/\\/g, "/").endsWith("/server.js")) {
  startServer();
}
