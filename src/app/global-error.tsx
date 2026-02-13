"use client";

import Link from "next/link";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body className="bg-[#0a0a0a] font-sans text-white antialiased">
				<main className="px-8 pt-20 pb-10">
					<h1 className="mb-4 font-bold text-2xl">Something went wrong</h1>
					<p className="mb-1 text-white/70">
						An unexpected error occurred
						{error.digest && (
							<span className="text-white/40"> (digest: {error.digest})</span>
						)}
					</p>
					<p className="mb-6 text-sm text-white/40">
						This file lives at <code>src/app/global-error.tsx</code>
					</p>
					<div className="flex gap-4">
						<button
							type="button"
							onClick={reset}
							className="rounded bg-white px-4 py-2 font-medium text-black text-sm transition-colors hover:bg-white/90"
						>
							Try again
						</button>
						<Link
							href="/"
							className="rounded border border-white/20 px-4 py-2 font-medium text-sm transition-colors hover:bg-white/10"
						>
							Go back to home
						</Link>
					</div>
				</main>
			</body>
		</html>
	);
}
