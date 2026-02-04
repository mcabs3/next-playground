import type { Metadata } from "next";
import { News, Stats, Weather } from "../../_components/api-components";
import Main from "../../_components/main";
import { api } from "../../_lib/api";
import TitledSection from "@/app/_components/titled-section";

export const metadata: Metadata = {
	title: "Fetching on the Page with RSC",
};

export default async function Page(
	_props: PageProps<"/fetching/page-default">,
) {
	const [weather, news, stats, profile] = await Promise.all([
		api("weather"),
		api("news"),
		api("stats"),
		api("profile"),
	]);
	const maxDelay = Math.max(
		weather.delay,
		news.delay,
		stats.delay,
		profile.delay,
	);
	return (
		<Main>
			<blockquote data-level="info">
				The total page load time is approximately {maxDelay}ms, which is the
				longest individual API call delay.
			</blockquote>
			<section className="grid grid-cols-2 gap-8 pt-8">
				<TitledSection title={`Profile (${profile.delay}ms)`}>
					<h1 className="pt-8 text-2xl">
						Welcome, {profile.data.name} ({profile.delay}ms)
					</h1>
				</TitledSection>
				<Weather {...weather} />
				<Stats {...stats} />
				<News {...news} />
			</section>
		</Main>
	);
}
