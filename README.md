# Mushood Hanif — Portfolio

Personal portfolio and technical archive of Mushood Hanif: Founder & AI Systems Architect at Haga Labs, Senior AI Engineer at Afiniti. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and MDX content stored in-repo.

## Stack

- **Framework:** Next.js 16 (App Router, React Compiler, Cache Components)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4, shadcn/ui primitives, `next-themes`
- **Content:** MDX via `gray-matter` + `react-markdown` / `remark-gfm`, rendered on the server
- **Motion & viz:** Mermaid diagrams, d3-force
- **Forms:** React Hook Form + Zod + EmailJS
- **Linting/formatting:** Biome

## Development

```bash
pnpm install
pnpm dev
```

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Biome check with safe + unsafe autofixes |
| `pnpm format` | Biome format |
| `pnpm check` | Biome check without writing |
| `pnpm typecheck` | TypeScript project check (`tsc --noEmit`) |

## Environment

Copy `.env.example` to `.env` and fill in the values. All client-exposed variables use the `NEXT_PUBLIC_` prefix:

- `NEXT_PUBLIC_SITE_URL` — canonical site origin
- `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` — PostHog analytics
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` — contact form delivery

Analytics and the contact form are disabled gracefully when their variables are absent.

## Content

Content lives in `src/content`:

- `src/content/blogs/*.mdx` — blog posts with frontmatter (`title`, `slug`, `date`, `description`, `keywords`, `readingTime`, `author`)
- `src/content/case-studies/*.mdx` — case studies parsed from markdown headers (`Project`, `Role`, `Technologies`, `Domain`) with curated metrics

Adding or editing an MDX file is all that is needed; routes, sitemap, and JSON-LD are generated from the content directory.

> Note: `next.config.ts` includes `outputFileTracingIncludes` for `src/content/**` so content files are bundled in serverless deployments.

## Routes

- `/` — landing page (hero, about, trajectory, impact, work & blog teasers, stack, contact)
- `/blog`, `/blog/[slug]` — article index and detail pages
- `/work`, `/work/[slug]` — case study index and detail pages
- `/og-poster` — internal 1200×630 card preview for screenshotting `public/og-image.png`
- `/sitemap.xml`, `/robots.txt` — generated metadata routes
