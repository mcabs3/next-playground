import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { RenderSupportList } from "@/app/_components/render-support";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Rendering Strategies in Next.js",
	description:
		"An overview of the different rendering strategies supported by Next.js including SSG, SSR, ISR, and PPR.",
};

function RenderingTile({
	title,
	href,
	children,
	className,
	...props
}: { title: string } & ComponentProps<typeof Link>) {
	return (
		<Link
			aria-label={title}
			className={cn(
				"group block h-full rounded border p-4 transition-all hover:bg-muted",
				className,
			)}
			href={href}
			{...props}
		>
			<span className="inline-block text-xl group-hover:underline">
				{title}
			</span>
			<div className="mt-2 leading-normal">{children}</div>
		</Link>
	);
}

export default function Page() {
	return (
		<>
			<PageHeader segment="~/rendering">
				<RenderSupportList ssg />
				<h1>Rendering Strategies</h1>
			</PageHeader>
			<PageContent>
				<blockquote className="w-full">
					Next.js supports multiple rendering strategies to provide flexibility
					when delivering your content.
				</blockquote>
				<ul className="grid grid-cols-2 gap-4">
					<li>
						<RenderingTile
							title="Static Site Generation (SSG)"
							href="/rendering/ssg"
						>
							Build-time generation of static HTML pages.
						</RenderingTile>
					</li>
					<li>
						<RenderingTile
							title="Server-side Rendering (SSR)"
							href="/rendering/ssr"
						>
							Dynamic generation of pages on each request.
						</RenderingTile>
					</li>
					<li>
						<RenderingTile
							title="Incremental Static Regeneration (ISR)"
							href="/rendering/isr"
						>
							On-demand regeneration of static pages at runtime.
						</RenderingTile>
					</li>
					<li>
						<RenderingTile title="Partial Prerendering (PPR)" href="/rendering">
							Combining static and dynamic rendering within the same page.
						</RenderingTile>
					</li>
				</ul>
			</PageContent>
		</>
	);
}
