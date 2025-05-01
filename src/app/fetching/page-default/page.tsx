import { DataDisplay } from "@/app/_components/data-display";
import { RenderSupportList } from "@/app/_components/render-support";
import { getData, getDataLonger } from "@/lib/data";

export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <div>
      <h2>Fetching at the Page RSC</h2>
      <RenderSupportList ssr isr ppr="partial" />
      <blockquote data-level="severe">
        Partial prerendering is supported for this page. However, because the
        data fetching is at the page level, it will block the rest of the page
        from its render. This effectively negates the benefits of PPR for a
        page.
      </blockquote>
      <p>This page is an asyc Server Component that fetches the data. </p>
      <p>
        The drawback is here is there are two fetches that happen and each take
        time. The page be "blicked" and not render until both calls have
        resolved. While we are able to get the root layout to render and see
        that we have navigated, we still cannot show any of the page content
        until data has been fully fetched.
      </p>

      <blockquote>
        You can leverage optimizations like <code>Promise.all</code> but the
        blocking issue still applies.
      </blockquote>

      <section className="grid lg:grid-cols-2 gap-2">
        <DataDisplay title="Data" data={data} />
        <DataDisplay title="More Data" data={dataLonger} />
      </section>
    </div>
  );
}
