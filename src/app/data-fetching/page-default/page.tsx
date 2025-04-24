import { getData, getDataLonger } from "@/lib/data";

export default async function Page() {
  const data = await getData();
  const dataLonger = await getDataLonger();
  return (
    <div>
      <h1>Page</h1>
      <blockquote>This page fetches data, this will be SSR</blockquote>
      <p>
        You will notice that the user had to wait 5 seconds (or more) while the
        data from both "fetch" calls where completed. Then the page was rendered
        and provided to the user. This is the most basic form of React Server
        Components where the page is doing the data fetching at the page levetl.
      </p>
      <blockquote data-level="severe">
        The major drawback to this is the blocking experience that will be seen
        when you link to this page. The route will not navigate until the data
        is fetched and the page is rendered. This is a poor user experience.
      </blockquote>
      <h2>Data (2 seconds)</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h2>Data Longer (5 seconds)</h2>
      <pre>{JSON.stringify(dataLonger, null, 2)}</pre>
    </div>
  );
}
