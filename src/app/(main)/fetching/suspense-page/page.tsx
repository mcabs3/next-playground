import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Step 2: Adding loading.tsx",
	description:
		"Fix the blank screen problem with a single file — loading.tsx gives users instant feedback while data fetches.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/suspense-page">
				<Tabs defaultValue="demo" className="mt-8 rounded-lg bg-muted p-2">
					<TabsList>
						<TabsTrigger value="demo">demo</TabsTrigger>
						<TabsTrigger value="page">page.tsx</TabsTrigger>
						<TabsTrigger value="loading">loading.tsx</TabsTrigger>
					</TabsList>
					<TabsContent value="demo">
						<Frame
							src="/demos/fetching/suspense-page"
							hint="Watch the loading skeleton appear instantly"
						/>
					</TabsContent>
					<TabsContent value="page">
						<CodeBlock>
							{`\`\`\`tsx
// page.tsx — exactly the same as Step 1
export default async function Page() {
  const [weather, news, stats, profile] = await Promise.all([
    api("weather"),
    api("news"),
    api("stats"),
    api("profile"),
  ]);

  return (
    <main>
      <Weather {...weather} />
      <News {...news} />
      <Stats {...stats} />
      <Profile {...profile} />
    </main>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
					<TabsContent value="loading">
						<CodeBlock>
							{`\`\`\`tsx
// loading.tsx — this is the only new file
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-muted rounded" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </div>
    </div>
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
					Step 2 of 3 · Data Fetching
				</p>

				<h1>Adding loading.tsx</h1>

				<p>
					In{" "}
					<Link
						href="/fetching/page-default"
						className="underline hover:no-underline"
					>
						Step 1
					</Link>
					, the page blocked with no visual feedback. The fix is remarkably
					simple: add a <code>loading.tsx</code> file next to your{" "}
					<code>page.tsx</code>. That's it — one file, zero changes to your page
					component.
				</p>

				<h2>What Changes</h2>

				<p>
					The page code stays <strong>exactly the same</strong> as Step 1. The
					only difference is a new <code>loading.tsx</code> file in the same
					directory. When Next.js sees this file, it automatically wraps your
					page in a <code>&lt;Suspense&gt;</code> boundary:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// What Next.js does behind the scenes:
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
\`\`\`
`}
				</CodeBlock>

				<p>
					Now users see the skeleton immediately while the page fetches data on
					the server. The blank screen is gone.
				</p>

				<h2>What Improved</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Instant feedback</strong> — Users see a loading skeleton
						within milliseconds instead of staring at a blank page.
					</li>
					<li>
						<strong>Zero changes to page.tsx</strong> — The fetching logic is
						untouched. You added one file and the UX improved significantly.
					</li>
					<li>
						<strong>Streaming enabled</strong> — The skeleton is sent to the
						browser immediately. When the data resolves, the real content
						replaces it in a single swap.
					</li>
				</ul>

				<h2>What's Still Missing</h2>

				<p>
					This is a big improvement over Step 1, but there's a catch:{" "}
					<code>loading.tsx</code> is <strong>all-or-nothing</strong>. The
					entire skeleton stays on screen until <em>every</em> API call
					completes. If weather responds in 750ms but stats takes 1800ms, the
					user waits the full 1800ms before seeing <em>anything</em> real.
				</p>

				<p>
					The skeleton can't show partial content. It can't reveal the weather
					widget while stats is still loading. It's a single Suspense boundary
					around the entire page — one fallback, one reveal.
				</p>

				<blockquote>
					<strong>The all-or-nothing problem</strong>
					<p className="mt-2">
						With <code>loading.tsx</code>, fast API responses are bottlenecked
						by slow ones. The user could be seeing real content, but instead
						they're watching a skeleton wait for the slowest data source.
					</p>
				</blockquote>

				<h2>When loading.tsx Is Enough</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>All APIs respond at similar speeds</strong> — If there's no
						significant difference between your fastest and slowest data
						sources, partial streaming won't matter.
					</li>
					<li>
						<strong>Simple pages</strong> — A page with one or two data sources
						doesn't benefit much from granular loading states.
					</li>
					<li>
						<strong>Good enough for now</strong> — This pattern is a solid
						default. Optimize further only when the UX demands it.
					</li>
				</ul>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Match your skeleton to your layout</strong> — A good loading
						skeleton mirrors the actual page structure to reduce layout shift
						when content swaps in.
					</li>
					<li>
						<strong>Keep skeletons lightweight</strong> — Use simple shapes and
						CSS animations. A heavy skeleton defeats the purpose of instant
						feedback.
					</li>
					<li>
						<strong>Still use Promise.all</strong> — The loading skeleton
						doesn't change how your fetches run. Parallel fetching still
						matters.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							A <code>loading.tsx</code> file next to your page automatically
							wraps it in a <code>&lt;Suspense&gt;</code> boundary — no code
							changes to the page itself.
						</li>
						<li>
							Users see instant feedback (the skeleton) instead of a blank
							screen, which is a significant perceived performance improvement.
						</li>
						<li>
							The trade-off is all-or-nothing: the entire skeleton stays until{" "}
							<em>every</em> API call completes. Fast responses are bottlenecked
							by slow ones.
						</li>
						<li>
							This is often good enough — but when your page has data sources
							with very different response times, you need per-component
							streaming.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-between border-t pt-6">
					<Link
						href="/fetching/page-default"
						className="text-muted-foreground underline hover:no-underline"
					>
						← Step 1: Page-Level Fetching
					</Link>
					<Link
						href="/fetching/suspense-rsc"
						className="font-semibold underline hover:no-underline"
					>
						Step 3: Suspense + Server Components →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
