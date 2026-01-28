import TitledSection from "@/app/_components/titled-section";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<TitledSection title="rendering/isr/layout.tsx" className="mt-10">
				<h1>Incremental Static Regeneration</h1>
				<p>
					Incremental Static Regeneration (ISR) allows the route to be declared
					"dynamic", meaning that it will be built during runtime (SSR).
					However, if the content for the page does not relate to request data
					(ex. <code>cookies</code> or <code>headers</code>), you can enable
					your page to cache the contents of the page for a duration, or until
					the content needs to be revalidated (tag).
				</p>
				<p>
					ISR "natually" occurs when the dynamic-data for the page leverages the
					data-caching mechanisms in Next.js (
					<code className="text-nowrap">"use cache"</code> and{" "}
					<code>unstable_cache</code>). If your content is using a revalidation
					model (time or tag), then the page will intelligently cache itself
					until the data needs to be revalidated.
				</p>
				{children}
			</TitledSection>
		</main>
	);
}
