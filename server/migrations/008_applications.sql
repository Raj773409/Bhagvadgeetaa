CREATE TABLE partner_applications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference CHAR(14) NOT NULL,
  org_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  country_id SMALLINT UNSIGNED NULL,
  interest VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('submitted', 'in_review', 'approved', 'declined') NOT NULL DEFAULT 'submitted',
  reviewed_by_user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_partnerapps_reference (reference),
  KEY idx_partnerapps_status (status),
  CONSTRAINT fk_partnerapps_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
  CONSTRAINT fk_partnerapps_reviewer FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE volunteer_applications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference CHAR(14) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  country_id SMALLINT UNSIGNED NULL,
  skills VARCHAR(500) NOT NULL,
  availability VARCHAR(255) NOT NULL,
  preferred_function VARCHAR(160) NOT NULL,
  status ENUM('submitted', 'in_review', 'approved', 'declined') NOT NULL DEFAULT 'submitted',
  reviewed_by_user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_volunteerapps_reference (reference),
  KEY idx_volunteerapps_status (status),
  CONSTRAINT fk_volunteerapps_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
  CONSTRAINT fk_volunteerapps_reviewer FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE support_tickets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference CHAR(14) NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  category VARCHAR(100) NULL,
  priority ENUM('low', 'normal', 'high', 'urgent') NOT NULL DEFAULT 'normal',
  assigned_to_user_id BIGINT UNSIGNED NULL,
  status ENUM('open', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'open',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_tickets_reference (reference),
  KEY idx_tickets_status (status),
  CONSTRAINT fk_tickets_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_tickets_assignee FOREIGN KEY (assigned_to_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE support_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ticket_id BIGINT UNSIGNED NOT NULL,
  author_user_id BIGINT UNSIGNED NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_messages_ticket (ticket_id),
  CONSTRAINT fk_messages_ticket FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
  CONSTRAINT fk_messages_author FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
