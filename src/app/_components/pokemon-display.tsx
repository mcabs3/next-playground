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
      <div className="flex flex-col-reverse items-center border px-2 py-2 rounded-lg">
        <p className="capitalize">{pokemon?.name}</p>
        <Image
          width={100}
          height={100}
          src={pokemon?.sprites?.front_default}
          alt={pokemon?.name}
        />
      </div>
    </div>
  );
}
