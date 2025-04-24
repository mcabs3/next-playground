import { getData, getDataLonger } from "@/lib/data";

export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <div>
      <h1>
        Page with a co-located <code>loading.tsx</code>
      </h1>
      <blockquote>This page fetches data, this will be SSR</blockquote>
      <p>
        This page is the Server Component that also fetches the data. In the
        same folder as this <code>page.tsx</code> is a <code>loading.tsx</code>.
        This will show while the page RSC fetches the data. The good is that the
        navigation is felt and immediate, but the downside is you cannot show
        anything about the page until this content is fetched.
      </p>
      <blockquote data-level="warning">
        The drawback is that there is some static content on this page (and
        layout). So while we are able to get the main layout to render and see
        that we have navigated. We still cannot show any of the page content
        until the page has fully fetched the data.
      </blockquote>

      <h2>Data (2 seconds)</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h2>Data Longer (5 seconds)</h2>
      <pre>{JSON.stringify(dataLonger, null, 2)}</pre>
    </div>
  );
}
