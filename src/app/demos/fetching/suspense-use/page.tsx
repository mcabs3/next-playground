import { Suspense } from "react";
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
import TitledSection from "@/app/_components/titled-section";
import Main from "../../_components/main";
import { api } from "../../_lib/api";
import DataComponent from "./_components/data-component";

export default function Page() {
	const data = api("profile");
	const dataLonger = api("stats");
	return (
		<Main>
			<TitledSection title="Data" className="grid grid-cols-2 gap-8">
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
