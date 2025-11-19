import { useState, useMemo } from "react";
import Nav from "../components/Nav";
import NewsGrid from "../components/NewsGrid";

export default function Home({ initialItems }) {
  const [q, setQ] = useState("");

  const list = Array.isArray(initialItems)
    ? initialItems
    : initialItems?.items || [];

  const filtered = useMemo(() => {
    if (!q) return list;
    return list.filter((i) =>
      (i.title || "").toLowerCase().includes(q.toLowerCase())
    );
  }, [q, list]);

  return (
    <main className="min-h-screen pt-4 pb-10">
      <Nav onSearch={setQ} />

      <div className="page-container">
        <NewsGrid items={filtered} />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const r = await fetch("http://localhost:3000/api/items");
    const payload = await r.json();

    const items = Array.isArray(payload) ? payload : payload.items || [];

    return { props: { initialItems: items } };
  } catch (err) {
    return { props: { initialItems: [] } };
  }
}
