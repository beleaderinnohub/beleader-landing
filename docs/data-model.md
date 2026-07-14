# Data model

## `enrollments`

Captures interest registrations from the landing page form. Defined in
`db/schema.sql`.

| Column       | Type    | Notes                                    |
| ------------ | ------- | ---------------------------------------- |
| `id`         | INTEGER | Primary key, autoincrement               |
| `name`      | TEXT    | Required, max 200 chars (enforced in API)|
| `email`      | TEXT    | Required, format-validated in API        |
| `program`    | TEXT    | Program id from `src/data/programs.ts`   |
| `message`    | TEXT    | Optional, capped at 2000 chars in API    |
| `created_at` | TEXT    | ISO datetime, defaults to `datetime('now')` |

Indexes on `created_at` (for chronological export) and `email` (for lookup).

## Notes

- Validation lives in the API (`functions/api/enroll.ts`), not the schema, so
  error messages can be human-friendly. The schema enforces only structure.
- This table is a **capture buffer**, not a system of record. Export sign-ups
  regularly (see the runbook) or forward them to email/CRM. The future training
  portal will own its own, separate data.
