"use client";

import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";

export const CodeBlock = ({ children }: { children: string }) => {
  return (
    <Streamdown shikiTheme={["dracula", "dracula"]} plugins={{ code }}>
      {children}
    </Streamdown>
  );
};
