import Link from "next/link";

export default function NewsCard({ item }) {
  const date = item.pubDate
  ? new Date(item.pubDate).toLocaleDateString("en-US", { timeZone: "UTC" })
  : "";

  const thumb = item.thumbnail || item.image || null;

  const isInternal =
    typeof item.link === "string" && item.link.startsWith("/");

  const Title = (
    <h3 className="text-base font-semibold mb-2 leading-snug text-blue-50">
      {item.title}
    </h3>
  );

  return (
    <article className="card p-4 flex flex-col h-full">
      {thumb && (
        <div className="h-32 mb-3 rounded-lg overflow-hidden">
          <img
            src={thumb}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}

      <div className="flex-1">
        {isInternal ? (
          <Link href={item.link} className="block">
            {Title}
          </Link>
        ) : (
          <a href={item.link} className="block" target="_blank">
            {Title}
          </a>
        )}

        <p className="text-sm text-slate-300 line-clamp-3 mb-4">
          {item.contentSnippet || ""}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{date}</span>
        <a
          href={item.link}
          target="_blank"
          className="read-pill"
        >
          Read
        </a>
      </div>
    </article>
  );
}
