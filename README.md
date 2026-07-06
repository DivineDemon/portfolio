# Mushood Hanif — Portfolio

Personal portfolio site for [mushoodhanif.com](https://mushoodhanif.com). Built with Next.js 16 App Router, a sidebar layout, and a hybrid content model: static markdown for long-form pages, PostgreSQL (via Prisma) for blog posts and case studies.

## Stack

- **Framework:** Next.js 16 (Cache Components / PPR, React Compiler)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Radix
- **Data:** Prisma 7 + PostgreSQL (Neon)
- **Content:** Markdown files (`docs/content/`) + database-backed blog & case studies
- **Workflows:** n8n JSON rendered with React Flow (`@xyflow/react`)
- **Contact:** EmailJS (server action)
- **Analytics:** Vercel Analytics, Speed Insights, GA4, PostHog, Microsoft Clarity, Web Vitals
- **Tooling:** Bun, Biome, TypeScript

## Routes

| Path | Source |
|------|--------|
| `/` | `docs/content/about.md` |
| `/skills` | `docs/content/skills.md` |
| `/blog`, `/blog/[slug]` | `blog_posts` table |
| `/case-studies/projects`, `/case-studies/projects/[slug]` | `projects` table |
| `/case-studies/workflows`, `/case-studies/workflows/[slug]` | `n8n_workflows` table |
| `/testimonials` | `clients` table |
| `/contact` | Contact form (EmailJS) |

SEO routes: `/sitemap.xml`, `/robots.txt`, `/llms.txt`

## Getting started

**Prerequisites:** Bun, PostgreSQL database, EmailJS account (for contact form).

```bash
bun install
cp .env.example .env
# Fill in DATABASE_URL and other values (see below)
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
bun dev          # Start dev server
bun run build    # Production build
bun start        # Start production server
bun run typecheck
bun run lint     # Biome check + format
```

## Environment variables

Copy `.env.example` to `.env` and configure:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (required) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://mushoodhanif.com`) |
| `EMAILJS_*` | Contact form delivery (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`, `PRIVATE_KEY`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog (optional: `NEXT_PUBLIC_POSTHOG_HOST`) |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity |
| `GOOGLE_SITE_VERIFICATION` | Search Console verification meta tag |

Analytics providers load only when their env vars are set. Vercel Analytics and Speed Insights work automatically on Vercel.

## Project structure

```
src/
├── app/                  # App Router pages & SEO routes
├── components/           # UI, layout, case studies, analytics
├── lib/
│   ├── data/             # Cached data fetchers (blog, case studies, content)
│   └── seo/              # Metadata, JSON-LD, sitemap helpers
docs/
├── content/              # Static markdown (about, skills)
└── dev/                  # Internal dev docs (SEO playbook, etc.)
prisma/
└── schema.prisma         # blog_posts, projects, n8n_workflows, clients, pages
```

## Content

**Static pages** — edit markdown in `docs/content/`:

- `about.md` → homepage
- `skills.md` → skills page

**Dynamic content** — manage via the database:

- Blog posts → `blog_posts`
- Project case studies → `projects`
- Workflow case studies → `n8n_workflows` (includes `workflowJson` for the canvas)
- Testimonials → `clients`

Data fetchers use Next.js 16 `'use cache'` with `cacheTag` / `cacheLife` for ISR-style caching.

## SEO

Implemented per `docs/dev/seo-best-practices.md`:

- Root metadata (`metadataBase`, OG/Twitter, canonical)
- Per-route `generateMetadata` + JSON-LD (`Person`, `WebSite`, `Article`, `BreadcrumbList`)
- Dynamic `sitemap.ts`, `robots.ts`, and `llms.txt`
- OG image: `public/og-image.png` (1200×630)

## Deploy

Designed for [Vercel](https://vercel.com). Set environment variables in the project dashboard, connect the Neon Postgres integration, and deploy.

```bash
bun run build
```

After deploy, submit `https://mushoodhanif.com/sitemap.xml` in Google Search Console.
