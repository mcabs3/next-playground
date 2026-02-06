import type { Metadata } from "next";
import Main from "../_components/main";

export const metadata: Metadata = {
	title: "Data Fetching Demos - Next.js by Example",
	description: "Explore different data fetching patterns in Next.js",
};

export default function Page() {
	return (
		<Main>
			<p>Select a data fetching pattern in the left to explore.</p>
		</Main>
	);
}
