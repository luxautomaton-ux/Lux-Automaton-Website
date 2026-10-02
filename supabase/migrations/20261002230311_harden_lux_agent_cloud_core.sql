create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.lux_is_workspace_member(target_workspace uuid)
returns boolean
language sql
stable
security definer
set search_path = 'public', 'pg_temp'
as $$
  select exists (
    select 1
    from public.lux_workspace_members m
    where m.workspace_id = target_workspace
      and m.user_id = (select auth.uid())
  )
$$;

create or replace function private.lux_can_edit_workspace(target_workspace uuid)
returns boolean
language sql
stable
security definer
set search_path = 'public', 'pg_temp'
as $$
  select exists (
    select 1
    from public.lux_workspace_members m
    where m.workspace_id = target_workspace
      and m.user_id = (select auth.uid())
      and m.role in ('owner','admin','member')
  )
$$;

revoke execute on function private.lux_is_workspace_member(uuid) from public, anon;
revoke execute on function private.lux_can_edit_workspace(uuid) from public, anon;
grant execute on function private.lux_is_workspace_member(uuid) to authenticated;
grant execute on function private.lux_can_edit_workspace(uuid) to authenticated;

alter table public.lux_workspaces enable row level security;
alter table public.lux_workspace_members enable row level security;
alter table public.lux_profiles enable row level security;
alter table public.lux_contacts enable row level security;
alter table public.lux_desk_records enable row level security;
alter table public.lux_billing_customers enable row level security;
alter table public.lux_billing_events enable row level security;
alter table public.lux_entitlements enable row level security;

drop policy if exists "workspace owners create" on public.lux_workspaces;
create policy "workspace owners create" on public.lux_workspaces
for insert to authenticated
with check (owner_user_id = (select auth.uid()));

drop policy if exists "workspace members read" on public.lux_workspaces;
create policy "workspace members read" on public.lux_workspaces
for select to authenticated
using (private.lux_is_workspace_member(id));

drop policy if exists "workspace admins update" on public.lux_workspaces;
create policy "workspace admins update" on public.lux_workspaces
for update to authenticated
using (private.lux_can_edit_workspace(id))
with check (private.lux_can_edit_workspace(id));

drop policy if exists "membership members read" on public.lux_workspace_members;
create policy "membership members read" on public.lux_workspace_members
for select to authenticated
using (private.lux_is_workspace_member(workspace_id));

drop policy if exists "membership owner insert" on public.lux_workspace_members;
create policy "membership owner insert" on public.lux_workspace_members
for insert to authenticated
with check (exists (
  select 1 from public.lux_workspaces w
  where w.id = workspace_id and w.owner_user_id = (select auth.uid())
));

drop policy if exists "membership owner update" on public.lux_workspace_members;
create policy "membership owner update" on public.lux_workspace_members
for update to authenticated
using (exists (
  select 1 from public.lux_workspaces w
  where w.id = workspace_id and w.owner_user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.lux_workspaces w
  where w.id = workspace_id and w.owner_user_id = (select auth.uid())
));

drop policy if exists "membership owner delete" on public.lux_workspace_members;
create policy "membership owner delete" on public.lux_workspace_members
for delete to authenticated
using (exists (
  select 1 from public.lux_workspaces w
  where w.id = workspace_id and w.owner_user_id = (select auth.uid())
));

drop policy if exists "profile self read" on public.lux_profiles;
create policy "profile self read" on public.lux_profiles
for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "profile self insert" on public.lux_profiles;
create policy "profile self insert" on public.lux_profiles
for insert to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "profile self update" on public.lux_profiles;
create policy "profile self update" on public.lux_profiles
for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "contacts members read" on public.lux_contacts;
create policy "contacts members read" on public.lux_contacts
for select to authenticated
using (private.lux_is_workspace_member(workspace_id));

drop policy if exists "contacts editors insert" on public.lux_contacts;
create policy "contacts editors insert" on public.lux_contacts
for insert to authenticated
with check (
  private.lux_can_edit_workspace(workspace_id)
  and created_by = (select auth.uid())
);

drop policy if exists "contacts editors update" on public.lux_contacts;
create policy "contacts editors update" on public.lux_contacts
for update to authenticated
using (private.lux_can_edit_workspace(workspace_id))
with check (private.lux_can_edit_workspace(workspace_id));

drop policy if exists "contacts admins delete" on public.lux_contacts;
create policy "contacts admins delete" on public.lux_contacts
for delete to authenticated
using (exists (
  select 1 from public.lux_workspace_members m
  where m.workspace_id = lux_contacts.workspace_id
    and m.user_id = (select auth.uid())
    and m.role in ('owner','admin')
));

drop policy if exists "desk members read" on public.lux_desk_records;
create policy "desk members read" on public.lux_desk_records
for select to authenticated
using (private.lux_is_workspace_member(workspace_id));

drop policy if exists "desk editors insert" on public.lux_desk_records;
create policy "desk editors insert" on public.lux_desk_records
for insert to authenticated
with check (
  private.lux_can_edit_workspace(workspace_id)
  and created_by = (select auth.uid())
  and updated_by = (select auth.uid())
);

drop policy if exists "desk editors update" on public.lux_desk_records;
create policy "desk editors update" on public.lux_desk_records
for update to authenticated
using (private.lux_can_edit_workspace(workspace_id))
with check (
  private.lux_can_edit_workspace(workspace_id)
  and updated_by = (select auth.uid())
);

drop policy if exists "desk admins delete" on public.lux_desk_records;
create policy "desk admins delete" on public.lux_desk_records
for delete to authenticated
using (exists (
  select 1 from public.lux_workspace_members m
  where m.workspace_id = lux_desk_records.workspace_id
    and m.user_id = (select auth.uid())
    and m.role in ('owner','admin')
));

drop policy if exists "billing customer members read" on public.lux_billing_customers;
create policy "billing customer members read" on public.lux_billing_customers
for select to authenticated
using (private.lux_is_workspace_member(workspace_id));

drop policy if exists "billing events block clients" on public.lux_billing_events;
create policy "billing events block clients" on public.lux_billing_events
as restrictive
for all to anon, authenticated
using (false)
with check (false);

drop policy if exists "entitlements members read" on public.lux_entitlements;
create policy "entitlements members read" on public.lux_entitlements
for select to authenticated
using (private.lux_is_workspace_member(workspace_id));
