interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<div className="font-mono">
			<nav className="sticky top-0 z-[1] flex items-center justify-between gap-4 bg-muted px-6 text-muted-foreground">
				<span className="font-bold font-mono uppercase tracking-widest">
					Demo App
				</span>

				<ul className="flex gap-4 text-muted-foreground text-sm">
					<li>Test</li>
					<li>Test</li>
					<li>Test</li>
				</ul>
			</nav>

			{children}
		</div>
	);
}
