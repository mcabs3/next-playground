import { PokemonDisplay } from "@/app/_components/pokemon-display";
import TitledSection from "@/app/_components/titled-section";
import { getCurrentTime } from "@/lib/data";
import { getPokemonCached, getRandomPokemonID } from "@/lib/pokemon";
import Main from "../../_components/main";

export default async function Page() {
	const id = getRandomPokemonID();
	const pokemon = getPokemonCached(id);
	const date = await getCurrentTime();

	return (
		<Main>
			<TitledSection title="rendering/isr/page.tsx" className="">
				<p>This page was generated at: {date}</p>
				<PokemonDisplay getPokemonPromise={pokemon} />
			</TitledSection>
		</Main>
	);
}
