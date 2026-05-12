const defaultBodyLimit = 1024 * 1024;

export async function readJsonBody(request, bodyLimit = defaultBodyLimit) {
  const chunks = [];
  let bodySize = 0;

  for await (const chunk of request) {
    bodySize += chunk.length;

    if (bodySize > bodyLimit) {
      throw new Error("Request body is too large.");
    }

    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8").trim();

  if (!rawBody) {
    return {};
  }

  return JSON.parse(rawBody);
}
