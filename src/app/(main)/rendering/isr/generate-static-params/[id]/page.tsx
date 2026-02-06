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
				<p className="text-muted-foreground text-sm">
					generateStaticParams · Rendering
				</p>

				<h1>generateStaticParams</h1>

				<p>
					Dynamic routes like <code>/blog/[slug]</code> are powerful, but by
					default Next.js generates them on-demand — each new slug triggers a
					server render the first time it's visited. With{" "}
					<code>generateStaticParams</code>, you can tell Next.js exactly which
					parameter values exist so it pre-renders those pages at build time.
					The result: instant page loads for every known route, served straight
					from the CDN.
				</p>

				<p>
					This is particularly valuable for content-heavy sites — blogs, docs,
					product catalogs — where you know the full set of routes (or at least
					the high-traffic ones) ahead of time.
				</p>

				<h2>Defining Static Params</h2>

				<p>
					Export an async <code>generateStaticParams</code> function that
					returns an array of parameter objects. Next.js will call your page
					component once for each entry at build time:
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

				<h2>Controlling Unknown Params</h2>

				<p>
					What happens when someone visits a slug that wasn't in your{" "}
					<code>generateStaticParams</code> list? The <code>dynamicParams</code>{" "}
					export controls this:
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

				<p>
					With <code>dynamicParams = true</code> (the default), unknown slugs
					are generated on-demand and then cached — they behave like{" "}
					<Link href="/rendering/isr" className="underline hover:no-underline">
						ISR
					</Link>{" "}
					pages. With <code>dynamicParams = false</code>, any slug not in the
					list returns a 404. Use <code>false</code> for closed sets where
					invalid routes should never render.
				</p>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Instant page loads</strong> — Pre-generated pages are served
						directly from the CDN with zero server processing
					</li>
					<li>
						<strong>Reduced server load</strong> — Popular pages don't need
						on-demand rendering, reducing compute costs
					</li>
					<li>
						<strong>Predictable builds</strong> — Know exactly which pages will
						exist at deployment time
					</li>
					<li>
						<strong>Flexible fallback</strong> — Use <code>dynamicParams</code>{" "}
						to control whether unknown routes generate on-demand or return 404
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Build time scales with params</strong> — Generating
						thousands of pages increases build duration. Focus on high-traffic
						pages and let the long tail generate on-demand.
					</li>
					<li>
						<strong>Stale content</strong> — Pre-generated pages need{" "}
						<Link
							href="/rendering/isr"
							className="underline hover:no-underline"
						>
							ISR
						</Link>{" "}
						(via <code>revalidate</code>) or a redeploy to update
					</li>
					<li>
						<strong>No request-time data</strong> — Like{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							SSG
						</Link>
						, these pages can't use cookies or headers
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							<code>generateStaticParams</code> pre-renders known dynamic routes
							at build time, turning dynamic pages into instant-loading static
							assets.
						</li>
						<li>
							<code>dynamicParams</code> controls what happens with unknown
							route parameters — set it to <code>true</code> for on-demand
							generation or <code>false</code> for strict 404s.
						</li>
						<li>
							Combine with <code>revalidate</code> to keep pre-generated pages
							fresh without requiring a full rebuild.
						</li>
						<li>
							Focus on high-traffic pages for pre-generation — let long-tail
							content generate on-demand to keep build times manageable.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-between border-t pt-6">
					<Link
						href="/rendering/isr/force-static"
						className="text-muted-foreground underline hover:no-underline"
					>
						← force-static
					</Link>
					<Link
						href="/rendering/isr/with-dynamic-api"
						className="font-semibold underline hover:no-underline"
					>
						with-dynamic-api →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
