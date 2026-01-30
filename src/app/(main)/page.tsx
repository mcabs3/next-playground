import { Frame } from "@/components/frame";
import { PageContent } from "../_components/page-content";
import { PageHeader } from "../_components/page-header";

export default function Home() {
	return (
		<>
			<PageHeader segment="~/">
				<Frame src="/demos" hint="mini demos will appear here" />
			</PageHeader>
			<PageContent>
				<h1>Next Concepts</h1>
				<p>
					This is a Next.js demo application created to showcase common patterns
					with the features available in Next.js
				</p>
			</PageContent>
		</>
	);
}
