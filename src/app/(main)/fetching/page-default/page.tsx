import type { Metadata } from "next";
import Link from "next/link";
import { RenderSupportList } from "@/app/_components/render-support";
import { CodeBlock } from "@/components/code-block";
import { Frame } from "@/components/frame";
import { PageHeader } from "@/app/_components/page-header";
import { PageContent } from "@/app/_components/page-content";

export const metadata: Metadata = {
	title: "Fetching on the Page with RSC",
};

export default function Page(_props: PageProps<"/fetching/page-default">) {
	return (
		<>
			<PageHeader segment="~/fetching/suspense-rsc">
				<RenderSupportList ssr isr="partial" />
				<Frame
					src="/demos/fetching/suspense-rsc"
					hint="Live demo of page level fetching"
				/>
			</PageHeader>

			<PageContent>
				<h1>Fetching at the Page RSC</h1>

				<p>
					It is common to use the <code>Page.tsx</code> as the entry point to
					fetch and compute all of the content for the page using RSC before
					rendering the page. <em>This page is a Server Component</em> that
					fetches two "dummy" pieces of data.
				</p>

				<Frame src="/demos/fetching/page-default" />

				<CodeBlock className="my-8 font-mono">
					{`\`\`\`typescript
export default async function Page({ params }: PageProps<"/fetching/page-default">) {
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

				<p>
					What is important to note is there is now an implied <b>boundary</b>{" "}
					at the page-level because we must wait for the data to be fetched
					before proceeding with the page. This means the page is entirely
					blocked from displaying any content, which &quot;is not fast&quot;.
					While we are able to get the root layout to render and see that we
					have navigated, we still cannot show any of the page content until
					data has been fully fetched.
				</p>

				<blockquote data-level="warning">
					Partial prerendering will technically work. However, since the data
					fetching is at the page level, it will block the rest of the page from
					its render. This effectively negates the benefits of PPR for this
					page.
				</blockquote>

				<h2 className="mt-4 pb-2">Key Takeaways</h2>
				<ul className="list-inside list-disc space-y-4 not-italic">
					<li>
						Good - You can optimize your data fetching with utilities such as{" "}
						<code>Promise.all</code>, but <b>boundary</b> blocking still
						applies. Your <code>Page</code> cannot render until the promises
						resolve. The recommended approach is to move data fetching to a
						child RSC to move the <b>boundary</b> lower in the page tree.{" "}
						<Link
							className="not-italic underline hover:no-underline"
							href="/fetching/suspense-rsc"
						>
							Learn more Suspense + RSC
						</Link>
					</li>

					<li>
						Better - By default, the <code>Page</code> will appear to
						&quot;hang&quot; 👎 as it waits for the data to load. You should
						avoid this by introducing a page-level <code>loading.tsx</code> to
						provide immediate feedback to users while data is loading.{" "}
						<Link
							className="not-italic underline hover:no-underline"
							href="/fetching/suspense-page"
						>
							Learn more about loading.tsx
						</Link>
					</li>

					<li>
						Best - Leveraging the RSC architecture, move the data fetching to
						components lower in the tree.{" "}
						<Link
							className="not-italic underline hover:no-underline"
							href="/fetching/suspense-rsc"
						>
							Take a look at using params with Suspense + RSC
						</Link>
					</li>

					<li>
						Keep in mind, using <code>params</code> in the <code>Page.tsx</code>{" "}
						requires the page to be an async component. Instead it is preferred
						to pass the params to child components that consume the params.
					</li>
				</ul>
			</PageContent>
		</>
	);
}
