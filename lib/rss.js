// lib/rss.js
import Parser from "rss-parser";
import db from "./db.js";

const parser = new Parser({
  timeout: 10000,
});

/**
 * Fetch a single RSS feed and store into SQLite
 */
export async function fetchAndStoreFeed(feedUrl) {
  const feed = await parser.parseURL(feedUrl);

  // Insert feed (ignore duplicates)
  db.prepare(
    `INSERT OR IGNORE INTO feeds(url, title)
     VALUES(?, ?)`
  ).run(feedUrl, feed.title);

  // Get feed ID
  const feedRow = db
    .prepare(`SELECT id FROM feeds WHERE url = ?`)
    .get(feedUrl);

  // Prepare insert statement
  const insertItem = db.prepare(
    `INSERT OR IGNORE INTO items
     (feed_id, title, link, pubDate, contentSnippet, guid)
     VALUES(?, ?, ?, ?, ?, ?)`
  );

  // Insert every news item
  for (const item of feed.items || []) {
    const guid =
      item.guid || item.link || item.id || item.title?.substring(0, 50);

    insertItem.run(
      feedRow.id,
      item.title || null,
      item.link || null,
      item.pubDate || null,
      item.contentSnippet || item.content || null,
      guid
    );
  }

  return { ok: true };
}

/**
 * Fetch all feeds stored in database
 */
export async function fetchAllFeeds() {
  const feeds = db.prepare(`SELECT * FROM feeds`).all();

  for (const f of feeds) {
    try {
      await fetchAndStoreFeed(f.url);
    } catch (err) {
      console.error("Failed to fetch feed:", f.url, err.message);
    }
  }

  return { ok: true };
}
