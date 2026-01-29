import type { Metadata } from "next";
import Link from "next/link";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { RenderSupportList } from "@/app/_components/render-support";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Suspense with loading.tsx",
};

export default function Page() {
	return (
		<>
			<PageHeader segment="~/fetching/suspense-page">
				<RenderSupportList ssr />
				<Tabs defaultValue="demo" className="mt-8 rounded-lg bg-muted p-2">
					<TabsList className="">
						<TabsTrigger value="demo">demo</TabsTrigger>
						<TabsTrigger value="page">page.tsx</TabsTrigger>
						<TabsTrigger value="loading">loading.tsx</TabsTrigger>
					</TabsList>
					<TabsContent value="demo">
						<Frame
							src="/demos/fetching/suspense-page"
							hint="Live demo of Suspense with loading.tsx"
						/>
					</TabsContent>
					<TabsContent value="page">
						<CodeBlock>
							{`\`\`\`tsx
export default async function Page({ params }: PageProps<"/fetching/suspense-page">) {
  const [data, otherData] = await Promise.all([getData(), getDataLonger()]);

  return (
    <div>
      {/* page content that uses data and otherData */}
    </div>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
					<TabsContent value="loading">
						<CodeBlock>
							{`\`\`\`tsx
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
        
export default function Loading() {
  return (
    <LoadingSkeleton rows={10}>
      <h1>app/fetching/suspense-page/loading.tsx</h1>
      Using <code>loading.tsx</code>. No page content is displaying
    </LoadingSkeleton>
  );
}
\`\`\`
`}
						</CodeBlock>
					</TabsContent>
				</Tabs>
			</PageHeader>

			<PageContent>
				<h1>
					Suspense with <em className="">loading.tsx</em>
				</h1>

				<p className="mt-6">
					This <code>Page.tsx</code> mimics the same behavior as{" "}
					<Link
						className="underline hover:no-underline"
						href="/fetching/page-default"
					>
						Fetching on a Page
					</Link>{" "}
					with the inclusion of a <code>loading.tsx</code> file in the same
					directory as the page.
				</p>

				<p className="">
					This relies on a co-located (same level as the <code>page.tsx</code>){" "}
					<code>loading.tsx</code> to perform two tasks. It will inject a{" "}
					<code>&lt;Suspense&gt;</code> boundary around the page, and it will
					include the exported component as the <em>fallback</em> to display
					while the inner component (the page) is fetching its data.
				</p>

				<p>
					The benefit is the users are given immediate feedback while the{" "}
					<em>Page</em> is completing its data fetching. The drawback is your
					entire page is still dependent on having all of it's data to render
					for the user. To improve further, we should make our data fetching
					more constrained to the UI that needs it by using{" "}
					<Link
						href="/fetching/suspense-rsc"
						className="underline hover:no-underline"
					>
						Suspense and child Server Components
					</Link>{" "}
					or{" "}
					<Link
						href="/fetching/suspense-use"
						className="underline hover:no-underline"
					>
						Suspense and the <code>use</code> hook
					</Link>
					.
				</p>

				<blockquote data-level="warning">
					Partial prerendering will technically work. However, since the data
					fetching is at the page level, it will block the rest of the page from
					its render. This effectively negates the benefits of PPR for this
					page.
				</blockquote>
			</PageContent>
		</>
	);
}
