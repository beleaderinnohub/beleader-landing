# 0004 — Cloudflare Pages over GitHub Pages

- **Status:** Accepted
- **Date:** 2026-07

## Context

GitHub Pages was considered as the host since the source already lives on
GitHub.

## Decision

Host on **Cloudflare Pages**, not GitHub Pages.

## Rationale

- GitHub Pages serves static files only, with no server-side execution. The
  enrollment form needs a backend to store submissions.
- Using GitHub Pages would force a separate backend (standalone Worker or a
  third-party form service), splitting the architecture across providers.
- Cloudflare Pages serves the static site, runs the form Function, and holds
  the D1 data together, and the domain's DNS is already at Cloudflare.
- Source and CI/CD stay entirely on GitHub regardless; only the host differs.

## Consequences

- If the form were ever dropped, GitHub Pages would become viable again — but
  that is not the current direction.
