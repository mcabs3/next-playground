import { PokemonDisplay } from "@/app/_components/pokemon-display";
import { ReferenceLink } from "@/app/_components/reference-link";
import TitledSection from "@/app/_components/titled-section";
import { getPokemon, getRandomPokemonID } from "@/lib/pokemon";
import { RSC } from "../_components/rsc";

export default function Page() {
	const id = getRandomPokemonID();
	const pokemon = getPokemon(id);
	return (
		<main className="">
			<TitledSection title="rendering/ssr/page.tsx" className="mt-10">
				<h1>Dynamic (SSR)</h1>
				<div className="space-y-4">
					<p className="mb-3">
						Server-side Rendering (SSR) in Next.js generates HTML on each
						request, providing fresh, dynamic content that's personalized for
						each user. This page uses a{" "}
						<ReferenceLink reference="DynamicAPI" text="dynamic api" /> which
						opts the page into a SSR route.
					</p>

					<h2 className="mt-4 font-semibold text-xl">Key Advantages</h2>
					<ul className="list-disc space-y-1 pl-6">
						<li>
							<strong>Real-time Data</strong> - Always displays the latest
							information from your data sources
						</li>
						<li>
							<strong>Personalization</strong> - Content can be tailored to
							individual users based on cookies, headers, or auth state
						</li>
						<li>
							<strong>SEO Benefits</strong> - Search engines see complete
							content on initial request
						</li>
						<li>
							<strong>Request-specific Information</strong> - Access to cookies,
							headers, and request data
						</li>
					</ul>

					<h2 className="mt-4 font-semibold text-xl">Trade-offs</h2>
					<ul className="list-disc space-y-1 pl-6">
						<li>
							<strong>Performance</strong> - Slower Time to First Byte (TTFB)
							compared to static rendering
						</li>
						<li>
							<strong>Server Load</strong> - Higher computational demands with
							increased traffic
						</li>
						<li>
							<strong>Complexity</strong> - May require additional caching
							strategies for optimal performance
						</li>
					</ul>

					<p className="mt-4">
						When a page accesses data that is specific to each request (like
						cookies, headers, or searchParams), Next.js automatically opts the
						route into dynamic rendering. The random Pokemon displayed below
						demonstrates server-side rendering by generating a new Pokemon on
						each page request.
					</p>
				</div>
				<PokemonDisplay getPokemonPromise={pokemon} />
				<div className="mt-8">
					<RSC />
				</div>
			</TitledSection>
		</main>
	);
}
