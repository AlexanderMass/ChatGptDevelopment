import { sendError, sendJson } from "../http/jsonResponse.js";
import { analyzeGitData } from "../services/gitAnalysisService.js";

export async function handleGitAnalysisRoute(request, response, url) {
  if (!url.pathname.startsWith("/api/git-analysis")) {
    return false;
  }

  if (request.method === "POST" && url.pathname === "/api/git-analysis/run") {
    sendJson(response, 200, {
      status: "ok",
      data: await analyzeGitData()
    });
    return true;
  }

  sendError(response, 404, "Git-Analyse-API-Pfad wurde nicht gefunden.");
  return true;
}
