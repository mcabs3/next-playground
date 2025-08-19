import { PokemonDisplay } from "@/app/_components/pokemon-display";
import TitledSection from "@/app/_components/titled-section";
import { getPokemon } from "@/lib/pokemon";

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({ id: id.toString() }));
}

export const dynamicParams = true;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = getPokemon(Number(id));
  return (
    <TitledSection
      title="rendering/isr/generate-static-params/[id]/page.tsx"
      className="mt-10"
    >
      <h3>generateStaticParams</h3>
      <p>
        This page leverages <code>generateStaticParams</code> to provide a
        build-time set a param combinations that allow Next to build static
        variants of these pages.
      </p>
      <p>
        This is a way to generate known static pages at build time, allowing
        these pages to be fully static from deployment.
      </p>
      <p>
        There is another optional export you can leverage{" "}
        <code>dynamicParams</code> which will handle how this route handles
        non-generated but accepted paths. <code>true (default)</code> will allow
        this page to be handles as a dynamic route (SSR), and <code>false</code>{" "}
        will direct the app to the not found.
      </p>
      <blockquote data-level="warning">
        Keep in mind that this will also ignore the headers and cookies.
      </blockquote>
      <p>ID: {id}</p>
      <PokemonDisplay getPokemonPromise={pokemon} />
    </TitledSection>
  );
}
