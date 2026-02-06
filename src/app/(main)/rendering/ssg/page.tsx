import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Static Site Generation (SSG)",
	description:
		"Learn about Static Site Generation in Next.js — the default rendering strategy that pre-renders pages at build time for the fastest possible performance.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/ssg">
				<Frame
					src="/demos/ssg"
					hint="This page was pre-rendered at build time"
				/>
			</PageHeader>

			<PageContent>
				<p className="text-muted-foreground text-sm">
					Static (SSG) · Rendering
				</p>

				<h1>Static Site Generation (SSG)</h1>

				<p>
					This is where every Next.js page starts. Static Site Generation is the{" "}
					<strong>default</strong> rendering strategy — you don't configure it,
					you don't opt into it, it just happens. When you build your app,
					Next.js pre-renders every page it can into HTML files that get cached
					and served instantly from a CDN. No server processing per request. No
					database queries at runtime. Just HTML.
				</p>

				<p>
					Any page that doesn't use dynamic APIs (<code>cookies()</code>,{" "}
					<code>headers()</code>, <code>searchParams</code>,{" "}
					<code>connection()</code>) and doesn't have uncached data fetching is
					automatically static. You get the fastest possible performance by
					doing nothing special.
				</p>

				<h2>What Makes a Page Static</h2>

				<p>
					The simplest static page is just a component that returns JSX. No
					async, no fetching, no dynamic APIs:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// This page is automatically static — no config needed
export default function AboutPage() {
  return <h1>About Us</h1>;
}
\`\`\`
`}
				</CodeBlock>

				<p>
					But static pages can also fetch data — as long as that data is
					available at build time. Use <code>generateStaticParams</code> to
					pre-render pages with dynamic route segments:
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
						<strong>Fastest performance</strong> — Pre-built HTML served
						directly from edge CDN with zero server processing.
					</li>
					<li>
						<strong>Excellent SEO</strong> — Complete HTML available immediately
						for search engine crawlers.
					</li>
					<li>
						<strong>Lower costs</strong> — No server compute per request; scales
						infinitely on CDN.
					</li>
					<li>
						<strong>High reliability</strong> — No runtime dependencies on
						databases or APIs. Your pages work even if your backend goes down.
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Content can become stale</strong> — Updates require a new
						build and deploy. Consider{" "}
						<Link
							href="/rendering/isr"
							className="underline hover:no-underline"
						>
							ISR
						</Link>{" "}
						if your content changes periodically.
					</li>
					<li>
						<strong>No personalization</strong> — Same HTML for every user.
						Personalized content must load client-side or use{" "}
						<Link
							href="/rendering/ssr"
							className="underline hover:no-underline"
						>
							SSR
						</Link>
						.
					</li>
					<li>
						<strong>Build time grows with pages</strong> — Large sites may need{" "}
						<code>generateStaticParams</code> to pre-render only popular pages
						and let others generate on demand.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							SSG is the <strong>default</strong> rendering strategy in Next.js
							— you get it for free without any configuration.
						</li>
						<li>
							Static pages have <strong>zero runtime cost</strong>. They're
							pre-built HTML files served directly from CDN.
						</li>
						<li>
							Content stays the same <strong>until you redeploy</strong>. If
							that's too stale, look at{" "}
							<Link
								href="/rendering/isr"
								className="underline hover:no-underline"
							>
								ISR
							</Link>{" "}
							for background revalidation.
						</li>
						<li>
							Using dynamic APIs like <code>cookies()</code>,{" "}
							<code>headers()</code>, <code>searchParams</code>, or{" "}
							<code>connection()</code> automatically opts your page out of
							static rendering and into{" "}
							<Link
								href="/rendering/ssr"
								className="underline hover:no-underline"
							>
								SSR
							</Link>
							.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-end border-t pt-6">
					<Link
						href="/rendering/ssr"
						className="font-semibold underline hover:no-underline"
					>
						Dynamic (SSR) →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
