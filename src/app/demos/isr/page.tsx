import type { Metadata } from "next";
import Main from "../_components/main";

export const metadata: Metadata = {
	title: "ISR Demo - Next.js by Example",
	description:
		"Demo of Incremental Static Regeneration with time-based revalidation",
};

export const revalidate = 10; // Revalidate every 10 seconds

interface Post {
	id: number;
	title: string;
	body: string;
}

async function getPosts(): Promise<Post[]> {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/posts?_limit=5",
	);
	return response.json();
}

export default async function Page() {
	const posts = await getPosts();

	return (
		<Main>
			<p>Timestamp: {new Date().toISOString()}</p>
			<div className="space-y-6">
				<header>
					<h1 className="font-bold text-xl">ISR Blog Posts</h1>
					<p className="mt-2 rounded bg-muted px-3 py-2 text-xs">
						This page revalidates every <strong>10 seconds</strong>. Refresh
						after 10s to see a new timestamp.
					</p>
				</header>

				<ul className="space-y-4">
					{posts.map((post) => (
						<li key={post.id} className="border-b pb-4">
							<h2 className="font-semibold capitalize">{post.title}</h2>
							<p className="line-clamp-2 text-muted-foreground text-sm">
								{post.body}
							</p>
						</li>
					))}
				</ul>

				<footer className="text-muted-foreground text-xs">
					Using <code className="rounded bg-muted px-1">revalidate = 10</code>{" "}
					to regenerate this page periodically while serving cached content.
				</footer>
			</div>
		</Main>
	);
}
