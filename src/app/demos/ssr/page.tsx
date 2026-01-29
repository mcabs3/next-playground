import { PokemonDisplay } from "@/app/_components/pokemon-display";
import { getPokemon, getRandomPokemonID } from "@/lib/pokemon";
import { RSC } from "../fetching/_components/rsc";
import Main from "../_components/main";

export default function Page() {
	const id = getRandomPokemonID();
	const pokemon = getPokemon(id);
	return (
		<Main>
			<PokemonDisplay getPokemonPromise={pokemon} />
			<div className="mt-8">
				<RSC />
			</div>
		</Main>
	);
}
