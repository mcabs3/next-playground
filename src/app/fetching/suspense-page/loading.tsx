import { LoadingSkeleton } from "@/app/_components/loading-skeleton";

export default function Loading() {
  return (
    <LoadingSkeleton rows={10}>
      <h1>src/app/suspense-page/loading.tsx</h1>
      Using <code>loading.tsx</code>. No page content is displaying
    </LoadingSkeleton>
  );
}
