import { headers } from "next/headers";

export async function RSC() {
  const keys = (await headers()).keys();
  return <pre>Headers: {JSON.stringify(keys)}</pre>;
}
