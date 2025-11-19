// components/ArticleCard.jsx
import Link from "next/link";

export default function ArticleCard({ item }) {
  const title = item?.title || "Untitled";
  const snippet = item?.contentSnippet || "";
  const pubDate = item?.pubDate
  ? new Date(item.pubDate).toLocaleDateString("en-US", { timeZone: "UTC" })
  : "";

  const href = item?.link || "#";

  return (
    <article className="card flex flex-col h-full p-4 hover:scale-[1.02] transition-transform duration-150">
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2 mb-2 leading-snug">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300"
          >
            {title}
          </Link>
        </h3>

        <p className="text-xs text-slate-300 line-clamp-3">
          {snippet}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{pubDate}</span>

        {/* Read pill */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded-md border border-white/10 text-cyan-300 text-xs font-medium hover:bg-white/5"
        >
          Read
        </a>
      </div>
    </article>
  );
}
