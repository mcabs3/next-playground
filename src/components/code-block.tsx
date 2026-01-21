"use client";

import { code } from "@streamdown/code";
import { ComponentProps } from "react";
import { Streamdown } from "streamdown";

export const CodeBlock = ({
  children,
  ...props
}: ComponentProps<typeof Streamdown>) => {
  return (
    <Streamdown mode="static" plugins={{ code }} {...props}>
      {children}
    </Streamdown>
  );
};
