"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { ReactNode } from "react";

interface BrowserProps {
	children: ReactNode;
	onRefresh?: () => void;
}

export function Browser({ children, onRefresh = () => {} }: BrowserProps) {
	return (
		<div className="flex h-full w-full flex-col rounded-lg border shadow">
			<div className="relative flex w-full items-center justify-center rounded-t-md border-gray-900/5 border-b bg-gray-100 px-4 py-2">
				{/* Nav buttons */}
				<div className="absolute inset-y-0 left-4 flex items-center justify-center">
					<div className="mr-4 flex items-center space-x-1.5">
						<span className="size-2.5 rounded-full bg-red-400"></span>
						<span className="size-2.5 rounded-full bg-yellow-400"></span>
						<span className="size-2.5 rounded-full bg-green-400"></span>
					</div>
					<div className="hidden items-center justify-center text-gray-300 md:flex">
						<ChevronLeftIcon className="size-6" />
						<ChevronRightIcon className="size-6" />
					</div>
				</div>

				{/* Address bar */}
				<div className="relative mx-3 flex w-1/2 overflow-hidden whitespace-nowrap rounded-lg px-2.5 py-2 pr-12 text-center font-medium text-gray-400 text-xs ring ring-gray-900/10 selection:bg-gray-900 selection:text-white">
					<span className="w-full text-center">
						demo.app
						<div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-r from-transparent via-gray-100 to-gray-100"></div>
					</span>

					<button
						type="button"
						onClick={() => {
							onRefresh();
						}}
						aria-label="Refresh"
						className="absolute inset-y-0 right-0 inline-flex aspect-square items-center justify-center hover:text-gray-600"
					>
						<svg
							viewBox="0 0 15 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							height="14"
							aria-hidden="true"
						>
							<path
								d="M0 10.601C0 14.706 3.34465 18 7.50424 18C11.6638 18 15 14.706 15 10.601C15 10.1997 14.7114 9.90711 14.2954 9.90711C13.8964 9.90711 13.6333 10.1997 13.6333 10.601C13.6333 13.9619 10.9083 16.654 7.50424 16.654C4.10017 16.654 1.36672 13.9619 1.36672 10.601C1.36672 7.24849 4.10017 4.56479 7.50424 4.56479C8.14941 4.56479 8.75212 4.61496 9.25297 4.732L6.71477 7.20669C6.58744 7.34046 6.51952 7.50766 6.51952 7.68323C6.51952 8.06781 6.80815 8.35207 7.19015 8.35207C7.40238 8.35207 7.56367 8.28518 7.68251 8.15978L11.18 4.69856C11.3328 4.55643 11.3922 4.38922 11.3922 4.19693C11.3922 4.01301 11.3158 3.82908 11.18 3.69531L7.68251 0.20065C7.56367 0.0668834 7.39389 0 7.19015 0C6.80815 0 6.51952 0.300975 6.51952 0.685555C6.51952 0.861124 6.58744 1.02833 6.70628 1.1621L8.96435 3.36089C8.52292 3.27729 8.02207 3.21876 7.50424 3.21876C3.34465 3.21876 0 6.50441 0 10.601Z"
								fill="currentColor"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="relative h-full w-full grow overflow-hidden rounded-b-lg bg-white text-black">
				<div className="pointer-events-none absolute inset-0 z-10 rounded-b-lg ring-1 ring-white/5 ring-inset" />
				{children}
			</div>
		</div>
	);
}
