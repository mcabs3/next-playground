import { unstable_cache } from "next/cache";

export function getRandomPokemonID(): number {
	return Math.floor(Math.random() * 150) + 1;
}

export interface Pokemon {
	name: string;
	sprites: {
		front_default: string;
	};
	species: {
		name: string;
		url: string;
	};
}

export async function getPokemon(id: number) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
			// cache: "no-store",
		});
		if (!response.ok) return null;
		const json = (await response.json()) as Pokemon;
		return json;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const getPokemonCached = unstable_cache(getPokemon, [], {
	revalidate: 10,
	tags: ["pokemon"],
});
