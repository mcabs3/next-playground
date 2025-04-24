import Link from "next/link";
import DataComponent from "./_components/async-data-component";
import DataLongerComponent from "./_components/async-data-longer-component";

export default function Page() {
  return (
    <div>
      <h1>
        <code>Suspense</code> + RSC
      </h1>
      <blockquote>
        This page fetches data and will be SSR, but is optimized for PPR.
      </blockquote>

      <p>
        Just like the concepts behind{" "}
        <Link href="/data-fetching/page-loading">Page with Loading.tsx</Link>.
        You can leverage React Server Components with <code>Suspense</code> to
        provide component-level states to create non-blocking rendering. This
        allows the "static" parts of the page render, and allow the child RSC to
        fetch the data independently (still on the server).
      </p>
      <blockquote data-level="success">
        You see content immediately (the header, the paragraph, and THIS). This
        means the user can see more of the experience while the dynamic parts of
        your application complete their computations and stream in upon
        completion.
      </blockquote>
      <h2>Data (2 seconds)</h2>
      <DataComponent />
      <h2>Data Longer (5 seconds)</h2>
      <DataLongerComponent />
    </div>
  );
}
