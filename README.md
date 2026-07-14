# Be-leader Landing

Marketing landing page for **Be-leader Innovation Hub** — Cloud & DevOps
training, from zero to mastery. Static site built with Astro + Tailwind,
deployed to **Cloudflare Workers** (static assets) with a small Worker route
backing the enrollment form (data in Cloudflare D1).

- **Live domain:** https://beleaderinnohub.com
- **Repo:** https://github.com/beleaderinnohub/beleader-landing

## Stack

| Concern       | Choice                                       |
| ------------- | -------------------------------------------- |
| Framework     | Astro (static output) + Tailwind CSS         |
| Hosting       | Cloudflare Workers, static assets (free tier)|
| Form backend  | Worker route `POST /api/enroll`              |
| Data store    | Cloudflare D1 (SQLite)                        |
| CI/CD         | GitHub Actions → `wrangler deploy`           |
| Source        | GitHub org `beleaderinnohub`                 |

## Quickstart

```bash
npm install
npm run dev          # http://localhost:4321  (fast page iteration; no Worker)
```

To run the full site *with* the Worker route and a local database:

```bash
npm run db:local     # apply schema to local D1 (first time)
npm run preview      # builds, then wrangler dev at http://localhost:8787
```

## Deploy

Deploys happen automatically via GitHub Actions on push to `main`. Before the
first deploy, the D1 database must exist and its id must be set in
`wrangler.toml` — see [`docs/runbook.md`](docs/runbook.md).

## Editing content

- **Programs / promotions:** `src/data/programs.ts`
- **Gallery / projects:** `src/data/gallery.ts` (images go in `public/gallery/`)
- **Contact channels:** `src/components/Contact.astro`

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — how the pieces fit
- [`docs/data-model.md`](docs/data-model.md) — the enrollments schema
- [`docs/runbook.md`](docs/runbook.md) — D1 setup, deploy, rollback, exports
- [`docs/adr/`](docs/adr/) — why each decision was made
