-- Enrollment capture table for Be-leader Innovation Hub.
-- Apply locally:  npm run db:local
-- Apply remote:   npm run db:remote
CREATE TABLE IF NOT EXISTS enrollments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL,
  program    TEXT    NOT NULL,
  message    TEXT,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments (created_at);
CREATE INDEX IF NOT EXISTS idx_enrollments_email      ON enrollments (email);
