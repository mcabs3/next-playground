"use client";
import type { ReactNode } from "react";

// a function that generates 3 numbers that add up to 10 with a minimum of 1
function useGeneratedRow(rowCount: number) {
	const results: number[][] = [];
	for (let r = 0; r < rowCount; r++) {
		let sum = 0;
		const numbers = [];
		for (let i = 0; i < 2; i++) {
			const num = Math.floor(Math.random() * (10 - sum - (3 - i))) + 1;
			numbers.push(num);
			sum += num;
		}
		numbers.push(10 - sum);
		results.push(numbers);
	}
	return results;
}

export const LoadingSkeleton = ({
	children,
	rows = 3,
}: {
	children?: ReactNode | ReactNode[];
	rows?: number;
}) => {
	const rowContent = useGeneratedRow(rows);

	return (
		<div className="relative grid place-items-center rounded border-2 border-gray-500 border-dashed p-8">
			{!!children && (
				<div className="-translate-1/2 absolute top-1/2 left-1/2 z-10 text-nowrap text-base">
					{children}
				</div>
			)}
			<div className="grid w-full grid-cols-10 gap-2 [&>div]:rounded-lg">
				{rowContent.map((rowData, i) =>
					rowData.map((row, j) => (
						<div
							key={`${i}-${j}-${row}`}
							className="h-8 animate-pulse bg-white/10"
							style={{ gridColumn: `span ${row} / span ${row}` }}
						/>
					)),
				)}
			</div>
		</div>
	);
};
