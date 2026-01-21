import { Suspense } from "react";
import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
import { CodeBlock } from "@/components/code-block";
import { getDataLonger } from "@/lib/data";

async function AsyncDataComponent() {
	const data = await getDataLonger();
	return (
		<CodeBlock>{`\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\``}</CodeBlock>
	);
}

export default function DataLongerComponent() {
	return (
		<Suspense
			fallback={
				<LoadingSkeleton>
					Loading <code>&lt;DataComponentLonger /&gt;</code>
				</LoadingSkeleton>
			}
		>
			<AsyncDataComponent />
		</Suspense>
	);
}
