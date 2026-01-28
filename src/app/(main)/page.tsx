import { RenderSupportList } from "@/app/_components/render-support";
import TitledSection from "@/app/_components/titled-section";
import { Browser } from "@/components/browser";

export default function Home() {
	return (
		<main className="px-8 pt-20 pb-10">
			<RenderSupportList ssg />

			<h1>Next Concepts</h1>
			<blockquote>
				This page fetches no content and can be built as static
			</blockquote>
			<TitledSection title="app/page.tsx">
				<Browser>
					<div className="px-4 pt-4">
						<p>
							This is a Next.js demo application created to showcase common
							patterns with the features available in Next.js
						</p>
					</div>
				</Browser>
			</TitledSection>
		</main>
	);
}
