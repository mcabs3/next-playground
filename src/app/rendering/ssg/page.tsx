import TitledSection from "@/app/_components/titled-section";

export default function Page() {
	return (
		<TitledSection title="rendering/ssg/page.tsx" className="mt-10">
			<main>
				<h1>Static Site Generation</h1>
				<div className="space-y-4">
					<p>
						Static rendering in Next.js generates HTML at build time instead of
						for each request. This pre-rendered HTML is served from the edge,
						delivering blazing fast page loads to users worldwide. For pages
						without dynamic data fetching, static rendering is the default
						behavior in Next.js.
					</p>

					<h2 className="text-xl font-semibold mt-4">Key Benefits</h2>
					<ul className="list-disc pl-6 space-y-1">
						<li>
							<strong>Superior Performance</strong> - Faster Time to First Byte
							(TTFB) and First Contentful Paint (FCP)
						</li>
						<li>
							<strong>Enhanced SEO</strong> - Content is immediately available
							for search engine crawlers
						</li>
						<li>
							<strong>Reduced Server Load</strong> - No server rendering
							required for each request
						</li>
						<li>
							<strong>Better Reliability</strong> - Less dependency on database
							or API availability
						</li>
						<li>
							<strong>Global Distribution</strong> - Pages can be served from
							CDN edge nodes worldwide
						</li>
					</ul>

					<h2 className="text-xl font-semibold mt-4">Limitations</h2>
					<ul className="list-disc pl-6 space-y-1">
						<li>
							<strong>Content Freshness</strong> - Can become stale without
							revalidation strategies
						</li>
						<li>
							<strong>Personalization</strong> - Not suitable for highly
							user-specific content
						</li>
						<li>
							<strong>Build Times</strong> - Large sites may experience longer
							build processes
						</li>
					</ul>

					<p className="mt-4">
						To address these limitations, Next.js provides strategies like
						Incremental Static Regeneration (ISR) that enable static content
						updates after deployment, offering the best of both static and
						dynamic worlds.
					</p>

					<div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
						<h3 className="text-lg font-semibold text-yellow-800">
							Important Limitation
						</h3>
						<p className="text-yellow-700">
							Static rendering is incompatible with Next.js Dynamic APIs. You
							cannot use
							<code className="mx-1 px-1 py-0.5 bg-yellow-100 rounded text-sm font-mono">
								cookies()
							</code>
							,
							<code className="mx-1 px-1 py-0.5 bg-yellow-100 rounded text-sm font-mono">
								headers()
							</code>
							,
							<code className="mx-1 px-1 py-0.5 bg-yellow-100 rounded text-sm font-mono">
								searchParams
							</code>
							, or other request-specific data in statically rendered pages.
							Using these APIs will trigger dynamic rendering instead, as they
							depend on information only available at request time.
						</p>
					</div>
				</div>
			</main>
		</TitledSection>
	);
}
