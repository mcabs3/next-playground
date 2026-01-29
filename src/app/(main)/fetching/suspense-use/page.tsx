import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Suspense with React.use()",
	description:
		"Learn how to use React.use() to unwrap promises in Client Components for streaming data in Next.js.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/suspense-use">
				<Tabs defaultValue="demo" className="mt-8 rounded-lg bg-muted p-2">
					<TabsList>
						<TabsTrigger value="demo">demo</TabsTrigger>
						<TabsTrigger value="page">page.tsx</TabsTrigger>
						<TabsTrigger value="client">DataDisplay.tsx</TabsTrigger>
					</TabsList>
					<TabsContent value="demo">
						<Frame
							src="/demos/fetching/suspense-use"
							hint="Data fetches start on the server, unwrap in client components"
						/>
					</TabsContent>
					<TabsContent value="page">
						<CodeBlock>
							{`\`\`\`tsx
// Server Component - starts the fetch
export default function Page() {
  // Start fetches immediately (no await!)
  const userPromise = getUser();
  const postsPromise = getPosts();

  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<Skeleton />}>
        <UserCard userPromise={userPromise} />
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <PostList postsPromise={postsPromise} />
      </Suspense>
    </div>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
					<TabsContent value="client">
						<CodeBlock>
							{`\`\`\`tsx
"use client";

import { use } from "react";

export function UserCard({ userPromise }: { userPromise: Promise<User> }) {
  // use() unwraps the promise - triggers Suspense while pending
  const user = use(userPromise);

  return (
    <div className="rounded border p-4">
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
				<h1>Suspense + React.use()</h1>

				<p>
					React 19's <code>use()</code> hook lets you unwrap promises in Client
					Components. Combined with Suspense, this enables a powerful pattern:
					start data fetches on the server, stream the promises to the client,
					and unwrap them where needed.
				</p>

				<h2>How It Works</h2>

				<p>
					The Server Component creates promises (without awaiting) and passes
					them as props. The Client Component uses <code>use()</code> to unwrap
					the promise, which integrates with Suspense automatically:
				</p>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Fetch starts immediately</strong> - The promise is created
						when the page renders on the server.
					</li>
					<li>
						<strong>Promise is serialized</strong> - React serializes the
						pending promise and streams it to the client.
					</li>
					<li>
						<strong>Client unwraps the data</strong> - When the promise
						resolves,
						<code>use()</code> returns the data and the component renders.
					</li>
				</ul>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// The key insight: no await in the Server Component
const dataPromise = fetchData();  // Promise created, fetch started
<ClientComponent dataPromise={dataPromise} />  // Promise passed as prop
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Early fetch initiation</strong> - Start fetches at the top
						of the tree, consume data lower down. No waterfalls.
					</li>
					<li>
						<strong>Reusable client components</strong> - The same component can
						display any data—just pass different promises.
					</li>
					<li>
						<strong>Client-side interactivity</strong> - Unlike Server
						Components, these can use hooks, event handlers, and browser APIs.
					</li>
					<li>
						<strong>Type-safe promises</strong> - TypeScript knows the resolved
						type from the promise's generic.
					</li>
				</ul>

				<blockquote data-level="info">
					<strong>use() vs async Server Components</strong>
					<p className="mt-2">
						Use async Server Components when you just need to render data. Use{" "}
						<code>use()</code> when you need client-side interactivity (state,
						effects, event handlers) with your streamed data.
					</p>
				</blockquote>

				<h2>Common Patterns</h2>

				<h3 className="mt-6 font-semibold">Prefetching Multiple Resources</h3>

				<CodeBlock className="my-4">
					{`\`\`\`tsx
export default function Page() {
  // NO \`await\` - All fetches start simultaneously
  const user = getUser();
  const posts = getPosts();
  const notifications = getNotifications();

  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header userPromise={user} notificationsPromise={notifications} />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <PostFeed postsPromise={posts} />
      </Suspense>
    </>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h3 className="mt-6 font-semibold">Conditional Rendering</h3>

				<CodeBlock className="my-4">
					{`\`\`\`tsx
"use client";

export function OptionalContent({ dataPromise }: Props) {
  const data = use(dataPromise);
  
  // Client-side logic after data loads
  if (!data.isEnabled) return null;
  
  return <div>{data.content}</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Start fetches as early as possible</strong> - Create
						promises at the top of your page component to maximize parallelism.
					</li>
					<li>
						<strong>Don't await in the server, use() in the client</strong> -
						The whole point is to avoid blocking. Let Suspense handle the
						waiting.
					</li>
					<li>
						<strong>Type your promises</strong> - Use{" "}
						<code>Promise&lt;YourType&gt;</code> for the prop type to get proper
						inference with <code>use()</code>.
					</li>
					<li>
						<strong>Handle errors with Error Boundaries</strong> - Rejected
						promises will throw. Wrap with an Error Boundary to catch them.
					</li>
				</ul>

				<h2>When to Use</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Interactive components</strong> - When the component needs
						useState, useEffect, or event handlers.
					</li>
					<li>
						<strong>Shared data display components</strong> - One component that
						can render different data based on the promise passed.
					</li>
					<li>
						<strong>Client-side post-processing</strong> - When you need to
						transform or filter data on the client.
					</li>
				</ul>

				<h2>Related Patterns</h2>

				<p>
					For simpler cases where you don't need client interactivity, use{" "}
					<Link
						href="/fetching/suspense-rsc"
						className="underline hover:no-underline"
					>
						Suspense with Server Components
					</Link>{" "}
					instead—it's less code and keeps everything on the server.
				</p>
			</PageContent>
		</>
	);
}
