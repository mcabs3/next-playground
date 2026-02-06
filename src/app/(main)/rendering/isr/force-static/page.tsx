import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "force-static Route Option",
	description:
		"Learn how to use the force-static route option in Next.js to force static rendering even when dynamic APIs are used.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/isr/force-static">
				<Frame
					src="/demos/isr/force-static"
					hint="This page forces static rendering with revalidation"
				/>
			</PageHeader>

			<PageContent>
				<p className="text-muted-foreground text-sm">
					force-static · Rendering
				</p>

				<h1>
					ISR with <em>force-static</em>
				</h1>

				<p>
					Sometimes Next.js detects dynamic behavior in your route — an uncached
					fetch, a call to <code>cookies()</code>, or a library that internally
					reads headers — and automatically opts the page into{" "}
					<Link href="/rendering/ssr" className="underline hover:no-underline">
						SSR
					</Link>
					. If you know the page doesn't actually <em>need</em> per-request
					data, <code>force-static</code> lets you override that detection and
					keep the page static.
				</p>

				<p>
					Think of <code>force-static</code> as an escape hatch. It tells
					Next.js: "I understand this code <em>looks</em> dynamic, but I want
					you to treat it as static anyway." Combined with{" "}
					<code>revalidate</code>, this gives you{" "}
					<Link href="/rendering/isr" className="underline hover:no-underline">
						ISR
					</Link>{" "}
					behavior for pages that would otherwise render on every request.
				</p>

				<h2>Basic Usage</h2>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Force static rendering with 60-second revalidation
export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page() {
  // This fetch would normally trigger SSR,
  // but force-static makes it cache at build/revalidation time
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>What Happens to Dynamic APIs</h2>

				<p>
					This is the critical detail: <code>force-static</code> doesn't just
					skip dynamic detection — it actively <strong>silences</strong> dynamic
					APIs. Calls to <code>cookies()</code>, <code>headers()</code>, and{" "}
					<code>searchParams</code> won't throw errors, but they return empty
					values instead of real request data.
				</p>

				<blockquote data-level="warning">
					<strong>Dynamic APIs are silently ignored</strong>
					<p className="mt-2">
						When using <code>force-static</code>, calls to{" "}
						<code>cookies()</code>, <code>headers()</code>, and{" "}
						<code>searchParams</code> won't error — they simply return empty
						values. Make sure your page logic handles this correctly.
					</p>
				</blockquote>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Dynamic APIs return empty/default values with force-static
import { headers, cookies } from 'next/headers';

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page() {
  // headers() and cookies() return empty when force-static is used
  const headersList = await headers(); // Empty Headers
  const cookieStore = await cookies(); // Empty cookies
  
  return <div>Static content</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Override dynamic detection</strong> — Force caching for
						routes that Next.js would otherwise render dynamically
					</li>
					<li>
						<strong>ISR for complex fetches</strong> — Enable revalidation for
						pages with multiple or uncached data fetches
					</li>
					<li>
						<strong>Library compatibility</strong> — Keep pages static even when
						third-party code internally calls dynamic APIs
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Empty dynamic APIs</strong> — <code>cookies()</code> and{" "}
						<code>headers()</code> return empty values, not actual request data.
						Your page must handle this gracefully.
					</li>
					<li>
						<strong>No personalization</strong> — All users see the same cached
						content until the next revalidation
					</li>
					<li>
						<strong>searchParams unavailable</strong> — Query parameters cannot
						be accessed at render time
					</li>
					<li>
						<strong>Escape hatch, not default</strong> — Prefer restructuring
						your code to be naturally static. Use <code>force-static</code> only
						when that isn't feasible.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							<code>force-static</code> overrides Next.js's automatic dynamic
							detection and forces a route to render statically, even when it
							contains code that would normally trigger SSR.
						</li>
						<li>
							Dynamic APIs like <code>cookies()</code>, <code>headers()</code>,
							and <code>searchParams</code> return empty values under{" "}
							<code>force-static</code> — they don't error, but they don't
							return real request data either.
						</li>
						<li>
							Always pair <code>force-static</code> with <code>revalidate</code>{" "}
							— without it, the page only updates on redeploy.
						</li>
						<li>
							Treat <code>force-static</code> as an escape hatch, not a default
							strategy. Restructuring code to be naturally static is almost
							always the better long-term approach.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-between border-t pt-6">
					<Link
						href="/rendering/isr"
						className="text-muted-foreground underline hover:no-underline"
					>
						← ISR
					</Link>
					<Link
						href="/rendering/isr/generate-static-params/1"
						className="font-semibold underline hover:no-underline"
					>
						generateStaticParams →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
