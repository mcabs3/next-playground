import { CheckSquare as Check, Square, XSquare } from "lucide-react";

type RenderSupportType = boolean | "partial";

function SupportIcon({ status }: { status?: RenderSupportType }) {
	switch (status) {
		case true:
			return <Check className="w-4 text-green-500" />;
		case false:
			return <XSquare className="w-4 text-red-500" />;
		case "partial":
			return <Check className="w-4 text-yellow-500" />;
		default:
			return <Square className="w-4 text-neutral-500" />;
	}
}

export function RenderSupportList({
	ssg,
	ssr,
	isr,
	ppr,
}: {
	ssg?: RenderSupportType;
	ssr?: RenderSupportType;
	isr?: RenderSupportType;
	ppr?: RenderSupportType;
}) {
	return (
		<ul className="absolute top-0 right-0 inline-flex items-center gap-4 rounded border border-neutral-800 px-4 py-2 text-sm">
			<li className="flex items-center gap-1">
				SSG <SupportIcon status={ssg} />
			</li>
			<li className="flex items-center gap-1">
				SSR <SupportIcon status={ssr} />
			</li>
			<li className="flex items-center gap-1">
				ISR <SupportIcon status={isr} />
			</li>
			<li className="flex items-center gap-1">
				PPR <SupportIcon status={ppr} />
			</li>
		</ul>
	);
}
