import { connection } from "next/server";
import { Fragment, ReactNode } from "react";

// a function that generates 3 numbers that add up to 10 with a minimum of 1
function generateNumbers() {
  const numbers = [];
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    const num = Math.floor(Math.random() * (10 - sum - (3 - i))) + 1;
    numbers.push(num);
    sum += num;
  }
  numbers.push(10 - sum);
  return numbers;
}

export const LoadingSkeleton = async ({
  children,
  rows = 3,
}: {
  children?: ReactNode | ReactNode[];
  rows?: number;
}) => {
  await connection();

  const rowContent = [];
  while (rowContent.length < rows) {
    const numbers = generateNumbers();
    const row = numbers.map((num) => (
      <div
        key={`${rowContent.length}-${num}`}
        className="h-8 bg-white/10 animate-pulse"
        style={{ gridColumn: `span ${num} / span ${num}` }}
      />
    ));
    rowContent.push(<Fragment key={rowContent.length}>{row}</Fragment>);
  }
  return (
    <div className=" relative grid place-items-center border-2 rounded border-dashed border-gray-500 p-8">
      {!!children && (
        <span className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-base">
          {children}
        </span>
      )}
      <div className="grid grid-cols-10 w-full gap-2 [&>div]:rounded-lg">
        {rowContent}
      </div>
    </div>
  );
};
