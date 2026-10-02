drop policy if exists "signing keys block browser roles" on public.lux_agent_signing_keys;
create policy "signing keys block browser roles"
on public.lux_agent_signing_keys
as restrictive
for all
to anon, authenticated
using (false)
with check (false);

create index if not exists lux_agent_setup_issuances_key_id_idx
  on public.lux_agent_setup_issuances(key_id);
