create table if not exists public.lux_agent_signing_keys (
  key_id text primary key,
  algorithm text not null check (algorithm = 'Ed25519'),
  public_key_spki_b64 text not null,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  retired_at timestamptz
);

alter table public.lux_agent_signing_keys enable row level security;
revoke all on table public.lux_agent_signing_keys from anon, authenticated;
grant all on table public.lux_agent_signing_keys to service_role;

create or replace function public.lux_agent_get_signing_secret(secret_name text)
returns text
language sql
stable
security definer
set search_path = 'vault', 'public', 'pg_temp'
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = secret_name
  limit 1
$$;

revoke execute on function public.lux_agent_get_signing_secret(text) from public, anon, authenticated;
grant execute on function public.lux_agent_get_signing_secret(text) to service_role;
