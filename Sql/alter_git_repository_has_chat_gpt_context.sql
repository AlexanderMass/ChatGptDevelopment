USE chat_gpt_development;

ALTER TABLE git_repository
  ADD COLUMN hasChatGptContext BOOLEAN NOT NULL DEFAULT FALSE
  AFTER checkInCount;
