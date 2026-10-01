# Lux AI Visibility — Free-Only Architecture

## Cost lock

This product must not activate a paid infrastructure path without explicit owner approval.

### Active / allowed
- Front end: existing Lux Automaton GitHub Pages deployment ($0)
- Preview audit: deterministic client-side readiness scoring ($0)
- Data/function target: existing Lux Supabase project, Free plan only ($0)
- Optional AI: Gemini API only after the connected project is confirmed to be on Google's Free Tier ($0 within free-tier limits)

### Disabled
- Railway
- Google Maps / Places API
- Paid search grounding
- Paid LLM fallbacks
- Paid hosting
- Automatic paid-tier failover
- Fabricated revenue, lead, AI-mention, or competitor measurements

## Behavior

The public site calls the Supabase Edge Function URL. If the function is absent, asleep, rate-limited, missing a key, or otherwise unavailable, the UI automatically falls back to Preview mode.

Preview mode scores only information the visitor provides: business profile completeness, answer-readiness signals, service specificity, and local context. It visibly labels the result as a preview and does not claim live AI-platform measurements.

The Edge Function source is intentionally conservative. Even when enabled, it only analyzes supplied profile data and retrieved website text. It does not claim measurements from ChatGPT, Google AI Overviews, Gemini, Perplexity, traffic, revenue, or competitors without evidence.

## Free backend activation checklist

1. Confirm the existing Supabase project remains on Free.
2. Confirm the Gemini API project/key shows Billing Tier = Free and has no paid billing path intended for this product.
3. Set Edge Function secrets:
   - GEMINI_API_KEY
   - GEMINI_MODEL (optional)
   - LUX_FREE_ONLY=true
4. Deploy only the `lux-ai-visibility` function.
5. Run a small test audit.
6. Confirm no paid provider or billing account is required.
7. Only then label the product's audit as live.

## Source routes

- `/products/lux-ai-visibility/` — premium landing page
- `/products/lux-ai-visibility/dashboard/` — audit/dashboard
- `lib/visibilityAudit.ts` — browser adapter + safe preview fallback
- `supabase/functions/lux-ai-visibility/index.ts` — free backend source

## Visual target

Locked direction: black/charcoal luxury SaaS, gold/amber Lux accents, restrained cyan analytics, premium serif display type, glass panels, subtle light-streak motion, dense executive dashboard.
