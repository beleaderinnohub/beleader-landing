// Cloudflare Pages Function: POST /api/enroll
// Receives a registration, validates it, and persists it via the
// data-access layer. Optionally notifies you by email (see NOTE below).
import { D1EnrollmentStore, type EnrollmentInput } from "../_lib/enrollments";

interface Env {
  DB: D1Database;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: Partial<EnrollmentInput>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = (data.name ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const program = (data.program ?? "").toString().trim();
  const message = (data.message ?? "").toString().trim().slice(0, 2000);

  if (!name || name.length > 200) return json({ error: "Name is required." }, 400);
  if (!emailRe.test(email)) return json({ error: "A valid email is required." }, 400);
  if (!program) return json({ error: "Please choose a program." }, 400);

  try {
    const store = new D1EnrollmentStore(env.DB);
    const { id } = await store.save({ name, email, program, message });

    // NOTE: to also get an email per signup, add an email binding (e.g.
    // MailChannels / Resend) and send it here. Wired up in a later step.

    return json({ ok: true, id }, 201);
  } catch (err) {
    return json({ error: "Could not save your registration. Please try again." }, 500);
  }
};
