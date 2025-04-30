import { getData, getDataLonger } from "@/lib/data";
import DataComponent from "./_components/data-component";
import { Suspense } from "react";
import { RenderSupportList } from "@/app/_components/render-support";
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";

export default function Page() {
  const data = getData();
  const dataLonger = getDataLonger();
  return (
    <main>
      <h2>Using Suspense and React.use</h2>
      <RenderSupportList ssr isr ppr />
      <p>
        Using the <code>React.use</code> hook in a client component allows the
        promise to be created and initiated (a.k.a prefetching), serialized on
        the server and then streamed to the client for consumption. Using{" "}
        <code>Suspense</code> allows the fallback UI to show until the inner
        child component finishes deserializing the promise and its response,
        swapping the fallback for the rendered UI.
      </p>
      <blockquote data-level="success">
        <span>Pros:</span>
        <ul className="list-disc pl-4">
          <li>
            This pattern allows for initiating the promises earlier in the
            render tree to allow a prefetching pattern.
          </li>
          <li>
            The same <code>&lt;DataComponent /&gt;</code> component for both of
            the promises since the fetching the data is decoupled from the
            component.
          </li>
        </ul>
      </blockquote>
      <section className="relative border border-neutral-800 py-10 px-4 mt-16 grid lg:grid-cols-2 gap-8">
        <span className="px-4 rounded top-0 left-8 font-mono absolute inline-block bg-neutral-800 -translate-y-1/2">
          Data
        </span>
        <div>
          <h3>Data</h3>
          <Suspense
            fallback={
              <LoadingSkeleton>
                Loading <code>&lt;DataComponent /&gt;</code>
              </LoadingSkeleton>
            }
          >
            <DataComponent dataPromise={data} />
          </Suspense>
        </div>
        <div>
          <h3>More Data</h3>
          <Suspense
            fallback={
              <LoadingSkeleton>
                Loading <code>&lt;DataComponent /&gt;</code>
              </LoadingSkeleton>
            }
          >
            <DataComponent dataPromise={dataLonger} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
