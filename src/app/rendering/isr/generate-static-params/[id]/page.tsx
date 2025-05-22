import { PokemonDisplay } from "@/app/_components/pokemon-display";
import { getPokemon } from "@/lib/pokemon";

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({ id: id.toString() }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = getPokemon(Number(id));
  return (
    <main className="">
      <h1>ISR - generateStaticParams</h1>
      <p>
        This page leverages <code>generateStaticParams</code> to provide a
        build-time set a param combinations that allow Next to build static
        variants of these pages.
      </p>
      <p>This is helpful for content like blog posts</p>
      <p>ID: {id}</p>
      <PokemonDisplay getPokemonPromise={pokemon} />
    </main>
  );
}
