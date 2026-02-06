export async function GET(
	_request: Request,
	ctx: RouteContext<"/api/v1/[delay]/[type]">,
) {
	const { delay, type } = await ctx.params;

	const parsed = parseInt(delay, 10);
	const delayMs = Number.isNaN(parsed)
		? 2
		: Math.min(2000, Math.max(0, parsed));

	await new Promise((resolve) => setTimeout(resolve, delayMs));

	switch (type) {
		case "weather":
			return Response.json({
				type,
				delay,
				data: {
					city: "San Francisco",
					temperature: "18°C",
					condition: "Partly Cloudy",
				},
			});
		case "news":
			return Response.json({
				type,
				delay,
				data: {
					articles: [
						{
							title: "Breaking News: Major Event Unfolds",
							source: "News Network",
							url: "/",
						},
						{
							title: "Tech Innovations of the Year",
							source: "Tech Daily",
							url: "/",
						},
						{
							title: "Health Tips for a Better Life",
							source: "Health Magazine",
							url: "/",
						},
					],
				},
			});
		case "stats":
			return Response.json({
				type,
				delay,
				data: {
					stats: {
						edge: 1_500_000,
						origin: 350_000,
						cacheHit: "77%",
					},
				},
			});
		case "profile":
			return Response.json({
				type,
				delay,
				data: {
					name: "John Doe",
					email: "test@example.com",
				},
			});
		default:
			return Response.json({ type, delay, data: {} });
	}
}
