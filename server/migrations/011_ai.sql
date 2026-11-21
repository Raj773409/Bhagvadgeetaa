-- No AI provider is configured in this environment (see config/env.ts integrations.geminiApiKey).
-- These tables exist so a real, server-side, permissioned AI integration has somewhere to
-- record its activity later — nothing writes to them yet.

CREATE TABLE ai_conversations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_conversations_user (user_id),
  CONSTRAINT fk_conversations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE ai_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  conversation_id BIGINT UNSIGNED NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_messages_conversation (conversation_id),
  CONSTRAINT fk_aimessages_conversation FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE ai_source_references (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message_id BIGINT UNSIGNED NOT NULL,
  verse_id BIGINT UNSIGNED NULL,
  chapter_id TINYINT UNSIGNED NULL,
  CONSTRAINT fk_sourcerefs_message FOREIGN KEY (message_id) REFERENCES ai_messages(id) ON DELETE CASCADE,
  CONSTRAINT fk_sourcerefs_verse FOREIGN KEY (verse_id) REFERENCES gita_verses(id) ON DELETE SET NULL,
  CONSTRAINT fk_sourcerefs_chapter FOREIGN KEY (chapter_id) REFERENCES gita_chapters(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Every row here requires human approval before any effect; AI never auto-approves finance,
-- refunds, scripture, access or eligibility decisions.
CREATE TABLE ai_review_tasks (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task_type VARCHAR(100) NOT NULL,
  subject_table VARCHAR(100) NOT NULL,
  subject_id BIGINT UNSIGNED NOT NULL,
  suggestion TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  reviewed_by_user_id BIGINT UNSIGNED NULL,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviewtasks_reviewer FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
