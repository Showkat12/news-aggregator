export default function Nav({ onSearch }) {
  return (
    <header className="sticky top-0 z-50 glass mx-auto max-w-6xl px-6 py-4 mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-cyan-400">Newsly</h1>

      <input
        onChange={(e)=>onSearch?.(e.target.value)}
        placeholder="Search news..."
        className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl 
                   focus:outline-none placeholder:text-slate-400 w-48 sm:w-64"
      />
    </header>
  );
}
