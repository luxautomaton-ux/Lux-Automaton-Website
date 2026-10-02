# Lux Zero-Dollar Bootstrap Infrastructure

Revision: October 2, 2026

## Founder rule

**Zero sales = zero new infrastructure spend.**

Lux Automaton should use free tiers, already-owned hardware, and shared infrastructure until a real customer, reliability requirement, compliance requirement, or measured usage threshold justifies a paid service. Every new recurring charge requires Asa approval.

This is a bootstrap operating target, not a claim that the company has no other expenses. Existing domain renewals, electricity, internet, founder software subscriptions, taxes, payment fees, and usage-based API costs are tracked separately in the Lux Cost & Infrastructure Center.

## Web fleet — current verified state

The following six public sites were verified reachable on GitHub Pages with HTTP 200 on October 2, 2026:

| Site | Repository | Current host | New monthly hosting cost |
|---|---|---|---:|
| Lux Automaton | luxautomaton-ux/Lux-Automaton-Website | GitHub Pages | $0 |
| Lux Agent | luxautomaton-ux/lux-agent-website | GitHub Pages | $0 |
| Lux Care OS | luxautomaton-ux/lux-care-os-website | GitHub Pages | $0 |
| Lux Coder | luxautomaton-ux/lux-coder-website | GitHub Pages | $0 |
| Lux Studio | luxautomaton-ux/lux-studio-website | GitHub Pages | $0 |
| Lux Store | luxautomaton-ux/lux-store | GitHub Pages | $0 |

The Mac mini runs a read-only fleet monitor every six hours and alerts Asa through LANA if a site stops returning HTTP 200.

## Shared stack

- GitHub: source control and current free Pages hosting.
- Cloudflare Workers Static Assets: planned public edge when domains are cut over. Do not enable a paid Workers plan unless free limits or production requirements justify it.
- Supabase: one shared managed Lux backend initially for common customer/account/content services.
- Stripe: payment processing only when sales occur.
- Mac mini: private LANA/agents/local models/testing/automation/health checks.
- GoDaddy or current registrar: keep domain ownership; DNS can point to Cloudflare later.

Lux Care OS marketing can participate in the shared web fleet, but clinical/health data must remain isolated from the general Lux customer backend.

## Cost ladder

### Stage 0 — Bootstrap / zero sales

Target new infrastructure spend: **$0/month**.

Keep all six sites on free hosting. Keep Supabase Free while building/testing. Use Workers Free only if a server endpoint is needed. Do not activate paid video/storage or create duplicate backends.

### Stage 1 — First real customer production

Primary launch gate: **Supabase Pro, $25/month baseline**.

The shared production backend is upgraded when real customer production data requires the paid reliability tier. Do not buy one Supabase project per website.

### Stage 2 — Founder tooling baseline

If ChatGPT Plus is treated as a Lux business tool, add **$20/month**.

Infrastructure + founder tooling target: approximately **$45/month**.

### Stage 3 — Optional paid edge

If Cloudflare Workers Free is no longer enough, Workers Paid begins around **$5/month minimum**.

Target with Supabase Pro + ChatGPT Plus + Workers Paid: approximately **$50/month** before variable usage.

### Usage-based costs

- Stripe: only when a payment succeeds.
- R2: only when file/storage needs justify moving assets there.
- Stream: only when protected workshop/video delivery is needed.
- AI/model APIs: usage-based and separately budgeted.
- Domain renewals: annual existing obligations; track monthly equivalent in Cost Center.

## Upgrade gates

LANA must not recommend or activate a paid service merely because a paid tier exists. A paid change needs all four:

1. A documented problem or production requirement.
2. The expected monthly cost.
3. Why the free/current path is no longer enough.
4. Founder approval.

## Website deployment policy

Current free host remains GitHub Pages until the Cloudflare account/domain cutover is ready. Cloudflare preparation may be committed to source control without changing DNS or creating a paid plan.

No Hostinger subscription is required for this architecture.

## LANA / team responsibilities

- Asa: approves recurring spend and launch upgrades.
- Torrey: founder-level cost visibility.
- LANA: explains the stack, monitors thresholds, and alerts on outages/variance.
- Dre: deployment, DNS, hosting, backend connectivity, recovery.
- Tyrone: cost reconciliation, renewals, payment/usage tracking.

## Health monitors

Mac mini services:

- `com.lux.supabase-keepalive` — read-only Supabase activity/health checks at 08:00, 14:00, and 20:00.
- `com.lux.web-fleet-health` — six-site HTTP health check every six hours.

These monitors add no cloud subscription cost.
