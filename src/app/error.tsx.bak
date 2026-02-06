"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="pt-20 pb-10 px-8">
      <h2>Something went wrong!</h2>
      <p>
        This is an error boundary. This is the <code>src/app/error.tsx</code>{" "}
        that catches errors that were uncaught in the rendering of a route.
      </p>
      <p>
        error.message is <code>{error.message}</code>
      </p>
      <div className="flex gap-2">
        <button onClick={() => reset()}>Try again</button>
        <Link href="/">Go Home</Link>
      </div>
    </main>
  );
}
