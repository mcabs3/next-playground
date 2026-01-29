import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { RenderSupportList } from "@/app/_components/render-support";
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
				<RenderSupportList isr />
				<Frame src="/demos/isr" hint="This page revalidates every 10 seconds" />
			</PageHeader>

			<PageContent>
				<h1>Incremental Static Regeneration (ISR)</h1>

				<p>
					ISR allows you to update static pages <strong>after</strong> they've
					been built, without rebuilding your entire site. Pages are generated
					on first request and cached, then regenerated in the background when
					the revalidation period expires.
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

				<h2>How ISR Works</h2>

				<p>
					When a user requests a page, Next.js serves the cached version
					immediately. If the revalidation period has passed, Next.js
					regenerates the page in the background. The next visitor sees the
					updated content.
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

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fresh content without rebuilds</strong> - Update pages
						automatically without redeploying
					</li>
					<li>
						<strong>Static performance</strong> - Cached pages served instantly
						from CDN, just like{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							SSG
						</Link>
					</li>
					<li>
						<strong>Reduced build times</strong> - Only regenerate pages that
						need updates, not the entire site
					</li>
					<li>
						<strong>On-demand revalidation</strong> - Trigger updates
						immediately when content changes via webhooks or Server Actions
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Stale content window</strong> - Users may see outdated
						content until revalidation completes
					</li>
					<li>
						<strong>First request latency</strong> - Initial request after cache
						expires may be slower while regenerating
					</li>
					<li>
						<strong>No request-time personalization</strong> - Like SSG, you
						can't use cookies or headers. Use{" "}
						<Link
							href="/rendering/ssr"
							className="underline hover:no-underline"
						>
							SSR
						</Link>{" "}
						or{" "}
						<a href="https://nextjs.org/docs/app/getting-started/cache-components">
							Cache Components
						</a>
						for personalized content.
					</li>
				</ul>

				<blockquote data-level="info">
					<strong>Time-based vs On-demand</strong>
					<p className="mt-2">
						Use <code>revalidate</code> for time-based updates (e.g., every 60
						seconds). Use <code>revalidatePath()</code> or{" "}
						<code>revalidateTag()</code> for on-demand updates triggered by
						content changes.
					</p>
				</blockquote>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Choose appropriate intervals</strong> - Match revalidation
						time to how often your content actually changes.
					</li>
					<li>
						<strong>Use cache tags</strong> - Tag related content to revalidate
						multiple pages at once.
					</li>
					<li>
						<strong>Combine with on-demand</strong> - Use time-based as a
						fallback, but trigger immediate updates for important changes.
					</li>
					<li>
						<strong>Consider PPR for mixed content</strong> - If only part of
						your page is dynamic, Partial Prerendering may be a better fit.
					</li>
				</ul>

				<h2>Good Use Cases</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>Blog posts and news articles updated by CMS</li>
					<li>Product pages with inventory or pricing updates</li>
					<li>User-generated content (reviews, comments)</li>
					<li>Dashboard summaries and analytics</li>
					<li>Any content that changes periodically but not per-request</li>
				</ul>
			</PageContent>
		</>
	);
}
