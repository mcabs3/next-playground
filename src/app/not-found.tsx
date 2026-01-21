import Link from "next/link";

export default function NotFound() {
	return (
		<main className="px-8 pt-20 pb-10">
			<h1>Custom Not Found</h1>
			<p>
				This file lives at <code>src/app/not-found.tsx</code>
			</p>
			<Link href="/">Go back to home</Link>
		</main>
	);
}
