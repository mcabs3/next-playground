import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Suspense with Server Components",
	description:
		"Learn how to use Suspense with async Server Components for granular streaming in Next.js.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/suspense-rsc">
				<Tabs defaultValue="demo" className="mt-8 rounded-lg bg-muted p-2">
					<TabsList>
						<TabsTrigger value="demo">demo</TabsTrigger>
						<TabsTrigger value="page">page.tsx</TabsTrigger>
						<TabsTrigger value="component">UserCard.tsx</TabsTrigger>
					</TabsList>
					<TabsContent value="demo">
						<Frame
							src="/demos/fetching/suspense-rsc"
							hint="Notice static content renders instantly, data streams in"
						/>
					</TabsContent>
					<TabsContent value="page">
						<CodeBlock>
							{`\`\`\`tsx
import { Suspense } from "react";

export default function Page() {
  // This page renders immediately - no await!
  return (
    <div>
      <h1>Dashboard</h1>  {/* Renders instantly */}
      
      <Suspense fallback={<UserCardSkeleton />}>
        <UserCard />  {/* Streams in when ready */}
      </Suspense>
      
      <Suspense fallback={<StatsSkeleton />}>
        <StatsPanel />  {/* Streams independently */}
      </Suspense>
    </div>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
					<TabsContent value="component">
						<CodeBlock>
							{`\`\`\`tsx
// Async Server Component - fetches its own data
export async function UserCard() {
  const user = await getUser();  // Runs on the server
  
  return (
    <div className="rounded border p-4">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
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
				<h1>Suspense + Server Components</h1>

				<p>
					The most powerful data fetching pattern in Next.js: push data fetching
					into async Server Components and wrap them with Suspense. Static content
					renders immediately while dynamic parts stream in as their data resolves.
				</p>

				<h2>How It Works</h2>

				<p>
					Unlike{" "}
					<Link
						href="/fetching/page-default"
						className="underline hover:no-underline"
					>
						page-level fetching
					</Link>
					, this pattern keeps the page function synchronous. Data fetching moves
					into child components that are wrapped with Suspense boundaries:
				</p>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Page renders instantly</strong> - No await at the page level
						means the shell renders immediately.
					</li>
					<li>
						<strong>Components fetch their own data</strong> - Each async Server
						Component fetches exactly what it needs.
					</li>
					<li>
						<strong>Independent streaming</strong> - Each Suspense boundary streams
						its content as soon as its data is ready.
					</li>
				</ul>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Timeline of what the user sees:
// 1. Instant: Static shell (header, navigation, layout)
// 2. After 200ms: UserCard streams in (fast API)
// 3. After 800ms: StatsPanel streams in (slower API)
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fastest Time to First Byte</strong> - Static content is sent
						immediately without waiting for any data.
					</li>
					<li>
						<strong>Progressive rendering</strong> - Content appears as it becomes
						available. Fast APIs don't wait for slow ones.
					</li>
					<li>
						<strong>Colocated data fetching</strong> - Each component fetches
						exactly what it needs, making code easier to maintain.
					</li>
					<li>
						<strong>Automatic request deduplication</strong> - React automatically
						deduplicates identical fetch requests across components.
					</li>
				</ul>

				<blockquote data-level="success">
					<strong>Best for Partial Prerendering (PPR)</strong>
					<p className="mt-2">
						This pattern is essential for PPR. The static shell can be prerendered
						at build time, while dynamic components stream in at request time—all
						in a single HTTP response.
					</p>
				</blockquote>

				<h2>Placement Matters</h2>

				<p>
					The lower in the tree you fetch data, the more content can render
					statically:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// ❌ Fetching high in the tree - blocks everything below
async function ParentComponent() {
  const data = await getData();
  return <ChildComponent data={data} />;
}

// ✅ Fetching at the leaf - only blocks what needs the data
function ParentComponent() {
  return (
    <Suspense fallback={<Loading />}>
      <ChildComponent />  {/* Fetches its own data */}
    </Suspense>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>One Suspense per data source</strong> - Wrap each async
						component separately so they stream independently.
					</li>
					<li>
						<strong>Design meaningful skeletons</strong> - Your fallback should
						match the component's layout to minimize layout shift.
					</li>
					<li>
						<strong>Consider grouping related content</strong> - If two pieces of
						data always load together, they can share a Suspense boundary.
					</li>
					<li>
						<strong>Use error boundaries</strong> - Wrap Suspense with error
						boundaries to handle fetch failures gracefully.
					</li>
				</ul>

				<h2>When to Use</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Mixed content speeds</strong> - When your page has both fast
						and slow data sources.
					</li>
					<li>
						<strong>Important static content</strong> - When headers, navigation,
						or key content should appear instantly.
					</li>
					<li>
						<strong>Dashboard-style pages</strong> - Multiple independent widgets
						that can load in parallel.
					</li>
				</ul>

				<h2>Related Patterns</h2>

				<p>
					If you need to start fetches in the page but consume them in Client
					Components, see{" "}
					<Link
						href="/fetching/suspense-use"
						className="underline hover:no-underline"
					>
						Suspense with React.use()
					</Link>
					.
				</p>
			</PageContent>
		</>
	);
}
