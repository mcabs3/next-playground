import Main from "../_components/main";

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
	const buildTime = new Date().toLocaleString();

	return (
		<Main>
			<div className="space-y-6">
				<header>
					<h1 className="font-bold text-xl">Static Blog Posts</h1>
					<p className="text-muted-foreground text-sm">
						Built at: <time>{buildTime}</time>
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
					Data fetched from JSONPlaceholder at build time. Refresh the page —
					the timestamp stays the same because this is a static page.
				</footer>
			</div>
		</Main>
	);
}
