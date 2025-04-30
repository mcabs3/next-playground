import { RenderSupportList } from "@/app/_components/render-support";
import { getData, getDataLonger } from "@/lib/data";

export const dynamic = "force-dynamic";
export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <div>
      <h2>
        Page with a co-located <code>loading.tsx</code>
      </h2>
      <RenderSupportList ssr isr ppr="partial" />
      <blockquote data-level="warning">
        Partial prerendering is supported, but because of the fetch at the page
        level, it will block the rest of the content from being sent, negating
        the benefits of PPR.
      </blockquote>
      <p>
        This page is the Server Component that also fetches the data. In the
        same folder as this <code>page.tsx</code> is a <code>loading.tsx</code>.
        This will show while the page RSC fetches the data. The good is that the
        navigation is felt and immediate, but the downside is you cannot show
        anything about the page until this content is fetched.
      </p>
      <p>
        The drawback is that there is some static content on this page (and
        layout). So while we are able to get the main layout to render and see
        that we have navigated. We still cannot show any of the page content
        until the page has fully fetched the data.
      </p>

      <h3>Data (2 seconds)</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h3>Data Longer (5 seconds)</h3>
      <pre>{JSON.stringify(dataLonger, null, 2)}</pre>
    </div>
  );
}
