CREATE TABLE notification_templates (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  template_key VARCHAR(100) NOT NULL,
  language_id SMALLINT UNSIGNED NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body MEDIUMTEXT NOT NULL,
  is_transactional TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_templates_key_language (template_key, language_id),
  CONSTRAINT fk_templates_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE notifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_notifications_user (user_id),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A delivery row is only ever marked 'sent' after the provider genuinely accepts the request.
CREATE TABLE notification_deliveries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  notification_id BIGINT UNSIGNED NOT NULL,
  channel ENUM('email', 'in_app') NOT NULL,
  status ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
  provider_message_id VARCHAR(191) NULL,
  error_message VARCHAR(500) NULL,
  delivered_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_deliveries_notification (notification_id),
  CONSTRAINT fk_deliveries_notification FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE announcements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  country_id SMALLINT UNSIGNED NULL COMMENT 'NULL = global announcement',
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP NULL,
  created_by_user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_announcements_country (country_id),
  CONSTRAINT fk_announcements_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
  CONSTRAINT fk_announcements_author FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
