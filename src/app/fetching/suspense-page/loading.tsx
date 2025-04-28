import { LoadingSkeleton } from "@/app/_components/loading-skeleton";

export default function Loading() {
  return (
    <LoadingSkeleton rows={10}>
      Using <code>loading.tsx</code>. No page content is displaying
    </LoadingSkeleton>
  );
}
