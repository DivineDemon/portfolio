# Mushood Hanif — Portfolio

Personal portfolio site for [mushoodhanif.com](https://mushoodhanif.com). Built with Next.js 16, featuring project case studies, testimonials, a contact form, and SEO-optimized landing pages.

## Features

- **Landing page** — Hero, services, featured projects, testimonials, about, skills, and contact sections
- **Project case studies** — Dynamic `/projects/[slug]` pages with markdown content, metrics, and tech stack tags
- **API layer** — [Elysia](https://elysiajs.com) routes mounted under `/api` with type-safe Eden client
- **Database** — PostgreSQL via Prisma (projects and testimonials)
- **Contact form** — Server action powered by EmailJS
- **On-demand revalidation** — Webhook endpoint to refresh cached pages after content updates
- **SEO & analytics** — JSON-LD structured data, sitemap, robots.txt, Open Graph metadata, Vercel Analytics, and optional Google Analytics

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Geist font |
| API | Elysia, Eden Treaty |
| Database | PostgreSQL, Prisma 7 (schema in `portfolio-backend`) |
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
REVALIDATE_SECRET=""
```

### Database Setup

Schema and migrations live in [`portfolio-backend`](../portfolio-backend). Clone that repo alongside this one, then:

```bash
# Apply migrations (portfolio-backend only)
cd ../portfolio-backend
bun install
bun run db:migrate

# Generate the Prisma client for this app
cd ../portfolio
bun run db:generate
```

`postinstall` runs `db:generate` automatically when `portfolio-backend` is present as a sibling directory.

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
| `bun run db:generate` | Generate Prisma client from `portfolio-backend` schema |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # Elysia API + revalidation webhook
│   └── projects/[slug]/  # Project case study pages
├── components/
│   ├── case-study/       # Markdown rendering for case studies
│   ├── global/           # Navbar, footer, contact
│   ├── landing/          # Homepage sections
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities, Prisma client, EmailJS, JSON-LD
└── generated/prisma/     # Prisma client output (generated from portfolio-backend)
scripts/
└── generate-prisma.mjs   # Pulls schema from portfolio-backend and runs prisma generate
```

## API

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/project` | GET | List published projects |
| `/api/project/:slug` | GET | Fetch a project by slug |
| `/api/testimonial` | GET | List testimonials |
| `/api/revalidate` | POST | On-demand ISR revalidation (requires `REVALIDATE_SECRET`) |

### Revalidation

Send a `POST` to `/api/revalidate` with a Bearer token or `x-revalidate-secret` header:

```json
{ "type": "project", "slug": "my-project" }
```

```json
{ "type": "testimonial" }
```

## Deployment

Optimized for [Vercel](https://vercel.com). Set environment variables in the project dashboard, connect a PostgreSQL database, and deploy. Pages use ISR with a 5-minute revalidation window (`revalidate = 300`).

## License

[GNU GPL v3](LICENSE.txt)
