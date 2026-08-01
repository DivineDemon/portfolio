-- Cloudflare D1 Database Schema for Portfolio Content
CREATE TABLE IF NOT EXISTS content (
  slug TEXT PRIMARY KEY,
  collection TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  date TEXT,
  author TEXT,
  type TEXT,
  client_company TEXT,
  role TEXT,
  domain TEXT,
  tags TEXT,
  metrics TEXT,
  reading_time TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_content_collection ON content(collection);
CREATE INDEX IF NOT EXISTS idx_content_date ON content(date DESC);
