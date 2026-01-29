import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Data Fetching Patterns in Next.js",
	description:
		"An overview of data fetching patterns in Next.js including page-level fetching, Suspense with loading.tsx, Server Components, and React.use().",
};

function FetchingTile({
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
			<PageHeader segment="~/fetching" />

			<PageContent>
				<h1>Data Fetching Patterns</h1>

				<p>
					Next.js Server Components can fetch data directly using{" "}
					<code>async/await</code>. The key is choosing <em>where</em> to fetch
					and how to handle loading states for the best user experience.
				</p>

				<div className="my-8 grid gap-4 sm:grid-cols-2">
					<FetchingTile title="Page-Level Fetching" href="/fetching/page-default">
						Fetch all data at the page level. Simple but blocks the entire page.
					</FetchingTile>
					<FetchingTile title="Suspense + loading.tsx" href="/fetching/suspense-page">
						Add a loading skeleton while the page fetches data.
					</FetchingTile>
					<FetchingTile title="Suspense + Server Components" href="/fetching/suspense-rsc">
						Move fetching to child components for granular streaming.
					</FetchingTile>
					<FetchingTile title="Suspense + React.use()" href="/fetching/suspense-use">
						Start fetches early, unwrap in client components.
					</FetchingTile>
				</div>

				<h2>Choosing a Fetching Pattern</h2>

				<CodeBlock className="my-6" controls>
					{`\`\`\`mermaid
flowchart TD
    A[Data Fetching] --> B{Need loading<br/>feedback?}
    B -->|No| C[Page-Level Fetching]
    B -->|Yes| D{Where does<br/>data live?}
    D -->|All at page level| E[loading.tsx]
    D -->|In components| F{Component type?}
    F -->|Server Component| G[Suspense + RSC]
    F -->|Client Component| H[Suspense + use]
\`\`\`
`}
				</CodeBlock>

				<h2>Quick Comparison</h2>

				<div className="my-6 overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="border-b">
								<th className="py-3 pr-4 text-left font-semibold">Pattern</th>
								<th className="px-2 py-3 text-left font-semibold">Loading UX</th>
								<th className="px-2 py-3 text-left font-semibold">Streaming</th>
								<th className="px-2 py-3 text-left font-semibold">Complexity</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									Page-Level
								</td>
								<td className="px-2 py-3">Blocking</td>
								<td className="px-2 py-3">None</td>
								<td className="px-2 py-3">Lowest</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									loading.tsx
								</td>
								<td className="px-2 py-3">Page skeleton</td>
								<td className="px-2 py-3">Page-level</td>
								<td className="px-2 py-3">Low</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									Suspense + RSC
								</td>
								<td className="px-2 py-3">Component skeletons</td>
								<td className="px-2 py-3">Component-level</td>
								<td className="px-2 py-3">Medium</td>
							</tr>
							<tr>
								<td className="py-3 pr-4 font-medium text-foreground">
									Suspense + use()
								</td>
								<td className="px-2 py-3">Component skeletons</td>
								<td className="px-2 py-3">Component-level</td>
								<td className="px-2 py-3">Medium</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h2>The Streaming Advantage</h2>

				<p>
					React Server Components support <strong>streaming</strong>—sending HTML
					to the browser as it becomes ready. This means static parts of your page
					render immediately while dynamic parts "stream in" as their data
					resolves.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Static content renders immediately
<header>Welcome to the Dashboard</header>

// Each component streams in when its data is ready
<Suspense fallback={<UserCardSkeleton />}>
  <UserCard />  {/* Fetches user data */}
</Suspense>

<Suspense fallback={<StatsSkeleton />}>
  <StatsPanel />  {/* Fetches stats data */}
</Suspense>
\`\`\`
`}
				</CodeBlock>

				<h2>Key Principles</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fetch where you use</strong> - Colocate data fetching with
						the component that needs it. This enables streaming and simplifies
						data flow.
					</li>
					<li>
						<strong>Push fetching down the tree</strong> - The lower in the
						component tree you fetch, the more of your page can render statically
						and immediately.
					</li>
					<li>
						<strong>Use Suspense boundaries strategically</strong> - Wrap
						async components with Suspense to define loading states and streaming
						points.
					</li>
					<li>
						<strong>Parallel fetching with Promise.all</strong> - When fetching
						multiple independent resources, use <code>Promise.all()</code> to
						avoid waterfalls.
					</li>
				</ul>

				<blockquote>
					<strong>Start simple, optimize as needed</strong>
					<p className="mt-2">
						Page-level fetching with <code>loading.tsx</code> is often good
						enough. Move to component-level fetching when you have clear
						performance benefits—like a slow API call that shouldn't block
						faster content.
					</p>
				</blockquote>

				<h2>Error Handling</h2>

				<p>
					Data fetching can fail. Next.js provides{" "}
					<code>error.tsx</code> files to catch and handle errors at any level
					of your route tree.{" "}
					<Link
						href="/fetching/error-case"
						className="underline hover:no-underline"
					>
						Learn about error boundaries
					</Link>
				</p>
			</PageContent>
		</>
	);
}
