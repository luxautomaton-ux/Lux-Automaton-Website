create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table if not exists public.lux_workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'),
  owner_user_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists lux_workspaces_owner_user_idx
  on public.lux_workspaces(owner_user_id);

create table if not exists public.lux_workspace_members (
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member','viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);
create index if not exists lux_workspace_members_user_idx
  on public.lux_workspace_members(user_id);

create table if not exists public.lux_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lux_contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  client_id text,
  name text not null default '',
  company text not null default '',
  email text not null default '',
  phone text not null default '',
  job_title text not null default '',
  website text not null default '',
  location text not null default '',
  source text not null default '',
  stage text not null default 'New'
    check (stage in ('New','Contacted','Qualified','Proposal','Won','Lost')),
  estimated_value_cents bigint not null default 0 check (estimated_value_cents >= 0),
  next_follow_up date,
  notes text not null default '',
  tags text[] not null default '{}',
  warmconnect_id text,
  archived boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, client_id)
);
create unique index if not exists lux_contacts_workspace_email_unique
  on public.lux_contacts(workspace_id, lower(email)) where email <> '';
create index if not exists lux_contacts_workspace_stage
  on public.lux_contacts(workspace_id, stage);
create index if not exists lux_contacts_created_by_idx
  on public.lux_contacts(created_by);

create table if not exists public.lux_desk_records (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  client_id text,
  desk_path text not null check (desk_path like '/lux-%'),
  title text not null check (char_length(title) between 1 and 240),
  owner_label text not null default '',
  due_date date,
  state text not null,
  fields jsonb not null default '{}'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  archived boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  updated_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, desk_path, client_id)
);
create index if not exists lux_desk_workspace_path
  on public.lux_desk_records(workspace_id, desk_path);
create index if not exists lux_desk_records_created_by_idx
  on public.lux_desk_records(created_by);
create index if not exists lux_desk_records_updated_by_idx
  on public.lux_desk_records(updated_by);

create table if not exists public.lux_billing_customers (
  workspace_id uuid primary key references public.lux_workspaces(id) on delete cascade,
  stripe_customer_id text not null unique,
  updated_at timestamptz not null default now()
);

create table if not exists public.lux_billing_events (
  provider text not null check (provider = 'stripe'),
  event_id text primary key,
  event_type text not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  outcome text,
  payload_sha256 text not null
);

create table if not exists public.lux_entitlements (
  workspace_id uuid not null references public.lux_workspaces(id) on delete cascade,
  product_key text not null,
  status text not null check (status in ('active','trialing','past_due','canceled','expired')),
  source text not null check (source in ('stripe','manual')),
  source_ref text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now(),
  primary key (workspace_id, product_key)
);
create index if not exists lux_entitlements_workspace_status
  on public.lux_entitlements(workspace_id, status);

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
