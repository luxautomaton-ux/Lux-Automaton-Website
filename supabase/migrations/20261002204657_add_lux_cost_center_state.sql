create table if not exists public.lux_cost_center_state (
  id text primary key default 'lux-company',
  state jsonb not null default '{}'::jsonb,
  updated_by uuid not null default auth.uid(),
  updated_at timestamptz not null default now(),
  constraint lux_cost_center_state_singleton check (id = 'lux-company'),
  constraint lux_cost_center_state_object check (jsonb_typeof(state) = 'object')
);

alter table public.lux_cost_center_state enable row level security;

revoke all on table public.lux_cost_center_state from anon;
grant select, insert, update on table public.lux_cost_center_state to authenticated;

create policy "Lux admin reads cost center"
on public.lux_cost_center_state
for select
to authenticated
using ((select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid);

create policy "Lux admin creates cost center"
on public.lux_cost_center_state
for insert
to authenticated
with check (
  id = 'lux-company'
  and (select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid
  and updated_by = (select auth.uid())
);

create policy "Lux admin updates cost center"
on public.lux_cost_center_state
for update
to authenticated
using ((select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid)
with check (
  id = 'lux-company'
  and (select auth.uid()) = '08225005-1556-42d9-8c9e-691185769300'::uuid
  and updated_by = (select auth.uid())
);
