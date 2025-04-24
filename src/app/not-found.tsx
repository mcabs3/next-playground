import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Custom Not Found</h1>
      <Link href="/">Go back to home</Link>
    </main>
  );
}
