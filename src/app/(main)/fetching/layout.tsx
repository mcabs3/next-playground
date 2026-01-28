import { ReferenceLink } from "@/app/_components/reference-link";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* <header> */}
			{/* 	<span className="font-mono text-neutral-600 tracking-tight"> */}
			{/* 		~/data-fetching */}
			{/* 	</span> */}
			{/* 	<h1>Data Fetching Patterns</h1> */}
			{/* </header> */}
			{children}
			<footer className="mx-auto max-w-5xl px-4 pt-10">
				<span className="inline-block pb-4 font-bold text-neutral-500 text-sm uppercase">
					Resources
				</span>
				<ul>
					<li>
						<ReferenceLink reference="RoutingAndStreaming" />
					</li>
					<li>
						<ReferenceLink reference="ReactSuspense" />
					</li>
				</ul>
			</footer>
		</>
	);
}
