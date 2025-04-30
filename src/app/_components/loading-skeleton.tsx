"use client";
import { useEffect, useState, type ReactNode } from "react";

// a function that generates 3 numbers that add up to 10 with a minimum of 1
function useGeneratedRow(rowCount: number) {
  // const [rows, setNumbers] = useState<number[][]>([]);
  // useEffect(() => {
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
  // setNumbers(results);
  // }, [rowCount]);
  // return rows;
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
    <div className=" relative grid place-items-center border-2 rounded border-dashed border-gray-500 p-8">
      {!!children && (
        <div className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-base text-nowrap">
          {children}
        </div>
      )}
      <div className="grid grid-cols-10 w-full gap-2 [&>div]:rounded-lg">
        {rowContent.map((rowData, i) =>
          rowData.map((row, j) => (
            <div
              key={`${i}-${j}-${row}`}
              className="h-8 bg-white/10 animate-pulse"
              style={{ gridColumn: `span ${row} / span ${row}` }}
            />
          )),
        )}
      </div>
    </div>
  );
};
