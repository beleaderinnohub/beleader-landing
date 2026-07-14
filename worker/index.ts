/// <reference types="@cloudflare/workers-types" />
// Worker entry for Be-leader Landing.
// Static assets are served automatically (assets-first routing); this script
// runs only for paths with no matching asset — chiefly POST /api/enroll.
import { D1EnrollmentStore, type EnrollmentInput } from "./enrollments";

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleEnroll(request: Request, env: Env): Promise<Response> {
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
    // Resend / MailChannels) and send it here. Wired up in a later step.
    return json({ ok: true, id }, 201);
  } catch {
    return json({ error: "Could not save your registration. Please try again." }, 500);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/enroll") {
      if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
      return handleEnroll(request, env);
    }

    // Any other non-asset path: hand back to the asset handler so the
    // styled 404 page (not_found_handling = "404-page") is served.
    return env.ASSETS.fetch(request);
  },
};
