import { connection } from "next/server";

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
	// generate a random delay between 150ms and 2000ms
	const delay = Math.floor(Math.random() * (2000 - 750 + 1)) + 750;
	return fetch(`${process.env.VERCEL_URL}/api/v1/${delay}/${type}`, {
		cache: "no-cache",
	}).then((res) => res.json());
}
