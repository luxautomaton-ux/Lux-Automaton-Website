# Lux Cost & Infrastructure Center — Operating Playbook

Last pricing review: October 2, 2026

## Purpose

This document is the durable operating guide behind the private **Costs & Hosting** tab in Lux OS Admin Workspace.

The goal is simple: Asa, Torrey, LANA, Dre, and Tyrone should always be able to answer:

- What services run Lux Automaton?
- What are we paying right now?
- What will production launch cost?
- Which costs are fixed and which grow with usage?
- Who owns each service?
- What event is allowed to trigger a paid upgrade?
- How do we recover if a service fails?

This file intentionally contains **no private invoices, payment details, secrets, tokens, or customer information**.

## Core architecture

1. **GitHub** is the source of truth for Lux website/application code.
2. **Cloudflare** is the planned production web edge for Workers Static Assets, DNS, SSL, caching, Workers, R2, and Stream when those services are needed.
3. **Supabase** is the shared managed production backend for customer-facing database, authentication, and application data.
4. **Stripe** is the payment processor. Its cost follows successful payment volume.
5. **Mac mini** remains the private Lux infrastructure for LANA, agents, testing, local models, automation, and internal services.
6. **GoDaddy / registrar** can continue to own domains while DNS points to the selected production host.

The company should not buy one paid infrastructure stack per Lux app unless isolation, compliance, performance, or scale creates a documented reason.

## Cost stages

### Stage 1 — Build

Default rule: **$0 new cloud infrastructure baseline**.

Use the existing repository, current website deployment, connected development backend, and free tiers while engineering/testing.

### Stage 2 — Customer production

Primary planned fixed infrastructure expense:

- Supabase Pro: $25/month baseline.

Cloudflare Workers Static Assets is the preferred new-project deployment path. Static asset requests are free and unlimited; Worker code stays on the free tier unless measured requirements justify the paid plan.

### Stage 3 — Usage growth

Add only when needed:

- Cloudflare Workers paid: $5/month minimum if paid capacity is needed; server endpoints can begin on the Worker Free plan.
- R2: first 10 GB-month of standard storage is free, then standard storage is currently $0.015/GB-month, plus operations when applicable.
- Stream: $5/month per 1,000 minutes of stored-video capacity and $1 per 1,000 minutes delivered.
- Stripe Standard domestic cards: 2.9% + $0.30 per successful transaction.
- AI/API spend: usage-based and manually tracked.
- Additional tools: founder-approved only.

### Stage 4 — Scale / isolation

Separate databases, larger compute, extra production projects, enterprise controls, or additional infrastructure are approved only after the reason and expected cost are documented in the Cost Center.

## 5W + H

### WHO

- **Asa** — founder approval gate for recurring spend, production upgrades, and vendor changes.
- **Torrey** — founder-level budget visibility and monthly cost review.
- **LANA** — operates the Cost Center, maintains the checklist, explains the architecture, and flags budget variance.
- **Dre** — technical owner for hosting, DNS implementation, deployment, backend connectivity, backups, and migrations.
- **Tyrone** — operating-cost owner for invoices, renewals, usage, support burden, and vendor reconciliation.

### WHAT

One shared Lux infrastructure foundation covering source control, website delivery, backend/data, payments, media, and private internal infrastructure.

### WHEN

- Build/test: free-first.
- Customer launch: activate production-grade backend.
- Paid edge/media: activate only at an actual limit or product requirement.
- Monthly: reconcile invoices and update the Cost Center.
- Before every new recurring charge: founder approval.

### WHY

Keep fixed expenses low, avoid duplicate subscriptions, preserve uptime and security, make spending understandable, and allow costs to rise mainly when customers/usage rise.

### WHERE

- GitHub: code.
- Cloudflare: public Internet edge.
- Supabase: customer-facing production data/auth.
- Stripe: payments.
- Mac mini: private Lux intelligence/operations.
- Registrar: domain ownership.

### HOW

Code change → review/test → deployment → static production edge → approved Worker/Edge-Function runtime for server routes → shared backend → payment/media services as needed.

All recurring services are entered into the ledger. Every paid upgrade has an owner, reason, trigger, and rollback/exit path.

## LANA rules

1. **Free-first.** Do not recommend a paid tier merely because it exists.
2. **No silent upgrades.** LANA can prepare the recommendation but Asa approves new recurring spend.
3. **One shared production backend first.** Split only for a documented technical/business reason.
4. **Reconcile monthly.** Compare the private ledger against real vendor statements.
5. **Warn at 80% of monthly operating budget.**
6. **At 100%, stop optional expansion and request founder review.**
7. **Explain variance.** Every material increase must answer what changed, why it changed, and whether it is avoidable.
8. **Keep secrets out of GitHub.** Never commit invoices, payment methods, API secrets, private account identifiers, or private customer data.
9. **Back up the cost snapshot.** Export the private JSON snapshot after meaningful updates until server-side private synchronization is enabled.
10. **Keep the process portable.** These rules live in the Lux product/repository so they do not depend on a specific ChatGPT plan.

## Monthly review script for LANA

LANA should be able to answer the founders in plain language:

- Current tracked monthly operating cost.
- What changed since the last review.
- Upcoming renewals.
- Any usage-based service approaching a threshold.
- Current monthly budget percentage.
- Production infrastructure cost versus founder/tooling cost.
- Any paid service that can be downgraded, removed, or consolidated.
- Any launch dependency not yet completed.
- Recommendation, with the cost impact and approval needed.

## Production cutover checklist

- Cloudflare account and production Workers Static Assets deployment connected.
- Production custom domain/DNS validated.
- HTTPS validated.
- Supabase production plan approved and activated at launch.
- Database backups and restore procedure verified.
- Stripe live-mode configuration verified.
- Existing server routes reviewed: Stripe checkout points to the Supabase Edge Function; LANA/chat and marketing server logic have an approved authenticated Worker/Edge-Function home. Static hosting alone is not treated as an API runtime.
- Paid workshop video path chosen only if private video is required.
- Monitoring and rollback owner assigned.
- Current recurring costs entered into the private Cost Center ledger.
- Founders receive the final monthly and annual baseline before launch.

## Pricing sources

Pricing changes. LANA/Tyrone should verify these sources before approving material spend:

- Supabase: https://supabase.com/pricing
- Cloudflare Static Assets: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- Cloudflare Workers: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare R2: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Stream: https://developers.cloudflare.com/stream/pricing/
- Stripe: https://stripe.com/pricing
- ChatGPT Plus: https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus

The admin dashboard shows the date its baseline pricing was last reviewed. Actual invoices always take precedence over estimates.
