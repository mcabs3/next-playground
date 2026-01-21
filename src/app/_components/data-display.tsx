import { CodeBlock } from "@/components/code-block";

export function DataDisplay({
	title,
	data,
}: {
	title?: string;
	data: unknown;
}) {
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
