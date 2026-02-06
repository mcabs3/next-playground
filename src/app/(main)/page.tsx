import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
	title: "Next.js by Example",
	description:
		"Learn Next.js patterns through interactive, step-by-step examples. Data fetching, rendering strategies, caching, and more.",
};

const topics = [
	{
		title: "Data Fetching",
		href: "/fetching",
		description:
			"Go from a blocking page to granular streaming in three steps. Learn how Suspense and Server Components transform your loading UX.",
		steps: ["Page-Level Fetch", "loading.tsx", "Suspense + RSC"],
	},
	{
		title: "Rendering",
		href: "/rendering",
		description:
			"Understand when Next.js renders your pages — at build time, on every request, or on a schedule. SSG, SSR, ISR, and PPR compared.",
		steps: ["Static (SSG)", "Dynamic (SSR)", "ISR", "force-static"],
	},
	{
		title: "Caching",
		href: "/caching/unstable_cache",
		description:
			"Cache expensive operations with tag-based invalidation. See how unstable_cache and revalidateTag work together.",
		steps: ["unstable_cache", "revalidateTag", "Server Actions"],
	},
] as const;

export default function Home() {
	return (
		<>
			<div className="bg-muted">
				<header className="mx-auto max-w-5xl py-16">
					<p className="font-mono text-muted-foreground text-sm tracking-tight">
						~/
					</p>
					<h1 className="mt-4 font-black text-4xl tracking-tight sm:text-5xl">
						Next.js <span className="text-muted-foreground">by Example</span>
					</h1>
					<p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
						Interactive examples that teach Next.js patterns from first
						principles. No theory dumps — every concept is demonstrated with
						live code you can watch, break, and rebuild.
					</p>
					<div className="mt-8 flex gap-3">
						<Link
							href="/fetching"
							className="inline-flex items-center rounded bg-foreground px-4 py-2 font-medium text-background text-sm no-underline transition-opacity hover:opacity-90"
						>
							Start Learning
						</Link>
						<a
							href="https://github.com/miguelcabs/next-concepts"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center rounded border px-4 py-2 font-medium text-sm no-underline transition-colors hover:bg-background"
						>
							View Source
						</a>
					</div>
				</header>
			</div>

			<main className="mx-auto max-w-5xl px-8 pt-16 pb-12">
				<h2 className="font-semibold text-xl">What You'll Learn</h2>
				<p className="mt-2 text-muted-foreground">
					Each topic is a guided walkthrough with interactive demos. Pick one
					and work through it at your own pace.
				</p>

				<div className="mt-8 grid gap-6 sm:grid-cols-3">
					{topics.map((topic) => (
						<Link
							key={topic.title}
							href={topic.href}
							className="group flex flex-col rounded border p-5 no-underline transition-colors hover:bg-muted"
						>
							<span className="font-semibold text-lg group-hover:underline">
								{topic.title}
							</span>
							<p className="mt-2 flex-1 text-muted-foreground text-sm leading-relaxed">
								{topic.description}
							</p>
							<ul className="mt-4 flex flex-wrap gap-2">
								{topic.steps.map((step) => (
									<li
										key={step}
										className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-muted-foreground text-xs group-hover:bg-background"
									>
										{step}
									</li>
								))}
							</ul>
						</Link>
					))}
				</div>

				<div className="mt-16 rounded border bg-muted/50 p-8">
					<h2 className="font-semibold text-xl">A Taste of What's Inside</h2>
					<p className="mt-2 text-muted-foreground">
						The same four API calls, three different architectures. This is what
						the Data Fetching guide teaches you to build:
					</p>

					<CodeBlock className="mt-6">
						{`\`\`\`tsx
// Step 1: Everything blocks
async function Page() {
  const [weather, news] = await Promise.all([
    api("weather"), api("news")
  ]);
  return <Dashboard weather={weather} news={news} />;
}

// Step 3: Everything streams
function Page() {
  return (
    <>
      <Suspense fallback={<WeatherSkeleton />}>
        <Weather />  {/* fetches + renders independently */}
      </Suspense>
      <Suspense fallback={<NewsSkeleton />}>
        <News />     {/* streams in when ready */}
      </Suspense>
    </>
  );
}
\`\`\`
`}
					</CodeBlock>
				</div>

				<div className="mt-16 border-t pt-10">
					<h2 className="font-semibold text-xl">Built With</h2>
					<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
						{[
							{ name: "Next.js 16", detail: "App Router + Turbopack" },
							{ name: "React 19", detail: "Server Components + use()" },
							{ name: "TypeScript", detail: "Strict mode + typed routes" },
							{ name: "Tailwind v4", detail: "CSS-first configuration" },
						].map((item) => (
							<div key={item.name} className="rounded border p-3">
								<span className="block font-medium text-sm">{item.name}</span>
								<span className="text-muted-foreground text-xs">
									{item.detail}
								</span>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
