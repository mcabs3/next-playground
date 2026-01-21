import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const delay = Math.floor(Math.random() * 2000);
	await new Promise((resolve) => setTimeout(resolve, delay));
	return Response.json({ delay, unit: "ms" });
}
