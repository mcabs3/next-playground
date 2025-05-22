import { ReferenceLink } from "@/app/_components/reference-link";
import { RSC } from "../_components/rsc";
import TitledSection from "@/app/_components/titled-section";
import { getRandomPokemonID, getPokemon } from "@/lib/pokemon";
import { PokemonDisplay } from "@/app/_components/pokemon-display";

export default function Page() {
  const id = getRandomPokemonID();
  const pokemon = getPokemon(id);
  return (
    <main className="">
      <TitledSection title="rendering/ssr/page.tsx" className="mt-10">
        <h1>Dynamic (SSR)</h1>
        <p>
          This page uses a{" "}
          <ReferenceLink reference="DynamicAPI" text="dynamic api" /> which opts
          the page into a SSR route. When a page accesses data that is specific
          to each request, it opts the route into a dynamic route.
        </p>
        <PokemonDisplay getPokemonPromise={pokemon} />
        <RSC />
      </TitledSection>
    </main>
  );
}
