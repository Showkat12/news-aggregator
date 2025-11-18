import ArticleCard from "./ArticleCard";

export default function NewsGrid({ items }) {
  // Normalize ANY input into a clean array
  const itemsArray = Array.isArray(items)
    ? items
    : (items && items.items) || [];

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {itemsArray.length === 0 ? (
        <p className="col-span-full text-center text-gray-400">
          No articles found.
        </p>
      ) : (
        itemsArray.map((item) => (
          <ArticleCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}
