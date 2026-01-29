import type { Metadata } from "next";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { ReferenceLink } from "@/app/_components/reference-link";
import { RenderSupportList } from "@/app/_components/render-support";
import { RSC } from "../../_components/rsc";

// Route override to revalidate the page every 10 seconds
export const revalidate = 10;
// Route override to force static rendering
export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "ISR with Dynamic APIs",
};

async function getCurrentTime(): Promise<string> {
	return new Promise((res) => {
		setTimeout(() => {
			res(new Date().toLocaleTimeString());
		}, 1000);
	});
}

export default async function Page() {
	const currentTime = await getCurrentTime();
	return (
		<>
			<PageHeader segment="~/rendering/isr/with-dynamic-api">
				<RenderSupportList isr />
			</PageHeader>

			<PageContent>
				<h1>
					Incremental Static Regeneration{" "}
					<span className="block text-neutral-300 text-xl">
						with Dynamic APIs
					</span>
				</h1>
				<blockquote>
					<i>This page was last created at: {currentTime}</i>
				</blockquote>
				<p>
					Incremental static regeneration (ISR) is the concept of a runtime
					generation of a page when the first request is made, and then caching
					it like a static page until the individial page busts and needs to be
					regenerated again. Busting that page can be done in multiple ways. ISR
					can be used when your data for a page does not rely on dynamic request
					data (headers or cookies).
				</p>
				<p>
					This page has a nested component which uses <code>headers()</code>.
					which opts the route into being a dynamic route (SSR).
					<code>export const dynamic = "force-static"</code> allows you to
					create a page override and force the page to be considered static.
				</p>
				<p>
					The React Server Component below uses <code>await headers()</code>{" "}
					which is a <ReferenceLink reference="DynamicAPI" text="dynamic api" />
					. When that will be considered empty when used in a route that
					leverages "force-static" route.
				</p>

				<RSC />
			</PageContent>
		</>
	);
}
