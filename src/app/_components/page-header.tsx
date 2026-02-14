import { ViewTransition } from "react";

interface Props {
	children?: React.ReactNode;
	segment?: string;
}

export function PageHeader({ children, segment }: Props) {
	return (
		<ViewTransition enter="slide-in-from-top" update="crossfade">
			<div className="bg-muted">
				<header className="mx-auto max-w-5xl py-8">
					<span className="mb-4 inline-block font-mono text-muted-foreground tracking-tight">
						{segment}
					</span>
					{children}
				</header>
			</div>
		</ViewTransition>
	);
}
