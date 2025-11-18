// components/ArticleCard.jsx
import Link from "next/link";

export default function ArticleCard({ item }) {
  // guard against missing fields
  const title = item?.title || "Untitled";
  const snippet = item?.contentSnippet || "";
  const pubDate = item?.pubDate ? new Date(item.pubDate).toLocaleString() : "";
  const href = item?.link || "#";

  return (
    <article className="flex flex-col h-full rounded-xl overflow-hidden bg-white/5 border border-white/6 p-4 shadow-sm">
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2 mb-2">
          <Link href={href}>
            <a target="_blank" rel="noopener noreferrer" className="hover:underline">
              {title}
            </a>
          </Link>
        </h3>
        <p className="text-xs text-gray-300 line-clamp-3">{snippet}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>{pubDate}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 text-indigo-400 hover:underline"
        >
          Read
        </a>
      </div>
    </article>
  );
}
