"use client";

import { useState } from "react";
import { Browser } from "./browser";

export function Frame({ src, hint }: { src: string; hint?: string }) {
	const [reset, setReset] = useState(0);

	return (
		<div className="grid" key={reset}>
			<Browser onRefresh={() => setReset((c) => c + 1)}>
				<iframe
					src={src}
					className="m-0 h-full min-h-[300px] w-full"
					title="test"
				/>
			</Browser>
			{!!hint && (
				<span className="mt-4 block text-center text-muted-foreground text-sm italic">
					{hint}
				</span>
			)}
		</div>
	);
}
