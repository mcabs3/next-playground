import { Suspense } from "react";
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
import TitledSection from "@/app/_components/titled-section";
import { getData, getDataLonger } from "@/lib/data";
import DataComponent from "./_components/data-component";
import Main from "../../_components/main";

export default function Page() {
	const data = getData();
	const dataLonger = getDataLonger();
	return (
		<Main>
			<TitledSection title="Data" className="grid gap-8 lg:grid-cols-2">
				<div>
					<h3>Data</h3>
					<Suspense
						fallback={
							<LoadingSkeleton>
								Loading <code>&lt;DataComponent /&gt;</code>
							</LoadingSkeleton>
						}
					>
						<DataComponent dataPromise={data} />
					</Suspense>
				</div>
				<div>
					<h3>More Data</h3>
					<Suspense
						fallback={
							<LoadingSkeleton>
								Loading <code>&lt;DataComponent /&gt;</code>
							</LoadingSkeleton>
						}
					>
						<DataComponent dataPromise={dataLonger} />
					</Suspense>
				</div>
			</TitledSection>
		</Main>
	);
}
