import type { Metadata } from "next";
import { News, Stats, Weather } from "../../_components/api-components";
import Main from "../../_components/main";
import { api } from "../../_lib/api";

export const metadata: Metadata = {
	title: "Suspense with loading.tsx",
};

export default async function Page() {
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
				<h1 className="pt-8 text-2xl">
					Welcome, {profile.data.name} ({profile.delay}ms)
				</h1>
				<Weather {...weather} />
				<Stats {...stats} />
				<News {...news} />
			</section>
		</Main>
	);
}
