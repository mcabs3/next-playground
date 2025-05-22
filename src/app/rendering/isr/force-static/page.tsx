import { PokemonDisplay } from "@/app/_components/pokemon-display";
import { getCurrentTime } from "@/lib/data";
import { getPokemon, getRandomPokemonID } from "@/lib/pokemon";

export const revalidate = 10; // Revalidate every 10 seconds
export const dynamic = "force-static"; // Force static rendering

export default async function Page() {
  const id = getRandomPokemonID();
  const pokemon = getPokemon(id);
  const currentTime = await getCurrentTime();
  return (
    <section className="">
      <h2>force-static</h2>
      <blockquote>
        <p>This page will revalidate every 10 seconds</p>
        <i>Timestamp: {currentTime}</i>
      </blockquote>
      <p>
        This page data fetches a random pokemon using https://pokeapi.co/api/v2.
        By default, the fetch does not leverage any caching mechanics so this
        will opt this page into being a dynamic route. We can leverage exporting{" "}
        <code>revaliate</code> and <code>dynamic = "force-static"</code> to tell
        the page to cache the data calls (the pokemon call) to the time value
        (seconds).
      </p>
      <PokemonDisplay getPokemonPromise={pokemon} />
    </section>
  );
}
