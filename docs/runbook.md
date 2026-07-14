# Operations runbook

## Deploy

Normal path: merge to `main`. GitHub Actions builds and deploys automatically.

Manual deploy from your machine:

```bash
npm run build
wrangler pages deploy dist --project-name=beleader-landing
```

## Rollback

In the Cloudflare dashboard → **Workers & Pages → beleader-landing →
Deployments**, find the last good deployment and choose **Rollback**. This is
instant and needs no rebuild.

## First-time database setup

```bash
wrangler d1 create beleader-enrollments   # copy the database_id into wrangler.toml
npm run db:remote                         # apply schema to the live database
```

Then bind the database to the Pages project in the dashboard
(**Settings → Functions → D1 bindings**: variable `DB` → `beleader-enrollments`).

## Exporting sign-ups

Portable dump (standard SQLite / SQL — restorable anywhere):

```bash
wrangler d1 export beleader-enrollments --remote --output enrollments.sql
```

Quick look at recent registrations:

```bash
wrangler d1 execute beleader-enrollments --remote \
  --command "SELECT created_at, name, email, program FROM enrollments ORDER BY created_at DESC LIMIT 50;"
```

## Required GitHub secrets

Set these at the **organization** or repo level (Settings → Secrets and
variables → Actions):

- `CLOUDFLARE_API_TOKEN` — token with Pages edit permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account id
