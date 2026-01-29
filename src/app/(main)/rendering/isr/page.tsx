import type { Metadata } from "next";
import { PageContent } from "@/app/_components/page-content";
import { PageHeader } from "@/app/_components/page-header";
import { PokemonDisplay } from "@/app/_components/pokemon-display";
import { RenderSupportList } from "@/app/_components/render-support";
import { getCurrentTime } from "@/lib/data";
import { getPokemonCached, getRandomPokemonID } from "@/lib/pokemon";

export const metadata: Metadata = {
	title: "Incremental Static Regeneration (ISR)",
};

export default async function Page() {
	const id = getRandomPokemonID();
	const pokemon = getPokemonCached(id);
	const date = await getCurrentTime();

	return (
		<>
			<PageHeader segment="~/rendering/isr">
				<RenderSupportList isr />
			</PageHeader>

			<PageContent>
				<h1>Incremental Static Regeneration</h1>
				<p>This page was generated at: {date}</p>
				<PokemonDisplay getPokemonPromise={pokemon} />
			</PageContent>
		</>
	);
}
