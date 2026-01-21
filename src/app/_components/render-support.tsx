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
		<ul className="inline-flex gap-4 px-4 py-2 rounded text-sm items-center border border-neutral-800 absolute top-0 right-0">
			<li className="flex gap-1 items-center">
				SSG <SupportIcon status={ssg} />
			</li>
			<li className="flex gap-1 items-center">
				SSR <SupportIcon status={ssr} />
			</li>
			<li className="flex gap-1 items-center">
				ISR <SupportIcon status={isr} />
			</li>
			<li className="flex gap-1 items-center">
				PPR <SupportIcon status={ppr} />
			</li>
		</ul>
	);
}
