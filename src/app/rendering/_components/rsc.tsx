import { getCurrentTime } from "@/lib/data";
import { cookies, headers } from "next/headers";

export async function RSC() {
  const keys = (await headers()).keys();
  const cooKeys = (await cookies()).getAll().map((c) => c.name);
  return (
    <div className="">
      <pre className="leading-loose">
        {JSON.stringify({ headers: [...keys], cookies: cooKeys }, null, 2)}
      </pre>
    </div>
  );
}
