alter table public.lux_agent_checkout_sessions
  add column if not exists claimed_workspace_id uuid,
  add column if not exists claimed_at timestamptz;

alter table public.lux_agent_checkout_sessions
  drop constraint if exists lux_agent_checkout_sessions_status_check;
alter table public.lux_agent_checkout_sessions
  add constraint lux_agent_checkout_sessions_status_check
  check (status in ('pending','checkout_created','paid','claimed','refunded','expired','canceled','failed'));

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'lux_agent_checkout_sessions_claimed_workspace_id_fkey'
      and conrelid = 'public.lux_agent_checkout_sessions'::regclass
  ) then
    alter table public.lux_agent_checkout_sessions
      add constraint lux_agent_checkout_sessions_claimed_workspace_id_fkey
      foreign key (claimed_workspace_id)
      references public.lux_workspaces(id)
      on delete set null;
  end if;
end
$$;

create index if not exists lux_agent_checkout_sessions_claimed_workspace_idx
  on public.lux_agent_checkout_sessions(claimed_workspace_id)
  where claimed_workspace_id is not null;

do $$
begin
  if to_regclass('public.lux_agent_entitlements') is not null
     and exists (select 1 from public.lux_agent_entitlements limit 1) then
    raise exception 'Legacy lux_agent_entitlements contains rows and requires explicit workspace reconciliation before removal';
  end if;
end
$$;

drop table if exists public.lux_agent_entitlements;
