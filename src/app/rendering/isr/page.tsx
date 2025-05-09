import { RSC } from "./_components/rsc";

// See: https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const revalidate = 10; // Revalidate every 10 seconds
// AND
export const dynamic = "force-static"; // Force dynamic rendering
// OR
// export async function generateStaticParams() { return [] }

async function getCurrentTime(): Promise<string> {
  return new Promise((res) => {
    setTimeout(() => {
      res(new Date().toLocaleTimeString());
    }, 1000);
  });
}

export default async function Page() {
  const currentTime = await getCurrentTime();
  return (
    <main className="px-16 pt-20">
      <h1>ISR Page</h1>
      <p>This page was generated at: {currentTime}</p>
      <p>
        This page is statically generated with Incremental Static Regeneration.
      </p>
      <RSC />
    </main>
  );
}
