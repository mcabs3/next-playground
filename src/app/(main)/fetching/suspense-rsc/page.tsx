import type { Metadata } from "next";
import Link from "next/link";
import { RenderSupportList } from "@/app/_components/render-support";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
	title: "Suspense with React Server Components",
};

export default function Page() {
	return (
		<main>
			<RenderSupportList ssr />
			<h2>Suspense + RSC ❤️</h2>
			<Frame src="/demos/fetching/suspense-rsc" />

			<blockquote>
				In the demo above. You see content immediately (the header). This means
				the user can see more of the experience while the dynamic parts of your
				application complete their computations and stream in upon completion in
				the same HTTP request.
			</blockquote>

			<p className="">
				Just like the concepts behind{" "}
				<Link
					href="/fetching/page-default"
					className="underline hover:no-underline"
				>
					Page with Loading.tsx
				</Link>
				. You can leverage React Server Components with <code>Suspense</code> to
				provide component-level states to create non-blocking rendering. This
				allows the "static" parts of the page render, and allow the child RSC to
				fetch the data independently (still on the server), all in a single http
				request!
			</p>
		</main>
	);
}
