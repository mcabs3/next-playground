import { cookies as getCookies, headers as getHeaders } from "next/headers";

export async function RSC() {
	const headers = await getHeaders();
	const cookies = await getCookies();
	const keys = [...headers.keys()].filter((key) => key !== "cookie");
	const cooKeys = [...cookies.getAll().map((c) => c.name)];
	return (
		<div className="p-4">
			<h3>Request Information</h3>
			<b>Header Keys</b>
			{!keys.length && <p className="text-neutral-500 text-sm">No headers</p>}
			{!!keys.length && (
				<ul className="flex flex-wrap gap-2">
					{keys.map((key) => (
						<li
							key={key}
							className="rounded border border-neutral-600 px-2 py-1 text-sm"
						>
							{key}: {headers.get(key)}
						</li>
					))}
				</ul>
			)}

			<b className="mt-4 block">Cookie Keys</b>
			{!cooKeys.length && (
				<p className="text-neutral-500 text-sm">No cookies</p>
			)}
			{!!cooKeys.length && (
				<ul className="flex flex-wrap gap-2">
					{cooKeys.map((key) => (
						<li
							key={key}
							className="rounded border border-neutral-600 px-2 text-sm"
						>
							{key}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
