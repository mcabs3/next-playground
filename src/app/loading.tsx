import { LoadingSkeleton } from "./_components/loading-skeleton";

export default function Loading() {
  return (
    <div className="grid place-items-center">
      <LoadingSkeleton rows={10}>
        <h1>src/app/loading</h1>
        Using <code>loading.tsx</code>. No page content is displaying
      </LoadingSkeleton>
    </div>
  );
}
