import { ReferenceLink } from "@/app/_components/reference-link";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="px-16 pt-20 pb-10">
			<header>
				<span className="font-mono text-neutral-600 tracking-tight">
					~/data-fetching
				</span>
				<h1>Data Fetching</h1>
			</header>
			{children}
			<footer className="pt-10">
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
		</div>
	);
}
