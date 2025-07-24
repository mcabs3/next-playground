import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export function Button({
  className,
  ...buttonProps
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn("border px-4 py-2 rounded", className)}
      {...buttonProps}
    >
      Revaliate Cache
    </button>
  );
}
