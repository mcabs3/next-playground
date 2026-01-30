import type { Metadata } from "next";
import DataComponent from "./_components/async-data-component";
import DataLongerComponent from "./_components/async-data-longer-component";
import Main from "../../_components/main";

export const metadata: Metadata = {
	title: "Suspense with React Server Components",
};

export default function Page() {
	return (
		<Main>
			<h1>Header</h1>
			<div className="grid grid-cols-2 gap-8">
				<div>
					<h3>Data</h3>
					<DataComponent />
				</div>
				<div>
					<h3>More Data</h3>
					<DataLongerComponent />
				</div>
			</div>
		</Main>
	);
}
