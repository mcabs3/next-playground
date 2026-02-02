export async function getData(ms = 0) {
	// biome-ignore lint/style/noNonNullAssertion: for demo purposes
	return await fetch(`https://${process.env.VERCEL_URL!}/api/test?ms=${ms}`, {
		cache: "no-store",
	}).then((response) => response.json());
}

export async function getDataLonger() {
	return await getData(5000);
}

export async function getCurrentTime(): Promise<string> {
	return new Date().toLocaleTimeString();
}
