# Lux Infrastructure Closeout — 2026-10-02

## Closeout definition

This file defines what is complete in the free-first infrastructure phase and what remains intentionally gated behind founder/account action.

### Complete now

- Six public Lux sites are live on GitHub Pages at $0 new monthly hosting cost:
  - Lux Automaton
  - Lux Agent
  - Lux Care OS
  - Lux Coder
  - Lux Studio
  - Lux Store
- All six are registered in the private Supabase `lux_web_properties` fleet registry.
- Mac mini `com.lux.web-fleet-health` checks the six sites every six hours.
- Mac mini `com.lux.supabase-keepalive` performs read-only database checks at 08:00, 14:00, and 20:00.
- Cloudflare Workers Static Assets configuration is committed across the public web fleet. Current GitHub Pages hosting remains unchanged.
- Lux Automaton Cloudflare-root and GitHub Pages builds pass.
- Lux Agent Cloudflare-root and GitHub Pages builds pass.
- One shared Supabase project is the general Lux web backend.
- Supabase is ACTIVE_HEALTHY and RLS is enabled on exposed application tables.
- Workshop privileged functions were hardened to security invoker and anonymous reorder access was removed.
- Lux Cost Center data has an admin-only Supabase table plus browser-local fallback.
- Lux web fleet registry is admin-only.
- Lux Agent checkout tables are browser-blocked and service-role-only.
- Canonical customer cloud core is present: workspaces, members, profiles, contacts, desk records, billing customers/events, and workspace entitlements.
- Paid Build My Lux orders are claimed into a customer workspace through the authenticated `lux-agent-claim-order` Edge Function.
- Signed customer setups use an Ed25519 signing seed generated inside Supabase Vault; the private seed is not committed to GitHub. The public verification key is initialized by `lux-agent-signed-setup` and stored in the signing-key registry.
- Setup-signing issuances are service-only and audited in `lux_agent_setup_issuances`.
- Lux Agent checkout Edge Function is deployed and non-charging until launch configuration is supplied.
- Lux Agent Stripe webhook Edge Function is deployed and non-processing until a webhook secret is supplied.
- Lux AI Visibility Edge Function is deployed; without a verified free Gemini key it intentionally returns Preview mode.
- Live Supabase migrations and Edge Function sources are mirrored in this repository.
- Supabase security advisor has no fixable Free-plan security findings; leaked-password protection remains a Pro-plan-only warning.

## Verified zero-charge checkout state

The live checkout status reports:

- `enabled: false`
- `stripeConfigured: false`
- `originConfigured: false`
- `activeCatalogItems: 0`
- `chargesAllowed: false`

A direct checkout POST returns `503 CHECKOUT_NOT_ACTIVATED`.
A direct webhook POST returns `503 WEBHOOK_NOT_ACTIVATED`.

This is intentional. No Stripe charge can be created from the prepared Lux Agent checkout until the founder launch gate is completed. The signing layer is operational independently of Stripe: its Vault seed and public verification key are present, but signed customer setup issuance still requires a legitimately paid and claimed order.

## Launch gates that must remain pending

These items are NOT engineering omissions. They require an external account, production credential, domain/DNS change, paid plan, or founder approval.

1. **Cloudflare account + domain cutover**
   - Create/connect the Cloudflare account.
   - Create Workers Static Assets projects from the prepared repositories.
   - Point production DNS/custom domains after preview validation.
   - Keep GitHub Pages as bootstrap/pre-launch hosting until cutover.

2. **Stripe production activation**
   - Confirm final products/prices.
   - Add Stripe Price IDs to `lux_agent_checkout_catalog`.
   - Set `STRIPE_SECRET_KEY` in Supabase Edge Function secrets.
   - Set `STRIPE_WEBHOOK_SECRET`.
   - Set `LUX_AGENT_CHECKOUT_ALLOWED_ORIGINS` to approved production origins.
   - Configure the Stripe webhook endpoint to `/functions/v1/lux-agent-stripe-webhook`.
   - Activate only approved catalog rows.
   - Run Stripe test-mode checkout + webhook acceptance before enabling live mode.

3. **Supabase Pro**
   - Stay Free while building.
   - Upgrade the one shared production project when real customer production data begins.
   - This is the planned $25/month production gate.

4. **Optional Cloudflare Workers Paid**
   - Do not enable while Workers Free meets actual requirements.
   - Paid Workers is a later measured-usage/reliability gate.

5. **Optional media storage**
   - R2/Stream only when actual file/video delivery requires it.
   - Lux Coder currently has one large podcast asset excluded from the future static bundle.

## Cost ladder

- Stage 0 — build / zero sales: **$0 new infrastructure**
- Stage 1 — customer production backend: **~$25/month**
- Stage 2 — add ChatGPT Plus as a Lux operating tool: **~$45/month**
- Stage 3 — add paid Workers only if required: **~$50/month**
- Stripe, storage, video, domains, AI APIs, electricity, internet, taxes, and other tools are variable/existing expenses and are tracked separately.

## Ownership

- Asa — recurring-spend approval and production launch decisions.
- Torrey — founder visibility and cost review.
- LANA — monitoring, explanations, alerts, and operating-playbook continuity.
- Dre — deployment, DNS, hosting, backend engineering, and recovery.
- Tyrone — renewals, usage costs, invoices, and variance tracking.

## Completion rule

Do not mark a pending launch gate complete merely because code exists. A gate is complete only after the external account/configuration is present and its end-to-end acceptance test passes.
