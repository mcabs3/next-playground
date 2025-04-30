import { DataDisplay } from "@/app/_components/data-display";
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
import { getData } from "@/lib/data";
import { Suspense } from "react";

async function AsyncDataComponent() {
  const data = await getData();
  return <DataDisplay data={data} />;
}

export default function DataComponent() {
  return (
    <Suspense
      fallback={
        <LoadingSkeleton>
          Loading <code>&lt;DataComponent /&gt;</code>
        </LoadingSkeleton>
      }
    >
      <AsyncDataComponent />
    </Suspense>
  );
}
