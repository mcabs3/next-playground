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
      <span className="text-red font-black text-sm inline-block">
        MISSING REFERENCE
      </span>
    );
  return (
    <a
      href={details.href}
      target="_blank"
      rel="noreferrer"
      className="underline hover:no-underline underline-offset-4"
    >
      {text || details.title}
    </a>
  );
}
