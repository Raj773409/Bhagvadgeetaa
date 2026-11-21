-- Donations are always separate from registrations: a donation never requires or blocks a registration.

CREATE TABLE donations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reference CHAR(14) NOT NULL,
  user_id BIGINT UNSIGNED NULL COMMENT 'NULL permitted — donations do not require an account',
  amount DECIMAL(12,2) NOT NULL COMMENT 'Decimal currency amount — never FLOAT',
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('pending', 'succeeded', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_donations_amount_positive CHECK (amount > 0),
  UNIQUE KEY uq_donations_reference (reference),
  KEY idx_donations_user (user_id),
  KEY idx_donations_status (status),
  CONSTRAINT fk_donations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE payment_orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(32) NOT NULL DEFAULT 'razorpay',
  provider_order_id VARCHAR(128) NOT NULL COMMENT 'Set only once a real gateway order is created server-side',
  amount DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_payment_orders_provider_order (provider, provider_order_id),
  KEY idx_payment_orders_donation (donation_id),
  CONSTRAINT fk_payment_orders_donation FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE payment_transactions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  payment_order_id BIGINT UNSIGNED NOT NULL,
  idempotency_key CHAR(64) NOT NULL COMMENT 'Guarantees a repeated webhook callback is processed exactly once',
  status ENUM('pending', 'succeeded', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  provider_signature_verified TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_transactions_idempotency (idempotency_key),
  KEY idx_transactions_order (payment_order_id),
  CONSTRAINT fk_transactions_order FOREIGN KEY (payment_order_id) REFERENCES payment_orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE payment_webhook_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  provider_event_id VARCHAR(191) NOT NULL,
  payload_signature_valid TINYINT(1) NOT NULL DEFAULT 0,
  received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL,
  UNIQUE KEY uq_webhook_provider_event (provider_event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Financial audit records are never hard-deleted; status transitions only.
CREATE TABLE receipts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT UNSIGNED NOT NULL,
  receipt_number VARCHAR(32) NOT NULL,
  issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pdf_url VARCHAR(500) NULL,
  UNIQUE KEY uq_receipts_number (receipt_number),
  UNIQUE KEY uq_receipts_donation (donation_id),
  CONSTRAINT fk_receipts_donation FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE refund_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT UNSIGNED NOT NULL,
  requested_by_user_id BIGINT UNSIGNED NULL,
  reason VARCHAR(500) NOT NULL,
  status ENUM('requested', 'approved', 'rejected', 'completed') NOT NULL DEFAULT 'requested',
  decided_by_user_id BIGINT UNSIGNED NULL,
  decided_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_refundrequests_donation (donation_id),
  CONSTRAINT fk_refundrequests_donation FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE RESTRICT,
  CONSTRAINT fk_refundrequests_requester FOREIGN KEY (requested_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_refundrequests_decider FOREIGN KEY (decided_by_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE refund_transactions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  refund_request_id BIGINT UNSIGNED NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  provider_refund_id VARCHAR(128) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_refundtx_request (refund_request_id),
  CONSTRAINT fk_refundtx_request FOREIGN KEY (refund_request_id) REFERENCES refund_requests(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
