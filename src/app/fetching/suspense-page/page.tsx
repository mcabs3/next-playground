import { DataDisplay } from "@/app/_components/data-display";
import { RenderSupportList } from "@/app/_components/render-support";
import { CodeBlock } from "@/components/code-block";
import { getData, getDataLonger } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Suspense with loading.tsx",
};

export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <main>
      <h2>
        Suspense with <em className="text-[length:inherit]">loading.tsx</em>
      </h2>

      <p>
        This <code>Page.tsx</code> mimics the same behavior as{" "}
        <Link
          className="underline hover:no-underline"
          href="/fetching/page-default"
        >
          Fetching on a Page
        </Link>{" "}
        with the inclusion of a <code>loading.tsx</code> file in the same
        directory as the page.
      </p>

      <CodeBlock className="my-8 font-mono">
        {`\`\`\`typescript
export default async function Page({ params }: PageProps<"/fetching/suspense-page">) {
  const [data, otherData] = await Promise.all([getData(), getDataLonger()]);

  return (
    <div>
      {/* page content that uses data and otherData */}
    </div>
  );
}
\`\`\`
`}
      </CodeBlock>

      <CodeBlock>
        {`\`\`\`typescript
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
        
export default function Loading() {
  return (
    <LoadingSkeleton rows={10}>
      <h1>app/fetching/suspense-page/loading.tsx</h1>
      Using <code>loading.tsx</code>. No page content is displaying
    </LoadingSkeleton>
  );
}
\`\`\`
`}
      </CodeBlock>

      <blockquote data-level="warning">
        Partial prerendering will technically work. However, since the data
        fetching is at the page level, it will block the rest of the page from
        its render. This effectively negates the benefits of PPR for this page.
      </blockquote>

      <p>
        This page relies on <code>src/app/loading.tsx</code> to perform two
        tasks. It will inject a <code>&lt;Suspense&gt;</code> boundary around
        the page, and it will include the exported component as the{" "}
        <em>fallback</em> to display while the inner component (the page) is
        fetching its data.
      </p>

      <p>
        The benefit is the users are given immediate feedback while the{" "}
        <em>Page</em> is completing its data fetching. The drawback is your
        entire page is still dependent on having all of it's data to render for
        the user. To improve further, we should make our data fetching more
        constrained to the UI that needs it by using{" "}
        <Link
          href="/fetching/suspense-rsc"
          className="underline hover:no-underline"
        >
          Suspense and child Server Components
        </Link>{" "}
        or{" "}
        <Link
          href="/fetching/suspense-use"
          className="underline hover:no-underline"
        >
          Suspense and the <code>use</code> hook
        </Link>
        .
      </p>

      <section className="grid lg:grid-cols-2 gap-2">
        <DataDisplay title="Data" data={data} />
        <DataDisplay title="More Data" data={dataLonger} />
      </section>
    </main>
  );
}
