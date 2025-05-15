import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Concepts",
  description: "A minimal Next.js for demonstrating concepts",
};

const navigation = [
  {
    title: "Data Fetching",
    items: [
      {
        slug: "fetching/page-default",
        name: "Fetching on a Page",
        description: "Using an app-wide suspense boundary",
      },
      {
        slug: "fetching/suspense-page",
        name: "using a Loading.tsx",
        description: "Creating a page-level suspense boundary",
      },
      {
        slug: "fetching/suspense-rsc",
        name: "Suspense + RSC",
        description: "Using Suspense boundaries around Server Components",
      },
      {
        slug: "fetching/suspense-use",
        name: "Suspense + use",
        description: "Using React 19 use() with Suspense",
      },
    ],
  },
  {
    title: "Rendering",
    items: [
      {
        slug: "rendering/isr",
        name: "ISR",
        description: "Increment Static Regeneration",
      },
      {
        slug: "rendering/with-dynamic-api",
        name: "ISR (force-static)",
        description: "Increment Static Regeneration",
      },
    ],
  },
  {
    title: "Routing",
    items: [
      {
        slug: "anything",
        name: "Not Found",
        description: "Creating your own not found page",
      },
    ],
  },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section className="fixed top-0 z-10 flex w-full flex-col border-b border-neutral-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-b-0">
          <div className="pt-10 pb-4 px-4 font-black text-xl text-neutral-500">
            <span className="text-white block font-normal">Next.js</span>{" "}
            Concepts
          </div>
          <nav className="flex flex-col gap-2 p-4 text-white">
            <Link
              className="block px-2 py-0.5 -mx-2 text-neutral-300 hover:text-neutral-50 hover:bg-neutral-600 rounded"
              href="/"
            >
              Home
            </Link>
            {navigation.map((row) => (
              <div
                key={row.title}
                className="flex flex-col gap-2 not-first:mt-4"
              >
                <span className="font-mono text-sm text-neutral-600 uppercase">
                  {row.title}
                </span>
                <ul className="grid">
                  {row.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        className="block px-2 py-0.5 -mx-2 text-neutral-300 hover:text-neutral-50 hover:bg-neutral-600 rounded"
                        href={`/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </section>
        <div className="lg:pl-72">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
