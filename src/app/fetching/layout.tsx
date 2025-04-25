export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 pt-20 pb-10">
      <header>
        <span className="font-mono text-neutral-600 tracking-tight">
          ~/fetching
        </span>
        <h1>Fetching Patterns</h1>
      </header>
      {children}
    </div>
  );
}
