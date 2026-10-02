create table if not exists public.lux_web_properties (
  site_key text primary key,
  display_name text not null,
  repo_full_name text not null unique,
  website_kind text not null default 'marketing',
  current_host text not null default 'GitHub / verify deployment',
  target_host text not null default 'Cloudflare Workers Static Assets',
  backend_strategy text not null default 'Shared Lux Supabase where appropriate',
  stage text not null default 'prepare',
  monthly_fixed_cost numeric(10,2) not null default 0 check (monthly_fixed_cost >= 0),
  paid_trigger text not null default 'No paid hosting until a documented production need exists',
  owner text not null default 'Dre + LANA',
  notes text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.lux_web_properties enable row level security;
revoke all on table public.lux_web_properties from anon;
grant select, insert, update, delete on table public.lux_web_properties to authenticated;

create policy "Lux admin manages web fleet"
on public.lux_web_properties
for all
to authenticated
using ((select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid)
with check ((select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid);

insert into public.lux_web_properties
(site_key, display_name, repo_full_name, website_kind, current_host, target_host, backend_strategy, stage, monthly_fixed_cost, paid_trigger, owner, notes)
values
('lux-automaton','Lux Automaton','luxautomaton-ux/Lux-Automaton-Website','company / marketing + admin','GitHub Pages','Cloudflare Workers Static Assets','Shared Lux Supabase production backend','live-free',0,'Supabase Pro only when customer production launches; paid Workers only when measured need exists','Dre + LANA','Primary company website and founder admin workspace.'),
('lux-agent','Lux Agent','luxautomaton-ux/lux-agent-website','product marketing','GitHub Pages','Cloudflare Workers Static Assets','Use shared Lux Supabase for common customer/account services where appropriate','live-free',0,'No paid hosting before production requirement','Dre + LANA','Customer-facing Lux Agent website.'),
('lux-care-os','Lux Care OS','luxautomaton-ux/lux-care-os-website','product marketing','GitHub Pages','Cloudflare Workers Static Assets','Marketing site may use shared services; clinical/health data must remain isolated from general Lux backend','live-free',0,'No paid hosting before production requirement','Dre + LANA','Public site only in shared web fleet; healthcare data isolation remains mandatory.'),
('lux-coder','Lux Coder','luxautomaton-ux/lux-coder-website','static product / downloads','GitHub Pages','Cloudflare Workers Static Assets','Static-first; shared backend only for approved account/payment needs','live-free',0,'No paid hosting before measured requirement','Dre + LANA','Static site with downloadable assets.'),
('lux-studio','Lux Studio','luxautomaton-ux/lux-studio-website','static product marketing','GitHub Pages','Cloudflare Workers Static Assets','Static-first; shared backend only if account/payment features are added','live-free',0,'No paid hosting before measured requirement','Dre + LANA','Keep static and free unless product requirements change.'),
('lux-store','Lux Store','luxautomaton-ux/lux-store','storefront','GitHub Pages','Cloudflare Workers Static Assets','Shared Supabase + Stripe only for approved commerce flows','live-free',0,'Payment fees begin only when sales occur; paid infrastructure requires founder approval','Dre + Tyrone','Storefront belongs on the shared Lux cost model, not a separate paid hosting stack.')
on conflict (site_key) do update set
  display_name=excluded.display_name,
  repo_full_name=excluded.repo_full_name,
  website_kind=excluded.website_kind,
  current_host=excluded.current_host,
  target_host=excluded.target_host,
  backend_strategy=excluded.backend_strategy,
  stage=excluded.stage,
  monthly_fixed_cost=excluded.monthly_fixed_cost,
  paid_trigger=excluded.paid_trigger,
  owner=excluded.owner,
  notes=excluded.notes,
  updated_at=now();
