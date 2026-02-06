import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Design Demo",
	description: "This is a placeholder page for the Design demo",
};

export default function Page() {
	return (
		<main className="mx-auto max-w-5xl px-4 py-10">
			<h1>Heading 1</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<h4>Heading 4</h4>
			<h5>Heading 5</h5>
			<h6>Heading 6</h6>
			<p className="text-lg">
				This is a placeholder page for the Design demo. Content will be added
				soon.
			</p>
			<div>
				<code>&lt;code /&gt;</code> <em>emphasis</em> <strong>strong</strong>
			</div>
			<div>
				<Link href="/demos/design">Link</Link>
			</div>
			<div>
				<blockquote>this is a blockquote (default)</blockquote>
			</div>
			<div>
				<blockquote data-level="severe">
					this is a blockquote (severe)
				</blockquote>
			</div>
			<div>
				<blockquote data-level="success">
					this is a blockquote (success)
				</blockquote>
			</div>
			<div>
				<blockquote data-level="warning">
					this is a blockquote (warning)
				</blockquote>
			</div>
			<div>
				<blockquote data-level="info">this is a blockquote (info)</blockquote>
			</div>
		</main>
	);
}
