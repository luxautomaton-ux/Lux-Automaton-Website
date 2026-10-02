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

insert into public.lux_agent_signing_keys
(key_id, algorithm, public_key_spki_b64, active)
values (
  'lux-agent-setup-ed25519-v1',
  'Ed25519',
  'MCowBQYDK2VwAyEAfpWINKBeji47m0klGLWqZx/XTqHxSy5Khab7NCozFe0=',
  true
)
on conflict (key_id) do update set
  algorithm = excluded.algorithm,
  public_key_spki_b64 = excluded.public_key_spki_b64,
  active = excluded.active;

create or replace function public.lux_agent_get_signing_secret(secret_name text)
returns text
language sql
stable
security definer
set search_path = 'vault', 'public', 'pg_temp'
as $function$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = secret_name
  limit 1
$function$;

revoke execute on function public.lux_agent_get_signing_secret(text) from public, anon, authenticated;
grant execute on function public.lux_agent_get_signing_secret(text) to service_role;

-- The matching private Ed25519 PKCS#8 key is intentionally NOT stored in source.
-- Provision it as the Supabase Vault/secret named:
-- lux-agent-setup-ed25519-v1-private
