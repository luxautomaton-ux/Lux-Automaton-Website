alter table public.lux_agent_checkout_catalog enable row level security;
alter table public.lux_agent_checkout_sessions enable row level security;
alter table public.lux_agent_stripe_events enable row level security;
alter table public.lux_agent_entitlements enable row level security;

revoke all on table public.lux_agent_checkout_catalog from anon, authenticated;
revoke all on table public.lux_agent_checkout_sessions from anon, authenticated;
revoke all on table public.lux_agent_stripe_events from anon, authenticated;
revoke all on table public.lux_agent_entitlements from anon, authenticated;

grant all on table public.lux_agent_checkout_catalog to service_role;
grant all on table public.lux_agent_checkout_sessions to service_role;
grant all on table public.lux_agent_stripe_events to service_role;
grant all on table public.lux_agent_entitlements to service_role;

drop policy if exists "Checkout catalog blocks browser roles" on public.lux_agent_checkout_catalog;
create policy "Checkout catalog blocks browser roles"
on public.lux_agent_checkout_catalog
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Checkout sessions block browser roles" on public.lux_agent_checkout_sessions;
create policy "Checkout sessions block browser roles"
on public.lux_agent_checkout_sessions
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Stripe events block browser roles" on public.lux_agent_stripe_events;
create policy "Stripe events block browser roles"
on public.lux_agent_stripe_events
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Entitlements block browser roles" on public.lux_agent_entitlements;
create policy "Entitlements block browser roles"
on public.lux_agent_entitlements
as restrictive
for all
to anon, authenticated
using (false)
with check (false);
