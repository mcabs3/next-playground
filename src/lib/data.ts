export async function getData(ms = 0) {
	const baseUrl = process.env.VERCEL_URL ?? "localhost:3000";
	const protocol = process.env.VERCEL_URL ? "https" : "http";
	return await fetch(`${protocol}://${baseUrl}/api/test?ms=${ms}`, {
		cache: "no-store",
	}).then((response) => response.json());
}

export async function getDataLonger() {
	return await getData(5000);
}

export async function getCurrentTime(): Promise<string> {
	return new Date().toLocaleTimeString();
}
