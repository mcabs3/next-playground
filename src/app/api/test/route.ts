import { trace } from "@opentelemetry/api";
import type { NextRequest } from "next/server";

const tracer = trace.getTracer("api");

export async function GET(_request: NextRequest) {
	return tracer.startActiveSpan("api.handler.test", async (span) => {
		try {
			const delay = Math.floor(Math.random() * 2000);
			span.setAttribute("api.delay_ms", delay);

			await new Promise((resolve) => setTimeout(resolve, delay));
			return Response.json({ delay, unit: "ms" });
		} finally {
			span.end();
		}
	});
}
