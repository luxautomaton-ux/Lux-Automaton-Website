create table if not exists public.newsletter_subscribers (
  email text primary key check (email = lower(email) and position('@' in email) > 1),
  status text not null default 'subscribed'
    check (status in ('subscribed','unsubscribed')),
  consent boolean not null default true,
  consent_language_version text not null,
  source text not null default 'luxautomaton.com',
  manage_token uuid not null default gen_random_uuid() unique,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
revoke all on table public.newsletter_subscribers from anon, authenticated;
grant all on table public.newsletter_subscribers to service_role;

drop policy if exists "Newsletter subscribers block browser roles" on public.newsletter_subscribers;
create policy "Newsletter subscribers block browser roles"
on public.newsletter_subscribers
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers(status, updated_at desc);
