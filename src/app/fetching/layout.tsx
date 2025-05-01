export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-16 pt-20 pb-10">
      <header>
        <span className="font-mono text-neutral-600 tracking-tight">
          ~/data-fetching
        </span>
        <h1>Data Fetching</h1>
      </header>
      {children}
      <footer className="pt-10">
        <span className="text-2xl pb-4 inline-block">Resources</span>
        <ul>
          <li>
            <a
              className="underline hover:no-underline"
              href="https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming"
            >
              Next.js - Streaming
            </a>
          </li>
          <li>
            <a
              className="underline hover:no-underline"
              href="https://react.dev/reference/react/Suspense"
            >
              React - Suspense
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
