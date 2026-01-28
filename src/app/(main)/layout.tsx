import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import type { ComponentProps } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarProvider,
} from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Next.js Concepts",
		default: "Next.js Concepts",
	},

	description: "A Next.js app for demonstrating patterns",
};

interface Item {
	name: string;
	slug: ComponentProps<typeof Link>["href"];
	description: string;
}

const navigation: Array<{ title?: string; items: Array<Item> }> = [
	{
		title: "Data Fetching",
		items: [
			{
				slug: "/fetching/page-default",
				name: "1. Fetching on a Page",
				description: "Using an app-wide suspense boundary",
			},
			{
				slug: "/fetching/suspense-page",
				name: "2. Suspense + Loading.tsx",
				description: "Creating a page-level suspense boundary",
			},
			{
				slug: "/fetching/suspense-rsc",
				name: "3. Suspense + RSC",
				description: "Using Suspense boundaries around Server Components",
			},
			{
				slug: "/fetching/suspense-use",
				name: "3a. Suspense + use",
				description: "Using React 19 use() with Suspense",
			},
		],
	},
	{
		title: "Rendering",
		items: [
			{
				slug: "/rendering",
				name: "Overview",
				description: "Rendering strategies in Next.js",
			},
			{
				slug: "/rendering/ssg",
				name: "Static (SSG)",
				description: "Static Site Generation",
			},
			{
				slug: "/rendering/ssr",
				name: "Dynamic (SSR)",
				description: "Server-side rendering",
			},
			{
				slug: "/rendering/isr",
				name: "ISR",
				description: "Increment Static Regeneration",
			},
			{
				slug: "/rendering/isr/force-static",
				name: "ISR (force-static)",
				description: "Increment Static Regeneration",
			},
			{
				// biome-ignore lint/suspicious/noExplicitAny: for demo purposes
				slug: "/rendering/isr/generate-static-params/1" as any,
				name: "ISR (generateStaticParams)",
				description: "Static Site Generation",
			},
		],
	},
	{
		title: "Caching",
		items: [
			{
				slug: "/caching/unstable_cache",
				name: "Unstable Cache",
				description: "Data caching with unstable_cache",
			},
		],
	},

	{
		title: "Routing",
		items: [
			{
				// biome-ignore lint/suspicious/noExplicitAny: for demo purposes
				slug: "/anything" as any,
				name: "Not Found",
				description: "Creating your own not found page",
			},
		],
	},
] as const;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader>
						<div className="px-2 pt-10 pb-4 font-black text-xl">
							<span className="block font-normal">Next.js</span> Concepts
						</div>
					</SidebarHeader>
					<SidebarContent>
						<section className="flex w-full flex-col">
							<nav className="flex flex-col gap-2 p-4">
								<Link className="-mx-2 block rounded px-2 py-0.5" href="/">
									Home
								</Link>
								{navigation.map((row) => (
									<div
										key={row.title}
										className="not-first:mt-4 flex flex-col gap-2"
									>
										<span className="font-mono text-xs uppercase">
											{row.title}
										</span>
										<ul className="grid">
											{row.items.map((item) => (
												<li key={item.slug.toString()}>
													<Link
														className="-mx-2 block rounded px-2 py-0.5"
														href={item.slug}
													>
														{item.name}
													</Link>
												</li>
											))}
										</ul>
									</div>
								))}
							</nav>
						</section>
					</SidebarContent>
				</Sidebar>
				<section className="w-full">{children}</section>
			</SidebarProvider>

			<Analytics />
			<SpeedInsights />
		</>
	);
}
