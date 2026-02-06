import type { Metadata } from "next";
import { PokemonDisplay } from "@/app/_components/pokemon-display";
import Main from "@/app/demos/_components/main";
import { getCurrentTime } from "@/lib/data";
import { getPokemon, getRandomPokemonID } from "@/lib/pokemon";
import { RSC } from "../../fetching/_components/rsc";

export const metadata: Metadata = {
	title: "force-static Demo - Next.js by Example",
	description: "Demo of using force-static route option for ISR in Next.js",
};

export const revalidate = 10; // Revalidate every 10 seconds
export const dynamic = "force-static"; // Force static rendering

export default async function Page() {
	const id = getRandomPokemonID();
	const pokemon = getPokemon(id);
	const currentTime = await getCurrentTime();
	return (
		<Main>
			<h1>force-static</h1>
			<blockquote className="w-full">
				<p>This page will revalidate every 10 seconds</p>
				<i>Timestamp: {currentTime}</i>
			</blockquote>
			<RSC />
			<p>
				This page data fetches a random pokemon using https://pokeapi.co/api/v2.
				By default, the fetch does not leverage any caching mechanics so this
				will opt this page into being a dynamic route. We can leverage exporting{" "}
				<code>revaliate</code> and <code>dynamic = "force-static"</code> to tell
				the page to cache the data calls (the pokemon call) to the time value
				(seconds).
			</p>
			<PokemonDisplay getPokemonPromise={pokemon} />
		</Main>
	);
}
