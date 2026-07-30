# Server actions

This site uses Server Components for reads and a Server Action for the contact form.

## Reads

Content is static MDX under `content/`, compiled to `src/data/*.json` at build time. Fetchers in `src/lib/data/` import that JSON — no database.

## Writes

The contact form calls a Server Action that sends mail via EmailJS (`EMAILJS_*` env vars). There is no CMS mutation path on the Worker.
