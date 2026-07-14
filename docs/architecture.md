# Architecture

## Overview

Be-leader Landing is a **static site served by a Cloudflare Worker**, with one
dynamic route for the enrollment form. Almost everything a visitor sees is
pre-rendered HTML served from Cloudflare's edge as static assets. The Worker
script runs only for the form endpoint.

```
Visitor ──▶ Cloudflare Worker (static assets, global edge)
              │  (assets-first routing: static files served directly)
              └─ POST /api/enroll ──▶ Worker script ──▶ D1 (enrollments)
```

## Components

**Static site (Astro).** Built with `astro build` into `dist/`. Output is
`static` — no SSR. Sections are Astro components composed in
`src/pages/index.astro`; frequently-changing content (programs, gallery) lives
in typed data files under `src/data/`.

**Worker (`worker/index.ts`).** Serves as the entry point. Because Cloudflare
uses assets-first routing, static files are served directly and the Worker
script executes only for paths with no matching asset — chiefly
`POST /api/enroll`. Unmatched paths fall back to the asset handler, which
serves the styled `404.html` (`not_found_handling = "404-page"`).

**Data-access layer (`worker/enrollments.ts`).** The single module that knows
about storage. The Worker depends on an `EnrollmentStore` interface, not on D1
directly, so the backend can change without touching the request handler. See
ADR 0002.

**Data store (D1).** Cloudflare's serverless SQLite. Schema in `db/schema.sql`.
Bound to the Worker as `env.DB` via `wrangler.toml`.

## Configuration (`wrangler.toml`)

- `main` points at the Worker entry; `[assets] directory = "./dist"` serves the
  built site; `binding = "ASSETS"` lets the Worker hand unmatched paths back to
  the asset handler.
- `[[d1_databases]]` binds the enrollments database as `env.DB`.

## CI/CD

Push to `main` triggers `.github/workflows/deploy.yml`, which installs, builds,
and runs `wrangler deploy`. The Worker is created automatically on first
deploy. See ADR 0005.

## Training portal — future

`/portal` is a placeholder route today. The portal will be a separate
application (its own repo, its own data store, likely containerised via GHCR
under the `beleaderinnohub` org). Keeping it separate keeps this site a simple
static Worker.
