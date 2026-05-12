import fs from "node:fs/promises";
import { sendJson } from "../http/jsonResponse.js";
import { getLogFilePath } from "../logging/logger.js";

export async function handleLogRoute(request, response, url) {
  if (request.method !== "GET" || url.pathname !== "/api/server-log") {
    return false;
  }

  const lineLimit = normalizeLineLimit(url.searchParams.get("limit"));
  const levels = normalizeLevels(url.searchParams.get("levels"));
  const lines = await readLastLogLines(lineLimit, levels);

  sendJson(response, 200, {
    status: "ok",
    data: lines.reverse()
  });

  return true;
}

async function readLastLogLines(lineCount, levels) {
  try {
    const fileContent = await fs.readFile(getLogFilePath(), "utf8");
    return fileContent
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((line) => levels.size === 0 || levels.has(readLogLevel(line)))
      .slice(-lineCount);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function normalizeLineLimit(rawLimit) {
  const parsedLimit = Number.parseInt(rawLimit ?? "100", 10);

  if (Number.isNaN(parsedLimit)) {
    return 100;
  }

  return Math.min(Math.max(parsedLimit, 1), 1000);
}

function normalizeLevels(rawLevels) {
  if (!rawLevels) {
    return new Set();
  }

  return new Set(
    rawLevels
      .split(",")
      .map((level) => level.trim().toUpperCase())
      .filter(Boolean)
  );
}

function readLogLevel(line) {
  try {
    return JSON.parse(line).level ?? "INFO";
  } catch {
    return "INFO";
  }
}
