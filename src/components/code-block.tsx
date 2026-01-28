"use client";

import { code } from "@streamdown/code";
import type { ComponentProps } from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

export const CodeBlock = ({
	children,
	className,
	...props
}: ComponentProps<typeof Streamdown>) => {
	return (
		<Streamdown
			mode="static"
			className={cn(className, "rounded-xl bg-background")}
			controls={false}
			plugins={{ code }}
			{...props}
		>
			{children}
		</Streamdown>
	);
};
