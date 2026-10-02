do $seed$
begin
  if not exists (
    select 1 from vault.secrets
    where name = 'lux-agent-setup-ed25519-v1-private'
  ) then
    perform vault.create_secret(
      encode(extensions.gen_random_bytes(32), 'base64'),
      'lux-agent-setup-ed25519-v1-private',
      'Lux Agent setup signing seed. Generated inside Supabase; never expose to clients or source control.'
    );
  end if;
end
$seed$;
