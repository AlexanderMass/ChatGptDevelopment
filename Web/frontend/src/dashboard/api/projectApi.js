const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3100";

export async function fetchProjects() {
  const response = await fetch(`${apiBaseUrl}/api/projects`);
  const payload = await readJsonResponse(response);
  return payload.data ?? [];
}

export async function createProject(projectInput) {
  const response = await fetch(`${apiBaseUrl}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(projectInput)
  });
  const payload = await readJsonResponse(response);
  return payload.data;
}

export async function updateProject(projectId, projectInput) {
  const response = await fetch(`${apiBaseUrl}/api/projects/${encodeURIComponent(projectId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(projectInput)
  });
  const payload = await readJsonResponse(response);
  return payload.data;
}

async function readJsonResponse(response) {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? "API-Anfrage ist fehlgeschlagen.");
  }

  return payload;
}
