CREATE TABLE participant_profiles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_country_code VARCHAR(8) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  country_id SMALLINT UNSIGNED NULL,
  city VARCHAR(160) NOT NULL,
  preferred_language_id SMALLINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_profiles_user (user_id),
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_profiles_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
  CONSTRAINT fk_profiles_language FOREIGN KEY (preferred_language_id) REFERENCES languages(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE registrations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference CHAR(14) NOT NULL COMMENT 'Server-issued, e.g. BGM2027-000001',
  user_id BIGINT UNSIGNED NOT NULL,
  event_id BIGINT UNSIGNED NOT NULL,
  type ENUM('individual', 'group') NOT NULL,
  group_size SMALLINT UNSIGNED NULL,
  recitation_language VARCHAR(100) NOT NULL,
  status ENUM('draft', 'submitted', 'pending_review', 'approved', 'waitlisted', 'rejected', 'cancelled', 'checked_in') NOT NULL DEFAULT 'submitted',
  idempotency_key CHAR(64) NOT NULL COMMENT 'Prevents duplicate submissions from retried requests',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_registrations_reference (reference),
  UNIQUE KEY uq_registrations_idempotency (idempotency_key),
  UNIQUE KEY uq_registrations_user_event (user_id, event_id) COMMENT 'One active registration per user per event',
  KEY idx_registrations_event (event_id),
  KEY idx_registrations_status (status),
  CONSTRAINT fk_registrations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_registrations_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE registration_attendees (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  registration_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  notes VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_attendees_registration (registration_id),
  CONSTRAINT fk_attendees_registration FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE participant_consents (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  kind ENUM('privacy', 'terms', 'communications') NOT NULL,
  version VARCHAR(32) NOT NULL,
  accepted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_consents_user (user_id),
  CONSTRAINT fk_consents_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE registration_status_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  registration_id BIGINT UNSIGNED NOT NULL,
  from_status VARCHAR(32) NULL,
  to_status VARCHAR(32) NOT NULL,
  changed_by_user_id BIGINT UNSIGNED NULL,
  reason VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_statushistory_registration (registration_id),
  CONSTRAINT fk_statushistory_registration FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
  CONSTRAINT fk_statushistory_user FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE participant_assistance_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  registration_id BIGINT UNSIGNED NOT NULL,
  request_text VARCHAR(1000) NOT NULL,
  resolved_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_assistance_registration (registration_id),
  CONSTRAINT fk_assistance_registration FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- A pass is issued only after a registration is approved (enforced in passService.ts, not by the schema alone).
CREATE TABLE event_passes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  public_id CHAR(36) NOT NULL COMMENT 'Opaque reference encoded in the QR payload — never personal data',
  registration_id BIGINT UNSIGNED NOT NULL,
  signed_token VARCHAR(512) NOT NULL COMMENT 'HMAC-signed, server-verifiable token; QR encodes public_id + this signature',
  issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP NULL,
  revoked_reason VARCHAR(255) NULL,
  UNIQUE KEY uq_passes_public_id (public_id),
  UNIQUE KEY uq_passes_registration (registration_id),
  CONSTRAINT fk_passes_registration FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE event_checkins (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pass_id BIGINT UNSIGNED NOT NULL,
  verifier_user_id BIGINT UNSIGNED NOT NULL,
  checked_in_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_duplicate TINYINT(1) NOT NULL DEFAULT 0,
  KEY idx_checkins_pass (pass_id),
  CONSTRAINT fk_checkins_pass FOREIGN KEY (pass_id) REFERENCES event_passes(id) ON DELETE CASCADE,
  CONSTRAINT fk_checkins_verifier FOREIGN KEY (verifier_user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
