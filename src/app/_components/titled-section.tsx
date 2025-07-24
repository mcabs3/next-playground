import { cn } from "@/lib/utils";
import { ReactNode, useId } from "react";

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
        "relative border border-neutral-800  py-10 px-8 rounded mt-8 bg-neutral-300/5",
        className,
      )}
    >
      <span
        id={id}
        className="px-4 py-2 tracking-widest text-xs rounded top-0 left-8 font-mono absolute inline-block bg-indigo-900 -translate-y-1/2 text-neutral-100 border border-indigo-800"
      >
        {title}
      </span>
      {children}
    </section>
  );
}
