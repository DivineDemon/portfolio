# Next.js 16 SEO Playbook (2026)

A complete, current-state reference for making a Next.js 16 App Router app maximally discoverable — by search engines, by AI crawlers/agents, and by your own analytics stack.

---

## 0. The one architectural shift that changes everything else

Next.js 16 ships **Cache Components** (`cacheComponents: true` in `next.config.ts`), which finalizes Partial Prerendering (PPR). This changes the mental model your SEO decisions sit on top of:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true, // enables PPR + explicit caching as the default model
}

export default nextConfig
```

**Old model (Next 14/15):** pick SSG, SSR, ISR, or CSR *per route*.
**New model:** every route prerenders a static HTML shell by default. Anything touching a dynamic API (`cookies()`, `headers()`, `searchParams`, uncached `fetch`) must be explicitly wrapped in `<Suspense>` or marked `'use cache'` — otherwise you get a build-time error, not a silent perf regression.

Why this matters for SEO specifically: crawlers (and Core Web Vitals) benefit from the static shell shipping instantly, while personalized/dynamic slices (cart status, logged-in state, live inventory) stream in after without blocking indexable content. Get this right once at the layout level and most of your SEO performance work (LCP/INP/CLS) falls out of it for free.

```tsx
// app/products/[id]/page.tsx
import { Suspense } from 'react'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }> // params/searchParams are async in Next 16
}) {
  const { id } = await params

  return (
    <>
      {/* Cached — becomes part of the static shell, served instantly */}
      <ProductDetails id={id} />

      {/* Genuinely dynamic (per-user) — isolated behind Suspense so it
          doesn't force the whole route to render at request time */}
      <Suspense fallback={<CartButtonSkeleton />}>
        <UserCartStatus productId={id} />
      </Suspense>
    </>
  )
}
```

```tsx
// components/ProductDetails.tsx
import { cacheLife } from 'next/cache'

async function getProduct(id: string) {
  'use cache'
  cacheLife('hours') // or a custom profile — see below
  const res = await fetch(`https://api.example.com/products/${id}`)
  return res.json()
}

export default async function ProductDetails({ id }: { id: string }) {
  const product = await getProduct(id)
  return <article>{/* ... */}</article>
}
```

`cacheLife` profiles (built-in: `seconds`, `minutes`, `hours`, `days`, `weeks`, `max`, or define your own in `next.config.ts`) replace the old `revalidate` export. Pair with `cacheTag` + `revalidateTag` for on-demand invalidation (e.g., when a CMS webhook fires after a content edit) instead of waiting out a timer.

### SSR vs ISR vs "use cache" — practical decision rule

| Content type | Old approach | Next 16 approach |
|---|---|---|
| Marketing pages, docs | SSG | Static shell, no `use cache` needed — it's just static |
| Blog/product listings that change occasionally | ISR (`revalidate: 3600`) | `'use cache'` + `cacheLife('hours')` on the data-fetching function, at component level |
| Content that must invalidate on a specific event (CMS publish) | ISR + on-demand revalidation | `'use cache'` + `cacheTag('post:123')`, then `revalidateTag('post:123')` from your webhook handler |
| Per-user / auth-gated data | SSR (whole page dynamic) | Isolate in a `<Suspense>` boundary; rest of page stays static |
| Search results, filters, `searchParams`-driven pages | SSR | Same — `searchParams` usage opts that subtree into dynamic rendering; keep it component-scoped, not page-scoped |

Practical rule: **cache at the component level, not the page level.** A page that mixes one cacheable "always the same" section with one per-user section should express that directly in JSX with `use cache` + `Suspense`, rather than forcing the whole route to be static or dynamic.

---

## 1. Metadata API

Static metadata via export, dynamic via `generateMetadata`. Both are Server-Component-only.

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'), // makes all relative OG/canonical URLs resolve correctly
  title: {
    default: 'Acme',
    template: '%s | Acme', // child pages just set title: 'Pricing' → "Pricing | Acme"
  },
  description: 'Default description for pages that don\'t override it.',
  openGraph: {
    siteName: 'Acme',
    locale: 'en_US',
    type: 'website',
    images: ['/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

Dynamic, per-route (e.g. a blog post or product page):

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) // fetch is auto-memoized across generateMetadata/page/layout

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}
```

**Key rules to not violate:**
- Nested fields (`openGraph`, `robots`) are **replaced, not merged**, between parent and child segments. If `app/layout.tsx` sets `openGraph.description` and `app/blog/page.tsx` sets `openGraph.title`, the description from the layout is dropped entirely for `/blog`. Pull shared OG fields into a constant and spread them if you want partial inheritance.
- File-based metadata (`opengraph-image.tsx`, `icon.png`, `apple-icon.png`) takes priority over the object/function exports — prefer file conventions for icons/OG images so you're not hand-syncing paths.
- `metadata`/`generateMetadata` are Server-Component-only — never try to set this from a client component.
- Always set `alternates.canonical` explicitly on dynamic routes to avoid `?ref=`/query-param duplicate-content issues.

---

## 2. JSON-LD (structured data)

Next.js doesn't have a dedicated JSON-LD component — you render a `<script type="application/ld+json">` tag directly from a Server Component, next to (or inside) the page it describes.

```tsx
// app/products/[id]/page.tsx
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://example.com/products/${id}`,
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
        }
      : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify + this specific escape handles the </script> injection edge case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ProductDetails product={product} />
    </>
  )
}
```

Practical notes:
- **Escape `<`** in the stringified JSON (`.replace(/</g, '\\u003c')`) — without it, a malicious or malformed string field containing `</script>` can break out of the tag.
- Put JSON-LD in the Server Component that already has the data — don't re-fetch just for the schema block.
- Validate every schema change with **Google's Rich Results Test** before shipping; a subtly wrong `@type` silently drops rich-result eligibility.
- Common types worth having, beyond Product: `Organization`/`WebSite` (root layout, once), `BreadcrumbList` (see below), `Article`/`BlogPosting` (blog), `FAQPage` (any FAQ block — this is actively consumed by Google AI Overviews).
- If you extract this pattern into a shared helper, type it against `schema-dts` (npm) for compile-time safety instead of hand-rolled objects.

---

## 3. Breadcrumbs (UI + `BreadcrumbList` JSON-LD, done together)

Breadcrumbs should exist as one thing that serves two purposes: a visible nav component, and the matching structured data. Build them from the same array so they can never drift out of sync.

```tsx
// components/Breadcrumbs.tsx
import Link from 'next/link'

type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://example.com${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <nav aria-label="Breadcrumb">
        <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none' }}>
          {items.map((item, i) => (
            <li key={item.href} style={{ display: 'flex', gap: '0.5rem' }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
```

```tsx
// app/blog/[slug]/page.tsx
<Breadcrumbs
  items={[
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ]}
/>
```

Rules that matter:
- `position` is 1-indexed and must match the actual click-path depth — don't skip levels.
- The last item is the current page; some implementations omit its `item` URL (self-referencing) — either is accepted by Google, just be consistent.
- Use `aria-current="page"` on the last crumb for accessibility, which also happens to reinforce the semantic "you are here" signal.

---

## 4. Dynamic sitemap (`app/sitemap.ts`)

File convention — no physical XML file needed, Next.js generates it on request.

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://example.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([fetchAllPostSlugs(), fetchAllProductSlugs()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes, ...productRoutes]
}
```

At scale — **cap each sitemap at 50,000 URLs / 50MB** and split into a sitemap index if you exceed either:

```ts
// app/sitemap.ts — generateSitemaps for large sites
export async function generateSitemaps() {
  const totalProducts = await getProductCount()
  return Array.from({ length: Math.ceil(totalProducts / 50000) }, (_, i) => ({ id: i }))
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProductSlugs({ offset: id * 50000, limit: 50000 })
  return products.map((p) => ({ url: `${BASE_URL}/products/${p.slug}`, lastModified: p.updatedAt }))
}
```

Only include canonical, 200-status, indexable pages — don't list URLs you also `noindex` or `disallow`.

---

## 5. Dynamic `robots.txt` (`app/robots.ts`)

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/', '/cart/', '/account/'],
      },
      // Optional: per-bot overrides
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

Mistakes worth avoiding explicitly:
- **Don't block `/_next/static/` or JS/CSS.** Googlebot needs those to render the page and calculate Core Web Vitals (CLS/LCP) correctly — blocking them can tank both indexing quality and CWV scores.
- Don't block third-party SEO crawlers (Ahrefs, Semrush) unless you have a specific reason — you'll blind your own rank/backlink monitoring, and they mostly ignore robots.txt anyway.
- If you want AI crawlers to be able to read your site for citation purposes (ChatGPT/Perplexity/Claude answers), explicitly allow them rather than leaving them to the `*` catch-all, so the intent is unambiguous:

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' }, // governs Gemini/AI Overviews training use, separate from Googlebot
    ],
    sitemap: ['https://example.com/sitemap.xml', 'https://example.com/llms.txt'],
  }
}
```

---

## 6. Dynamic `llms.txt` + AI readability

### Reality check first
As of mid-2026: Google's Gary Illyes and John Mueller have both stated on record that Google Search doesn't use `llms.txt` for ranking or inclusion, comparing it to the old meta-keywords tag. No major LLM vendor (OpenAI, Anthropic, Google, Meta) has publicly confirmed acting on it in production search/answer systems, and crawler-log analyses show it gets touched by a negligible fraction of AI-bot traffic compared to normal page fetches. Where it *does* demonstrably help: developer-facing docs sites (AI coding assistants like Cursor/Copilot/Claude Code fetch it directly to get accurate API references with less token waste) and as a low-cost hedge in case adoption grows. Treat it as cheap insurance, not a growth lever.

### Implementation — dynamic route handler, not a static file

```ts
// app/llms.txt/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await getAllPublishedPosts() // only public content — never leak draft/private data here

  const lines = [
    '# Acme',
    '',
    '> Acme is a project management tool for small teams.',
    '',
    'Acme helps teams plan sprints, track issues, and ship faster.',
    '',
    '## Docs',
    ...posts.map((p) => `- [${p.title}](https://example.com/blog/${p.slug}): ${p.excerpt}`),
    '',
    '## Optional',
    '- [Terms of Service](https://example.com/terms)',
    '- [Privacy Policy](https://example.com/privacy)',
  ]

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // AI-crawler access patterns are unpredictable — SWR keeps this cheap and fresh
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

Spec shape (llmstxt.org convention):
1. `# Site Name` — must be the first line.
2. `> One-line summary` — blockquote; this often becomes the model's working summary of your site.
3. Freeform paragraph(s) with more context.
4. `## Section` headers with `- [Name](URL): description` link lists.
5. An `## Optional` section for secondary material (ToS, privacy) that's fine to skip under context constraints.

Practical guardrails:
- **Don't dump every page into it.** Prioritize hub/pillar pages — models have context limits, and burying the FAQ/policy section under 5,000 product links means it never gets read.
- Only ever include **public** content — apply the same auth/visibility filtering you'd use for the public API, not just "everything in the sitemap."
- Reference it from `robots.txt`'s `sitemap` array (shown above) so crawlers that check robots.txt first can discover it.
- Consider whether you need `llms-full.txt` (full site content inlined as one markdown doc) — only worth the build complexity for documentation-heavy sites; most product sites don't need it.

### Broader "AI readability" practices (higher-leverage than llms.txt itself)
These matter more, because they're the same signals AI answer engines actually use to decide what to cite, and they compound with your regular SEO:
- **Clean, server-rendered HTML with no auth wall** — an AI crawler that can't render JS or hits a login page can't cite you, full stop. This is exactly what the Cache Components/PPR model in §0 gives you by default.
- **FAQPage JSON-LD** on any page with real Q&A content — this is actively surfaced in Google AI Overviews today, unlike llms.txt.
- **Topical depth and internal linking** — AI answer engines lean on the same authority/citation signals as traditional search; there's no separate "GEO" ranking system to game.
- **`Google-Extended` and per-bot `robots.txt` rules** (§5) if you want explicit control over AI-training vs AI-search-citation access — these are different opt-outs (`Google-Extended` governs training/Gemini grounding, not classic Googlebot indexing).

---

## 7. Analytics

Three layers worth wiring up, from "you should always have this" to "nice-to-have":

### a) Core Web Vitals reporting (feeds SEO directly — CWV is a ranking input)

```ts
// app/layout.tsx or a client component mounted once at the root
'use client'
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Ship to whatever you use — GA4, a custom endpoint, Vercel Analytics, etc.
    const body = JSON.stringify(metric)
    const url = '/api/analytics/vitals'

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body)
    } else {
      fetch(url, { body, method: 'POST', keepalive: true })
    }
  })

  return null
}
```

Track this against the three CWV thresholds directly: **LCP < 2.5s, INP < 200ms, CLS < 0.1**. Alert on regressions rather than only reviewing dashboards after the fact.

### b) Third-party analytics scripts (GA4, etc.) — always via `next/third-parties` or `next/script`, never a raw `<script>` tag

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

`next/third-parties` handles GA4, Google Tag Manager, and YouTube embeds with sensible loading strategies built in. For anything else, use `next/script` with an explicit `strategy` (`afterInteractive` for most analytics, `lazyOnload` for genuinely non-critical widgets) — never `beforeInteractive` for analytics, since that blocks hydration and directly hurts the INP/LCP numbers you're trying to protect.

### c) Search Console + real-user monitoring
Not code, but part of the loop: connect **Google Search Console** (crawl errors, indexing status, sitemap issues, CWV field data, rich-result eligibility) and pair it with **PageSpeed Insights / CrUX** for real-user field data your synthetic Lighthouse runs won't show. Submit your sitemap there explicitly rather than relying on discovery.

---

## 8. Quick-reference checklist

- [ ] `cacheComponents: true` set; `use cache` + `Suspense` boundaries placed at component level, not page level
- [ ] Root layout sets `metadataBase`, title template, default OG/Twitter, canonical
- [ ] Every dynamic route has `generateMetadata` with an explicit `alternates.canonical`
- [ ] JSON-LD emitted next to the data that backs it (Product/Article/Organization/FAQPage as applicable), escaped for `</script>`, validated in Rich Results Test
- [ ] Breadcrumbs component drives both the visible nav and `BreadcrumbList` JSON-LD from one source array
- [ ] `app/sitemap.ts` generated dynamically from your data source, split via `generateSitemaps` if >50k URLs
- [ ] `app/robots.ts` allows `/_next/static/`, disallows private routes, doesn't block SEO tool crawlers, references sitemap + llms.txt
- [ ] `app/llms.txt/route.ts` serves public-only content with SWR caching, budgeted as low-priority insurance rather than a growth bet
- [ ] `useReportWebVitals` piping LCP/INP/CLS to your analytics backend; alerts on regression, not just dashboards
- [ ] Third-party analytics loaded via `next/third-parties` or `next/script` with `afterInteractive`/`lazyOnload`, never `beforeInteractive`
- [ ] Search Console connected, sitemap submitted, CWV field data reviewed against synthetic Lighthouse data