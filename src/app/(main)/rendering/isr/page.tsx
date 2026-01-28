import { PokemonDisplay } from "@/app/_components/pokemon-display";
import TitledSection from "@/app/_components/titled-section";
import { getCurrentTime } from "@/lib/data";
import { getPokemonCached, getRandomPokemonID } from "@/lib/pokemon";

export default async function Page() {
	const id = getRandomPokemonID();
	const pokemon = getPokemonCached(id);
	const date = await getCurrentTime();

	return (
		<TitledSection title="rendering/isr/page.tsx" className="mt-10">
			<p>This page was generated at: {date}</p>
			<PokemonDisplay getPokemonPromise={pokemon} />
		</TitledSection>
	);
}
