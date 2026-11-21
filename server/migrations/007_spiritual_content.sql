CREATE TABLE gita_chapters (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY COMMENT 'Chapter number, 1-18',
  sanskrit_title VARCHAR(255) NOT NULL,
  transliteration VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_te VARCHAR(255) NOT NULL,
  verse_count SMALLINT UNSIGNED NOT NULL,
  theme_en VARCHAR(500) NOT NULL,
  theme_hi VARCHAR(500) NOT NULL,
  theme_te VARCHAR(500) NOT NULL,
  CONSTRAINT chk_chapters_range CHECK (id BETWEEN 1 AND 18)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE scripture_sources (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  rights_status ENUM('public_domain', 'licensed', 'pending') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Only verses approved by a Scripture Reviewer may carry published translations. No automated
-- process may insert or alter Sanskrit text here — see src/services/verseService.ts.
CREATE TABLE gita_verses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  chapter_id TINYINT UNSIGNED NOT NULL,
  verse_number SMALLINT UNSIGNED NOT NULL,
  sanskrit_text TEXT NOT NULL,
  transliteration TEXT NULL,
  source_id SMALLINT UNSIGNED NOT NULL,
  approved_by_user_id BIGINT UNSIGNED NULL,
  approved_at TIMESTAMP NULL,
  publication_status ENUM('draft', 'review', 'approved', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_verses_chapter_number (chapter_id, verse_number),
  CONSTRAINT fk_verses_chapter FOREIGN KEY (chapter_id) REFERENCES gita_chapters(id) ON DELETE RESTRICT,
  CONSTRAINT fk_verses_source FOREIGN KEY (source_id) REFERENCES scripture_sources(id) ON DELETE RESTRICT,
  CONSTRAINT fk_verses_approver FOREIGN KEY (approved_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE verse_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  verse_id BIGINT UNSIGNED NOT NULL,
  language_id SMALLINT UNSIGNED NOT NULL,
  translation_text TEXT NOT NULL,
  attribution VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_verse_translation_language (verse_id, language_id),
  CONSTRAINT fk_translations_verse FOREIGN KEY (verse_id) REFERENCES gita_verses(id) ON DELETE CASCADE,
  CONSTRAINT fk_versetranslations_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE verse_audio (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  verse_id BIGINT UNSIGNED NOT NULL,
  language_id SMALLINT UNSIGNED NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  rights_status ENUM('pending', 'licensed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_verseaudio_verse (verse_id),
  CONSTRAINT fk_verseaudio_verse FOREIGN KEY (verse_id) REFERENCES gita_verses(id) ON DELETE CASCADE,
  CONSTRAINT fk_verseaudio_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
