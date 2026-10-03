create table if not exists public.lux_domains (
  domain text primary key,
  product_name text not null,
  repo_full_name text,
  registrar text not null default 'GoDaddy',
  auto_renew boolean not null default true,
  renewal_date date,
  renewal_cost numeric(10,2),
  currency text not null default 'USD',
  nameservers text[] not null default '{}',
  current_dns_status text not null default 'unverified',
  current_web_status text not null default 'unverified',
  current_destination text,
  target_host text not null default 'Cloudflare Workers Static Assets',
  target_route text,
  launch_gate text not null default 'Keep current routing until Cloudflare preview and DNS acceptance pass',
  owner text not null default 'Tyrone + Dre',
  notes text not null default '',
  last_checked_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.lux_domains enable row level security;
revoke all on table public.lux_domains from anon;
revoke all on table public.lux_domains from authenticated;
grant select, insert, update, delete on table public.lux_domains to authenticated;
grant all on table public.lux_domains to service_role;

drop policy if exists "Lux admin manages domains" on public.lux_domains;
create policy "Lux admin manages domains"
on public.lux_domains
for all
to authenticated
using ((select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid)
with check ((select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid);

insert into public.lux_domains
(domain, product_name, repo_full_name, registrar, auto_renew, renewal_date, nameservers,
 current_dns_status, current_web_status, current_destination, target_route, notes, last_checked_at)
values
('joinluxconnect.com','Lux Connect / Warm Connect','luxautomaton-ux/lux-connect','GoDaddy',true,'2027-10-02',
 array['ns49.domaincontrol.com','ns50.domaincontrol.com'],
 'GoDaddy DNS','Parked / lander','GoDaddy lander',
 'Cloudflare Static Assets or approved Lux Connect public site',
 'Owned and auto-renewing. HTTPS certificate is not currently valid for the apex domain.',now()),
('lawcheckai.com','LawCheck AI','luxautomaton-ux/LawCheckAI','GoDaddy',true,'2027-10-02',
 array['ns37.domaincontrol.com','ns38.domaincontrol.com'],
 'GoDaddy DNS','Parked / lander','GoDaddy lander',
 'Cloudflare Static Assets or approved LawCheck public site',
 'Owned and auto-renewing. HTTPS currently responds but root redirects to a lander.',now()),
('luxverifyai.com','Lux Verify','luxautomaton-ux/lux-verify-operator','GoDaddy',true,'2027-10-02',
 array['ns57.domaincontrol.com','ns58.domaincontrol.com'],
 'GoDaddy DNS','Parked / lander','GoDaddy lander',
 'Cloudflare Static Assets or approved Lux Verify public site',
 'Owned and auto-renewing. HTTPS certificate is not currently valid for the apex domain.',now()),
('luxcareeros.com','Lux Care OS','luxautomaton-ux/lux-care-os-website','GoDaddy',true,'2027-10-02',
 array['ns13.domaincontrol.com','ns14.domaincontrol.com'],
 'GoDaddy DNS','Parked / lander','GoDaddy lander',
 'Cloudflare Workers Static Assets -> lux-care-os-website',
 'Owned and auto-renewing. Public GitHub Pages site exists; apex domain is not cut over yet.',now()),
('luxaikids.com','Lux AI Kids',null,'GoDaddy',true,'2027-10-02',
 array['ns63.domaincontrol.com','ns64.domaincontrol.com'],
 'GoDaddy DNS','Parked / lander','GoDaddy lander',
 'Cloudflare Static Assets or approved Lux AI Kids public destination',
 'Owned and auto-renewing. HTTPS certificate is not currently valid for the apex domain.',now()),
('luxautomaton.com','Lux Automaton','luxautomaton-ux/Lux-Automaton-Website','GoDaddy',true,'2028-03-29',
 array['ns49.domaincontrol.com','ns50.domaincontrol.com'],
 'GoDaddy DNS','Forwarded / masked','GitHub Pages via GoDaddy frame forwarding',
 'Cloudflare Workers Static Assets -> Lux-Automaton-Website',
 'Owned and auto-renewing. Current apex uses a frame to the GitHub Pages site; replace with direct Cloudflare DNS at commercial cutover.',now())
on conflict (domain) do update set
  product_name=excluded.product_name,
  repo_full_name=excluded.repo_full_name,
  registrar=excluded.registrar,
  auto_renew=excluded.auto_renew,
  renewal_date=excluded.renewal_date,
  nameservers=excluded.nameservers,
  current_dns_status=excluded.current_dns_status,
  current_web_status=excluded.current_web_status,
  current_destination=excluded.current_destination,
  target_route=excluded.target_route,
  notes=excluded.notes,
  last_checked_at=excluded.last_checked_at,
  updated_at=now();
