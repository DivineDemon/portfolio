# Mushood Hanif — Portfolio

Personal portfolio site for [mushoodhanif.com](https://mushoodhanif.com). Built with Next.js 16, featuring project case studies, client testimonials, a contact form, and SEO-optimized landing pages.

## Features

- **Landing page** — Hero, featured projects, testimonials carousel, about, skills, and contact sections
- **Project case studies** — Dynamic `/projects/[slug]` pages with markdown content, linked client testimonials, metrics, and tech stack tags
- **API layer** — [Elysia](https://elysiajs.com) routes mounted under `/api` with type-safe Eden client
- **Database** — PostgreSQL via Prisma (projects and clients)
- **Contact form** — Server action powered by EmailJS
- **On-demand revalidation** — Webhook endpoint to refresh cached pages after content updates
- **SEO & analytics** — JSON-LD structured data, sitemap, robots.txt, Open Graph metadata, Vercel Analytics, GA4 conversion events, PostHog, and optional Microsoft Clarity

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Geist font |
| API | Elysia, Eden Treaty |
| Database | PostgreSQL, Prisma 7 (`prisma db pull` + `prisma generate`) |
| Forms & validation | React Hook Form, Zod |
| 3D / visuals | Three.js, React Three Fiber |
| Tooling | Biome, Bun |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20+
- PostgreSQL database (e.g. [Neon](https://neon.tech))

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://..."

# Site
NEXT_PUBLIC_SITE_URL="https://mushoodhanif.com"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Contact form (EmailJS)
EMAILJS_SERVICE_ID=""
EMAILJS_TEMPLATE_ID=""
EMAILJS_PUBLIC_KEY=""
EMAILJS_PRIVATE_KEY=""

# Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=""
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
NEXT_PUBLIC_CLARITY_PROJECT_ID=""
GOOGLE_SITE_VERIFICATION=""
REVALIDATE_SECRET=""
```

### Database Setup

Schema and migrations are owned by [`portfolio-backend`](../portfolio-backend). After backend migrations are applied, sync the local schema and generate the client in this app:

```bash
bunx prisma db pull
bunx prisma generate
```

Or use the npm scripts:

```bash
bun run db:pull
bun run db:generate
```

`postinstall` runs `prisma generate` only. Run `db:pull` whenever `portfolio-backend` applies a new migration.

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start the development server |
| `bun run build` | Production build |
| `bun start` | Start the production server |
| `bun run typecheck` | Run TypeScript checks |
| `bun run lint` | Lint and fix with Biome |
| `bun run format` | Format code with Biome |
| `bun run db:pull` | Introspect the database and update `prisma/schema.prisma` |
| `bun run db:generate` | Generate Prisma client to `src/generated/prisma` |
| `bun run submit-sitemap` | Ping Bing/Google with the live sitemap URL |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # Elysia API + revalidation webhook
│   └── projects/[slug]/  # Project case study pages
├── components/
│   ├── case-study/       # Case study sections (incl. client testimonial)
│   ├── global/           # Navbar, footer, contact
│   ├── landing/          # Homepage sections
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities, Prisma client, EmailJS, JSON-LD
└── generated/prisma/     # Prisma client output
prisma/
└── schema.prisma         # Synced via `db pull` (no migrations in this app)
```

## API

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/project` | GET | List published projects |
| `/api/project/:slug` | GET | Fetch a project by slug (includes linked `client`) |
| `/api/client` | GET | List clients (used by homepage testimonials carousel) |
| `/api/revalidate` | POST | On-demand ISR revalidation (requires `REVALIDATE_SECRET`) |

### Revalidation

Send a `POST` to `/api/revalidate` with a Bearer token or `x-revalidate-secret` header:

```json
{ "type": "project", "slug": "my-project" }
```

```json
{ "type": "client", "slugs": ["my-project", "another-project"] }
```

The `slugs` array is optional for client revalidation. When provided, linked case study pages are revalidated in addition to the homepage.

| Route | Description |
| --- | --- |
| `/llms.txt`, `/llms-full.txt` | CMS-generated AI discovery documents |
| `/indexnow-key.txt` | IndexNow verification key (requires `INDEXNOW_KEY`) |
| `/sitemap.xml`, `/robots.txt` | Dynamic SEO routes |

## Deployment

Optimized for [Vercel](https://vercel.com). Set environment variables in the project dashboard, connect a PostgreSQL database, and deploy. The site uses **Next.js 16 Cache Components** (`cacheComponents: true`) with tag-based on-demand revalidation from the backend CMS.

Seed CMS content from `portfolio-backend`:

```bash
bun run seed:pages
```

Set `NEXT_PUBLIC_BOOKING_URL` to show the navbar “Book a call” button.

## License

[GNU GPL v3](LICENSE.txt)
