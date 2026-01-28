"use client";

import { useState } from "react";
import { Browser } from "./browser";

export function Frame({ src }: { src: string }) {
	const [reset, setReset] = useState(0);

	return (
		<div className="flex grow" key={reset}>
			<Browser onRefresh={() => setReset((c) => c + 1)}>
				<iframe
					src={src}
					className="m-0 h-full min-h-[300px] w-full"
					title="test"
				/>
			</Browser>
		</div>
	);
}
