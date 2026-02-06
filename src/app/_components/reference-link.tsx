import { NEXT_REFERENCES } from "@/lib/links";

export function ReferenceLink({
	reference,
	text,
}: {
	reference: keyof typeof NEXT_REFERENCES;
	text?: string;
}) {
	const details = NEXT_REFERENCES[reference];
	if (!details)
		return (
			<span className="inline-block font-black text-red text-sm">
				MISSING REFERENCE
			</span>
		);
	return (
		<a
			href={details.href}
			target="_blank"
			rel="noreferrer"
			className="underline underline-offset-4 hover:no-underline"
		>
			{text || details.title}
		</a>
	);
}
