import { DataDisplay } from "@/app/_components/data-display";
import { RenderSupportList } from "@/app/_components/render-support";
import { CodeBlock } from "@/components/code-block";
import { getData, getDataLonger } from "@/lib/data";
import { code } from "@streamdown/code";
import Link from "next/link";
import { Streamdown } from "streamdown";

export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <div>
      <RenderSupportList ssr isr ppr="partial" />

      <h2>Fetching at the Page RSC</h2>

      <blockquote data-level="warning">
        Partial prerendering is supported for this page. However, because the
        data fetching is at the page level, it will block the rest of the page
        from its render. This effectively negates the benefits of PPR for a
        page.
      </blockquote>

      <CodeBlock>{`
\`\`\`jsx
export default async function Page({ params }: { params: any }) {
  const data = await getData();
  const dataLonger = await getDataLonger();

  return (
    <div>
      {/* page content that uses data and dataLonger */}
    </div>
  );
}
\`\`\`
`}</CodeBlock>

      <section className="grid lg:grid-cols-2 gap-2 pb-8">
        <DataDisplay title="Data" data={data} />
        <DataDisplay title="More Data" data={dataLonger} />
      </section>

      <p>
        It is common to use the <code>Page.tsx</code> as the entry point to
        fetch and compute all of the content for the page using RSC before
        rendering the page. This page is an <code>async</code> Server Component
        that fetches two "dummy" pieces of data.
      </p>
      <p>
        What is important to note is there is now an implied <b>boundary</b> at
        the page-level because we must wait for the data to be fetched before
        proceeding with the page. This means the page is entirely blocked from
        displaying any content, which &quot;is not fast&quot;. While we are able
        to get the root layout to render and see that we have navigated, we
        still cannot show any of the page content until data has been fully
        fetched.
      </p>

      <blockquote data-level="info">
        <div className="not-italic font-bold text-lg pb-2">Key Takeaways</div>
        <ul className="list-disc list-inside space-y-4">
          <li>
            You can optimize your data fetching with utilities such as{" "}
            <code>Promise.all</code>, but <b>boundary</b> blocking still
            applies. Your <code>Page</code> cannot render until the promises
            resolve. The recommended approach is to move data fetching to a
            child RSC to move the <b>boundary</b> lower in the page tree.{" "}
            <Link
              className="underline hover:no-underline not-italic"
              href="/fetching/suspense-rsc"
            >
              Learn more Suspense + RSC
            </Link>
          </li>

          <li>
            By default, the <code>Page</code> will appear to &quot;hang&quot; 👎
            as it waits for the data to load. You should avoid this by
            introducing a page-level <code>loading.tsx</code> to provide
            immediate feedback to users while data is loading.{" "}
            <Link
              className="underline hover:no-underline not-italic"
              href="/fetching/suspense-page"
            >
              Learn more about loading.tsx
            </Link>
          </li>

          <li>
            Using <code>params</code> in the <code>Page.tsx</code> requires the
            page to be an async component. Instead it is preferred to pass the
            params to child components that consume the params.{" "}
            <Link
              className="underline hover:no-underline not-italic"
              href="/fetching/suspense-rsc"
            >
              Take a look at using params with Suspense + RSC
            </Link>
          </li>
        </ul>
      </blockquote>
    </div>
  );
}
