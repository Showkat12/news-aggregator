import NewsCard from "./NewsCard";

export default function NewsGrid({ items = [] }) {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
      {items.map((it, i) => (
        <NewsCard key={i} item={it} />
      ))}
    </section>
  );
}
