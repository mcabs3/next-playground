import { getData } from "@/lib/data";
import { Suspense } from "react";

async function AsyncDataComponent() {
  const data = await getData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function DataComponent() {
  return (
    <Suspense
      fallback={
        <div>
          Loading <code>&lt;DataComponent /&gt;</code>
        </div>
      }
    >
      <AsyncDataComponent />
    </Suspense>
  );
}
