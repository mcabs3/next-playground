import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
	title: "Error Handling in Next.js",
	description:
		"Learn how to handle errors gracefully in Next.js using error.tsx boundaries.",
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ error: string }>;
}) {
	const sp = await searchParams;
	if (sp.error) {
		throw new Error("This error was triggered intentionally via ?error=1");
	}

	return (
		<>
			<PageHeader segment="~/fetching/error-case" />

			<PageContent>
				<h1>Error Handling</h1>

				<p>
					Data fetching can fail. Network issues, API errors, or invalid data can
					all cause exceptions. Next.js provides <code>error.tsx</code> files to
					catch and handle errors at any level of your route tree.
				</p>

				<blockquote data-level="warning">
					<strong>Try it:</strong> Add <code>?error=1</code> to this page's URL to
					trigger an error and see the error boundary in action.
				</blockquote>

				<h2>How error.tsx Works</h2>

				<p>
					When you create an <code>error.tsx</code> file in a route segment,
					Next.js wraps that segment with a React Error Boundary. Any error thrown
					in that segment (or its children) will be caught and the error component
					rendered instead.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// app/dashboard/error.tsx
"use client";  // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 border border-red-500 rounded">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h2>Key Concepts</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Client Components required</strong> - Error boundaries must be
						Client Components because they use React's error boundary feature.
					</li>
					<li>
						<strong>Automatic recovery with reset()</strong> - The <code>reset</code>{" "}
						function re-renders the segment, letting users retry after transient
						errors.
					</li>
					<li>
						<strong>Error digest for logging</strong> - Production errors include
						a <code>digest</code> hash you can use to match client errors with
						server logs.
					</li>
					<li>
						<strong>Hierarchical boundaries</strong> - Errors bubble up to the
						nearest error boundary. Place them strategically to control blast
						radius.
					</li>
				</ul>

				<h2>Error Boundary Placement</h2>

				<p>
					Where you place error boundaries affects how much of the UI is replaced
					when an error occurs:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`
app/
├── error.tsx          # Catches errors from entire app
├── dashboard/
│   ├── error.tsx      # Catches errors from dashboard only
│   ├── page.tsx
│   └── settings/
│       ├── error.tsx  # Catches errors from settings only
│       └── page.tsx
\`\`\`
`}
				</CodeBlock>

				<h2>Handling Errors with Suspense</h2>

				<p>
					When using{" "}
					<Link
						href="/fetching/suspense-rsc"
						className="underline hover:no-underline"
					>
						Suspense with Server Components
					</Link>
					, wrap your Suspense boundaries with error handling:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <ErrorBoundary fallback={<p>Failed to load user data</p>}>
        <Suspense fallback={<Skeleton />}>
          <UserCard />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
\`\`\`
`}
				</CodeBlock>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Don't expose sensitive details</strong> - Show user-friendly
						messages. Log detailed errors server-side.
					</li>
					<li>
						<strong>Provide recovery actions</strong> - Give users a way to retry
						or navigate away from the error state.
					</li>
					<li>
						<strong>Isolate error boundaries</strong> - Don't let one failed
						component take down the whole page if it doesn't need to.
					</li>
					<li>
						<strong>Use global-error.tsx for root errors</strong> - The root
						layout can't be caught by <code>error.tsx</code>. Use{" "}
						<code>global-error.tsx</code> for those cases.
					</li>
				</ul>

				<h2>global-error.tsx</h2>

				<p>
					For errors in the root layout or root-level code, create a{" "}
					<code>global-error.tsx</code> file in your app directory:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
\`\`\`
`}
				</CodeBlock>

				<blockquote data-level="info">
					<strong>Note:</strong> <code>global-error.tsx</code> replaces the entire
					page including <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>,
					so you must include those tags.
				</blockquote>
			</PageContent>
		</>
	);
}
