# Architecture

## Overview

Be-leader Landing is a **static site with one serverless endpoint**. Almost
everything a visitor sees is pre-rendered HTML served from Cloudflare's edge.
The only dynamic piece is the enrollment form, which posts to a Cloudflare
Pages Function that writes to a D1 database.

```
Visitor ──▶ Cloudflare Pages (static HTML/CSS/JS, global edge cache)
              │
              └─ POST /api/enroll ──▶ Pages Function ──▶ D1 (enrollments)
```

## Components

**Static site (Astro).** Built with `astro build` into `dist/`. Output is
`static` — no server-side rendering. Sections are Astro components composed in
`src/pages/index.astro`. Content that changes often (programs, gallery) lives
in typed data files under `src/data/` so edits don't touch markup.

**Form endpoint (Pages Function).** `functions/api/enroll.ts` handles
`POST /api/enroll`. Cloudflare Pages automatically deploys anything in the
top-level `functions/` directory as Functions alongside the static assets, so
no SSR adapter is required. The function validates input and delegates storage
to the data-access layer.

**Data-access layer.** `functions/_lib/enrollments.ts` is the single module
that knows about storage. The function depends on an `EnrollmentStore`
interface, not on D1 directly, so the backend can change without touching the
endpoint. See ADR 0002.

**Data store (D1).** Cloudflare's serverless SQLite. Schema in `db/schema.sql`.
Bound to the Function as `env.DB` via `wrangler.toml`.

## CI/CD

Push to `main` triggers `.github/workflows/deploy.yml`, which installs, builds,
and deploys with `wrangler pages deploy`. Cloudflare's own Git auto-build is
left **off** so there is exactly one deploy path. See ADR 0001.

## Training portal — future

`/portal` is a placeholder route today. The portal will be a separate
application (its own repo, its own data store, likely containerised and shipped
via GHCR under the `beleaderinnohub` org). When it exists, either replace the
placeholder page or point `/portal` at the portal's URL. Keeping it separate
means the landing page stays a simple static site.
