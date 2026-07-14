# 0001 — Static site on Cloudflare Pages, no containers

- **Status:** Accepted
- **Date:** 2026-07

## Context

The deliverable is a marketing landing page with a small enrollment form. The
team's default engineering pattern is containers shipped via GHCR, and a
container pipeline was initially assumed for this site too.

## Decision

Build the landing page as a **static site** (Astro, static output) hosted on
**Cloudflare Pages**, with the form handled by a Cloudflare Pages Function. Do
**not** containerise the landing page or use GHCR for it.

## Rationale

- A landing page has no long-running server to containerise. Static files on a
  CDN are faster, cheaper, and lower-maintenance.
- Cloudflare Pages serves the static site, runs the form Function, and holds
  the D1 data in one place, all on the free tier.
- DNS for `beleaderinnohub.com` already lives at Cloudflare, so domain wiring
  and TLS are trivial.
- GitHub Actions still provides the CI/CD pipeline, so no workflow familiarity
  is lost.

## Consequences

- GHCR and containers remain the pattern for the **future training portal**, a
  separate dynamic application — not this repo.
- We disable Cloudflare's built-in Git build to keep a single deploy path
  through Actions.
