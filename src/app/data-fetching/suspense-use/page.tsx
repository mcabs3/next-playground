import { getData, getDataLonger } from "@/lib/data";
import DataComponent from "./_components/async-data-component";
import { Suspense } from "react";

export default function Page() {
  const data = getData();
  const dataLonger = getDataLonger();
  return (
    <div>
      <h1>
        <code>Suspense</code> + <code>React.use</code>
      </h1>
      <blockquote>
        This page fetches data and will be SSR, but is optimized for PPR.
      </blockquote>
      <p>
        Using the <code>React.use</code> hook in a client component allows the
        promise to be created and initiated (a.k.a prefetching) and then
        consumed in the client component. Using <code>Suspense</code> allows the
        fallback UI to show until the inner child component accepts the finished
        promise and swaps the fallback for the rendered UI.
      </p>
      <blockquote data-level="success">
        This pattern allows for initiating the promises earlier in the render as
        a prefetching pattern.
      </blockquote>
      <blockquote data-level="success">
        You can leverage the same <code>&lt;DataComponent /&gt;</code> component
        for both of the promises since the fetching the data is decoupled from
        the component. But still allowing the static content of the tree to be
        rendered.
      </blockquote>
      <h2>Data (2 seconds)</h2>
      <Suspense
        fallback={
          <div>
            Loading <code>&lt;DataComponent /&gt;</code>
          </div>
        }
      >
        <DataComponent dataPromise={data} />
      </Suspense>
      <h2>Data Longer (5 seconds)</h2>
      <Suspense
        fallback={
          <div>
            Loading <code>&lt;DataComponent /&gt;</code>
          </div>
        }
      >
        <DataComponent dataPromise={dataLonger} />
      </Suspense>
    </div>
  );
}
