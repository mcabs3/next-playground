import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Server-side Rendering (SSR)",
	description:
		"Learn about Server-side Rendering in Next.js — how dynamic APIs trigger per-request rendering for fresh, personalized pages.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/ssr">
				<Frame
					src="/demos/ssr"
					hint="This page renders fresh content on every request"
				/>
			</PageHeader>

			<PageContent>
				<p className="text-muted-foreground text-sm">
					Dynamic (SSR) · Rendering
				</p>

				<h1>Server-side Rendering (SSR)</h1>

				<p>
					In{" "}
					<Link href="/rendering/ssg" className="underline hover:no-underline">
						Static (SSG)
					</Link>
					, pages are built once and served forever. But what happens when you
					need to read a cookie, check an auth header, or respond to a search
					query? You need data that only exists at <em>request time</em> — and
					that means the page can't be pre-built.
				</p>

				<p>
					When you access <code>cookies()</code>, <code>headers()</code>,{" "}
					<code>searchParams</code>, or <code>connection()</code>, Next.js
					automatically switches to SSR. The page renders fresh on{" "}
					<strong>every request</strong>, with full access to the incoming
					request data. You don't set a flag or change a config — the dynamic
					API call itself is the signal.
				</p>

				<h2>Dynamic APIs</h2>

				<p>
					Using any of these APIs automatically opts your page into SSR because
					they depend on request-time information:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
import { cookies, headers, connection } from 'next/headers';

// Access cookies — triggers SSR
const cookieStore = await cookies();
const session = cookieStore.get('session');

// Access request headers — triggers SSR
const headersList = await headers();
const userAgent = headersList.get('user-agent');

// Wait for connection (useful for streaming) — triggers SSR
await connection();

// Access search params in page components — triggers SSR
export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ query: string }> 
}) {
  const { query } = await searchParams;
  // ...
}
\`\`\`
`}
				</CodeBlock>

				<h2>A Typical SSR Page</h2>

				<p>
					The most common SSR pattern is a page that reads auth state from
					cookies and tailors the response:
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) {
    redirect('/login');
  }

  const user = await getUser(session.value);
  return <div>Welcome back, {user.name}</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Always fresh data</strong> — Content is generated on each
						request, never stale.
					</li>
					<li>
						<strong>Full personalization</strong> — Access cookies, headers, and
						auth state to tailor content per user.
					</li>
					<li>
						<strong>SEO friendly</strong> — Search engines receive complete,
						rendered HTML.
					</li>
					<li>
						<strong>Request-time data</strong> — Use search params, geolocation,
						or any request-specific information.
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Slower TTFB</strong> — Each request requires server
						processing, unlike cached{" "}
						<Link
							href="/rendering/ssg"
							className="underline hover:no-underline"
						>
							SSG
						</Link>{" "}
						pages.
					</li>
					<li>
						<strong>Higher server costs</strong> — Every request consumes
						compute resources.
					</li>
					<li>
						<strong>Scaling challenges</strong> — Traffic spikes require more
						server capacity. Static pages scale infinitely on CDN; SSR pages
						don't.
					</li>
				</ul>

				<blockquote>
					<strong>What Did We Learn</strong>
					<ul className="mt-2 list-disc space-y-2 pl-6">
						<li>
							Dynamic APIs — <code>cookies()</code>, <code>headers()</code>,{" "}
							<code>searchParams</code>, <code>connection()</code> — are the
							trigger. Using any of them automatically opts a page into SSR.
						</li>
						<li>
							SSR pages are <strong>always fresh</strong>. Every request gets
							newly generated HTML with the latest data.
						</li>
						<li>
							The trade-off is <strong>higher TTFB</strong> and server cost. You
							pay for freshness with compute on every request.
						</li>
						<li>
							Combine SSR with <code>&lt;Suspense&gt;</code> to{" "}
							<strong>stream content progressively</strong>. Users see a shell
							immediately while slower parts render in the background.
						</li>
					</ul>
				</blockquote>

				<div className="mt-10 flex justify-between border-t pt-6">
					<Link
						href="/rendering/ssg"
						className="text-muted-foreground underline hover:no-underline"
					>
						← Static (SSG)
					</Link>
					<Link
						href="/rendering/isr"
						className="font-semibold underline hover:no-underline"
					>
						ISR →
					</Link>
				</div>
			</PageContent>
		</>
	);
}
