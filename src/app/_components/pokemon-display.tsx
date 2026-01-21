"use cilent";

import Image from "next/image";
import { use } from "react";
import type { Pokemon } from "@/lib/pokemon";
export function PokemonDisplay({
	getPokemonPromise,
}: {
	getPokemonPromise: Promise<Pokemon | null>;
}) {
	const pokemon = use(getPokemonPromise);
	if (!pokemon) {
		return <p>Pokemon not found</p>;
	}

	return (
		<div className="flex justify-center">
			<div className="flex flex-col-reverse items-center gap-8 rounded-lg border-4 border-[#FEC201] bg-blue-900 px-4 py-4 shadow">
				<p className="font-bold capitalize">{pokemon?.name}</p>
				<div className="rounded border-2 border-[#FEC201] bg-neutral-900 px-4 py-2 shadow-sm">
					<Image
						width={100}
						height={100}
						src={pokemon?.sprites?.front_default}
						alt={pokemon?.name}
					/>
				</div>
			</div>
		</div>
	);
}
