// Lux AI Visibility — free-only Supabase Edge Function source.
// Do not deploy with a paid Gemini project. The UI safely falls back to Preview mode when unavailable.

const allowedOrigins = new Set([
  "https://luxautomaton-ux.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function cors(origin: string | null) {
  const safeOrigin = origin && allowedOrigins.has(origin) ? origin : "https://luxautomaton-ux.github.io";
  return {
    "access-control-allow-origin": safeOrigin,
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "POST, OPTIONS",
    "vary": "Origin",
  };
}

function clamp(n: unknown) {
  return Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(origin) });
  if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors(origin) });
  if (origin && !allowedOrigins.has(origin)) return Response.json({ error: "Origin not allowed" }, { status: 403, headers: cors(origin) });

  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  const geminiModel = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash-lite";
  const freeOnly = (Deno.env.get("LUX_FREE_ONLY") || "true") === "true";

  if (!geminiKey || !freeOnly) {
    return Response.json(
      { error: "Live audit is intentionally disabled until a verified free-tier Gemini key is configured.", mode: "preview" },
      { status: 503, headers: cors(origin) }
    );
  }

  let input: Record<string, unknown>;
  try { input = await req.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400, headers: cors(origin) }); }

  const businessName = String(input.businessName || "").slice(0, 120);
  const industry = String(input.industry || "").slice(0, 120);
  const location = String(input.location || "").slice(0, 160);
  const website = String(input.website || "").slice(0, 500);
  const description = String(input.description || "").slice(0, 2500);
  const services = Array.isArray(input.services) ? input.services.slice(0, 20).map(v => String(v).slice(0, 120)) : [];

  if (!businessName || !industry || !location) {
    return Response.json({ error: "businessName, industry and location are required" }, { status: 400, headers: cors(origin) });
  }

  let websiteText = "";
  if (website && /^https?:\/\//i.test(website)) {
    try {
      const page = await fetch(website, { redirect: "follow", signal: AbortSignal.timeout(7000) });
      if (page.ok && (page.headers.get("content-type") || "").includes("text/html")) {
        websiteText = (await page.text())
          .replace(/<script[\s\S]*?<\/script>/gi, " ")
          .replace(/<style[\s\S]*?<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .slice(0, 12000);
      }
    } catch { /* website retrieval is optional */ }
  }

  const prompt = `You are Lux AI Visibility, a conservative business discoverability auditor.
Use ONLY the provided business profile and website text. Do not claim you measured ChatGPT, Google AI Overviews, Gemini, Perplexity, search rankings, traffic, leads, revenue, or competitor data unless that evidence is explicitly present.
Score answer-readiness and machine-readable discoverability from 0-100:
visibility, geo, seo, trust, recommendation.
Return strict JSON with:
{
"mode":"live",
"businessName":"...",
"industry":"...",
"location":"...",
"scores":{"visibility":0,"geo":0,"seo":0,"trust":0,"recommendation":0},
"estimatedMissedRevenue":null,
"leadOpportunities":null,
"trend":[12 numbers 0-100],
"competitors":[],
"questions":[{"question":"...","priority":"high|medium|low"}],
"recommendations":[{"title":"...","detail":"...","impact":"high|medium|low"}],
"summary":"..."
}
Never invent revenue or competitor metrics.

BUSINESS NAME: ${businessName}
INDUSTRY: ${industry}
LOCATION: ${location}
WEBSITE: ${website || "not provided"}
DESCRIPTION: ${description || "not provided"}
SERVICES: ${services.join(", ") || "not provided"}
WEBSITE TEXT: ${websiteText || "not available"}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModel)}:generateContent?key=${encodeURIComponent(geminiKey)}`;
  const ai = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.2, maxOutputTokens: 4096 },
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!ai.ok) {
    const body = await ai.text();
    return Response.json({ error: "Free AI backend unavailable", detail: body.slice(0, 400), mode: "preview" }, { status: 503, headers: cors(origin) });
  }

  const payload = await ai.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  let result;
  try { result = JSON.parse(text); } catch { return Response.json({ error: "AI returned invalid JSON", mode: "preview" }, { status: 502, headers: cors(origin) }); }

  result.mode = "live";
  result.businessName = businessName;
  result.industry = industry;
  result.location = location;
  result.estimatedMissedRevenue = null;
  result.leadOpportunities = null;
  result.competitors = [];
  result.scores = {
    visibility: clamp(result.scores?.visibility),
    geo: clamp(result.scores?.geo),
    seo: clamp(result.scores?.seo),
    trust: clamp(result.scores?.trust),
    recommendation: clamp(result.scores?.recommendation),
  };

  return Response.json(result, { headers: { ...cors(origin), "content-type": "application/json" } });
});
