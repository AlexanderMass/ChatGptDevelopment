CREATE DATABASE IF NOT EXISTS chat_gpt_development
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE chat_gpt_development;

DROP TABLE IF EXISTS check_in_metric;
DROP TABLE IF EXISTS git_repository;
DROP TABLE IF EXISTS chat_gpt_project;

DROP TABLE IF EXISTS checkinmetric;
DROP TABLE IF EXISTS gitrepository;
DROP TABLE IF EXISTS chatgptproject;

CREATE TABLE chat_gpt_project (
  projectId BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  status VARCHAR(64) NOT NULL,
  startDate DATE NULL,
  endDate DATE NULL,
  PRIMARY KEY (projectId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE git_repository (
  repositoryId BIGINT NOT NULL AUTO_INCREMENT,
  projectId BIGINT NOT NULL,
  path VARCHAR(1024) NOT NULL,
  remoteUrl VARCHAR(1024) NULL,
  firstCheckInDate DATETIME NULL,
  lastCheckInDate DATETIME NULL,
  checkInCount INT NOT NULL DEFAULT 0,
  PRIMARY KEY (repositoryId),
  CONSTRAINT fk_git_repository_project
    FOREIGN KEY (projectId)
    REFERENCES chat_gpt_project (projectId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE check_in_metric (
  checkInMetricId BIGINT NOT NULL AUTO_INCREMENT,
  repositoryId BIGINT NOT NULL,
  commitHash VARCHAR(64) NOT NULL,
  commitDate DATETIME NOT NULL,
  messageSubject VARCHAR(512) NULL,
  changedFileCount INT NOT NULL DEFAULT 0,
  addedLineCount INT NOT NULL DEFAULT 0,
  deletedLineCount INT NOT NULL DEFAULT 0,
  netLineChange INT NOT NULL DEFAULT 0,
  churnLineCount INT NOT NULL DEFAULT 0,
  trackedFileCount INT NOT NULL DEFAULT 0,
  isMergeCommit BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (checkInMetricId),
  UNIQUE KEY uq_check_in_metric_repository_commit (repositoryId, commitHash),
  KEY idx_check_in_metric_repository_date (repositoryId, commitDate),
  CONSTRAINT fk_check_in_metric_repository
    FOREIGN KEY (repositoryId)
    REFERENCES git_repository (repositoryId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
