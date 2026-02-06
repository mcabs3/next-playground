import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { ReferenceLink } from "@/app/_components/reference-link";
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
			<PageHeader segment="~/rendering/isr/with-dynamic-api" />

			<PageContent>
				<p className="text-muted-foreground text-sm">
					ISR + Dynamic APIs · Rendering
				</p>

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
					This page demonstrates a real-world scenario: you want a page to be
					static, but somewhere in the component tree a{" "}
					<ReferenceLink reference="DynamicAPI" text="dynamic API" /> is being
					called. Maybe it's your code, maybe it's a library — either way, that
					call to <code>headers()</code> or <code>cookies()</code> would
					normally opt the entire route into{" "}
					<Link href="/rendering/ssr" className="underline hover:no-underline">
						SSR
					</Link>
					.
				</p>

				<p>
					The fix is two route config exports working together:{" "}
					<code>export const dynamic = "force-static"</code> tells Next.js to
					treat the route as static regardless of dynamic API usage, and{" "}
					<code>export const revalidate = 10</code> ensures the cached page
					refreshes every 10 seconds via{" "}
					<Link href="/rendering/isr" className="underline hover:no-underline">
						ISR
					</Link>
					.
				</p>

				<h2>What Happens Under the Hood</h2>

				<p>
					The <code>&lt;RSC /&gt;</code> component rendered below calls both{" "}
					<code>await headers()</code> and <code>await cookies()</code>. Without{" "}
					<code>force-static</code>, these calls would make the route dynamic —
					every request would trigger a full server render. With{" "}
					<code>force-static</code> enabled, those APIs are silently{" "}
					<strong>nullified</strong>: they return empty <code>Headers</code> and
					empty <code>cookies</code> objects instead of real request data.
				</p>

				<p>
					The result is a page that renders statically at build time (or on
					first request), caches the output, and regenerates every 10 seconds.
					The header and cookie lists below will always be empty — that's the
					expected behavior, not a bug.
				</p>

				<RSC />

				<h2>When This Pattern Is Useful</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Library code calls dynamic APIs</strong> — Some
						authentication or analytics libraries internally call{" "}
						<code>headers()</code> or <code>cookies()</code>. If you don't
						actually need that data for rendering, <code>force-static</code>{" "}
						lets you keep the page static.
					</li>
					<li>
						<strong>Gradual migration</strong> — When moving a codebase from SSR
						to static, <code>force-static</code> lets you flip routes one at a
						time without refactoring every component.
					</li>
					<li>
						<strong>Shared components</strong> — A component that reads headers
						in one route (where it needs them) might also be used in another
						route (where it doesn't). <code>force-static</code> handles the
						second case.
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Empty values, not errors</strong> — Dynamic APIs won't
						throw, but they won't return useful data either. Components must
						handle empty headers and cookies gracefully.
					</li>
					<li>
						<strong>Silent behavior change</strong> — It can be surprising when
						a component that works in one route (SSR) returns empty data in
						another (force-static). Document the intent clearly.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							<code>force-static</code> nullifies dynamic APIs — calls to{" "}
							<code>headers()</code> and <code>cookies()</code> return empty
							objects instead of triggering SSR.
						</li>
						<li>
							Headers and cookies return empty values, not errors. Components
							render normally but without any request-specific data.
						</li>
						<li>
							This pattern is especially useful when third-party libraries
							internally use dynamic APIs but your page doesn't actually depend
							on that data.
						</li>
						<li>
							Always verify that your components behave correctly with empty
							values — test the force-static route to confirm the output is
							acceptable.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-start border-t pt-6">
					<Link
						href="/rendering/isr/generate-static-params/1"
						className="text-muted-foreground underline hover:no-underline"
					>
						← generateStaticParams
					</Link>
				</div>
			</PageContent>
		</>
	);
}
