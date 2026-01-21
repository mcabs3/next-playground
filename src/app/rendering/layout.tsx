import { ReferenceLink } from "../_components/reference-link";
import TitledSection from "../_components/titled-section";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="px-16 pt-20 pb-10">
			<span className="font-mono text-neutral-600 tracking-tight">
				~/rendering
			</span>
			<TitledSection title="rendering/layout.tsx">
				<h2>Rendering Strategies</h2>
				{children}
			</TitledSection>
			<footer className="pt-10">
				<span className="text-sm font-bold text-neutral-500 pb-4 inline-block uppercase">
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
