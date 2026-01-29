import { ReferenceLink } from "@/app/_components/reference-link";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<footer className="mx-auto max-w-5xl px-4 py-10">
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
