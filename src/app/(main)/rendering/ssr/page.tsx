import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { RenderSupportList } from "@/app/_components/render-support";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Server-side Rendering (SSR)",
	description:
		"Learn about Server-side Rendering in Next.js - how to build dynamic, personalized pages that render fresh content on every request.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/ssr">
				<RenderSupportList ssr />
				<Frame
					src="/demos/ssr"
					hint="This page renders fresh content on every request"
				/>
			</PageHeader>

			<PageContent>
				<h1>Server-side Rendering (SSR)</h1>

				<p>
					SSR generates HTML on <strong>every request</strong>, providing fresh
					content and full access to request-time data like cookies, headers,
					and search params. Next.js automatically uses SSR when you access
					dynamic APIs.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Using cookies() opts into SSR automatically
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  return <div>Welcome, {session?.value}</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Dynamic APIs</h2>

				<p>
					Using any of these APIs automatically opts your page into SSR because
					they depend on request-time information:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
import { cookies, headers, connection } from 'next/headers';

// Access cookies
const cookieStore = await cookies();

// Access request headers
const headersList = await headers();

// Wait for connection (useful for streaming)
await connection();

// Access search params in page components
export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ query: string }> 
}) {
  const { query } = await searchParams;
  // ...
}
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Always fresh data</strong> - Content is generated on each
						request, never stale
					</li>
					<li>
						<strong>Full personalization</strong> - Access cookies, headers, and
						auth state to tailor content per user
					</li>
					<li>
						<strong>SEO friendly</strong> - Search engines receive complete,
						rendered HTML
					</li>
					<li>
						<strong>Request-time data</strong> - Use search params, geolocation,
						or any request-specific information
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Slower TTFB</strong> - Each request requires server
						processing, unlike cached{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							SSG
						</Link>{" "}
						pages
					</li>
					<li>
						<strong>Higher server costs</strong> - Every request consumes
						compute resources
					</li>
					<li>
						<strong>Scaling challenges</strong> - Traffic spikes require more
						server capacity
					</li>
				</ul>

				<blockquote data-level="info">
					<strong>Streaming with SSR</strong>
					<p className="mt-2">
						Combine SSR with <code>Suspense</code> to stream content
						progressively. Users see a loading state immediately while slower
						parts of the page render in the background.
					</p>
				</blockquote>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Only use when needed</strong> - Default to{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							static rendering
						</Link>{" "}
						and opt into SSR only for personalized content.
					</li>
					<li>
						<strong>Use Suspense for streaming</strong> - Wrap slow components
						in Suspense to show content progressively.
					</li>
					<li>
						<strong>Cache aggressively</strong> - Use{" "}
						<code>unstable_cache</code> or fetch caching for data that doesn't
						need to be per-request.
					</li>
					<li>
						<strong>Consider PPR</strong> - If only part of your page needs
						request data, Partial Prerendering can serve a static shell
						instantly.
					</li>
				</ul>

				<h2>Good Use Cases</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>User dashboards and account pages</li>
					<li>Personalized recommendations</li>
					<li>Shopping carts and checkout flows</li>
					<li>Search results with filters</li>
					<li>Any page requiring authentication state</li>
				</ul>
			</PageContent>
		</>
	);
}
