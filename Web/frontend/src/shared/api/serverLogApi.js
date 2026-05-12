const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3100";

export async function fetchServerLog({ limit = 100, levels = [] } = {}) {
  const searchParams = new URLSearchParams({
    limit: String(limit),
  });

  if (levels.length > 0) {
    searchParams.set("levels", levels.join(","));
  }

  const response = await fetch(`${apiBaseUrl}/api/server-log?${searchParams.toString()}`, {
    cache: "no-store"
  });
  const payload = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Server Log konnte nicht geladen werden. Bitte den Node-API-Service neu starten.");
    }

    throw new Error(payload.message ?? "Server Log konnte nicht geladen werden.");
  }

  return payload.data ?? [];
}
