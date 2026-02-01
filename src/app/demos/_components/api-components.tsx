import type { NewsData, StatsData, WeatherData } from "../_lib/api";

function formatNumber(num: number): string {
	return Intl.NumberFormat("en-US").format(num);
}

function Stat({ label, value }: { label: string; value: string | number }) {
	return (
		<div className="flex flex-col bg-background p-4 text-muted-foreground leading-normal">
			<span className="font-bold text-primary">{label}</span>
			<div className="text-right text-xl">{value}</div>
		</div>
	);
}

export function Stats({ data, delay }: StatsData) {
	const { edge, origin, cacheHit } = data.stats;
	return (
		<section className="mb-8 rounded border bg-muted p-4 shadow">
			<span className="mb-4 inline-block font-bold text-3xl">
				Stats ({delay}ms)
			</span>
			<div className="mt-2 grid grid-cols-3 gap-4">
				<Stat label="Edge Requests" value={formatNumber(edge)} />
				<Stat label="Origin Requests" value={formatNumber(origin)} />
				<Stat label="Cache Hit Rate" value={cacheHit} />
			</div>
		</section>
	);
}

export function News({ data, delay }: NewsData) {
	return (
		<section className="mb-8">
			<span className="inline-block font-bold text-3xl">News ({delay}ms)</span>
			<div className="mt-2 space-y-4">
				{data.articles.map((article) => (
					<div key={article.title} className="rounded-lg border p-4">
						<span className="font-semibold text-blue-600 text-lg hover:underline">
							{article.title}
						</span>
						<div className="text-gray-500 text-sm">
							Source: {article.source}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export function Weather({ delay, data }: WeatherData) {
	return (
		<div className="mb-2 rounded bg-muted px-4 py-1 text-muted-foreground">
			<p>
				it is <em>{data.temperature}</em> and <em>{data.condition}</em> in{" "}
				<em>{data.city}</em> ({delay}ms)
			</p>
		</div>
	);
}
