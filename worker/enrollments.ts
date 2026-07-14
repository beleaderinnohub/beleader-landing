// ── Data-access layer ────────────────────────────────────────────────
// The ONLY module that knows how enrollments are stored. If you ever move
// off Cloudflare D1 (to Postgres, MySQL, a CRM, etc.), change this file
// and nothing else in the app needs to know.
// See docs/adr/0002-d1-with-data-access-layer.md

export interface EnrollmentInput {
  name: string;
  email: string;
  program: string;
  message?: string;
}

export interface EnrollmentStore {
  save(input: EnrollmentInput): Promise<{ id: number }>;
}

// D1-backed implementation.
export class D1EnrollmentStore implements EnrollmentStore {
  constructor(private db: D1Database) {}

  async save(input: EnrollmentInput): Promise<{ id: number }> {
    const result = await this.db
      .prepare(
        "INSERT INTO enrollments (name, email, program, message) VALUES (?, ?, ?, ?)"
      )
      .bind(input.name, input.email, input.program, input.message ?? null)
      .run();
    return { id: Number(result.meta.last_row_id) };
  }
}
