import { revalidateTag, unstable_cache } from "next/cache";

function generateCachedID(id: string) {
  return unstable_cache(
    async () => Math.floor(Math.random() * 10000000000),
    undefined,
    { tags: [`id:${id}`] },
  );
}

const FAKE_ID = "some-fake-id";

export default async function Page() {
  async function reset() {
    "use server";
    console.log("reset");
    revalidateTag(`id:${FAKE_ID}`);
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
      <pre>{JSON.stringify({ fake_id: FAKE_ID, cacheId: id }, null, 2)}</pre>
      <form>
        <button
          formAction={reset}
          type="submit"
          className="border px-4 py-2 rounded"
        >
          Revaliate Cache
        </button>
      </form>
    </main>
  );
}
