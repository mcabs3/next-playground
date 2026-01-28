import type { Metadata } from "next";
import DataComponent from "./_components/async-data-component";
import DataLongerComponent from "./_components/async-data-longer-component";
import Main from "../../_components/main";
import TitledSection from "@/app/_components/titled-section";

export const metadata: Metadata = {
	title: "Suspense with React Server Components",
};

export default function Page() {
	return (
		<Main>
			<h1>Static Header</h1>
			<TitledSection title="Data" className="grid gap-8 grid-cols-2">
				<div>
					<h3>Data</h3>
					<DataComponent />
				</div>
				<div>
					<h3>More Data</h3>
					<DataLongerComponent />
				</div>
			</TitledSection>
		</Main>
	);
}
