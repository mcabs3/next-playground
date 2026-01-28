import type { Metadata } from "next";
import { DataDisplay } from "@/app/_components/data-display";
import { getData, getDataLonger } from "@/lib/data";
import Main from "../../_components/main";

export const metadata: Metadata = {
	title: "Fetching on the Page with RSC",
};

export default async function Page(
	_props: PageProps<"/fetching/page-default">,
) {
	const data = await getData();
	const dataLonger = await getDataLonger();
	return (
		<Main>
			<blockquote data-level="severe" className="w-full">
				Did you notice the lag? This page is blocked from the data fetching
				until all of the page data is fetched.
			</blockquote>

			<section className="grid grid-cols-2 gap-2 pb-8">
				<DataDisplay title="Data" data={data} />
				<DataDisplay title="Other Data" data={dataLonger} />
			</section>
		</Main>
	);
}
