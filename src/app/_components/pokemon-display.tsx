"use cilent";
import { Pokemon } from "@/lib/pokemon";

import Image from "next/image";
import { use } from "react";
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
      <div className="flex flex-col-reverse items-center border-4 border-[#FEC201] px-4 py-4 rounded-lg gap-8 bg-blue-900 shadow">
        <p className="capitalize font-bold">{pokemon?.name}</p>
        <div className="border-2 border-[#FEC201] rounded py-2 px-4 bg-neutral-900 shadow-sm">
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
