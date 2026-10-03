import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = new Set([
  "https://luxautomaton-ux.github.io",
  "https://luxautomaton.com",
  "http://localhost:3000",
]);

function cors(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://luxautomaton-ux.github.io";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...cors(origin),
    },
  });
}

function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function validEmail(email: string) {
  return email.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validToken(token: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token);
}

async function rest(path: string, init: RequestInit = {}) {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("BACKEND_NOT_CONFIGURED");
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

Deno.serve(async request => {
  const origin = request.headers.get("Origin");
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors(origin) });
  }
  if (request.method !== "POST") return json({ error: "METHOD_NOT_ALLOWED" }, 405, origin);
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: "ORIGIN_NOT_ALLOWED" }, 403, origin);
  if (!SUPABASE_URL || !SERVICE_KEY) return json({ error: "BACKEND_NOT_CONFIGURED" }, 503, origin);

  let body: {
    action?: unknown;
    email?: unknown;
    consent?: unknown;
    consentLanguageVersion?: unknown;
    source?: unknown;
    token?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return json({ error: "INVALID_REQUEST" }, 400, origin);
  }

  const action = String(body.action ?? "subscribe").trim().toLowerCase();

  if (action === "unsubscribe") {
    const token = String(body.token ?? "").trim();
    if (!validToken(token)) return json({ error: "INVALID_MANAGE_TOKEN" }, 400, origin);

    const query = new URLSearchParams({ manage_token: `eq.${token}` });
    const response = await rest(`newsletter_subscribers?${query}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) return json({ error: "UNSUBSCRIBE_UNAVAILABLE" }, 503, origin);
    return json({ ok: true }, 200, origin);
  }

  const email = normalizeEmail(body.email);
  const consent = body.consent === true;
  const consentLanguageVersion = String(body.consentLanguageVersion ?? "").trim().slice(0, 64);
  const source = String(body.source ?? "luxautomaton.com").trim().slice(0, 120);

  if (!consent || !validEmail(email) || !consentLanguageVersion) {
    return json({ error: "INVALID_SUBSCRIPTION" }, 400, origin);
  }

  const response = await rest("newsletter_subscribers?on_conflict=email", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      email,
      status: "subscribed",
      consent: true,
      consent_language_version: consentLanguageVersion,
      source,
      unsubscribed_at: null,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    console.error("newsletter insert failed", response.status, await response.text());
    return json({ error: "SUBSCRIPTION_UNAVAILABLE" }, 503, origin);
  }

  return json({ ok: true }, 200, origin);
});
