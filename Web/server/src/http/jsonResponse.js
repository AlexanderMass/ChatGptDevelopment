export function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload, null, 2));
}

export function sendError(response, statusCode, message, details = undefined) {
  sendJson(response, statusCode, {
    status: "error",
    message,
    details
  });
}
