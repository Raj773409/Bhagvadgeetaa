CREATE TABLE languages (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(8) NOT NULL COMMENT 'ISO 639-1 code, e.g. en, hi, te',
  name_en VARCHAR(100) NOT NULL,
  native_name VARCHAR(100) NOT NULL,
  script VARCHAR(64) NOT NULL,
  is_interface_language TINYINT(1) NOT NULL DEFAULT 0,
  is_scripture_language TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_languages_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE countries (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL,
  iso_code CHAR(2) NOT NULL,
  flag_emoji VARCHAR(16) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_hi VARCHAR(100) NOT NULL,
  name_te VARCHAR(100) NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  national_languages VARCHAR(255) NOT NULL,
  is_origin TINYINT(1) NOT NULL DEFAULT 0,
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_countries_slug (slug),
  UNIQUE KEY uq_countries_iso (iso_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE country_languages (
  country_id SMALLINT UNSIGNED NOT NULL,
  language_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (country_id, language_id),
  CONSTRAINT fk_countrylang_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  CONSTRAINT fk_countrylang_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Confirmed coordinators only; this table is expected to stay empty until real people are verified.
CREATE TABLE country_coordinators (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country_id SMALLINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  full_name VARCHAR(255) NOT NULL,
  role_title VARCHAR(160) NULL,
  email VARCHAR(255) NULL,
  verified_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_coordinators_country (country_id),
  CONSTRAINT fk_coordinators_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  CONSTRAINT fk_coordinators_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE country_programmes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country_id SMALLINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  scheduled_date DATE NULL,
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_programmes_country (country_id),
  CONSTRAINT fk_programmes_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE country_content (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country_id SMALLINT UNSIGNED NOT NULL,
  language_id SMALLINT UNSIGNED NOT NULL,
  intro_text TEXT NOT NULL,
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_country_content (country_id, language_id),
  CONSTRAINT fk_countrycontent_country FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  CONSTRAINT fk_countrycontent_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
