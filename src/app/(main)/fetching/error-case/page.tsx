import type { Metadata } from "next";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";

export const metadata: Metadata = {
	title: "Error Case",
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ error: string }>;
}) {
	const sp = await searchParams;
	if (sp.error) {
		throw new Error("this error happened on the server");
	}
	return (
		<>
			<PageHeader segment="~/fetching/error-case" />

			<PageContent>
				<h1>Error Case</h1>
				<blockquote>
					If you add a <code>?error=1</code> then this page will error and
					trigger the error boundary.
				</blockquote>
			</PageContent>
		</>
	);
}
