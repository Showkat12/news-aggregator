import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

// Store DB inside lib/data folder
const dbPath = path.join(process.cwd(), 'lib', 'data', 'data.sqlite');
const dbDir = path.dirname(dbPath);

// Make sure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath, {
  readonly: false,
  fileMustExist: false,
});

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
