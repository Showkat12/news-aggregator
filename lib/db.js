import path from 'path';
import Database from 'better-sqlite3';
// Path to SQLite database file
const dbPath = path.join(process.cwd(), 'db', 'data.sqlite');

// Initialize database
const db = new Database(dbPath);

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS feeds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL UNIQUE,
  title TEXT,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feed_id INTEGER,
  title TEXT,
  link TEXT,
  pubDate TEXT,
  contentSnippet TEXT,
  guid TEXT UNIQUE,
  fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(feed_id) REFERENCES feeds(id)
);
`);

export default db;
