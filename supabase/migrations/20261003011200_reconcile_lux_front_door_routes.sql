update public.lux_domains
set target_route='Cloudflare Custom Domain -> lux-domain-router -> https://luxautomaton.com/lux-connect',
    launch_gate='Activate only after the Lux Connect marketing page and luxautomaton.com pass production HTTPS/route acceptance; keep the product runtime private until separately accepted',
    notes='Lux Connect public brand front door. This route is a marketing/info surface, not approval to expose unfinished provider-connected product functionality.',
    updated_at=now()
where domain='joinluxconnect.com';

update public.lux_domains
set target_route='Cloudflare Custom Domain -> lux-domain-router -> https://luxautomaton.com/lux-career-os',
    launch_gate='Marketing-page redirect only. Activate after luxautomaton.com/Lux Career OS page passes HTTPS/route acceptance; do not expose the private Mac mini Career OS runtime',
    notes='Lux Career OS brand front door. Marketing/info only; never map this domain to the separate Lux Care OS healthcare product.',
    updated_at=now()
where domain='luxcareeros.com';

update public.lux_domains
set target_route='Cloudflare Custom Domain -> lux-domain-router -> https://luxautomaton.com/lawcheck-ai',
    launch_gate='Activate only after luxautomaton.com and the LawCheck AI marketing route pass production acceptance',
    updated_at=now()
where domain='lawcheckai.com';
