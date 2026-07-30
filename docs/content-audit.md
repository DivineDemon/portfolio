# Content audit — market & ICP fit

**Date:** 2026-07-06  
**Scope:** All public URLs (static pages, CMS case studies, blog posts)  
**Basis:** Portfolio improvement plan Phase A; market research (fractional CTO demand, production-AI trust drivers, category SEO); pre-overhaul site analytics (treated as hypotheses until 2-week new-design baseline)

---

## ICP definition

**Primary buyers:** Founders, business owners, and product leaders at FinTech, HealthTech, Real Estate, and B2B SaaS who need a **fractional CTO / technical partner** — not a ticket-taking contractor.

**Service lines to reinforce:**

| Line | Proof on site |
|------|----------------|
| AI systems & RAG | Scintia, about KPIs (60% lookup cut) |
| Fullstack product engineering | Scintia, Clearbeam |
| Automation & n8n workflows | Zoomlion workflow, about KPIs (3× leads) |
| Fractional CTO / technical advisory | About copy, engagement models on case studies |

**Editorial rule (approved):** Each blog post should answer a founder/operator question tied to a service line and link to a case study or contact. Off-ICP viral/celebrity news posts dilute positioning and attract non-buyer traffic with high bounce.

**Explicitly out of scope:** `/for-founders` or other persona landing pages (no traffic or market requirement).

---

## Scoring rubric

Scores are 1–5 per dimension. **Overall** is a weighted judgment for prioritization, not a simple average.

| Dimension | 5 | 3 | 1 |
|-----------|---|---|---|
| **ICP fit** | Speaks to founder/operator buying decisions | Technical but wrong audience (e.g. job seekers) | Celebrity/viral news; no buyer relevance |
| **Market theme** | Production AI, RAG, automation, fractional CTO, measurable outcomes | Tool/news commentary without production angle | Pure research hype or entertainment hook |
| **Intent & conversion** | Clear path to case study or contact | Informative but dead-end | High bounce risk; no next step |

**Actions:** `keep` · `edit` · `unpublish` · `add` (approved net-new content on existing URLs only)

---

## Analytics cross-reference (pre-overhaul — hypotheses)

| Signal | Source | Implication for audit |
|--------|--------|------------------------|
| ~90% single-page sessions | Plan / PostHog (old design) | Blog and static pages need in-content next steps |
| ~94% blog post bounce | Plan / GA4 (old design) | Unpublish or rewrite off-ICP posts; strengthen on-theme posts |
| Top organic landing post: `stop-prompting-ai-start-building-loops` | Plan / GA4 | Keep and deepen; aligns with production-AI editorial |
| ~30% homepage clicks on privacy “Got it” | Session replay export 2026-07-06 | Homepage content competes with banner (Phase 1 UX, not content) |
| All 5 published posts `featured: true` | DB audit | Dilutes pillar promotion; only on-theme pillar should be featured |

*GA4 landing-page breakdown not queried in this audit (credentials not run in CI). Re-validate after Phase 3 baseline.*

---

## Static pages

| URL | Asset | ICP | Market | Intent | Overall | Action | Notes |
|-----|-------|-----|--------|--------|---------|--------|-------|
| `/` | `content/pages/about.mdx` | 5 | 5 | 4 | **Strong** | **edit** | Outcome-led copy, measured KPIs, fractional CTO line. **Add** 3–5 FAQ block + FAQPage JSON-LD (founder questions: when to hire fractional CTO, build vs buy, AI in production). Links to case studies and contact. |
| `/skills` | `content/pages/skills.mdx` | 4 | 5 | 4 | **Strong** | **keep** | Organized by problem type; ties skills to case-study proof. Minor keyword pass only if gap found. Avoid duplicating about KPI block — link instead. |
| `/contact` | `src/app/contact/page.tsx` | 3 | 2 | 3 | **Weak** | **edit** | Generic “tell me about your problem.” Rewrite: who you work with (founders, product leaders), typical problems (RAG, n8n, SaaS scale, fractional CTO), one positioning phrase in metadata. |
| `/blog` | `src/app/blog/page.tsx` | 2 | 2 | 2 | **Weak** | **edit** | H1/description: “Thoughts on engineering…” — generic, off-positioning. Replace with fractional CTO / production AI / automation keywords per market SEO research. |
| `/testimonials` | `src/app/testimonials/page.tsx` | 4 | 3 | 3 | **Adequate** | **edit** | Social proof supports trust. Update `description` metadata to positioning phrase; optional intro line tying testimonials to engagement types. |
| `/case-studies` | redirect → `/case-studies/projects` | — | — | — | — | **keep** | No content change. |
| `/case-studies/projects` | list page | 5 | 5 | 4 | **Strong** | **keep** | Index of project case studies; ensure card copy uses `cardOutcome` where null (Clearbeam). |
| `/case-studies/workflows` | list page | 5 | 5 | 4 | **Strong** | **keep** | Showcases n8n credential; aligns with automation service line. |

**Homepage metadata** (`src/lib/seo/defaults.ts`, `rootMetadata`): Already strong — fractional CTO, SaaS, AI automation, n8n. **Keep.**

---

## Case studies — projects

| Slug | Title | ICP | Market | Intent | Overall | Action | Notes |
|------|-------|-----|--------|--------|---------|--------|-------|
| `scintia` | Scintia | 5 | 5 | 5 | **Strong** | **keep** | AI voice B2B SaaS; role-based portals, billing, telephony; measurable 16-month delivery. Primary proof for AI + fullstack. SEO keywords present. |
| `ezra-bid-assistant` | Ezra Bid Assistant | 4 | 4 | 4 | **Good** | **keep** | Production AI automation (Gemini, MV3); client testimonial path. Slightly niche (agency/freelance) but demonstrates safe AI integration. Link from loop-engineering blog post. |
| `clearbeam` | Clearbeam | 4 | 4 | 3 | **Good** | **edit** | Founder-built SaaS; credible stack. **Edit** `cardOutcome` / headline — currently weaker than peers (“Real-Time SaaS Insights…” vs quantified outcome). Strengthen excerpt for case-study index cards. |

---

## Case studies — workflows

| Slug | Title | ICP | Market | Intent | Overall | Action | Notes |
|------|-------|-----|--------|--------|---------|--------|-------|
| `zoomlion-lead-gen` | Zoomlion Duqm Lead Generation | 5 | 5 | 5 | **Strong** | **keep** | 68-node n8n pipeline; B2B automation; cited in about.md (3× leads). Primary proof for automation line. Link from automation-themed blog content. |

---

## Blog posts

| Slug | Title | ICP | Market | Intent | Overall | Action | Analytics / editorial notes |
|------|-------|-----|--------|--------|---------|--------|----------------------------|
| `stop-prompting-ai-start-building-loops` | Stop Prompting AI. Start Building Loops. | 5 | 5 | 3 | **Strong** | **edit** | Top organic post (plan). On-theme: agent loops, production AI engineering. **Deepen** with founder framing, production metrics, link to Scintia or Zoomlion. Set as **only** `featured` pillar post; add end-of-post CTA (Phase 2). |
| `hackerrank-open-sourced-ai-hiring-agent` | HackerRank Open-Sourced AI Hiring Agent | 2 | 3 | 2 | **Weak** | **unpublish** | Developer/career audience (resume, ATS). Agent workflow angle does not serve fractional CTO buyers. High bounce risk. |
| `subq-ai-sparse-attention-breakthrough` | subq.ai / Transformer attention | 2 | 2 | 2 | **Off-ICP** | **unpublish** | Research/startup news; no founder problem. Viral-tech framing. Attracts researchers, not buyers. |
| `milla-jovovich-mempalace-ai-memory-system` | Milla Jovovich / MemPalace | 1 | 2 | 1 | **Off-ICP** | **unpublish** | Celebrity hook; agent memory infra news. Fails editorial rule. |
| `pewdiepie-odysseus-open-source-ai-workspace` | PewDiePie / Odysseus | 1 | 2 | 1 | **Off-ICP** | **unpublish** | Celebrity/local-AI workspace news. No path to services. |

**Blog technical gap (all posts):** `keywords` populated in DB but not wired to metadata/Article JSON-LD (`src/lib/data/blog.ts`). **Edit** in Phase A7 — does not change editorial verdict.

---

## Approved additions (no new routes)

| Item | Where | Priority | Market basis |
|------|-------|----------|--------------|
| FAQ block (3–5 Qs) | End of `content/pages/about.mdx` | High | Founder questions rank (when to hire fractional CTO, build vs buy, production AI readiness) |
| FAQPage JSON-LD | About render path | High | SEO playbook; AI Overview eligibility |
| Blog index H1 + description | `src/app/blog/page.tsx` | High | Category SEO: fractional CTO, AI automation, production systems |
| Contact page copy + metadata | `src/app/contact/page.tsx` | High | Buyer research: who you work with, typical problems |
| Testimonials metadata | `src/app/testimonials/page.tsx` | Medium | Positioning phrase parity |
| Blog `keywords` → metadata + JSON-LD | `blog.ts`, `article-json-ld.ts` | Medium | Parity with case studies |
| Clearbeam `cardOutcome` | DB / CMS | Low | Trust: measurable outcomes on cards |

---

## Edit list (prioritized)

1. **`content/pages/about.mdx`** — Add FAQ section (3–5 founder questions with concise answers).
2. **`src/app/blog/page.tsx`** — Replace generic H1/subtitle and metadata with positioning keywords.
3. **`src/app/contact/page.tsx`** — ICP-specific intro + metadata description.
4. **`stop-prompting-ai-start-building-loops`** — Outcome-led intro, production framing, internal links to Scintia + Zoomlion + contact.
5. **`clearbeam`** — Strengthen `cardOutcome` / headline for case-study index.
6. **`src/app/testimonials/page.tsx`** — Positioning-aligned metadata.
7. **Blog data layer** — Expose `keywords` and `featured` in selects; pass to Article JSON-LD.
8. **Featured flags** — Set `featured: false` on all posts except `stop-prompting-ai-start-building-loops` (after unpublishing off-ICP posts, moot for removed items).

---

## Unpublish list

| Slug | Reason |
|------|--------|
| `milla-jovovich-mempalace-ai-memory-system` | Celebrity viral hook; no founder buyer intent |
| `pewdiepie-odysseus-open-source-ai-workspace` | Celebrity viral hook; no service-line tie-in |
| `subq-ai-sparse-attention-breakthrough` | Research news; off-ICP traffic |
| `hackerrank-open-sourced-ai-hiring-agent` | Job-seeker audience; not fractional CTO buyer |

After unpublish: blog index shows **one** on-theme post until new editorial content ships. Plan pillar hero on `/blog` only if/when a second pillar exists.

---

## Keep list (no structural change)

- `/` about body (minus FAQ add)
- `/skills` (`content/pages/skills.mdx`)
- Case studies: `scintia`, `ezra-bid-assistant`, `zoomlion-lead-gen`
- Case study index pages
- Root SEO defaults (`src/lib/seo/defaults.ts`)
- `/case-studies` redirect

---

## Do not add

| Item | Reason |
|------|--------|
| `/for-founders` | ~1–2 visits in 7 days (old data); about.md already targets founders |
| Homepage blog teaser | Insufficient market data; about links to case studies |
| Programmatic SEO / mass landing pages | Out of scope per plan |
| `ProfessionalService` schema | Deferred unless audit proves gap |

---

## Summary counts

| Verdict | Static pages | Case studies | Blog posts |
|---------|--------------|--------------|------------|
| **Keep** | 4 | 4 | 1 |
| **Edit** | 4 | 1 | 1 |
| **Unpublish** | — | — | 4 |
| **Add (on existing URL)** | 1 (FAQ on about) | — | — |

**Net editorial posture:** Site core (about, skills, case studies) is **strong** and market-aligned. Blog is **misaligned** — 4 of 5 posts are off-ICP viral tech news; only the loops post earns organic and fits positioning. Unpublishing the four off-ICP posts and strengthening the survivor + static metadata is the highest-leverage Phase A content work.

---

## Validation checklist (Phase 3)

- [ ] GA4: organic queries for fractional CTO / AI production / n8n
- [ ] PostHog: blog session depth and `blog_cta_click` (after Phase 0/2)
- [ ] Search Console: impressions/clicks on kept blog URL
- [ ] Contact form submissions from blog vs about paths
- [ ] Re-run this audit if new posts are published — apply editorial rule before publish
