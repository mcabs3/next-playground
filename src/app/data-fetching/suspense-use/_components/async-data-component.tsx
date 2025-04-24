"use client";

import { use } from "react";

export default function DataComponent({ dataPromise }: any) {
  const data = use(dataPromise);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
