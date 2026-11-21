CREATE TABLE pages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(128) NOT NULL,
  title VARCHAR(255) NOT NULL,
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'draft',
  created_by_user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_pages_slug (slug),
  CONSTRAINT fk_pages_author FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE page_sections (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  page_id BIGINT UNSIGNED NOT NULL,
  section_key VARCHAR(100) NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_sections_page_key (page_id, section_key),
  CONSTRAINT fk_sections_page FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE content_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  page_section_id BIGINT UNSIGNED NOT NULL,
  language_id SMALLINT UNSIGNED NOT NULL,
  body MEDIUMTEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_translations_section_language (page_section_id, language_id),
  CONSTRAINT fk_translations_section FOREIGN KEY (page_section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
  CONSTRAINT fk_translations_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE content_revisions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  page_id BIGINT UNSIGNED NOT NULL,
  snapshot_json JSON NOT NULL COMMENT 'Full page+sections snapshot at this revision, for safe rollback',
  status ENUM('draft', 'review', 'approved', 'published') NOT NULL,
  authored_by_user_id BIGINT UNSIGNED NULL,
  approved_by_user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_revisions_page (page_id),
  CONSTRAINT fk_revisions_page FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
  CONSTRAINT fk_revisions_author FOREIGN KEY (authored_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_revisions_approver FOREIGN KEY (approved_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE media_assets (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  public_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  country_id SMALLINT UNSIGNED NULL,
  event_id BIGINT UNSIGNED NULL,
  media_type ENUM('image', 'video') NOT NULL,
  storage_path VARCHAR(500) NOT NULL COMMENT 'Private storage key/path — never a raw public upload URL',
  caption VARCHAR(500) NULL,
  alt_text VARCHAR(500) NULL,
  credit VARCHAR(255) NULL,
  rights_status ENUM('pending', 'cleared') NOT NULL DEFAULT 'pending',
  uploaded_by_user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_media_public_id (public_id),
  KEY idx_media_country (country_id),
  KEY idx_media_event (event_id),
  CONSTRAINT fk_media_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
  CONSTRAINT fk_media_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
  CONSTRAINT fk_media_uploader FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE media_approvals (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  media_asset_id BIGINT UNSIGNED NOT NULL,
  approval_status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  reviewed_by_user_id BIGINT UNSIGNED NULL,
  reviewed_at TIMESTAMP NULL,
  notes VARCHAR(500) NULL,
  UNIQUE KEY uq_mediaapprovals_asset (media_asset_id),
  CONSTRAINT fk_mediaapprovals_asset FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
  CONSTRAINT fk_mediaapprovals_reviewer FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE navigation_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  parent_id BIGINT UNSIGNED NULL,
  label_key VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  KEY idx_navigation_parent (parent_id),
  CONSTRAINT fk_navigation_parent FOREIGN KEY (parent_id) REFERENCES navigation_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
