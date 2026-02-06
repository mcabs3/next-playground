import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Optimizing Data Fetching in Next.js",
	description:
		"A step-by-step guide to improving data fetching in Next.js — from blocking page-level fetches to granular streaming with React Server Components.",
};

function StepCard({
	step,
	title,
	href,
	children,
	className,
	...props
}: { step: number; title: string } & ComponentProps<typeof Link>) {
	return (
		<Link
			aria-label={title}
			className={cn(
				"group relative block h-full rounded border p-4 pl-14 transition-all hover:bg-muted",
				className,
			)}
			href={href}
			{...props}
		>
			<span className="absolute top-4 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-foreground font-bold font-mono text-background text-xs">
				{step}
			</span>
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
				<h1>Optimizing Data Fetching</h1>

				<p>
					How you fetch data in your <code>page.tsx</code> determines whether
					users see content instantly or stare at a blank screen. This
					three-step guide walks through progressively better patterns, starting
					from the most common approach and ending with the architecture that
					delivers the fastest possible page loads.
				</p>

				<blockquote>
					<strong>What we're building toward</strong>
					<p className="mt-2">
						By the end of this guide, your page will render its static shell
						immediately, show individual loading skeletons for each data source,
						and stream content in progressively as each API responds — all
						without a single line of client-side JavaScript.
					</p>
				</blockquote>

				<h2>The Steps</h2>

				<p>
					Each step builds on the last. We start with a simple async page,
					identify its limitations, and solve them one at a time.
				</p>

				<div className="my-8 grid gap-4">
					<StepCard
						step={1}
						title="Page-Level Fetching"
						href="/fetching/page-default"
					>
						The starting point. Fetch all data at the top of your page with{" "}
						<code>await</code>. Simple, but the entire page blocks until every
						API responds — users see nothing while they wait.
					</StepCard>
					<StepCard
						step={2}
						title="Adding loading.tsx"
						href="/fetching/suspense-page"
					>
						One file fixes the blank screen. Add a <code>loading.tsx</code> next
						to your page and users see a skeleton immediately. But it's still
						all-or-nothing — the skeleton stays until <em>all</em> data arrives.
					</StepCard>
					<StepCard
						step={3}
						title="Suspense + Server Components"
						href="/fetching/suspense-rsc"
					>
						The end goal. Push data fetching into individual async Server
						Components, each wrapped in its own Suspense boundary. The static
						shell renders instantly and each component streams in independently
						as its data resolves.
					</StepCard>
				</div>

				<h2>The Scenario</h2>

				<p>
					Throughout these steps, we're optimizing the same page: a dashboard
					that loads four independent data sources — weather, news, stats, and a
					user profile. Each API takes between 750ms and 2000ms to respond.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// The API we'll use throughout — each call has a random delay
const weather = await api("weather");   // 750–2000ms
const news    = await api("news");      // 750–2000ms
const stats   = await api("stats");     // 750–2000ms
const profile = await api("profile");   // 750–2000ms
\`\`\`
`}
				</CodeBlock>

				<p>
					The question isn't <em>what</em> to fetch — it's <em>where</em> and{" "}
					<em>how</em> to structure the fetching so users see content as fast as
					possible.
				</p>

				<h2>What Changes at Each Step</h2>

				<div className="my-6 overflow-x-auto">
					<table className="w-full border-collapse text-sm">
						<thead>
							<tr className="border-b">
								<th className="py-3 pr-4 text-left font-semibold">Step</th>
								<th className="px-2 py-3 text-left font-semibold">
									First Paint
								</th>
								<th className="px-2 py-3 text-left font-semibold">
									First Content
								</th>
								<th className="px-2 py-3 text-left font-semibold">
									Full Content
								</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									1. Page-Level
								</td>
								<td className="px-2 py-3">Blocked</td>
								<td className="px-2 py-3">All at once</td>
								<td className="px-2 py-3">Slowest API</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									2. loading.tsx
								</td>
								<td className="px-2 py-3">Instant (skeleton)</td>
								<td className="px-2 py-3">All at once</td>
								<td className="px-2 py-3">Slowest API</td>
							</tr>
							<tr>
								<td className="py-3 pr-4 font-medium text-foreground">
									3. Suspense + RSC
								</td>
								<td className="px-2 py-3">Instant (shell)</td>
								<td className="px-2 py-3">Fastest API</td>
								<td className="px-2 py-3">Slowest API</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h2>Key Principles</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fetch where you use</strong> — Colocate data fetching with
						the component that needs it. This enables streaming and simplifies
						data flow.
					</li>
					<li>
						<strong>Push fetching down the tree</strong> — The lower in the
						component tree you fetch, the more of your page can render
						immediately.
					</li>
					<li>
						<strong>Use Suspense boundaries strategically</strong> — Each
						boundary is a streaming point. Wrap async components individually so
						they resolve independently.
					</li>
					<li>
						<strong>Parallel fetching with Promise.all</strong> — When fetching
						multiple resources at the same level, use <code>Promise.all()</code>{" "}
						to avoid sequential waterfalls.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							<strong>Where you fetch matters more than what you fetch</strong>{" "}
							— The same four API calls produce vastly different user
							experiences depending on where they live in the component tree.
						</li>
						<li>
							<strong>Optimization is incremental</strong> — You don't need to
							jump straight to the most advanced pattern. Each step is a
							meaningful improvement that builds on the last.
						</li>
						<li>
							<strong>Suspense is the enabling primitive</strong> — Every
							improvement in this guide relies on Suspense boundaries, whether
							implicit (via <code>loading.tsx</code>) or explicit (wrapping
							async components).
						</li>
						<li>
							<strong>Server Components make this possible</strong> — Async
							Server Components can fetch data directly and stream HTML to the
							browser. No client-side fetching, no loading spinners in
							JavaScript, no waterfalls.
						</li>
					</ul>
				</blockquote>

				<p className="mt-8">
					Ready?{" "}
					<Link
						href="/fetching/page-default"
						className="font-semibold underline hover:no-underline"
					>
						Start with Step 1 →
					</Link>
				</p>
			</PageContent>
		</>
	);
}
