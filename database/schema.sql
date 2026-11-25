CREATE DATABASE IF NOT EXISTS business_intelligence_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE business_intelligence_db;

CREATE TABLE IF NOT EXISTS datasets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dataset_name VARCHAR(180) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  total_rows INT NOT NULL DEFAULT 0,
  total_columns INT NOT NULL DEFAULT 0,
  upload_date DATETIME NOT NULL,
  dataset_status VARCHAR(30) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS import_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dataset_id INT NOT NULL,
  imported_rows INT NOT NULL DEFAULT 0,
  rejected_rows INT NOT NULL DEFAULT 0,
  duplicate_rows INT NOT NULL DEFAULT 0,
  import_status VARCHAR(30) NOT NULL,
  import_message TEXT,
  created_at DATETIME NOT NULL,
  CONSTRAINT fk_import_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE,
  INDEX idx_import_dataset_status (dataset_id, import_status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sales_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dataset_id INT NULL,
  order_id VARCHAR(64) NOT NULL,
  order_date DATE NOT NULL,
  customer_id VARCHAR(64) NOT NULL,
  customer_name VARCHAR(160) NOT NULL,
  product_id VARCHAR(64) NOT NULL,
  product_name VARCHAR(160) NOT NULL,
  category VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  discount_percentage DECIMAL(7,2) NOT NULL DEFAULT 0,
  unit_cost DECIMAL(12,2) NOT NULL,
  shipping_cost DECIMAL(12,2) NOT NULL DEFAULT 0,
  payment_method VARCHAR(60) NOT NULL,
  order_status VARCHAR(30) NOT NULL,
  created_at DATETIME NOT NULL,
  CONSTRAINT fk_sales_dataset FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE SET NULL,
  INDEX idx_sales_order (order_id),
  INDEX idx_sales_date (order_date),
  INDEX idx_sales_customer (customer_id),
  INDEX idx_sales_product (product_id),
  INDEX idx_sales_category (category),
  INDEX idx_sales_region (region),
  INDEX idx_sales_status (order_status),
  INDEX idx_sales_date_status (order_date, order_status)
) ENGINE=InnoDB;
