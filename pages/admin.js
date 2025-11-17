// pages/admin.js
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (u) => fetch(u).then(r => r.json());

export default function Admin() {
  const { data, mutate } = useSWR('/api/feeds', fetcher);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);

  async function addFeed(e) {
    e.preventDefault();
    setBusy(true);
    await fetch('/api/feeds', { 
      method: 'POST', 
      headers: { 'Content-Type':'application/json' }, 
      body: JSON.stringify({ url }) 
    });
    setUrl('');
    mutate();
    setBusy(false);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto glass card">
        <h2 className="text-2xl font-semibold mb-4">Admin — add RSS feed</h2>

        <form onSubmit={addFeed} className="flex gap-2">
          <input 
            value={url} 
            onChange={(e)=>setUrl(e.target.value)} 
            placeholder="https://example.com/feed.xml" 
            className="flex-1 p-2 rounded-md bg-transparent border border-white/10"
          />
          
          <button 
            className="px-4 py-2 rounded-md bg-white/6" 
            disabled={busy}
          >
            {busy ? 'Adding...' : 'Add'}
          </button>
        </form>

        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-medium">Configured feeds</h3>

          {data?.feeds?.length ? (
            data.feeds.map(f => (
              <div key={f.id} className="p-2 rounded-md bg-white/2">
                {f.title || '(no title)'} — {f.url}
              </div>
            ))
          ) : (
            <div className="opacity-80">No feeds yet</div>
          )}
        </div>

      </div>
    </main>
  );
}
