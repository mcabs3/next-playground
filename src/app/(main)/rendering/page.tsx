import type { Metadata } from "next";
import { RenderSupportList } from "@/app/_components/render-support";
import TitledSection from "@/app/_components/titled-section";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
	title: "Rendering Strategies in Next.js",
	description:
		"An overview of the different rendering strategies supported by Next.js including SSG, SSR, ISR, and PPR.",
};

export default function Page() {
	return (
		<main>
			<RenderSupportList ssg />
			<TitledSection title="rendering/page.tsx">
				<p>
					Next.js can support many times of rendering strategies to provide
					flexibility of delivering your content
				</p>
				<ul>
					<li>
						<h2>SSG - Static</h2>
					</li>
					<li>
						<h2>SSR - Server-side Rendered</h2>
					</li>
					<li>
						<h2>ISR - Incremental Static Regeneration</h2>
					</li>
					<li>
						<h2>PPR - Partial Pre-rendering</h2>
					</li>
				</ul>
				<Table className="w-full text-sm">
					<TableHeader>
						<TableRow className="">
							<TableHead>
								<span className="sr-only">Topic</span>
							</TableHead>
							<TableHead>SSG</TableHead>
							<TableHead>SSR</TableHead>
							<TableHead>ISR</TableHead>
							<TableHead>PPR</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="">
						<TableRow>
							<TableHead className="text-right">Creation</TableHead>
							<TableCell>Build</TableCell>
							<TableCell>Runtime</TableCell>
							<TableCell>Runtime</TableCell>
							<TableCell>Build/Runtime</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="text-right">
								Cookies/Headers Access
							</TableHead>
							<TableCell>No</TableCell>
							<TableCell>Yes</TableCell>
							<TableCell>Partial*</TableCell>
							<TableCell>Yes</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="text-right">Revalidation</TableHead>
							<TableCell>No</TableCell>
							<TableCell>Not applicable</TableCell>
							<TableCell>Yes</TableCell>
							<TableCell>Yes</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TitledSection>
		</main>
	);
}
