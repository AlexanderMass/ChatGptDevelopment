import { readJsonBody } from "../http/requestBody.js";
import { sendError, sendJson } from "../http/jsonResponse.js";
import {
  createProject,
  getCheckInMetricFileDiff,
  getProject,
  listCheckInMetricFiles,
  listProjectCheckInMetrics,
  listProjects,
  updateProject
} from "../services/projectService.js";

const checkInMetricFilesPattern = /^\/api\/projects\/([^/]+)\/check-in-metrics\/([^/]+)\/files$/;
const checkInMetricFileDiffPattern = /^\/api\/projects\/([^/]+)\/check-in-metrics\/([^/]+)\/files\/diff$/;
const checkInMetricsPattern = /^\/api\/projects\/([^/]+)\/check-in-metrics$/;
const projectDetailPattern = /^\/api\/projects\/([^/]+)$/;

export async function handleProjectRoute(request, response, url) {
  if (!url.pathname.startsWith("/api/projects")) {
    return false;
  }

  if (request.method === "GET" && url.pathname === "/api/projects") {
    sendJson(response, 200, {
      status: "ok",
      data: await listProjects()
    });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/projects") {
    const projectInput = await readJsonBody(request);
    const result = await createProject(projectInput);
    sendJson(response, 201, {
      status: "created",
      data: result
    });
    return true;
  }

  const checkInMetricFilesMatch = url.pathname.match(checkInMetricFilesPattern);
  const checkInMetricFileDiffMatch = url.pathname.match(checkInMetricFileDiffPattern);

  if (checkInMetricFileDiffMatch) {
    const projectId = decodeURIComponent(checkInMetricFileDiffMatch[1]);
    const checkInMetricId = decodeURIComponent(checkInMetricFileDiffMatch[2]);
    const filePath = url.searchParams.get("path") ?? "";

    if (request.method !== "GET") {
      sendError(response, 405, "HTTP-Methode wird fuer Check-in-Dateidiffs nicht unterstuetzt.");
      return true;
    }

    const result = await getCheckInMetricFileDiff(projectId, checkInMetricId, filePath);

    if (!result) {
      sendError(response, 404, "Check-in-Dateidiff wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "ok",
      data: result
    });
    return true;
  }

  if (checkInMetricFilesMatch) {
    const projectId = decodeURIComponent(checkInMetricFilesMatch[1]);
    const checkInMetricId = decodeURIComponent(checkInMetricFilesMatch[2]);

    if (request.method !== "GET") {
      sendError(response, 405, "HTTP-Methode wird fuer Check-in-Dateien nicht unterstuetzt.");
      return true;
    }

    const result = await listCheckInMetricFiles(projectId, checkInMetricId);

    if (!result) {
      sendError(response, 404, "Check-in-Metrik wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "ok",
      data: result
    });
    return true;
  }

  const checkInMetricsMatch = url.pathname.match(checkInMetricsPattern);

  if (checkInMetricsMatch) {
    const projectId = decodeURIComponent(checkInMetricsMatch[1]);

    if (request.method !== "GET") {
      sendError(response, 405, "HTTP-Methode wird fuer Check-in-Metriken nicht unterstuetzt.");
      return true;
    }

    const result = await listProjectCheckInMetrics(projectId);

    if (!result) {
      sendError(response, 404, "Projekt wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "ok",
      data: result
    });
    return true;
  }

  const detailMatch = url.pathname.match(projectDetailPattern);

  if (!detailMatch) {
    sendError(response, 404, "Projekt-API-Pfad wurde nicht gefunden.");
    return true;
  }

  const projectId = decodeURIComponent(detailMatch[1]);

  if (request.method === "GET") {
    const result = await getProject(projectId);

    if (!result) {
      sendError(response, 404, "Projekt wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "ok",
      data: result
    });
    return true;
  }

  if (request.method === "PUT") {
    const projectInput = await readJsonBody(request);
    const result = await updateProject(projectId, projectInput);

    if (!result) {
      sendError(response, 404, "Projekt wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "updated",
      data: result
    });
    return true;
  }

  sendError(response, 405, "HTTP-Methode wird fuer Projektressourcen nicht unterstuetzt.");
  return true;
}
