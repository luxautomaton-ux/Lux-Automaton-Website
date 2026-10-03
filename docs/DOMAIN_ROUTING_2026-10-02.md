# Lux Public Domain Routing — October 2, 2026

Status: PREPARED / EXTERNAL CLOUDFLARE ACCOUNT CUTOVER PENDING

## Canonical direct sites
- luxautomaton.com -> Lux Automaton website Worker/Static Assets.
- myluxagent.com -> Lux Agent website Worker/Static Assets.
- viewer.myluxagent.com -> MyLuxAgent Viewer front door; redirects to the Viewer experience inside the Lux Agent family.

## Branded front-door redirects
The prepared `lux-domain-router` Worker gives the protected product domains useful public destinations without exposing unfinished/private runtimes:
- luxwarmconnect.com -> https://myluxagent.com/products/warm-connect
- joinluxconnect.com -> https://luxautomaton.com/lux-connect
- lawcheckai.com -> https://luxautomaton.com/lawcheck-ai
- luxverifyai.com -> https://myluxagent.com/products/verify
- luxcareeros.com -> https://luxautomaton.com/lux-career-os
- luxaikids.com -> https://luxautomaton.com/lux-ai-kids

The router also covers the matching `www` hosts.

## Privacy / product boundaries
- Lux Connect's domain points only to the public marketing/info page until the standalone product and provider services are independently accepted.
- Lux Career OS's domain points only to the public marketing/info page. The private Mac mini Career OS desktop runtime is not exposed.
- Lux Career OS is distinct from Lux Care OS healthcare; luxcareeros.com must never be attached to the healthcare repository.
- Lux Codex v3.0 and Lux Hermes Desktop remain private/internal and have no public domains.

## Lux Agent umbrella
Public aliases are prepared for:
- /desktop -> /products/desktop
- /usb -> /products/usb
- /viewer -> /products/viewer
- /builder -> /build
- viewer.myluxagent.com -> /products/viewer

Native product routes also remain available:
- /products/desktop
- /products/usb
- /products/viewer
- /build
- /download
- /memory-packs
- /success-packs

## Activation gate
Do not run the Cloudflare deployment commands until the domains are present as Cloudflare zones and founder/account authorization is active. Cloudflare Custom Domains will create Worker DNS records and issue TLS certificates. After activation, flip the matching canonical-domain monitor entries from `pending` to `active` only after HTTPS, redirect, asset, and product-route checks pass.

GitHub Pages remains the bootstrap host until Cloudflare cutover is accepted. No email/MX configuration is part of this routing change.
