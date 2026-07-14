# 0002 — D1 for storage, behind a data-access layer

- **Status:** Accepted
- **Date:** 2026-07

## Context

Enrollment registrations need durable storage. Options considered: email-only
(no database), Cloudflare D1, or an external managed database. There was a
concern about being locked into D1 and facing a painful migration later.

## Decision

Store enrollments in **Cloudflare D1**, accessed exclusively through a
**data-access layer** (`functions/_lib/enrollments.ts`) that exposes an
`EnrollmentStore` interface.

## Rationale

- D1 is free-tier friendly and co-located with the Pages Function.
- D1 is standard SQLite; data is portable via `wrangler d1 export`, so records
  are never trapped.
- The only real lock-in is the access API. Isolating it behind one module means
  a future move to Postgres/MySQL/CRM changes one file, not the whole app.
- D1 is a capture buffer, not a system of record. The training portal will own
  its own data, so D1 is unlikely to require a "migration" at all.

## Consequences

- All storage code goes through the data-access layer; the API never touches
  D1 directly.
- Migrating backends means implementing a new `EnrollmentStore` and swapping it
  in — a contained change.
