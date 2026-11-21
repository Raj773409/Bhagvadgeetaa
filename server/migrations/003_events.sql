CREATE TABLE events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL,
  title_key VARCHAR(64) NOT NULL COMMENT 'Matches the public-site translation key, e.g. curtainRaiser',
  event_date DATE NOT NULL,
  timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata',
  venue VARCHAR(255) NULL COMMENT 'NULL until an official venue is confirmed',
  livestream_url VARCHAR(500) NULL COMMENT 'NULL until an authorised broadcast is configured',
  status ENUM('upcoming', 'live', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  capacity INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_events_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE event_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  starts_at DATETIME NULL COMMENT 'NULL until an official session time is confirmed',
  ends_at DATETIME NULL,
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_sessions_event (event_id),
  CONSTRAINT fk_sessions_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Registration window/eligibility configuration per event (not individual participant rows — those live in `registrations`).
CREATE TABLE event_registrations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT UNSIGNED NOT NULL,
  capacity INT UNSIGNED NULL,
  opens_at TIMESTAMP NULL,
  closes_at TIMESTAMP NULL,
  eligibility_notes VARCHAR(1000) NULL,
  UNIQUE KEY uq_eventregistrations_event (event_id),
  CONSTRAINT fk_eventregistrations_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- event_passes and event_checkins are created in 004_participants_registrations.sql,
-- since a pass must reference a registration row and that table doesn't exist yet here.

CREATE TABLE event_staff (
  event_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  role_title VARCHAR(160) NOT NULL,
  assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (event_id, user_id),
  CONSTRAINT fk_eventstaff_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT fk_eventstaff_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
