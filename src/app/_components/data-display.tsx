import { CodeBlock } from "@/components/code-block";
import { Streamdown } from "streamdown";

export function DataDisplay({ title, data }: { title?: string; data: any }) {
  return (
    <div>
      {!!title && <h3>{title}</h3>}
      <CodeBlock controls={false}>{`
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
`}</CodeBlock>
    </div>
  );
}
