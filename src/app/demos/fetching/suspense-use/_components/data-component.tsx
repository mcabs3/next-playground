"use client";

import { use } from "react";
import { DataDisplay } from "@/app/_components/data-display";

export default function DataComponent({
	dataPromise,
}: {
	dataPromise: Promise<unknown>;
}) {
	const data = use(dataPromise);
	return <DataDisplay data={data} />;
}
