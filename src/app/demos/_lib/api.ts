import { trace } from "@opentelemetry/api";
import { connection } from "next/server";

const tracer = trace.getTracer("demos");

type ApiDataType = "weather" | "news" | "stats" | "profile";

type ApiData<
	T extends ApiDataType,
	D extends Record<string, unknown> = Record<string, unknown>,
> = {
	type: T;
	delay: number;
	data: D;
};

export type StatsData = ApiData<
	"stats",
	{ stats: { edge: number; origin: number; cacheHit: string } }
>;

export type NewsData = ApiData<
	"news",
	{ articles: { title: string; source: string; url: string }[] }
>;

export type ProfileData = ApiData<"profile", { name: string; email: string }>;

export type WeatherData = ApiData<
	"weather",
	{ city: string; temperature: string; condition: string }
>;

export async function api<T extends ApiDataType>(
	type: T,
): Promise<
	T extends "stats"
		? StatsData
		: T extends "news"
			? NewsData
			: T extends "profile"
				? ProfileData
				: T extends "weather"
					? WeatherData
					: never
> {
	await connection();
	return tracer.startActiveSpan(`api.fetch.${type}`, async (span) => {
		try {
			// generate a random delay between 750ms and 2000ms
			const delay = Math.floor(Math.random() * (2000 - 750 + 1)) + 750;
			span.setAttribute("api.type", type);
			span.setAttribute("api.delay_ms", delay);

			const baseUrl =
				process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000";
			const protocol = process.env.VERCEL_PROJECT_PRODUCTION_URL
				? "https"
				: "http";
			const result = await fetch(
				`${protocol}://${baseUrl}/api/v1/${delay}/${type}`,
				{
					cache: "no-cache",
				},
			).then((res) => res.json());

			span.setAttribute("api.status", "success");
			return result;
		} catch (error) {
			span.setAttribute("api.status", "error");
			span.recordException(error as Error);
			throw error;
		} finally {
			span.end();
		}
	});
}
