import { sendJson } from "../http/jsonResponse.js";

export async function handleHealthRoute(request, response, url, config) {
  if (request.method !== "GET" || url.pathname !== "/api/health") {
    return false;
  }

  sendJson(response, 200, {
    status: "ok",
    service: "ChatGPT Development API",
    port: config.port,
    timestamp: new Date().toISOString()
  });

  return true;
}
