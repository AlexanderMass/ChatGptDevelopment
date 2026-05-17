import { sendError, sendJson } from "../http/jsonResponse.js";
import {
  getContextFileContent,
  getProjectContextTree,
  listCockpitProjects
} from "../services/cockpitService.js";

const contextTreePattern = /^\/api\/cockpit\/projects\/([^/]+)\/context-tree$/;
const contextFilePattern = /^\/api\/cockpit\/repositories\/([^/]+)\/context-file$/;

export async function handleCockpitRoute(request, response, url) {
  if (!url.pathname.startsWith("/api/cockpit")) {
    return false;
  }

  if (request.method === "GET" && url.pathname === "/api/cockpit/projects") {
    sendJson(response, 200, {
      status: "ok",
      data: await listCockpitProjects()
    });
    return true;
  }

  const contextTreeMatch = url.pathname.match(contextTreePattern);

  if (request.method === "GET" && contextTreeMatch) {
    const projectId = decodeURIComponent(contextTreeMatch[1]);
    const data = await getProjectContextTree(projectId);

    if (!data) {
      sendError(response, 404, "Cockpit-Projekt wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "ok",
      data
    });
    return true;
  }

  const contextFileMatch = url.pathname.match(contextFilePattern);

  if (request.method === "GET" && contextFileMatch) {
    const repositoryId = decodeURIComponent(contextFileMatch[1]);
    const gitPath = url.searchParams.get("path") ?? "";
    const data = await getContextFileContent(repositoryId, gitPath);

    if (!data) {
      sendError(response, 404, "Cockpit-Datei wurde nicht gefunden.");
      return true;
    }

    sendJson(response, 200, {
      status: "ok",
      data
    });
    return true;
  }

  sendError(response, 404, "Cockpit-API-Pfad wurde nicht gefunden.");
  return true;
}
