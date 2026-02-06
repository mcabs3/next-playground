import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "generateStaticParams",
	description:
		"Learn how to use generateStaticParams in Next.js to pre-render dynamic routes at build time for optimal performance.",
};

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<>
			<PageHeader segment="~/rendering/isr/generate-static-params/[id]">
				<Frame
					src={`/demos/isr/generate-static-params/${id}`}
					hint={`Viewing pre-generated page for ID: ${id}`}
				/>
			</PageHeader>

			<PageContent>
				<h1>generateStaticParams</h1>

				<p>
					The <code>generateStaticParams</code> function lets you pre-render
					dynamic routes at build time. Instead of generating pages on-demand,
					Next.js creates static HTML for each parameter combination you
					specify, delivering instant page loads.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Controlling Dynamic Params</h2>

				<p>
					The <code>dynamicParams</code> export controls what happens when a
					user visits a route that wasn't pre-generated:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Allow on-demand generation for non-pre-rendered params
export const dynamicParams = true; // default

// Return 404 for non-pre-rendered params
export const dynamicParams = false;
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Instant page loads</strong> - Pre-generated pages are served
						directly from CDN with zero server processing
					</li>
					<li>
						<strong>Reduced server load</strong> - Popular pages don't need
						on-demand rendering
					</li>
					<li>
						<strong>Predictable builds</strong> - Know exactly which pages exist
						at deployment time
					</li>
					<li>
						<strong>Flexible fallback</strong> - Use <code>dynamicParams</code>{" "}
						to control behavior for unknown routes
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Build time scales with params</strong> - Generating
						thousands of pages increases build duration
					</li>
					<li>
						<strong>Stale content</strong> - Pre-generated pages need{" "}
						<Link
							href="/rendering/isr"
							className="underline hover:no-underline"
						>
							ISR
						</Link>{" "}
						or redeployment to update
					</li>
					<li>
						<strong>No request-time data</strong> - Like{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							SSG
						</Link>
						, you can't use cookies or headers
					</li>
				</ul>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Pre-generate popular content</strong> - Focus on
						high-traffic pages; let long-tail content generate on-demand.
					</li>
					<li>
						<strong>Combine with ISR</strong> - Add <code>revalidate</code> to
						keep pre-generated pages fresh without rebuilding.
					</li>
					<li>
						<strong>Use dynamicParams wisely</strong> - Set to{" "}
						<code>false</code> for closed sets (like known product IDs) to
						return 404 for invalid routes.
					</li>
					<li>
						<strong>Fetch data efficiently</strong> - Batch API calls in{" "}
						<code>generateStaticParams</code> to minimize build-time requests.
					</li>
				</ul>

				<h2>Good Use Cases</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>Blog posts and documentation pages</li>
					<li>Product detail pages for popular items</li>
					<li>User profile pages for active users</li>
					<li>Category and tag archive pages</li>
					<li>Any route with a known, finite set of parameters</li>
				</ul>
			</PageContent>
		</>
	);
}
