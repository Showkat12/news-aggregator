// pages/index.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR(
    '/api/items?limit=100',
    fetcher,
    { refreshInterval: 1000 * 60 * 5 }
  );

  if (error) return <div className="p-8">Error loading data.</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto glass card">
        <h1 className="text-3xl font-semibold mb-4">News Aggregator</h1>

        <div className="space-y-4">
          {data.items.map((item) => (
            <article key={item.id} className="glass card flex flex-col p-4">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium"
              >
                {item.title}
              </a>

              <div className="text-sm opacity-80">
                {item.feed_title} — {item.pubDate}
              </div>

              <p className="mt-2 text-sm opacity-90">
                {item.contentSnippet || ''}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
