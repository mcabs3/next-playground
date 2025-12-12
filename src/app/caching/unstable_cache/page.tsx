import { Button } from "@/components/ui/button";
import { revalidateTag, unstable_cache } from "next/cache";

function generateCachedID(id: string) {
  return unstable_cache(
    async () => `${id}_${Math.floor(Math.random() * 10000000000)}`,
    undefined,
    { tags: [`id:${id}`] },
  );
}

const FAKE_ID = "some-fake-id";

export default async function Page() {
  async function reset() {
    "use server";
    console.log("reset");
    revalidateTag(`id:${FAKE_ID}`, "max");
  }
  const getId = generateCachedID(FAKE_ID);

  const id = await getId();
  return (
    <main className="grid grid-cols-1 gap-4 px-8 pt-16">
      <h1>Unstable Cache</h1>
      <p>
        <code>unstable_cache</code> is a next-native way to cache the data
        returned from promises.
      </p>
      <ul className="list-disc">
        <li>
          <code>fake_id</code> is a simulated id of an entity (record id, path
          param, etc).
        </li>
        <li>
          <code>cachedToken</code> is a random generated id that is stored in
          cache and will not change until the tag <code>id:{FAKE_ID}</code> is
          revalidated.
        </li>
      </ul>
      <pre>
        {JSON.stringify({ fake_id: FAKE_ID, cachedToken: id }, null, 2)}
      </pre>
      <form>
        <Button formAction={reset} type="submit">
          Revalidate Cache
        </Button>
      </form>
    </main>
  );
}
