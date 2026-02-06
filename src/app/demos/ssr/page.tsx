import type { Metadata } from "next";
import Main from "../_components/main";
import { RSC } from "../fetching/_components/rsc";

export const metadata: Metadata = {
	title: "SSR Demo - Next.js by Example",
	description: "Demo of Server-Side Rendering in Next.js",
};

export default function Page() {
	return (
		<Main>
			Timestamp: {new Date().toISOString()}
			<RSC />
		</Main>
	);
}
