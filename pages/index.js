import { useState, useMemo } from "react";
import Nav from "../components/Nav";
import NewsGrid from "../components/NewsGrid";

export default function Home({ initialItems }) {
  const [q, setQ] = useState("");

  // ensure we always work with an array
  const list = Array.isArray(initialItems) ? initialItems : (initialItems && initialItems.items) || [];

  const filtered = useMemo(() => {
    if (!q) return list;
    return list.filter((i) =>
      (i.title || "").toLowerCase().includes(q.toLowerCase())
    );
  }, [q, list]);

  return (
    <main>
      <Nav onSearch={setQ} />
      <NewsGrid items={filtered} />
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/items");
    if (!res.ok) {
      return { props: { initialItems: [] } };
    }
    const payload = await res.json();

    // payload might be an array (old shape) or an object { ok, items: [...] }
    const items = Array.isArray(payload) ? payload : payload.items || [];

    return { props: { initialItems: items } };
  } catch (err) {
    return { props: { initialItems: [] } };
  }
}
