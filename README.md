# Be-leader Landing

Marketing landing page for **Be-leader Innovation Hub** — Cloud & DevOps
training, from zero to mastery. Static site built with Astro + Tailwind,
hosted on Cloudflare Pages, with a Cloudflare Pages Function backing the
enrollment form (data in Cloudflare D1).

- **Live domain:** https://beleaderinnohub.com
- **Repo:** https://github.com/beleaderinnohub/beleader-landing

## Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Astro (static output) + Tailwind CSS     |
| Hosting        | Cloudflare Pages (free tier)             |
| Form backend   | Cloudflare Pages Function (`/functions`) |
| Data store     | Cloudflare D1 (SQLite)                   |
| CI/CD          | GitHub Actions → `wrangler pages deploy` |
| Source         | GitHub org `beleaderinnohub`             |

## Quickstart

```bash
npm install
npm run dev          # http://localhost:4321
```

To run the site *with* the form function and a local database:

```bash
wrangler d1 create beleader-enrollments   # once; paste the id into wrangler.toml
npm run db:local                          # apply schema to local D1
npm run build
npm run pages:dev                         # serves dist/ + /functions with D1
```

## Editing content

- **Programs / promotions:** `src/data/programs.ts`
- **Gallery / projects:** `src/data/gallery.ts` (images go in `public/gallery/`)
- **Contact channels:** `src/components/Contact.astro`

No code changes are needed to add a bootcamp or swap a project — just edit the
data files.

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — how the pieces fit
- [`docs/data-model.md`](docs/data-model.md) — the enrollments schema
- [`docs/runbook.md`](docs/runbook.md) — deploy, rollback, exporting sign-ups
- [`docs/adr/`](docs/adr/) — why each decision was made
