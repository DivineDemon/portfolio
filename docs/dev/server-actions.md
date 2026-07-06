For a portfolio site, here's the straightforward answer:

## Just use Server Components + Server Actions

No extra library needed. This is also what Next.js's own docs recommend for new projects — direct data access in Server Components, with Server Actions only for mutations (like a contact form).

```ts
// lib/data.ts — Data Access Layer
import 'server-only'
import { db } from './db'

export async function getProjects() {
  return db.project.findMany({ orderBy: { createdAt: 'desc' } })
}
```

```tsx
// app/projects/page.tsx — Server Component
import { getProjects } from '@/lib/data'

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectList projects={projects} />
}
```

For mutations (contact form, guestbook, likes, etc.), add a Server Action:

```ts
'use server'
export async function sendMessage(formData: FormData) {
  await db.message.create({ data: { text: formData.get('text') } })
}
```

## Why this beats the alternatives for your use case

- **tRPC** — shines when you have a large, evolving API surface shared across multiple clients (web + mobile), or a big team that needs strict end-to-end type safety across many endpoints. A portfolio site typically has a handful of read queries (projects, blog posts, about info) — tRPC adds a router/procedure layer, client setup, and React Query wiring for very little payoff here.
- **Elysia.js** — this is a separate backend framework built for Bun, meant to run as its own server (great for a standalone API, microservice, or when you explicitly want Next.js to be "just frontend"). Running it alongside Next.js means two servers, two deploys, and duplicated auth/session logic — total overkill for a single-database portfolio.
- **Direct DB in Server Components** — zero extra abstraction, zero client-server waterfall, data fetched right where it's rendered, and it's literally free (no library, no bundle size). Next.js recommends the Data Access Layer approach specifically for new projects, and Component-Level Data Access for prototypes and learning — a portfolio is squarely in that zone.

## One caveat

If your portfolio has any client-side interactivity that needs its own fetching/caching (e.g., a live view counter, infinite-scroll blog list, or filters that refetch), pair it with **TanStack Query** on the client — you don't need tRPC for that, since you can just fetch from a Server Action or a lightweight route handler.

**Bottom line:** direct DB access in Server Components for reads, Server Actions for writes. Skip tRPC and Elysia entirely unless the project grows into something with a genuinely large, versioned API surface or a separately-deployed backend.