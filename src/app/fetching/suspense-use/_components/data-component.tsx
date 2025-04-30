"use client";

import { DataDisplay } from "@/app/_components/data-display";
import { use } from "react";

export default function DataComponent({ dataPromise }: any) {
  const data = use(dataPromise);
  return <DataDisplay data={data} />;
}
