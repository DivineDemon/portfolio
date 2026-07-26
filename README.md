# Mushood Hanif — Portfolio

Portfolio site for [mushoodhanif.com](https://mushoodhanif.com). Next.js 16 App Router on Cloudflare Workers (OpenNext). All site content is static MDX in the repo.

## Stack

- **Framework:** Next.js 16 (Cache Components / PPR, React Compiler)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Radix
- **Content:** MDX under `content/` (compiled to JSON at build)
- **Workflows:** n8n JSON + React Flow (`@xyflow/react`)
- **Contact:** EmailJS (server action)
- **Analytics:** GA4, PostHog, Google Ads (optional)
- **Deploy:** Cloudflare Workers via `@opennextjs/cloudflare`
- **Tooling:** Bun, Biome, TypeScript

## Routes

| Path | Source |
|------|--------|
| `/` | `content/pages/about.mdx` |
| `/skills` | `content/pages/skills.mdx` |
| `/privacy` | `content/pages/privacy.mdx` |
| `/blog`, `/blog/[slug]` | `content/blog/*.mdx` |
| `/case-studies/projects/[slug]` | `content/case-studies/projects/*.mdx` |
| `/case-studies/workflows/[slug]` | `content/case-studies/workflows/*.mdx` (+ `.workflow.json`) |
| `/testimonials` | `content/testimonials/*.mdx` |
| `/contact` | EmailJS form |

## Getting started

```bash
bun install
cp .env.example .env
# fill EmailJS + analytics values
bun run content   # compile MDX → src/data/*.json
bun dev
```

### Scripts

```bash
bun run content       # Compile content/** MDX into src/data
bun dev
bun run build         # content + next build
bun run build:worker  # OpenNext Cloudflare bundle
bun run deploy        # build + wrangler deploy
bun run typecheck
bun run lint
```

## Content workflow

1. Edit or add `.mdx` files under `content/`
2. Run `bun run content` (also runs automatically before `next build`)
3. Commit both the MDX sources and the generated `src/data/*.json` files

Frontmatter maps to the existing TypeScript types in `src/lib/types/`. Blog/page bodies are markdown rendered with `react-markdown`.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `EMAILJS_*` | Contact form (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`, `PRIVATE_KEY`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO` | Ads conversion `send_to` |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` / `HOST` | PostHog |
| `GOOGLE_SITE_VERIFICATION` | Search Console meta tag |

For Cloudflare:
- **Runtime:** Worker **Variables and Secrets** (EmailJS + public analytics)
- **Build:** only `NEXT_PUBLIC_*` (and optional `GOOGLE_SITE_VERIFICATION`) so Next can inline them — no database or CMS secrets

Local OpenNext preview: copy `.dev.vars.example` → `.dev.vars`.

## Project structure

```
content/                 # Source-of-truth MDX
├── pages/
├── blog/
├── case-studies/
└── testimonials/
src/
├── app/
├── components/
├── data/                # Compiled JSON (from bun run content)
└── lib/data/            # Cached fetchers over compiled JSON
scripts/compile-content.ts
wrangler.jsonc
open-next.config.ts
```

## Deploy

Cloudflare Workers Builds (or locally):

```bash
bun run deploy
# or: npx opennextjs-cloudflare build && npx wrangler deploy --keep-vars
```

Custom domains: `mushoodhanif.com` and `www.mushoodhanif.com` → Worker `portfolio`.
