import { sendJson } from "../http/jsonResponse.js";
import { listAvailableRepositories } from "../services/repositoryDiscoveryService.js";

export async function handleRepositoryRoute(request, response, url) {
  if (request.method !== "GET" || url.pathname !== "/api/repositories") {
    return false;
  }

  sendJson(response, 200, {
    status: "ok",
    data: await listAvailableRepositories()
  });

  return true;
}
