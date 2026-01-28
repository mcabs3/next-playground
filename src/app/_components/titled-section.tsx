import { type JSX, type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export default function TitledSection({
	children,
	className,
	title,
	component,
}: {
	title: string;
	children: ReactNode | ReactNode[];
	className?: string;
	component?: keyof JSX.IntrinsicElements;
}) {
	const id = useId();
	const Component = component || "section";
	return (
		<Component
			aria-labelledby={id}
			className={cn("relative mt-8 rounded border px-8 py-10", className)}
		>
			<span
				id={id}
				className="absolute top-0 left-8 inline-block -translate-y-1/2 rounded border border-accent bg-accent px-4 py-2 font-bold font-mono text-accent-foreground text-xs tracking-widest"
			>
				{title}
			</span>
			{children}
		</Component>
	);
}
