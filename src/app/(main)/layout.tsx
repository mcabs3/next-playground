import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarProvider,
} from "@/components/ui/sidebar";

export const metadata: Metadata = {
	title: {
		template: "%s | Next.js by Example",
		default: "Next.js by Example",
	},

	description:
		"Learn Next.js patterns through interactive, step-by-step examples.",
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
				slug: "/fetching",
				name: "Introduction",
				description: "Overview of data fetching patterns",
			},
			{
				slug: "/fetching/page-default",
				name: "Page-Level Fetch",
				description: "The starting point and its trade-offs",
			},
			{
				slug: "/fetching/suspense-page",
				name: "loading.tsx",
				description: "Adding instant loading feedback",
			},
			{
				slug: "/fetching/suspense-rsc",
				name: "Suspense + RSC",
				description: "Component-level streaming",
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
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<Link href="/" className="block px-2 pt-10 pb-4 no-underline">
						<span className="block font-normal text-xl">Next.js</span>
						<span className="font-black text-xl">by Example</span>
					</Link>
				</SidebarHeader>
				<SidebarContent>
					<section className="flex w-full flex-col leading-normal">
						<nav className="flex flex-col gap-2 p-4">
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
													className="-mx-2 block rounded px-2 py-0.5 no-underline"
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
	);
}
