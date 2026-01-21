import type { Metadata } from "next";
import Link from "next/link";
import DataComponent from "./_components/async-data-component";
import DataLongerComponent from "./_components/async-data-longer-component";

export const metadata: Metadata = {
	title: "Suspense with React Server Components",
};

export default function Page() {
	return (
		<main>
			<h2>Suspense + RSC ❤️</h2>
			<p>
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

			<blockquote data-level="success">
				You see content immediately (the header, the paragraph, and THIS
				message). This means the user can see more of the experience while the
				dynamic parts of your application complete their computations and stream
				in upon completion.
			</blockquote>

			<section className="relative mt-16 grid gap-8 border border-neutral-800 px-8 py-10 lg:grid-cols-2">
				<span className="absolute top-0 left-8 inline-block -translate-y-1/2 rounded bg-neutral-800 px-4 font-mono">
					Data
				</span>
				<div>
					<h3>Data</h3>
					<DataComponent />
				</div>
				<div>
					<h3>More Data</h3>
					<DataLongerComponent />
				</div>
			</section>
		</main>
	);
}
