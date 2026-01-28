import type { Metadata } from "next";
import { DataDisplay } from "@/app/_components/data-display";
import { getData, getDataLonger } from "@/lib/data";
import Main from "../../_components/main";

export const metadata: Metadata = {
	title: "Suspense with loading.tsx",
};

export default async function Page() {
	const data = await getData();
	const dataLonger = await getDataLonger();
	return (
		<Main>
			<section className="grid grid-cols-2 gap-2">
				<DataDisplay title="Data" data={data} />
				<DataDisplay title="More Data" data={dataLonger} />
			</section>
		</Main>
	);
}
