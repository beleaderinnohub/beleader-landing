# 0003 — Host the repo under a GitHub organization

- **Status:** Accepted
- **Date:** 2026-07

## Context

The project carries the company brand and will grow beyond one repo (landing
page, training portal, shared infrastructure). It could live under a personal
account or a dedicated organization.

## Decision

Host all company repositories under the GitHub organization
**`beleaderinnohub`**, starting with `beleader-landing`.

## Rationale

- Company ownership independent of any personal account; survives team changes.
- Org-level roles, Actions secrets, and (later) GHCR packages shared cleanly
  across repos under one brand namespace.
- Free for public and private repos; Cloudflare Pages connects to org repos the
  same as personal ones.

## Consequences

- Cloudflare's GitHub app is authorised against the org, not a personal login.
- The pre-existing `paypulse-demo` org stays separate; `beleaderinnohub` is the
  company namespace.
