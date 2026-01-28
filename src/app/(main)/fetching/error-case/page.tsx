import { RenderSupportList } from "@/app/_components/render-support";

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
		<main>
			<RenderSupportList ssr />
			<h1>Error Case</h1>
			<blockquote>
				If you add a <code>?error=1</code> then this page will error and trigger
				the error boundary.
			</blockquote>
		</main>
	);
}
