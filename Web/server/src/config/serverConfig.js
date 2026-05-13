import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(configDirectory, "../../../..");
const localEnvPath = path.join(projectRoot, ".env.local");

function readLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const entries = {};
  const fileContent = fs.readFileSync(filePath, "utf8");

  for (const rawLine of fileContent.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    entries[key] = value;
  }

  return entries;
}

const localEnv = readLocalEnv(localEnvPath);

function readSetting(key, fallbackValue) {
  return process.env[key] ?? localEnv[key] ?? fallbackValue;
}

export const serverConfig = {
  host: readSetting("API_HOST", "127.0.0.1"),
  port: Number(readSetting("API_PORT", "3100")),
  projectRoot,
  repositoryRoot: readSetting("GIT_REPOSITORY_ROOT", "D:\\Alexander"),
  database: {
    host: readSetting("MYSQL_HOST", "127.0.0.1"),
    port: Number(readSetting("MYSQL_PORT", "3306")),
    database: readSetting("MYSQL_DATABASE", "chat_gpt_development"),
    user: readSetting("MYSQL_USER", "root"),
    password: readSetting("MYSQL_PASSWORD", "")
  }
};
