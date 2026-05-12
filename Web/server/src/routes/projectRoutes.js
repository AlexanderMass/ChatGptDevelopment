import { readJsonBody } from "../http/requestBody.js";
import { sendError, sendJson } from "../http/jsonResponse.js";
import {
  createProject,
  getProject,
  listProjects,
  updateProject
} from "../services/projectService.js";

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
