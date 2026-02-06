import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Step 1: Page-Level Fetching",
	description:
		"The starting point — fetch all data at the page level and understand the trade-offs before optimizing.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/page-default">
				<Tabs defaultValue="demo" className="mt-8 rounded-lg bg-muted p-2">
					<TabsList>
						<TabsTrigger value="demo">demo</TabsTrigger>
						<TabsTrigger value="page">page.tsx</TabsTrigger>
					</TabsList>
					<TabsContent value="demo">
						<Frame
							src="/demos/fetching/page-default"
							hint="Notice the page hangs while fetching data"
						/>
					</TabsContent>
					<TabsContent value="page">
						<CodeBlock>
							{`\`\`\`tsx
export default async function Page() {
  // All fetches run in parallel, but the page
  // is blocked until every one completes
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
				</Tabs>
			</PageHeader>

			<PageContent>
				<p className="text-muted-foreground text-sm">
					Step 1 of 3 · Data Fetching
				</p>

				<h1>Page-Level Fetching</h1>

				<p>
					This is where most Next.js pages start. You make your page component{" "}
					<code>async</code>, fetch everything at the top with{" "}
					<code>await</code>, and render the results below. It works — but
					there's a cost.
				</p>

				<h2>What Happens</h2>

				<p>
					When you <code>await</code> data at the page level, Next.js can't send{" "}
					<em>anything</em> to the browser until all promises resolve. The user
					sees a blank screen (or the previous page if navigating client-side)
					for the entire duration of your slowest API call.
				</p>

				<p>
					Even with <code>Promise.all</code> running the fetches in parallel,
					the page still blocks on the slowest one. If weather responds in 750ms
					but stats takes 1800ms, the user waits the full 1800ms before seeing
					any content at all.
				</p>

				<blockquote data-level="warning">
					<strong>The blank screen problem</strong>
					<p className="mt-2">
						Without a <code>loading.tsx</code> file, there is zero visual
						feedback while fetching. The page appears frozen. This is the single
						biggest UX issue with page-level fetching.
					</p>
				</blockquote>

				<h2>Sequential vs. Parallel</h2>

				<p>
					If you're fetching at the page level, at least make sure your fetches
					run in parallel. Sequential awaits are a common mistake:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// ❌ Sequential — total time is the SUM of all delays
const weather = await api("weather");  // waits 1200ms
const news = await api("news");        // then waits 900ms
// Total: ~2100ms

// ✅ Parallel — total time is the MAX delay
const [weather, news] = await Promise.all([
  api("weather"),   // both start
  api("news"),      // at the same time
]);
// Total: ~1200ms (the slower of the two)
\`\`\`
`}
				</CodeBlock>

				<h2>When This Is Acceptable</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fast APIs (&lt;100ms)</strong> — If your data arrives almost
						instantly, the blocking is imperceptible.
					</li>
					<li>
						<strong>Everything depends on the same data</strong> — If nothing on
						the page can render without the fetch result, there's no benefit to
						streaming.
					</li>
					<li>
						<strong>Paired with loading.tsx</strong> — Adding a loading state
						(our next step) makes the wait tolerable.
					</li>
				</ul>

				<h2>The Limitation</h2>

				<p>
					The core problem is that all the data fetching is concentrated in one
					place — the page component. This creates a single bottleneck: nothing
					renders until <em>everything</em> is ready. Even content that doesn't
					depend on the data (headers, navigation, layout) is held back.
				</p>

				<p>
					In{" "}
					<Link
						href="/fetching/suspense-page"
						className="font-semibold underline hover:no-underline"
					>
						Step 2
					</Link>
					, we'll fix the blank screen with a single file. In{" "}
					<Link
						href="/fetching/suspense-rsc"
						className="underline hover:no-underline"
					>
						Step 3
					</Link>
					, we'll eliminate the bottleneck entirely.
				</p>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							An <code>async</code> page with <code>await</code> blocks the
							entire response — nothing is sent to the browser until all data
							resolves.
						</li>
						<li>
							<code>Promise.all</code> runs fetches in parallel (total time =
							slowest call), but the page still blocks on the slowest one.
						</li>
						<li>
							Without a <code>loading.tsx</code>, users get zero visual feedback
							— the page appears frozen.
						</li>
						<li>
							Page-level fetching concentrates all data needs in one place,
							creating a single bottleneck that holds back even static content.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-end border-t pt-6">
					<Link
						href="/fetching/suspense-page"
						className="font-semibold underline hover:no-underline"
					>
						Step 2: Adding loading.tsx →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
