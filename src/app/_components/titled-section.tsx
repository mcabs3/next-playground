import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export default function TitledSection({
	children,
	className,
	title,
}: {
	title: string;
	children: ReactNode | ReactNode[];
	className?: string;
}) {
	const id = useId();
	return (
		<section
			aria-labelledby={id}
			className={cn(
				"relative mt-8 rounded border border-neutral-800 bg-neutral-300/5 px-8 py-10",
				className,
			)}
		>
			<span
				id={id}
				className="absolute top-0 left-8 inline-block -translate-y-1/2 rounded border border-indigo-800 bg-indigo-900 px-4 py-2 font-mono text-neutral-100 text-xs tracking-widest"
			>
				{title}
			</span>
			{children}
		</section>
	);
}
