import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Rendering Strategies in Next.js",
	description:
		"A guided tour of rendering strategies in Next.js — from static generation to server-side rendering to incremental static regeneration.",
};

function RenderingTile({
	title,
	href,
	children,
	className,
	...props
}: { title: string } & ComponentProps<typeof Link>) {
	return (
		<Link
			aria-label={title}
			className={cn(
				"group block h-full rounded border p-4 transition-all hover:bg-muted",
				className,
			)}
			href={href}
			{...props}
		>
			<span className="inline-block font-semibold text-lg group-hover:underline">
				{title}
			</span>
			<p className="mt-1 text-muted-foreground text-sm leading-normal">
				{children}
			</p>
		</Link>
	);
}

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering" />

			<PageContent>
				<h1>Rendering Strategies</h1>

				<p>
					Next.js decides <em>when</em> to render your page — at build time, on
					every request, or somewhere in between. The strategy it picks (or the
					one you choose) determines how fast users see content, how fresh that
					content is, and how much your server works. This guide walks through
					each approach so you know exactly when to reach for which.
				</p>

				<blockquote>
					<strong>What we're building toward</strong>
					<p className="mt-2">
						By the end of this guide, you'll understand the three core rendering
						strategies — Static (SSG), Dynamic (SSR), and Incremental Static
						Regeneration (ISR) — when Next.js picks each one automatically, and
						how to opt in or out deliberately.
					</p>
				</blockquote>

				<h2>The Strategies</h2>

				<p>
					Each strategy answers the same question differently:{" "}
					<em>when should this page's HTML be generated?</em>
				</p>

				<div className="my-8 grid gap-4 sm:grid-cols-3">
					<RenderingTile title="Static (SSG)" href="/rendering/ssg">
						The default. Pre-rendered at build time. Fastest performance, zero
						runtime cost. Content stays the same until you redeploy.
					</RenderingTile>
					<RenderingTile title="Dynamic (SSR)" href="/rendering/ssr">
						Rendered on every request. Required when you need cookies, headers,
						or search params. Always fresh, higher TTFB.
					</RenderingTile>
					<RenderingTile title="Incremental (ISR)" href="/rendering/isr">
						The middle ground. Static pages that revalidate in the background —
						either on a timer or on demand.
					</RenderingTile>
				</div>

				<h2>Choosing a Rendering Strategy</h2>

				<CodeBlock className="my-6" controls>
					{`\`\`\`mermaid
flowchart TD
    A[Page] --> B{Needs request data?<br/>cookies/auth/headers}
    B -->|Yes| C[SSR or PPR]
    B -->|No| D{Content changes<br/>frequently?}
    D -->|Yes| E[ISR]
    D -->|No| F{Mix of static<br/>and dynamic?}
    F -->|Yes| G[PPR]
    F -->|No| H{Only changes<br/>on deploy?}
    H -->|Yes| I[SSG]
    H -->|No| J[ISR]
\`\`\`
`}
				</CodeBlock>

				<h2>Key Differences</h2>

				<div className="my-6 overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="border-b">
								<th className="py-3 pr-4 text-left font-semibold">Feature</th>
								<th className="px-2 py-3 text-left font-semibold">SSG</th>
								<th className="px-2 py-3 text-left font-semibold">ISR</th>
								<th className="px-2 py-3 text-left font-semibold">SSR</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									When rendered
								</td>
								<td className="px-2 py-3">Build</td>
								<td className="px-2 py-3">Build + Runtime</td>
								<td className="px-2 py-3">Runtime</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									Content freshness
								</td>
								<td className="px-2 py-3">Until redeploy</td>
								<td className="px-2 py-3">Configurable (Tags/Time)</td>
								<td className="px-2 py-3">Fresh</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									Cookies/Headers
								</td>
								<td className="px-2 py-3">No</td>
								<td className="px-2 py-3">No</td>
								<td className="px-2 py-3">Yes</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">TTFB</td>
								<td className="px-2 py-3">Fastest</td>
								<td className="px-2 py-3">Fast (cached)</td>
								<td className="px-2 py-3">Normal</td>
							</tr>
							<tr>
								<td className="py-3 pr-4 font-medium text-foreground">
									Server cost
								</td>
								<td className="px-2 py-3">Minimal</td>
								<td className="px-2 py-3">Low</td>
								<td className="px-2 py-3">Normal</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h2>Quick Reference</h2>

				<div className="my-6 overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="border-b">
								<th className="py-3 pr-4 text-left font-semibold">Use Case</th>
								<th className="px-2 py-3 text-center font-semibold">SSG</th>
								<th className="px-2 py-3 text-center font-semibold">ISR</th>
								<th className="px-2 py-3 text-center font-semibold">SSR</th>
								<th className="px-2 py-3 text-center font-semibold">PPR</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-3 pr-4">Marketing & landing pages</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center">○</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">Blog posts & documentation</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center">○</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">E-commerce product pages</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">User dashboards & accounts</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">Shopping cart & checkout</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">Search results with filters</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">News & CMS content</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4">User-generated content</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-yellow-600">◐</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
							</tr>
							<tr>
								<td className="py-3 pr-4">Personalized recommendations</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center">○</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
								<td className="px-2 py-3 text-center text-green-600">●</td>
							</tr>
						</tbody>
					</table>
					<p className="mt-2 text-muted-foreground text-xs">
						● Recommended &nbsp; ◐ Doable &nbsp; ○ Not optimal
					</p>
				</div>

				<h2>Key Principles</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Start static, add dynamism as needed</strong> — Next.js
						defaults to static rendering. Only opt into SSR when you need
						request-time data, or ISR when content updates periodically.
					</li>
					<li>
						<strong>Dynamic APIs are the trigger</strong> — Using{" "}
						<code>cookies()</code>, <code>headers()</code>,{" "}
						<code>searchParams</code>, or <code>connection()</code>{" "}
						automatically switches a page from static to dynamic.
					</li>
					<li>
						<strong>ISR is not a compromise — it's a feature</strong> — Static
						performance with configurable freshness. Use time-based revalidation
						or trigger updates on demand with <code>revalidatePath()</code> and{" "}
						<code>revalidateTag()</code>.
					</li>
					<li>
						<strong>Performance is the default</strong> — The fastest rendering
						strategy (SSG) is also the one Next.js picks when you do nothing
						special. Slower strategies require explicit opt-in.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							Next.js supports three core rendering strategies: Static (SSG),
							Dynamic (SSR), and Incremental Static Regeneration (ISR) — each
							answering <em>when</em> HTML is generated.
						</li>
						<li>
							<strong>SSG</strong> is the default and fastest — pages are built
							once and served from CDN with zero runtime cost.
						</li>
						<li>
							<strong>SSR</strong> renders on every request, giving you access
							to cookies, headers, and search params at the cost of higher TTFB.
						</li>
						<li>
							<strong>ISR</strong> bridges the gap — static performance with
							background revalidation, either time-based or on demand.
						</li>
					</ul>
				</blockquote>

				<p className="mt-8">
					Ready?{" "}
					<Link
						href="/rendering/ssg"
						className="font-semibold underline hover:no-underline"
					>
						Start with Static (SSG) →
					</Link>
				</p>
			</PageContent>
		</>
	);
}
