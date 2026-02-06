import type { Metadata } from "next";
import { PokemonDisplay } from "@/app/_components/pokemon-display";
import TitledSection from "@/app/_components/titled-section";
import { getPokemon } from "@/lib/pokemon";
import { RSC } from "@/app/(main)/rendering/_components/rsc";
import Main from "@/app/demos/_components/main";

export const metadata: Metadata = {
	title: "generateStaticParams Demo - Next.js by Example",
	description:
		"Demo of using generateStaticParams for static page generation in Next.js",
};

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
		<Main>
			<TitledSection
				title="rendering/isr/generate-static-params/[id]/page.tsx"
				className="mt-10"
			>
				<h3>generateStaticParams</h3>
				<blockquote>
					No content from this page relies on request data (headers, cookies,
					searchParams). Introducing request data would make this a dynamic
					route.
				</blockquote>
				<p>
					This page <code>generateStaticParams</code> to provide a build-time
					set a param combinations that allow Next to build static variants of
					these pages.
				</p>
				<p>
					This is a way to generate known static pages at build time, allowing
					these pages to be fully static from deployment like a traditional SSG
					route.
				</p>
				<p>
					You can optionally expand this route with <code>dynamicParams</code>{" "}
					to handle non-generated but accepted paths.{" "}
					<code>true (default)</code> will allow this page to be handled as a
					dynamic route (SSR), and <code>false</code> will direct the app to the
					not found.
				</p>
				<p>ID: {id}</p>
				<PokemonDisplay getPokemonPromise={pokemon} />
			</TitledSection>
		</Main>
	);
}
