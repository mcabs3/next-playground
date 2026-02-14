import { ViewTransition } from "react";

export function PageContent({ children }: { children?: React.ReactNode }) {
	return (
		<ViewTransition enter="slide-in-from-bottom">
			<main className="mx-auto max-w-5xl px-8 pt-16 pb-12">{children}</main>
		</ViewTransition>
	);
}
