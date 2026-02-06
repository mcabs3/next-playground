# Next Concepts

A demonstration app showcasing Next.js patterns for building performant web applications.

## What's Inside

This project covers core Next.js concepts through interactive examples:

- **Rendering Strategies** - SSG, SSR, and ISR with real-world use cases
- **Data Fetching** - Server Components, Suspense boundaries, and streaming patterns
- **Caching** - Route segment caching, `unstable_cache`, and revalidation strategies
- **Performance Patterns** - Optimized loading states, parallel data fetching, and static generation

Each demo includes timestamps and visual indicators to help you understand when pages are rendered and how caching behaves.

## Tech Stack

- Next.js 16 (canary) with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Biome (linting/formatting)

## Getting Started

```bash
npm install
npm run dev
```

Open [https://localhost:3000](https://localhost:3000) to explore the demos.

> **Note**: The dev server runs with HTTPS enabled (`--experimental-https`) to support iframe embedding for the demo previews.

## Scripts

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run check     # Lint and format check
npm run check:fix # Auto-fix issues
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching)
