import db from '../../lib/db.js';
import { fetchAndStoreFeed } from '../../lib/rss.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const feeds = db.prepare('SELECT * FROM feeds ORDER BY added_at DESC').all();
    return res.json({ ok: true, feeds });
  }

  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url) return res.status(400).json({ ok: false, error: 'url required' });

    try {
      await fetchAndStoreFeed(url);
      const feeds = db.prepare('SELECT * FROM feeds ORDER BY added_at DESC').all();
      return res.json({ ok: true, feeds });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: e.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
