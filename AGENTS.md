# AGENTS.md - Next.js Concepts Project

Guidelines for AI coding agents working in this repository.

## Project Overview

A Next.js 16 (canary) demonstration project showcasing rendering strategies, data fetching patterns, and caching mechanisms. Uses React 19, TypeScript, Tailwind CSS v4, and Biome for linting/formatting.

## Commands

```bash
# Development (Turbopack)
npm run dev

# Production build & start
npm run build
npm run start

# Linting (Biome)
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix lint issues

# Formatting (Biome)
npm run format        # Format all files

# Combined check (lint + format)
npm run check         # Check all
npm run check:fix     # Fix all issues
```

### Testing

No test suite is currently configured.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── _components/        # Shared page components (private folder)
│   ├── api/                # API routes
│   ├── (main)/             # Route group for main pages
│   └── demos/              # Demo pages with iframe examples
├── components/
│   └── ui/                 # Reusable UI components (shadcn/ui style)
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities and data fetching
```

## Code Style

### Formatting (Biome)

- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for strings
- **Tailwind classes**: Must be sorted (enforced by `useSortedClasses` rule)
- **Imports**: Auto-organized by Biome

### TypeScript

- Strict mode enabled - all code must be fully typed
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any` - use `unknown` with type guards
- Use `as const` for immutable constant objects

```typescript
// Interface for object shapes
interface Pokemon {
  name: string;
  sprites: { front_default: string };
}

// Type for unions
type RenderSupportType = boolean | "partial";

// Constants with as const
export const NEXT_REFERENCES = {
  DataFetching: { title: "...", href: "..." },
} as const;
```

### Imports

Biome auto-organizes imports. General order:

1. React/Next.js core (`react`, `next/*`)
2. External packages (`clsx`, `lucide-react`, etc.)
3. Internal absolute (`@/*`)
4. Relative (`./`, `../`)

```typescript
import type { Metadata } from "next";
import Link from "next/link";

import { clsx } from "clsx";

import { cn } from "@/lib/utils";

import { DataDisplay } from "./_components/data-display";
```

### Path Aliases

Always use `@/*` for imports from `src/`:

```typescript
import { cn } from "@/lib/utils";           // Good
import { cn } from "../../../lib/utils";    // Avoid
```

### Components

- Use function declarations (not arrow functions)
- Use `React.ComponentProps<"element">` for extending HTML props
- Destructure props with spread for passthrough
- Place `"use client"` directive at top of file when needed

```typescript
function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button className={cn("px-4 py-2", className)} {...props} />
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `pokemon-display.tsx` |
| Components | PascalCase | `PokemonDisplay` |
| Functions | camelCase | `getPokemon` |
| Constants | SCREAMING_SNAKE_CASE | `NEXT_REFERENCES` |
| Interfaces/Types | PascalCase | `Pokemon` |

### Styling (Tailwind CSS v4)

- Use `cn()` from `@/lib/utils` to merge class names
- Prefer Tailwind utilities over custom CSS
- Use CSS variables for theme colors (`--background`, `--foreground`)

```typescript
import { cn } from "@/lib/utils";

<div className={cn("flex items-center", className)} />
```

### Error Handling

- Use try/catch for async operations
- Return `null` for failed fetches (when appropriate)
- Use early returns for guard clauses

```typescript
export async function getPokemon(id: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return (await response.json()) as Pokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

## Next.js Patterns

### Server Components (default)

- Pages are Server Components by default
- Use async/await directly for data fetching
- Pass promises to client components for streaming

### Client Components

- Add `"use client"` at top of file
- Use React 19's `use()` hook to unwrap promises
- Keep client components minimal

### API Routes

- Use typed route context for params
- Return `Response.json()` for JSON responses

```typescript
export async function GET(
  request: Request,
  ctx: RouteContext<"/api/v1/[delay]/[type]">,
) {
  const { delay, type } = await ctx.params;
  return Response.json({ data: "value" });
}
```

### Caching

- Use `unstable_cache` for data caching with tags
- Use `revalidateTag` in Server Actions for invalidation

## Key Files

- `src/lib/utils.ts` - `cn()` utility for Tailwind class merging
- `src/lib/pokemon.ts` - Pokemon API fetching and caching
- `src/lib/links.ts` - Reference link constants
- `biome.json` - Linting and formatting configuration
- `next.config.ts` - Next.js configuration
