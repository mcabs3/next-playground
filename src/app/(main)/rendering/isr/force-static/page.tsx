import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "force-static Route Option",
	description:
		"Learn how to use the force-static route option in Next.js to force static rendering even when dynamic APIs are used.",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering/isr/force-static">
				<Frame
					src="/demos/isr/force-static"
					hint="This page forces static rendering with revalidation"
				/>
			</PageHeader>

			<PageContent>
				<h1>
					ISR with <em>force-static</em>
				</h1>

				<p>
					Using <code>export dynamic = "force-static"</code> forces a route to
					be statically rendered, even if it would normally opt into{" "}
					<Link href="/rendering/ssr" className="underline hover:no-underline">
						SSR
					</Link>
					. Combined with <code>revalidate</code>, this enables{" "}
					<Link href="/rendering/isr" className="underline hover:no-underline">
						ISR
					</Link>{" "}
					for pages that use dynamic patterns but you want to treat statically.
				</p>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Force static rendering with 60-second revalidation
export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page() {
  // This fetch would normally trigger SSR,
  // but force-static makes it cache at build/revalidation time
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>How It Works</h2>

				<p>
					By default, certain patterns automatically opt routes into dynamic
					rendering. Using <code>force-static</code> overrides this behavior and
					treats the route as static, caching results until the next
					revalidation.
				</p>

				<blockquote data-level="warning">
					<strong>Dynamic APIs are silently ignored</strong>
					<p className="mt-2">
						When using <code>force-static</code>, calls to{" "}
						<code>cookies()</code>, <code>headers()</code>, and{" "}
						<code>searchParams</code> won't error—they simply return empty
						values. Make sure your page logic handles this correctly.
					</p>
				</blockquote>

				<CodeBlock className="my-6">
					{`\`\`\`tsx
// Dynamic APIs return empty/default values with force-static
import { headers, cookies } from 'next/headers';

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page() {
  // headers() and cookies() return empty when force-static is used
  const headersList = await headers(); // Empty Headers
  const cookieStore = await cookies(); // Empty cookies
  
  return <div>Static content</div>;
}
\`\`\`
`}
				</CodeBlock>

				<h2>Benefits</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Override dynamic detection</strong> - Force caching for
						routes that Next.js would otherwise render dynamically
					</li>
					<li>
						<strong>ISR for complex fetches</strong> - Enable revalidation for
						pages with multiple or uncached data fetches
					</li>
					<li>
						<strong>Consistent behavior</strong> - Ensure routes are always
						static regardless of implementation details
					</li>
				</ul>

				<h2>Trade-offs</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Dynamic APIs return empty</strong> - <code>cookies()</code>{" "}
						and <code>headers()</code> return empty values, not actual request
						data
					</li>
					<li>
						<strong>No personalization</strong> - All users see the same cached
						content until revalidation
					</li>
					<li>
						<strong>searchParams unavailable</strong> - Query parameters cannot
						be accessed at render time
					</li>
				</ul>

				<h2>Best Practices</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						<strong>Prefer natural static rendering</strong> - Only use{" "}
						<code>force-static</code> when you can't restructure your code to be
						naturally static.
					</li>
					<li>
						<strong>Always pair with revalidate</strong> - Without{" "}
						<code>revalidate</code>, the page only updates on redeploy.
					</li>
					<li>
						<strong>Test thoroughly</strong> - Verify your page works correctly
						when dynamic APIs return empty values.
					</li>
					<li>
						<strong>Consider alternatives</strong> - Restructuring to move
						dynamic logic to client components may be cleaner.
					</li>
				</ul>

				<h2>Good Use Cases</h2>

				<ul className="list-disc space-y-2 pl-6">
					<li>
						No dependencies on the request (<em>params</em> are OK).
					</li>
					<li>Pages with uncached third-party API calls</li>
					<li>Routes using libraries that internally check headers/cookies</li>
					<li>
						A "first pass" to optimizing a legacy codebase to static rendering
					</li>
					<li>Performance optimization for high-traffic pages</li>
				</ul>
			</PageContent>
		</>
	);
}
