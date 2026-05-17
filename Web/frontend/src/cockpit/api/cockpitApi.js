const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3100";

export async function fetchCockpitProjects() {
  const response = await fetch(`${apiBaseUrl}/api/cockpit/projects`);
  const payload = await readJsonResponse(response);
  return payload.data ?? [];
}

export async function fetchProjectContextTree(projectId) {
  const response = await fetch(`${apiBaseUrl}/api/cockpit/projects/${encodeURIComponent(projectId)}/context-tree`);
  const payload = await readJsonResponse(response);
  return payload.data ?? null;
}

export async function fetchContextFile(repositoryId, gitPath) {
  const response = await fetch(
    `${apiBaseUrl}/api/cockpit/repositories/${encodeURIComponent(repositoryId)}/context-file?path=${encodeURIComponent(gitPath)}`
  );
  const payload = await readJsonResponse(response);
  return payload.data ?? null;
}

async function readJsonResponse(response) {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? "API-Anfrage ist fehlgeschlagen.");
  }

  return payload;
}
