import { trace } from "@opentelemetry/api";
import type { Metadata } from "next";
import { Suspense } from "react";
import TitledSection from "@/app/_components/titled-section";
import { News, Stats, Weather } from "../../_components/api-components";
import Main from "../../_components/main";
import { api } from "../../_lib/api";

const tracer = trace.getTracer("demos");

export const metadata: Metadata = {
	title: "Suspense with React Server Components",
};

async function ProfileRSC() {
	return tracer.startActiveSpan("rsc.profile", async (span) => {
		try {
			const profile = await api("profile");
			span.setAttribute("rsc.component", "ProfileRSC");
			span.setAttribute("rsc.delay_ms", profile.delay);
			return (
				<TitledSection title={`Profile (${profile.delay}ms)`}>
					<h1 className="pt-8 text-2xl">
						Welcome, {profile.data.name} ({profile.delay}ms)
					</h1>
				</TitledSection>
			);
		} finally {
			span.end();
		}
	});
}

async function WeatherRSC() {
	return tracer.startActiveSpan("rsc.weather", async (span) => {
		try {
			const weather = await api("weather");
			span.setAttribute("rsc.component", "WeatherRSC");
			span.setAttribute("rsc.delay_ms", weather.delay);
			return <Weather {...weather} />;
		} finally {
			span.end();
		}
	});
}

async function StatsRSC() {
	return tracer.startActiveSpan("rsc.stats", async (span) => {
		try {
			const stats = await api("stats");
			span.setAttribute("rsc.component", "StatsRSC");
			span.setAttribute("rsc.delay_ms", stats.delay);
			return <Stats {...stats} />;
		} finally {
			span.end();
		}
	});
}

async function NewsRSC() {
	return tracer.startActiveSpan("rsc.news", async (span) => {
		try {
			const news = await api("news");
			span.setAttribute("rsc.component", "NewsRSC");
			span.setAttribute("rsc.delay_ms", news.delay);
			return <News {...news} />;
		} finally {
			span.end();
		}
	});
}

function GridSkeleton({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-24 bg-muted p-2 pt-8 text-muted-foreground">
			<span className="absolute inset-0 z-[1] grid place-items-center">
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
