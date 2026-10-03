# Lux Public Domain Routing — October 2, 2026

Status: PREPARED / EXTERNAL CLOUDFLARE ACCOUNT CUTOVER PENDING

## Canonical direct sites
- luxautomaton.com -> Lux Automaton website Worker/Static Assets.
- myluxagent.com -> Lux Agent website Worker/Static Assets.

## Branded front-door redirects
The prepared `lux-domain-router` Worker provides inexpensive canonical front doors while standalone public deployments are still being accepted:
- luxwarmconnect.com -> https://myluxagent.com/products/warm-connect
- lawcheckai.com -> https://luxautomaton.com/products/lawcheck-ai
- luxverifyai.com -> https://myluxagent.com/products/verify
- luxaikids.com -> https://luxautomaton.com/lux-ai-kids

The router also covers the matching `www` hosts.

## Deliberately held domains
- joinluxconnect.com stays parked until the standalone Lux Connect public deployment is accepted. Do not alias it to Warm Connect.
- luxcareeros.com stays protected/parked. Lux Career OS is the private career-automation app on the Mac mini; do not expose that desktop runtime publicly and do not route this domain to the unrelated Lux Care OS healthcare site.

## Lux Agent umbrella routes
- /products/desktop
- /products/usb
- /products/viewer
- /build
- /download
- /memory-packs
- /success-packs

## Activation gate
Do not run `npm run deploy:domain-router` until the domains are present as Cloudflare zones and founder/account authorization is active. Cloudflare Custom Domains will then create Worker DNS records and issue TLS certificates. After activation, flip the matching canonical-domain monitor entries from `pending` to `active` only after HTTPS and redirect checks pass.

GitHub Pages remains the bootstrap host until Cloudflare cutover is accepted. No email/MX configuration is part of this routing change.
