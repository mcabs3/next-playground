import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Fetching at the Page Level",
	description:
		"Learn about page-level data fetching in Next.js Server Components and why moving fetching lower in the tree improves performance.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/page-default">
				<Frame
					src="/demos/fetching/page-default"
					hint="Notice the page hangs while fetching data"
				/>
			</PageHeader>

			<PageContent>
				<h1>Page-Level Data Fetching</h1>

				<p>
					A common pattern is fetching all data at the <code>page.tsx</code>{" "}
					level before rendering. While simple, this creates an implicit{" "}
					<strong>boundary</strong> that blocks the entire page until all data
					is ready.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
export default async function Page() {
  // Page is blocked until both fetches complete
  const [posts, user] = await Promise.all([
    getPosts(),
    getUser()
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
    </div>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h2>The Problem</h2>

				<p>
					When you fetch data at the page level, the entire page waits for all
					promises to resolve. Users see nothing until everything is ready—even
					if some content could render immediately.
				</p>

				<blockquote data-level="warning">
					<strong>Page appears to "hang"</strong>
					<p className="mt-2">
						Without a <code>loading.tsx</code> file, users see no feedback while
						data fetches. The page appears frozen until all data arrives.
					</p>
				</blockquote>

				<h2>Better Approaches</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Add loading.tsx</strong> - Provides immediate feedback with a
						loading skeleton while the page fetches data.{" "}
						<Link
							href="/fetching/suspense-page"
							className="underline hover:no-underline"
						>
							Learn more
						</Link>
					</li>
					<li>
						<strong>Move fetching to child components</strong> - Push data
						fetching lower in the tree so static content renders immediately
						while dynamic parts stream in.{" "}
						<Link
							href="/fetching/suspense-rsc"
							className="underline hover:no-underline"
						>
							Learn more
						</Link>
					</li>
					<li>
						<strong>Use React.use() with Suspense</strong> - Start fetches early
						in the page, but unwrap them in child components wrapped with
						Suspense.{" "}
						<Link
							href="/fetching/suspense-use"
							className="underline hover:no-underline"
						>
							Learn more
						</Link>
					</li>
				</ul>

				<h2>When Page-Level Fetching Is OK</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Simple pages with fast data</strong> - If your fetch is quick
						(&lt;100ms), the blocking may be imperceptible.
					</li>
					<li>
						<strong>All content depends on the same data</strong> - If nothing
						can render without the data, there's no benefit to streaming.
					</li>
					<li>
						<strong>Combined with loading.tsx</strong> - A loading state makes
						the wait acceptable for users.
					</li>
				</ul>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Always add loading.tsx</strong> - Never leave users with a
						blank screen while fetching.
					</li>
					<li>
						<strong>Use Promise.all for parallel fetches</strong> - Don't await
						sequentially when fetches are independent.
					</li>
					<li>
						<strong>Consider moving fetches down</strong> - If parts of your page
						could render without the data, fetch in those specific components
						instead.
					</li>
					<li>
						<strong>Avoid passing params through the page</strong> - Let child
						components access their own params to enable better streaming.
					</li>
				</ul>
			</PageContent>
		</>
	);
}
