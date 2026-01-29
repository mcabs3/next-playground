import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Suspense with loading.tsx",
	description:
		"Learn how to use loading.tsx to provide immediate feedback while your page fetches data in Next.js.",
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
export default async function Page() {
  // Fetches block the page, but loading.tsx shows a fallback
  const [posts, stats] = await Promise.all([
    getPosts(),
    getStats()
  ]);

  return (
    <div>
      <PostList posts={posts} />
      <StatsPanel stats={stats} />
    </div>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
					<TabsContent value="loading">
						<CodeBlock>
							{`\`\`\`tsx
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
				<h1>Suspense with loading.tsx</h1>

				<p>
					Adding a <code>loading.tsx</code> file next to your{" "}
					<code>page.tsx</code> gives users immediate feedback while data
					fetches. Next.js automatically wraps your page in a Suspense boundary
					and uses the loading component as the fallback.
				</p>

				<h2>How It Works</h2>

				<p>
					When you create a <code>loading.tsx</code> file in the same directory
					as your page, Next.js does two things automatically:
				</p>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Injects a Suspense boundary</strong> - Your page is wrapped
						with <code>&lt;Suspense&gt;</code> automatically.
					</li>
					<li>
						<strong>Uses your component as the fallback</strong> - The exported
						component from <code>loading.tsx</code> displays while the page
						fetches data.
					</li>
				</ul>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// What Next.js does behind the scenes:
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Zero config streaming</strong> - No need to manually add
						Suspense boundaries or manage loading states.
					</li>
					<li>
						<strong>Instant feedback</strong> - Users see a loading skeleton
						immediately rather than a blank screen.
					</li>
					<li>
						<strong>Progressive enhancement</strong> - Easy upgrade from{" "}
						<Link
							href="/fetching/page-default"
							className="underline hover:no-underline"
						>
							page-level fetching
						</Link>
						—just add one file.
					</li>
				</ul>

				<h2>Limitations</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>All-or-nothing loading</strong> - The entire page shows a
						skeleton until all data is ready. You can't show partial content.
					</li>
					<li>
						<strong>Page-level granularity</strong> - If one slow API blocks the
						page, faster content waits too.
					</li>
				</ul>

				<blockquote>
					<strong>When to use loading.tsx</strong>
					<p className="mt-2">
						This pattern works well when your page fetches data that's roughly
						the same speed. For pages with mixed fast/slow data sources,
						consider{" "}
						<Link
							href="/fetching/suspense-rsc"
							className="underline hover:no-underline"
						>
							component-level Suspense
						</Link>{" "}
						instead.
					</p>
				</blockquote>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Match your skeleton to your layout</strong> - A good loading
						skeleton mirrors the actual page structure to reduce layout shift.
					</li>
					<li>
						<strong>Keep skeletons lightweight</strong> - Use simple shapes and
						animations. Heavy skeletons defeat the purpose.
					</li>
					<li>
						<strong>Use parallel fetching</strong> - With{" "}
						<code>Promise.all()</code>, your data fetches run in parallel so the
						page loads as fast as the slowest request.
					</li>
				</ul>

				<h2>Next Steps</h2>

				<p>
					For more granular control over loading states, explore{" "}
					<Link
						href="/fetching/suspense-rsc"
						className="underline hover:no-underline"
					>
						Suspense with Server Components
					</Link>{" "}
					or{" "}
					<Link
						href="/fetching/suspense-use"
						className="underline hover:no-underline"
					>
						Suspense with React.use()
					</Link>
					. These patterns let you show content progressively as each piece of
					data becomes available.
				</p>
			</PageContent>
		</>
	);
}
