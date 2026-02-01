import type { Metadata } from "next";
import { Suspense } from "react";
import { News, Stats, Weather } from "../../_components/api-components";
import Main from "../../_components/main";
import { api } from "../../_lib/api";

export const metadata: Metadata = {
	title: "Suspense with React Server Components",
};

async function ProfileRSC() {
	const profile = await api("profile");
	return (
		<h1 className="pt-8 text-2xl">
			Welcome, {profile.data.name} ({profile.delay}ms)
		</h1>
	);
}

async function WeatherRSC() {
	const weather = await api("weather");
	return <Weather {...weather} />;
}

async function StatsRSC() {
	const stats = await api("stats");
	return <Stats {...stats} />;
}

async function NewsRSC() {
	const news = await api("news");
	return <News {...news} />;
}

function GridSkeleton({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative pt-8 bg-muted p-2 text-muted-foreground min-h-24">
			<span className="z-[1] absolute inset-0  grid place-items-center">
				{children}
			</span>
		</div>
	);
}

export default function Page() {
	return (
		<Main>
			<blockquote data-level="info" className="w-full">
				HTML Response is immediate while the content below streams in.
			</blockquote>
			<section className="grid grid-cols-2 gap-8 pt-8">
				<Suspense fallback={<GridSkeleton>Loading profile...</GridSkeleton>}>
					<ProfileRSC />
				</Suspense>
				<Suspense fallback={<GridSkeleton>Loading weather...</GridSkeleton>}>
					<WeatherRSC />
				</Suspense>
				<Suspense fallback={<GridSkeleton>Loading stats...</GridSkeleton>}>
					<StatsRSC />
				</Suspense>
				<Suspense fallback={<GridSkeleton>Loading news...</GridSkeleton>}>
					<NewsRSC />
				</Suspense>
			</section>
		</Main>
	);
}
