import { DataDisplay } from "@/app/_components/data-display";
import { RenderSupportList } from "@/app/_components/render-support";
import { getData, getDataLonger } from "@/lib/data";

export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <div>
      <h2>
        Fetching at the Page with a <code>loading.tsx</code>
      </h2>
      <RenderSupportList ssr isr ppr="partial" />
      <blockquote data-level="warning">
        Partial prerendering will technically work. However, the page is async
        and waiting for data, so the PPR "static shell" will be at this
        page-level. The other downside is no content will be able to display
        until the data is fetched.{" "}
      </blockquote>
      <p>
        This page is the Server Component that also fetches the data. This
        relies on the <code>src/app/loading.tsx</code> component to provide a
        Suspense boundary for the app as a whole (global loading state).
      </p>
      <p>
        The drawback is that there is some static content on this page (and
        layout). So while we are able to get the main layout to render and see
        that we have navigated. We still cannot show any of the page content
        until the page has fully fetched the data.
      </p>
      <section className="grid lg:grid-cols-2 gap-2">
        <DataDisplay title="Data" data={data} />
        <DataDisplay title="More Data" data={dataLonger} />
      </section>
    </div>
  );
}
