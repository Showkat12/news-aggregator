export default function NewsCard({ item }) {
  const date = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : "";
  const thumb = item.thumbnail || item.image || null;

  return (
    <article className="glass p-4 hover:scale-[1.02] transition-transform duration-150">

      {thumb && (
        <div className="h-32 w-full mb-3 rounded-xl overflow-hidden">
          <img src={thumb} className="w-full h-full object-cover" alt="" />
        </div>
      )}

      <a href={item.link} target="_blank" rel="noreferrer">
        <h3 className="text-lg font-semibold mb-2 hover:text-cyan-400">
          {item.title}
        </h3>
      </a>

      <p className="text-sm text-slate-300 line-clamp-3 mb-3">
        {item.contentSnippet || ""}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{date}</span>
        <span>{item.source || "Unknown"}</span>
      </div>
    </article>
  );
}
