import { getDataLonger } from "@/lib/data";
import { Suspense } from "react";

async function AsyncDataComponent() {
  const data = await getDataLonger();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function DataLongerComponent() {
  return (
    <Suspense
      fallback={
        <div>
          Loading <code>&lt;DataComponentLonger /&gt;</code>
        </div>
      }
    >
      <AsyncDataComponent />
    </Suspense>
  );
}
