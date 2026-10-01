export type VisibilityAuditInput = {
  businessName: string;
  industry: string;
  location: string;
  website?: string;
  description?: string;
  services?: string[];
};

export type VisibilityRecommendation = {
  title: string;
  detail: string;
  impact: "high" | "medium" | "low";
};

export type VisibilityAuditResult = {
  mode: "live" | "preview";
  businessName: string;
  industry: string;
  location: string;
  scores: {
    visibility: number;
    geo: number;
    seo: number;
    trust: number;
    recommendation: number;
  };
  estimatedMissedRevenue: number | null;
  leadOpportunities: number | null;
  trend: number[];
  competitors: Array<{
    name: string;
    visibility: number;
    geo: number;
    mentions: number | null;
    estimatedLeads: number | null;
  }>;
  questions: Array<{ question: string; priority: "high" | "medium" | "low" }>;
  recommendations: VisibilityRecommendation[];
  summary: string;
};

const SUPABASE_FUNCTION_URL =
  "https://khyzmyvrfjwwnbvwfhhk.supabase.co/functions/v1/lux-ai-visibility";

const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, Math.round(value)));

function stableSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

export function createPreviewAudit(input: VisibilityAuditInput): VisibilityAuditResult {
  const seed = stableSeed(
    [input.businessName, input.industry, input.location, input.website || ""].join("|")
  );
  const completeness =
    42 +
    (input.website ? 12 : 0) +
    (input.description && input.description.length > 80 ? 10 : 4) +
    (input.services?.length ? Math.min(12, input.services.length * 3) : 0);

  const visibility = clamp(completeness + (seed % 17));
  const geo = clamp(visibility + 4 + (seed % 8));
  const seo = clamp(visibility - 8 + ((seed >> 3) % 12));
  const trust = clamp(visibility + 7 + ((seed >> 5) % 9));
  const recommendation = clamp((visibility + geo + trust) / 3 - 2);

  const trend = Array.from({ length: 12 }, (_, index) =>
    clamp(24 + index * 4.5 + ((seed >> (index % 8)) % 8))
  );

  const service = input.services?.[0] || input.industry || "your services";
  const city = input.location || "your area";

  return {
    mode: "preview",
    businessName: input.businessName || "Your Business",
    industry: input.industry || "Local Business",
    location: input.location || "Your Market",
    scores: { visibility, geo, seo, trust, recommendation },
    estimatedMissedRevenue: null,
    leadOpportunities: null,
    trend,
    competitors: [
      { name: "Nearby competitor A", visibility: clamp(visibility - 9), geo: clamp(geo - 7), mentions: null, estimatedLeads: null },
      { name: "Nearby competitor B", visibility: clamp(visibility - 16), geo: clamp(geo - 13), mentions: null, estimatedLeads: null },
      { name: "Nearby competitor C", visibility: clamp(visibility - 23), geo: clamp(geo - 19), mentions: null, estimatedLeads: null },
    ],
    questions: [
      { question: `Who is the best ${input.industry || "business"} in ${city}?`, priority: "high" },
      { question: `How much does ${service} cost in ${city}?`, priority: "high" },
      { question: `What should I look for when choosing ${input.industry || "a provider"}?`, priority: "medium" },
      { question: `Does ${input.businessName || "this business"} have strong reviews?`, priority: "medium" },
      { question: `Is ${service} available near me?`, priority: "low" },
    ],
    recommendations: [
      { title: "Add answer-ready FAQ content", detail: "Create concise pages that directly answer the questions buyers ask AI systems.", impact: "high" },
      { title: "Strengthen local business schema", detail: "Make services, location, hours, and business identity easier for machines to parse.", impact: "high" },
      { title: "Improve service-page specificity", detail: "Connect each core service to a clear location, outcome, proof point, and call to action.", impact: "high" },
      { title: "Increase third-party proof", detail: "Build consistent mentions and reviews across reputable local and industry sources.", impact: "medium" },
      { title: "Run Lux Verify after changes", detail: "Re-score the same checklist after updates so improvement is evidence-backed.", impact: "low" },
    ],
    summary:
      "Preview mode scores profile completeness and answer-readiness only. Live AI visibility claims are intentionally disabled until the free backend is verified.",
  };
}

export async function runVisibilityAudit(input: VisibilityAuditInput): Promise<VisibilityAuditResult> {
  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Visibility function unavailable: ${response.status}`);
    }

    const data = (await response.json()) as VisibilityAuditResult;
    if (data?.mode !== "live") throw new Error("Live audit not enabled");
    return data;
  } catch {
    return createPreviewAudit(input);
  }
}
