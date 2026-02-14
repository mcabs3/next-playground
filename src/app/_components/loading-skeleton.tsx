"use client";
import type { ReactNode } from "react";

/**
 * Deterministic row patterns for the skeleton grid.
 * Each sub-array contains 3 numbers that sum to 10 (column spans in a 10-col grid).
 */
const ROW_PATTERNS = [
	[3, 4, 3],
	[5, 2, 3],
	[2, 5, 3],
	[4, 3, 3],
	[2, 4, 4],
	[6, 2, 2],
];

function getRowPattern(index: number): number[] {
	return ROW_PATTERNS[index % ROW_PATTERNS.length];
}

export function LoadingSkeleton({
	children,
	rows = 3,
}: {
	children?: ReactNode;
	rows?: number;
}) {
	const rowContent = Array.from({ length: rows }, (_, i) => getRowPattern(i));

	return (
		<div className="relative grid place-items-center rounded border-2 border-gray-500 border-dashed p-8">
			{!!children && (
				<div className="-translate-1/2 absolute top-1/2 left-1/2 z-10 text-nowrap text-base">
					{children}
				</div>
			)}
			<div className="grid w-full grid-cols-10 gap-2 [&>div]:rounded-lg">
				{rowContent.map((rowData, i) =>
					rowData.map((span, j) => (
						<div
							key={`row${i}-col${j}-span${span}`}
							className="h-8 animate-pulse bg-white/10"
							style={{ gridColumn: `span ${span} / span ${span}` }}
						/>
					)),
				)}
			</div>
		</div>
	);
}
