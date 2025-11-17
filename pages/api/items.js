import db from '../../lib/db.js';

export default function handler(req, res) {
  const limit = Math.min(parseInt(req.query.limit || "50"), 200);

  const items = db.prepare(`
    SELECT items.*, feeds.url as feed_url, feeds.title as feed_title
    FROM items
    JOIN feeds ON items.feed_id = feeds.id
    ORDER BY
      CASE WHEN pubDate IS NULL THEN 1 ELSE 0 END,
      pubDate DESC,
      fetched_at DESC
    LIMIT ?
  `).all(limit);

  res.json({ ok: true, items });
}
