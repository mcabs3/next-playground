import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Incremental Static Regeneration (ISR)",
	description:
		"Learn about Incremental Static Regeneration in Next.js - how to update static content without rebuilding your entire site.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/isr">
				<Frame src="/demos/isr" hint="This page revalidates every 10 seconds" />
			</PageHeader>

			<PageContent>
				<p className="text-muted-foreground text-sm">ISR · Rendering</p>

				<h1>Incremental Static Regeneration (ISR)</h1>

				<p>
					ISR is the middle ground between{" "}
					<Link href="/rendering/ssg" className="underline hover:no-underline">
						Static Site Generation
					</Link>{" "}
					and{" "}
					<Link href="/rendering/ssr" className="underline hover:no-underline">
						Server-Side Rendering
					</Link>
					. You get the performance of a fully static page — served instantly
					from a CDN — with the ability to update content automatically on a
					schedule. No full rebuild required.
				</p>

				<p>
					The mechanism is simple: export a <code>revalidate</code> value from
					your page and Next.js handles the rest. The page is generated once,
					served from cache for subsequent requests, and regenerated in the
					background once the revalidation window expires. This is the classic{" "}
					<strong>stale-while-revalidate</strong> pattern applied at the page
					level.
				</p>

				<h2>Time-Based Revalidation</h2>

				<p>
					The simplest form of ISR. Export a <code>revalidate</code> constant
					and Next.js will regenerate the page after that many seconds have
					elapsed since the last generation:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
\`\`\`
`}
				</CodeBlock>

				<p>
					The first visitor after the revalidation window expires still sees the
					stale page — they don't wait for regeneration. The regeneration
					happens in the background, and the <em>next</em> visitor sees the
					fresh content.
				</p>

				<h2>On-Demand Revalidation</h2>

				<p>
					Time-based revalidation works well for content that changes
					predictably, but sometimes you need to update immediately — for
					example, when a CMS publishes a new post or a user updates their
					profile. That's where on-demand revalidation comes in:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// On-demand revalidation with Server Actions
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updatePost(id: string) {
  await db.posts.update(id, data);
  
  // Revalidate specific path
  revalidatePath('/blog/' + id);
  
  // Or revalidate by cache tag
  revalidateTag('posts');
}
\`\`\`
`}
				</CodeBlock>

				<p>
					Use <code>revalidatePath()</code> when you know the exact URL. Use{" "}
					<code>revalidateTag()</code> when you want to invalidate all pages
					that depend on a particular data source — for example, every page
					tagged with <code>"posts"</code>.
				</p>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Static performance</strong> — Cached pages are served
						instantly from the CDN, identical to{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							SSG
						</Link>
					</li>
					<li>
						<strong>Fresh content without rebuilds</strong> — Pages update
						automatically without redeploying your application
					</li>
					<li>
						<strong>Reduced build times</strong> — Only regenerate the pages
						that need updates, not the entire site
					</li>
					<li>
						<strong>On-demand control</strong> — Trigger immediate updates via
						webhooks or Server Actions when content changes
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Stale content window</strong> — Users may see outdated
						content between revalidations. The first visitor after expiry
						triggers regeneration but still sees the old page.
					</li>
					<li>
						<strong>No request-time personalization</strong> — Like SSG, ISR
						pages cannot use <code>cookies()</code>, <code>headers()</code>, or{" "}
						<code>searchParams</code>. Use{" "}
						<Link
							href="/rendering/ssr"
							className="underline hover:no-underline"
						>
							SSR
						</Link>{" "}
						for personalized content.
					</li>
					<li>
						<strong>Cold start latency</strong> — The very first request (before
						any cached version exists) must generate the page on the server.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							Exporting <code>revalidate</code> from a page enables time-based
							ISR — the page regenerates in the background after the specified
							number of seconds.
						</li>
						<li>
							On-demand revalidation with <code>revalidateTag()</code> and{" "}
							<code>revalidatePath()</code> lets you trigger immediate updates
							without waiting for a timer.
						</li>
						<li>
							ISR follows the <strong>stale-while-revalidate</strong> pattern:
							serve stale content instantly, regenerate in the background, and
							swap on the next request.
						</li>
						<li>
							ISR pages cannot use request-time APIs like cookies or headers —
							every visitor sees the same cached content until the next
							revalidation.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-between border-t pt-6">
					<Link
						href="/rendering/ssr"
						className="text-muted-foreground underline hover:no-underline"
					>
						← Dynamic (SSR)
					</Link>
					<Link
						href="/rendering/isr/force-static"
						className="font-semibold underline hover:no-underline"
					>
						force-static →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
