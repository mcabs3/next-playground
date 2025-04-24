export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="flex flex-wrap gap-2 p-4 text-white border-b text-sm items-center bg-neutral-800">
        <span>Data Fetching:</span>
        <a
          className="border px-3 py-1 rounded-full"
          href="/data-fetching/page-default"
        >
          Page (default)
        </a>
        <a
          className="border px-3 py-1 rounded-full"
          href="/data-fetching/page-loading"
        >
          With Loading.tsx
        </a>
        <a
          className="border px-3 py-1 rounded-full"
          href="/data-fetching/suspense-rsc"
        >
          Suspense &amp; RSC
        </a>
        <a
          className="border px-3 py-1 rounded-full"
          href="/data-fetching/suspense-use"
        >
          Suspense &amp; React.use
        </a>
        <a
          className="border px-3 py-1 rounded-full"
          href="/data-fetching/error-case"
        >
          Error Case
        </a>
      </nav>
      <div className="p-4">{children}</div>
    </div>
  );
}
