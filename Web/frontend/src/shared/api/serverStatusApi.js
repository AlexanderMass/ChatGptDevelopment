const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:3100";

export async function fetchServerStatus() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/health`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return "stopped";
    }

    const payload = await response.json();
    return payload.status === "ok" ? "running" : "stopped";
  } catch {
    return "stopped";
  }
}
