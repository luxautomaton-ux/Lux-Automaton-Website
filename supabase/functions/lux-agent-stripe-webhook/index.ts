import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const TOLERANCE_SECONDS = 300;

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function hmac(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verifySignature(header: string, body: string) {
  if (!WEBHOOK_SECRET) return false;
  const parts = header.split(",");
  const timestamp = Number(parts.find(part => part.startsWith("t="))?.slice(2));
  const signatures = parts.filter(part => part.startsWith("v1=")).map(part => part.slice(3));
  if (!Number.isFinite(timestamp) || signatures.length === 0) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (age > TOLERANCE_SECONDS) return false;
  const expected = await hmac(WEBHOOK_SECRET, `${timestamp}.${body}`);
  return signatures.some(signature => safeEqual(signature, expected));
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

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function updateCheckout(id: string, patch: Record<string, unknown>) {
  const result = await rest(`lux_agent_checkout_sessions?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
  if (!result.ok) throw new Error("CHECKOUT_UPDATE_FAILED");
}

async function checkoutRecord(id: string) {
  const query = new URLSearchParams({
    select: "id,customer_email,setup,setup_hash,status,stripe_session_id,stripe_payment_intent_id,claimed_workspace_id",
    id: `eq.${id}`,
    limit: "1",
  });
  const result = await rest(`lux_agent_checkout_sessions?${query}`);
  if (!result.ok) throw new Error("CHECKOUT_READ_FAILED");
  return (await result.json() as Array<{
    id: string; customer_email: string; setup: Record<string, unknown>;
    setup_hash: string; status: string; stripe_session_id: string | null;
    stripe_payment_intent_id: string | null; claimed_workspace_id: string | null;
  }>)[0] ?? null;
}

async function checkoutByPaymentIntent(paymentIntentId: string) {
  const query = new URLSearchParams({
    select: "id",
    stripe_payment_intent_id: `eq.${paymentIntentId}`,
    limit: "1",
  });
  const result = await rest(`lux_agent_checkout_sessions?${query}`);
  if (!result.ok) throw new Error("CHECKOUT_READ_FAILED");
  return (await result.json() as Array<{ id: string }>)[0]?.id ?? null;
}

async function recordEvent(event: Record<string, unknown>, checkoutId: string | null, bodyHash: string) {
  const result = await rest("lux_agent_stripe_events?on_conflict=event_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify({
      event_id: String(event.id ?? ""),
      event_type: String(event.type ?? ""),
      checkout_id: checkoutId,
      payload_hash: bodyHash,
      livemode: Boolean(event.livemode),
    }),
  });
  if (!result.ok) throw new Error("EVENT_RECORD_FAILED");
  const rows = await result.json() as unknown[];
  return rows.length > 0;
}

Deno.serve(async request => {
  if (request.method !== "POST") return response({ error: "METHOD_NOT_ALLOWED" }, 405);
  if (!WEBHOOK_SECRET) return response({ error: "WEBHOOK_NOT_ACTIVATED" }, 503);

  const rawBody = await request.text();
  const signature = request.headers.get("Stripe-Signature") ?? "";
  if (!(await verifySignature(signature, rawBody))) {
    return response({ error: "INVALID_SIGNATURE" }, 400);
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return response({ error: "INVALID_EVENT" }, 400);
  }

  const data = (event.data ?? {}) as Record<string, unknown>;
  const object = (data.object ?? {}) as Record<string, unknown>;
  const metadata = (object.metadata ?? {}) as Record<string, unknown>;
  let checkoutId = String(metadata.checkout_id ?? object.client_reference_id ?? "").trim() || null;
  const type = String(event.type ?? "");
  const bodyHash = await digest(rawBody);

  try {
    if (!checkoutId && type === "charge.refunded") {
      const paymentIntentId = String(object.payment_intent ?? "").trim();
      if (paymentIntentId) checkoutId = await checkoutByPaymentIntent(paymentIntentId);
    }

    const fresh = await recordEvent(event, checkoutId, bodyHash);
    if (!fresh) return response({ ok: true, duplicate: true });

    if (!checkoutId) return response({ ok: true, ignored: "NO_CHECKOUT_ID" });
    const checkout = await checkoutRecord(checkoutId);
    if (!checkout) return response({ ok: true, ignored: "CHECKOUT_NOT_FOUND" });

    if (type === "checkout.session.completed" || type === "checkout.session.async_payment_succeeded") {
      const paymentStatus = String(object.payment_status ?? "");
      if (paymentStatus !== "paid") {
        return response({ ok: true, pending: true });
      }
      if (String(metadata.setup_hash ?? "") !== checkout.setup_hash) {
        await updateCheckout(checkout.id, {
          status: "failed",
          error_code: "SETUP_HASH_MISMATCH",
          error_detail: "Paid Stripe session metadata did not match the stored Lux setup.",
        });
        return response({ error: "SETUP_HASH_MISMATCH" }, 409);
      }
      await updateCheckout(checkout.id, {
        status: "paid",
        stripe_session_id: String(object.id ?? ""),
        stripe_payment_intent_id: String(object.payment_intent ?? "") || null,
        stripe_customer_id: String(object.customer ?? "") || null,
        amount_total: Number(object.amount_total ?? 0),
        currency: String(object.currency ?? "") || null,
        livemode: Boolean(event.livemode),
        paid_at: new Date().toISOString(),
        error_code: null,
        error_detail: null,
      });
    } else if (type === "checkout.session.expired") {
      await updateCheckout(checkout.id, { status: "expired" });
    } else if (type === "checkout.session.async_payment_failed") {
      await updateCheckout(checkout.id, {
        status: "failed",
        error_code: "ASYNC_PAYMENT_FAILED",
        error_detail: "Stripe reported that the asynchronous payment failed.",
      });
    } else if (type === "charge.refunded") {
      await updateCheckout(checkout.id, {
        status: "refunded",
        error_code: null,
        error_detail: null,
      });
      if (checkout.stripe_session_id) {
        const query = new URLSearchParams({
          source: "eq.stripe",
          source_ref: `eq.${checkout.stripe_session_id}`,
        });
        const revoke = await rest(`lux_entitlements?${query}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "canceled", updated_at: new Date().toISOString() }),
        });
        if (!revoke.ok) throw new Error("ENTITLEMENT_REVOKE_FAILED");
      }
    }

    return response({ ok: true });
  } catch (error) {
    console.error(error);
    return response({ error: "WEBHOOK_PROCESSING_FAILED" }, 500);
  }
});