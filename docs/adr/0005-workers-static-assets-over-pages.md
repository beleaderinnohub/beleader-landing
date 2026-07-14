# 0005 — Cloudflare Workers (static assets) over Pages

- **Status:** Accepted (supersedes 0001 and 0004)
- **Date:** 2026-07

## Context

ADRs 0001 and 0004 chose Cloudflare Pages. During first deployment we found
that Cloudflare's 2026 guidance now recommends **Workers with static assets**
for new projects: Workers reached feature parity with Pages for static assets,
SSR, and custom domains, and new platform features ship to Workers first. Pages
remains supported with no forced migration, but the project was still only two
pages and one function — the cheapest possible point to switch.

## Decision

Deploy the site as a **Cloudflare Worker with static assets**. A small Worker
entry (`worker/index.ts`) serves the built `dist/` via assets-first routing and
handles `POST /api/enroll`. The Pages `functions/` folder is removed.

## Rationale

- Aligns with Cloudflare's recommended direction for new projects; avoids a
  later, more expensive migration.
- One deployment and one mental model for static assets plus the API route.
- `wrangler deploy` creates the Worker automatically, removing the "project must
  exist first" friction Pages had.
- Static asset requests remain free; the form logic bills like any Worker.

## Consequences

- `wrangler.toml` uses `[assets]` + `main`; the workflow uses `wrangler deploy`
  instead of `wrangler pages deploy`.
- Local dev of the full stack uses `wrangler dev` (port 8787); `astro dev`
  (port 4321) is still used for fast page iteration without the Worker.
- Custom domain is attached as a Worker custom domain (see runbook/next steps).
- ADRs 0001 and 0004 are retained for history but superseded here.
