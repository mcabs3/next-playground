import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { RenderSupportList } from "@/app/_components/render-support";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Static Site Generation (SSG)",
	description:
		"Learn about Static Site Generation in Next.js - how it works, when to use it, and best practices for building fast, SEO-friendly pages.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/ssg">
				<RenderSupportList ssg />
				<Frame
					src="/demos/ssg"
					hint="This page was pre-rendered at build time"
				/>
			</PageHeader>

			<PageContent>
				<h1>Static Site Generation (SSG)</h1>

				<p>
					Static Site Generation is the <strong>default</strong> rendering
					strategy in Next.js. Pages are pre-rendered at build time, producing
					HTML files that can be cached and served instantly from a CDN. Any
					page without dynamic APIs or uncached data fetching is automatically
					static.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// This page is automatically static
export default function AboutPage() {
  return <h1>About Us</h1>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Static Pages with Dynamic Data</h2>

				<p>
					Static pages can fetch data at build time. Use{" "}
					<code>generateStaticParams</code> to pre-render pages with dynamic
					route segments.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fastest performance</strong> - Pre-built HTML served
						directly from edge CDN with zero server processing
					</li>
					<li>
						<strong>Excellent SEO</strong> - Complete HTML available immediately
						for search engine crawlers
					</li>
					<li>
						<strong>Lower costs</strong> - No server compute per request; scales
						infinitely on CDN
					</li>
					<li>
						<strong>High reliability</strong> - No runtime dependencies on
						databases or APIs
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Content can become stale</strong> - Updates require a new
						build. Consider{" "}
						<Link
							href="/rendering/isr"
							className="underline hover:no-underline"
						>
							ISR
						</Link>{" "}
						for periodic updates.
					</li>
					<li>
						<strong>No personalization</strong> - Same HTML for all users.
						Personalized content must load client-side.
					</li>
					<li>
						<strong>Build time grows with pages</strong> - Large sites may need
						on-demand generation for less popular pages.
					</li>
				</ul>

				<blockquote data-level="warning">
					<strong>Dynamic APIs opt out of static rendering</strong>
					<p className="mt-2">
						Using <code>cookies()</code>, <code>headers()</code>,{" "}
						<code>searchParams</code>, or <code>connection()</code>{" "}
						automatically switches to{" "}
						<Link
							href="/rendering/ssr"
							className="underline hover:no-underline"
						>
							SSR
						</Link>
						.
					</p>
				</blockquote>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Start static</strong> - Let Next.js default to static and
						only add dynamic features when needed.
					</li>
					<li>
						<strong>Pre-render strategically</strong> - Generate popular pages
						at build time; let others render on-demand.
					</li>
					<li>
						<strong>Hydrate with client data</strong> - Load personalized or
						real-time data on the client after the static shell.
					</li>
					<li>
						<strong>Use ISR for semi-dynamic content</strong> - Content updating
						every few minutes or hours is a good fit for{" "}
						<Link
							href="/rendering/isr"
							className="underline hover:no-underline"
						>
							Incremental Static Regeneration
						</Link>
						.
					</li>
				</ul>

				<h2>Good Use Cases</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>Marketing and landing pages</li>
					<li>Blog posts and documentation</li>
					<li>Product catalogs and e-commerce listings</li>
					<li>Portfolio and showcase sites</li>
					<li>Help centers and FAQs</li>
				</ul>
			</PageContent>
		</>
	);
}
