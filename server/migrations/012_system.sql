CREATE TABLE audit_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  actor_user_id BIGINT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,
  entity_table VARCHAR(100) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  metadata_json JSON NULL COMMENT 'Never stores secrets, passwords, tokens or full payment payloads',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_audit_actor (actor_user_id),
  KEY idx_audit_entity (entity_table, entity_id),
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE system_settings (
  setting_key VARCHAR(100) NOT NULL PRIMARY KEY,
  setting_value VARCHAR(1000) NULL,
  updated_by_user_id BIGINT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_settings_updater FOREIGN KEY (updated_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Real connection-health checks against each external integration, so the admin Settings
-- page always reflects a genuinely observed status, never an assumed one.
CREATE TABLE integration_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  integration_name VARCHAR(100) NOT NULL,
  event_type ENUM('health_check', 'error', 'configured', 'disabled') NOT NULL,
  detail VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_integration_events_name (integration_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE scheduled_jobs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_name VARCHAR(100) NOT NULL,
  status ENUM('scheduled', 'running', 'succeeded', 'failed') NOT NULL DEFAULT 'scheduled',
  run_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP NULL,
  error_message VARCHAR(500) NULL,
  KEY idx_jobs_status (status),
  KEY idx_jobs_run_at (run_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
