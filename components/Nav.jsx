export default function Nav({ onSearch }) {
  return (
    <header className="py-4 mb-6 page-container flex items-center justify-between">
      <h1 className="text-2xl font-bold text-cyan-300">Newsly</h1>

      <input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search news..."
        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm w-56"
      />
    </header>
  );
}
