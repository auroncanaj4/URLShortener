CREATE DATABASE IF NOT EXISTS url_shortener;

USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code CHAR(6) NOT NULL UNIQUE,
    expires_at DATETIME NULL,
    click_count INT UNSIGNED DEFAULT 0 NOT NULL
);