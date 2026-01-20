# AGENTS.md - Next.js Concepts Project

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

A Next.js 16 (canary) demonstration project showcasing rendering strategies, data fetching patterns, and caching mechanisms. Uses React 19, TypeScript, and Tailwind CSS v4.

## Build, Lint, and Development Commands

```bash
# Development server (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint the codebase
npm run lint
```

### Testing

This project does not currently have a test suite configured. No test files exist.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── _components/        # Shared page components (private folder)
│   ├── api/                # API routes
│   ├── caching/            # Caching examples
│   ├── fetching/           # Data fetching patterns
│   └── rendering/          # SSG, SSR, ISR examples
├── components/
│   └── ui/                 # Reusable UI components
└── lib/                    # Utility functions and data fetching
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All code must be fully typed
- Use `interface` for object shapes, `type` for unions and aliases
- Prefer explicit return types on exported functions
- Use `as const` for immutable constant objects
- Avoid `any` - use `unknown` with type guards when needed

```typescript
// Good - explicit interface
interface Pokemon {
  name: string;
  sprites: { front_default: string };
}

// Good - type for unions
type RenderSupportType = boolean | "partial";
```

### Imports

Order imports as follows (with blank lines between groups):

1. React and Next.js core (`react`, `next/*`)
2. External dependencies (`clsx`, `lucide-react`, etc.)
3. Internal absolute imports (`@/*`)
4. Relative imports (`./`, `../`)

```typescript
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { clsx } from "clsx";

import { cn } from "@/lib/utils";
import { getPokemon } from "@/lib/pokemon";

import { DataDisplay } from "./_components/data-display";
```

### Path Aliases

Use the `@/*` alias for imports from `src/`:

```typescript
import { cn } from "@/lib/utils";           // Good
import { cn } from "../../../lib/utils";    // Avoid
```

### Components

- Use function declarations for components (not arrow functions)
- Use `ComponentPropsWithoutRef<"element">` for extending HTML props
- Destructure props with spread for passthrough
- Place client directive at top of file when needed: `"use client"`

```typescript
// Good - function declaration with prop types
export function Button({
  className,
  ...buttonProps
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn("border px-4 py-2 rounded", className)} {...buttonProps}>
      {buttonProps.children}
    </button>
  );
}
```

### Naming Conventions

- **Files**: kebab-case (`pokemon-display.tsx`, `titled-section.tsx`)
- **Components**: PascalCase (`PokemonDisplay`, `TitledSection`)
- **Functions**: camelCase (`getPokemon`, `getRandomPokemonID`)
- **Constants**: SCREAMING_SNAKE_CASE for config objects (`NEXT_REFERENCES`)
- **Interfaces/Types**: PascalCase (`Pokemon`, `RenderSupportType`)

### Styling with Tailwind CSS v4

- Use the `cn()` utility from `@/lib/utils` to merge class names
- Prefer Tailwind utility classes over custom CSS
- Use CSS variables for theme colors (`--background`, `--foreground`)

```typescript
import { cn } from "@/lib/utils";

<div className={cn("flex items-center", className)} />
```

### Error Handling

- Use try/catch for async operations
- Return `null` for failed fetches rather than throwing (when appropriate)
- Use early returns for guard clauses

```typescript
export async function getPokemon(id: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return (await response.json()) as Pokemon;
  } catch (error) {
    return null;
  }
}
```

### Next.js Patterns

#### Server Components (default)

- Pages are Server Components by default
- Use async/await directly in components for data fetching
- Pass promises to client components via props for streaming

#### Client Components

- Add `"use client"` directive at top of file
- Use React 19's `use()` hook to unwrap promises
- Keep client components minimal - push logic to server

#### API Routes

- Use `NextRequest` type for request parameter
- Return `Response.json()` for JSON responses

```typescript
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({ data: "value" });
}
```

#### Caching and Revalidation

- Use `unstable_cache` for data caching with tags
- Use `revalidateTag` in Server Actions for cache invalidation
- Configure `revalidate` option for ISR pages

### React 19 Features

- Use `use()` hook to unwrap promises in client components
- Leverage Server Actions with `"use server"` directive
- Use `useId()` for generating unique IDs

## Configuration Notes

- **TypeScript**: Strict mode, ES2017 target, bundler module resolution
- **Next.js**: Typed routes enabled, view transitions experimental
- **Tailwind CSS v4**: Using `@tailwindcss/postcss` plugin
- **Images**: Remote patterns configured for PokeAPI sprites

## Key Files

- `src/lib/utils.ts` - `cn()` utility for Tailwind class merging
- `src/lib/pokemon.ts` - Pokemon API fetching and caching
- `src/lib/data.ts` - Generic data fetching utilities
- `src/lib/links.ts` - Reference link constants
