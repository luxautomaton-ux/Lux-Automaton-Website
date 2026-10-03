-- Wire the founder-owned public domain set without exposing private/internal runtimes.
-- Idempotent: safe to re-apply after the initial domain registry migration.

insert into public.lux_domains
(domain, product_name, repo_full_name, registrar, auto_renew, renewal_date, nameservers,
 current_dns_status, current_web_status, current_destination, target_host, target_route,
 launch_gate, owner, notes, last_checked_at)
values
('myluxagent.com','Lux Agent','luxautomaton-ux/lux-agent-website','GoDaddy',true,'2027-10-02',
 array['ns13.domaincontrol.com','ns14.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / pre-cutover','GoDaddy parking',
 'Cloudflare Workers Static Assets','Cloudflare Custom Domain -> lux-agent-website',
 'Add domain to Cloudflare zone, deploy lux-agent-website custom domain, then require HTTPS + root + product-route acceptance before marking active',
 'Tyrone + Dre',
 'Canonical umbrella for Lux Agent Desktop, USB, Viewer, Builder, downloads/accounts, Memory Packs and Success Packs.',now()),
('luxwarmconnect.com','Lux Warm Connect','luxautomaton-ux/Lux-WarmConnect','GoDaddy',true,'2027-10-02',
 array['ns37.domaincontrol.com','ns38.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / pre-cutover','GoDaddy parking',
 'Cloudflare Workers Static Assets','Cloudflare Custom Domain -> lux-domain-router -> https://myluxagent.com/products/warm-connect',
 'Activate only after myluxagent.com passes production HTTPS and Warm Connect landing acceptance',
 'Tyrone + Dre',
 'Standalone branded front door; may move from redirect to its own accepted deployment later.',now()),
('joinluxconnect.com','Lux Connect','luxautomaton-ux/lux-connect','GoDaddy',true,'2027-10-02',
 array['ns49.domaincontrol.com','ns50.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / pre-cutover','GoDaddy parking',
 'Cloudflare Workers Static Assets','Standalone Lux Connect public deployment; no Warm Connect alias',
 'Keep parked until the Lux Connect public deployment is accepted and a Cloudflare route is ready',
 'Tyrone + Dre',
 'Lux Connect and Warm Connect remain distinct products.',now()),
('lawcheckai.com','LawCheck AI','luxautomaton-ux/LawCheckAI','GoDaddy',true,'2027-10-02',
 array['ns37.domaincontrol.com','ns38.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / pre-cutover','GoDaddy parking',
 'Cloudflare Workers Static Assets','Cloudflare Custom Domain -> lux-domain-router -> https://luxautomaton.com/products/lawcheck-ai',
 'Activate only after luxautomaton.com and LawCheck landing route pass production acceptance',
 'Tyrone + Dre',
 'Standalone branded front door; may move to its own accepted deployment later.',now()),
('luxverifyai.com','Lux Verify','luxautomaton-ux/lux-verify-operator','GoDaddy',true,'2027-10-02',
 array['ns57.domaincontrol.com','ns58.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / pre-cutover','GoDaddy parking',
 'Cloudflare Workers Static Assets','Cloudflare Custom Domain -> lux-domain-router -> https://myluxagent.com/products/verify',
 'Activate only after myluxagent.com and Verify landing route pass production acceptance',
 'Tyrone + Dre',
 'Public branded front door only; independent verification authority remains separate from production runtimes.',now()),
('luxcareeros.com','Lux Career OS',null,'GoDaddy',true,'2027-10-02',
 array['ns13.domaincontrol.com','ns14.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / protected','GoDaddy parking',
 'Cloudflare Workers Static Assets','Protected only; no public Career OS runtime exposure',
 'Keep parked until an explicit founder decision creates a public Career OS marketing/release surface; never route to Lux Care OS healthcare',
 'Tyrone + Dre',
 'Career OS is the private career/job automation product. This domain must never be mapped to the separate Lux Care OS healthcare site.',now()),
('luxaikids.com','Lux AI Kids','luxautomaton-ux/Lux-Automaton-Website','GoDaddy',true,'2027-10-02',
 array['ns63.domaincontrol.com','ns64.domaincontrol.com'],
 'GoDaddy DNS / parking A records','Parked / pre-cutover','GoDaddy parking',
 'Cloudflare Workers Static Assets','Cloudflare Custom Domain -> lux-domain-router -> https://luxautomaton.com/lux-ai-kids',
 'Activate only after luxautomaton.com and Lux AI Kids route pass production acceptance',
 'Tyrone + Dre',
 'Canonical Lux AI Kids branded front door.',now()),
('luxautomaton.com','Lux Automaton','luxautomaton-ux/Lux-Automaton-Website','GoDaddy',true,'2028-03-29',
 array['ns49.domaincontrol.com','ns50.domaincontrol.com'],
 'GoDaddy DNS / forwarding A records','Forwarded / masked','GoDaddy forwarding to GitHub Pages bootstrap',
 'Cloudflare Workers Static Assets','Cloudflare Custom Domain -> lux-automaton-website',
 'Add domain to Cloudflare zone, deploy lux-automaton-website custom domain, then require HTTPS + root acceptance before replacing GoDaddy forwarding',
 'Tyrone + Dre',
 'Canonical company domain.',now())
on conflict (domain) do update set
 product_name=excluded.product_name,
 repo_full_name=excluded.repo_full_name,
 registrar=excluded.registrar,
 auto_renew=excluded.auto_renew,
 renewal_date=excluded.renewal_date,
 nameservers=excluded.nameservers,
 target_host=excluded.target_host,
 target_route=excluded.target_route,
 launch_gate=excluded.launch_gate,
 owner=excluded.owner,
 notes=excluded.notes,
 updated_at=now();

update public.lux_web_properties
set notes='Canonical public domain: myluxagent.com. GitHub Pages remains bootstrap hosting. Cloudflare custom-domain build is prepared; cutover waits for Cloudflare account/zone authorization and HTTPS acceptance.',
    updated_at=now()
where site_key='lux-agent';

update public.lux_web_properties
set notes='Canonical public domain: luxautomaton.com. GitHub Pages remains bootstrap hosting. Cloudflare custom-domain build is prepared; cutover waits for Cloudflare account/zone authorization and HTTPS acceptance.',
    updated_at=now()
where site_key='lux-automaton';

update public.lux_web_properties
set notes='This web property is Lux Care OS (healthcare/clinic), not Lux Career OS. Do not attach luxcareeros.com to this repository.',
    updated_at=now()
where site_key='lux-care-os';
