import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Step 3: Suspense + Server Components",
	description:
		"The end goal — push data fetching into async Server Components for independent, component-level streaming.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/suspense-rsc">
				<Tabs defaultValue="demo" className="mt-8 rounded-lg bg-muted p-2">
					<TabsList>
						<TabsTrigger value="demo">demo</TabsTrigger>
						<TabsTrigger value="page">page.tsx</TabsTrigger>
						<TabsTrigger value="component">WeatherRSC.tsx</TabsTrigger>
					</TabsList>
					<TabsContent value="demo">
						<Frame
							src="/demos/fetching/suspense-rsc"
							hint="Notice static content renders instantly, each widget streams in independently"
						/>
					</TabsContent>
					<TabsContent value="page">
						<CodeBlock>
							{`\`\`\`tsx
import { Suspense } from "react";

// No async, no await — this page renders instantly
export default function Page() {
  return (
    <main>
      <h1>Dashboard</h1>

      <Suspense fallback={<WeatherSkeleton />}>
        <WeatherRSC />
      </Suspense>

      <Suspense fallback={<NewsSkeleton />}>
        <NewsRSC />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsRSC />
      </Suspense>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileRSC />
      </Suspense>
    </main>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
					<TabsContent value="component">
						<CodeBlock>
							{`\`\`\`tsx
// Each component fetches its own data
async function WeatherRSC() {
  const weather = await api("weather");

  return (
    <section>
      <h2>Weather ({weather.delay}ms)</h2>
      <p>{weather.condition}, {weather.temperature}</p>
    </section>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
				</Tabs>
			</PageHeader>

			<PageContent>
				<p className="text-muted-foreground text-sm">
					Step 3 of 3 · Data Fetching
				</p>

				<h1>Suspense + Server Components</h1>

				<p>
					This is the end goal. In{" "}
					<Link
						href="/fetching/page-default"
						className="underline hover:no-underline"
					>
						Step 1
					</Link>
					, all data fetching lived in the page — creating a single bottleneck.
					In{" "}
					<Link
						href="/fetching/suspense-page"
						className="underline hover:no-underline"
					>
						Step 2
					</Link>
					, we added a skeleton so users weren't staring at a blank screen. Now
					we eliminate the bottleneck entirely by moving data fetching into the
					components that actually use the data.
				</p>

				<h2>The Key Change</h2>

				<p>
					Instead of one async page that fetches everything, the page becomes a{" "}
					<strong>synchronous</strong> layout shell. Each data-dependent section
					becomes its own async Server Component, wrapped in its own{" "}
					<code>&lt;Suspense&gt;</code> boundary:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Before (Step 1–2): One component fetches everything
async function Page() {
  const [weather, news] = await Promise.all([...]);
  return <><Weather /><News /></>;
}

// After (Step 3): Each component fetches its own data
function Page() {
  return (
    <>
      <Suspense fallback={<WeatherSkeleton />}>
        <WeatherRSC />   {/* fetches weather */}
      </Suspense>
      <Suspense fallback={<NewsSkeleton />}>
        <NewsRSC />       {/* fetches news */}
      </Suspense>
    </>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h2>What Happens Now</h2>

				<p>Three things change compared to the previous steps:</p>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>The page renders instantly</strong> — No <code>async</code>,
						no <code>await</code>. The static shell (heading, grid layout, all
						four skeleton fallbacks) is sent to the browser in milliseconds.
					</li>
					<li>
						<strong>Fetches run in parallel automatically</strong> — React
						starts rendering all four async components concurrently. There's no{" "}
						<code>Promise.all</code> because the parallelism is implicit in the
						component tree.
					</li>
					<li>
						<strong>Each component streams independently</strong> — When weather
						responds in 750ms, the weather widget appears immediately — even if
						stats is still loading. Each Suspense boundary resolves on its own
						timeline.
					</li>
				</ul>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// What the user sees over time:
//
// 0ms    → Static shell + 4 skeletons
// 750ms  → Weather widget replaces its skeleton
// 900ms  → Profile widget replaces its skeleton
// 1200ms → News widget replaces its skeleton
// 1800ms → Stats widget replaces its skeleton (slowest API)
\`\`\`
`}
				</CodeBlock>

				<blockquote data-level="success">
					<strong>Compare this to Step 1</strong>
					<p className="mt-2">
						In Step 1, users saw nothing for 1800ms. Now they see the page
						layout immediately, the first real content at 750ms, and everything
						fills in progressively. Same data, same APIs — fundamentally better
						UX.
					</p>
				</blockquote>

				<h2>Why This Works</h2>

				<p>
					The insight is that{" "}
					<strong>fetching moves to where data is used</strong>. Instead of one
					component knowing about all four APIs, each component is
					self-contained: it fetches what it needs and renders the result. The
					page component becomes a pure layout concern.
				</p>

				<p>
					This also means React can start sending HTML to the browser before any
					data arrives. The static parts of your page — headings, navigation,
					grid structure, skeleton fallbacks — are all sent immediately. Dynamic
					content streams in as it resolves.
				</p>

				<h2>The Self-Suspending Pattern</h2>

				<p>
					You can go one step further and encapsulate the Suspense boundary
					inside the component itself. This way, consumers don't need to
					remember to wrap it:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// The inner component fetches and renders
async function WeatherInner() {
  const weather = await api("weather");
  return <WeatherDisplay {...weather} />;
}

// The export handles its own loading state
export default function Weather() {
  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherInner />
    </Suspense>
  );
}

// Usage — no Suspense needed at the call site
<Weather />
\`\`\`
`}
				</CodeBlock>

				<h2>Placement Matters</h2>

				<p>
					The lower in the component tree you fetch data, the more of your page
					can render statically and immediately:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// ❌ Fetching high — blocks everything below
async function Parent() {
  const data = await getData();
  return <Child data={data} />;
}

// ✅ Fetching at the leaf — only blocks what needs the data
function Parent() {
  return (
    <Suspense fallback={<Loading />}>
      <Child />  {/* Fetches its own data */}
    </Suspense>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>One Suspense per data source</strong> — Wrap each async
						component separately so they stream independently. Don't group
						unrelated data behind one boundary.
					</li>
					<li>
						<strong>Design meaningful skeletons</strong> — Each fallback should
						match the component's layout to minimize layout shift when content
						swaps in.
					</li>
					<li>
						<strong>Group related content</strong> — If two pieces of data
						always load together and are displayed together, they can share a
						Suspense boundary.
					</li>
					<li>
						<strong>Add error boundaries</strong> — Wrap Suspense boundaries
						with error handling so a failed fetch doesn't take down the whole
						page.{" "}
						<Link
							href="/fetching/error-case"
							className="underline hover:no-underline"
						>
							Learn about error handling
						</Link>
					</li>
				</ul>

				<blockquote data-level="info">
					<strong>PPR-ready</strong>
					<p className="mt-2">
						This pattern is the foundation for Partial Prerendering (PPR). The
						static shell can be prerendered at build time, while dynamic
						components stream in at request time — all in a single HTTP
						response.
					</p>
				</blockquote>

				<h2>Recap</h2>

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
									<Link
										href="/fetching/page-default"
										className="underline hover:no-underline"
									>
										1. Page-Level
									</Link>
								</td>
								<td className="px-2 py-3">Blocked</td>
								<td className="px-2 py-3">All at once</td>
								<td className="px-2 py-3">Slowest API</td>
							</tr>
							<tr className="border-b">
								<td className="py-3 pr-4 font-medium text-foreground">
									<Link
										href="/fetching/suspense-page"
										className="underline hover:no-underline"
									>
										2. loading.tsx
									</Link>
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

				<p>
					The progression is straightforward:{" "}
					<strong>
						move data fetching closer to where it's consumed and let Suspense
						handle the loading states
					</strong>
					. Your page becomes a thin layout shell, and each component takes
					responsibility for its own data.
				</p>

				<blockquote data-level="success">
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							Making the page synchronous and pushing data fetching into child
							async Server Components lets the static shell render immediately.
						</li>
						<li>
							Each <code>&lt;Suspense&gt;</code> boundary is an independent
							streaming point — components resolve on their own timeline without
							blocking each other.
						</li>
						<li>
							Parallelism is implicit: React starts rendering all sibling async
							components concurrently without needing <code>Promise.all</code>.
						</li>
						<li>
							The self-suspending pattern (wrapping the inner async component in
							Suspense at the export) makes components drop-in ready without
							requiring consumers to add boundaries.
						</li>
						<li>
							This architecture is the foundation for Partial Prerendering
							(PPR), where the static shell is prerendered at build time and
							dynamic components stream in at request time.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-between border-t pt-6">
					<Link
						href="/fetching/suspense-page"
						className="text-muted-foreground underline hover:no-underline"
					>
						← Step 2: Adding loading.tsx
					</Link>
					<Link
						href="/fetching/error-case"
						className="font-semibold underline hover:no-underline"
					>
						Bonus: Error Handling →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
