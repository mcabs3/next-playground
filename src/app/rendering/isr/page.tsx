import { PokemonDisplay } from "@/app/_components/pokemon-display";
import TitledSection from "@/app/_components/titled-section";
import { getCurrentTime } from "@/lib/data";
import { getRandomPokemonID, getPokemonCached } from "@/lib/pokemon";

export default async function Page() {
  const id = getRandomPokemonID();
  const pokemon = getPokemonCached(id);
  const date = await getCurrentTime();

  return (
    <TitledSection title="page.tsx" className="mt-10">
      <p>This page was generated at: {date}</p>
      <PokemonDisplay getPokemonPromise={pokemon} />
    </TitledSection>
  );
}
