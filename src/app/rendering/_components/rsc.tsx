import { cookies as getCookies, headers as getHeaders } from "next/headers";

export async function RSC() {
  const headers = await getHeaders();
  const cookies = await getCookies();
  const keys = [...headers.keys()].filter((key) => key !== "cookie");
  const cooKeys = [...cookies.getAll().map((c) => c.name)];
  return (
    <div className="p-4">
      <div>Request Information</div>
      <span>Header Keys</span>
      <ul className="flex flex-wrap gap-2">
        {keys.map((key) => (
          <li
            key={key}
            className="text-sm border border-neutral-600 px-2 py-1 rounded"
          >
            {key}: {headers.get(key)}
          </li>
        ))}
      </ul>

      <span className="mt-4 block">Cookie Keys</span>
      <ul className="flex flex-wrap gap-2">
        {cooKeys.map((key) => (
          <li
            key={key}
            className="text-sm border border-neutral-600 px-2 rounded"
          >
            {key}
          </li>
        ))}
      </ul>
    </div>
  );
}
