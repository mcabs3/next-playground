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
		"An overview of the different rendering strategies supported by Next.js including SSG, SSR, ISR, and PPR.",
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
					Next.js supports multiple rendering strategies. Choose the right one
					based on your content's requirements for freshness, personalization,
					and performance.
				</p>

				<div className="my-8 grid gap-4 sm:grid-cols-2">
					<RenderingTile title="Static (SSG)" href="/rendering/ssg">
						Pre-rendered at build time. Fastest performance.
					</RenderingTile>
					<RenderingTile title="Dynamic (SSR)" href="/rendering/ssr">
						Rendered on each request. Always fresh.
					</RenderingTile>
					<RenderingTile title="Incremental (ISR)" href="/rendering/isr">
						Static with background revalidation.
					</RenderingTile>
					<RenderingTile title="Partial (PPR)" href="/rendering">
						Static shell with dynamic holes.
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

				<blockquote>
					<strong>Start with static, add dynamism as needed</strong>
					<p className="mt-2">
						Next.js defaults to static rendering. Only opt into SSR when you
						need request-time data, or ISR when content updates periodically.
						This approach gives you the best performance by default.
					</p>
				</blockquote>
			</PageContent>
		</>
	);
}
