# Operations runbook

## First-time database setup (required before first deploy)

The Worker binds a D1 database, so it must exist and its id must be in
`wrangler.toml` before the first deploy succeeds.

Option A — dashboard: **Storage & Databases → D1 → Create database** named
`beleader-enrollments`. Copy its **Database ID** into the `database_id` field
in `wrangler.toml`. Then open the database's **Console** and paste the contents
of `db/schema.sql` to create the table.

Option B — CLI (requires `wrangler login` or `CLOUDFLARE_API_TOKEN`):

```bash
wrangler d1 create beleader-enrollments   # copy the database_id into wrangler.toml
npm run db:remote                          # apply schema to the live database
```

## Deploy

Normal path: push to `main`. GitHub Actions builds and runs `wrangler deploy`.

Manual deploy from your machine:

```bash
npm run deploy      # astro build, then wrangler deploy
```

The site is served at `beleader-landing.<your-subdomain>.workers.dev` until the
custom domain is attached.

## Rollback

Cloudflare dashboard → **Workers & Pages → beleader-landing → Deployments** →
select a previous version → **Rollback**. Instant, no rebuild.

## Exporting sign-ups

Portable dump (standard SQLite / SQL):

```bash
wrangler d1 export beleader-enrollments --remote --output enrollments.sql
```

Recent registrations:

```bash
wrangler d1 execute beleader-enrollments --remote \
  --command "SELECT created_at, name, email, program FROM enrollments ORDER BY created_at DESC LIMIT 50;"
```

(Both are also runnable from the D1 Console in the dashboard.)

## Required GitHub secrets

Set at the repo (or org) level — Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` — the "Edit Cloudflare Workers" token
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account id
