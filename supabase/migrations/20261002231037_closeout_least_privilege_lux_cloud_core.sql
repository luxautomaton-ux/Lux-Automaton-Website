revoke all on table public.lux_workspaces from anon;
revoke all on table public.lux_workspace_members from anon;
revoke all on table public.lux_profiles from anon;
revoke all on table public.lux_contacts from anon;
revoke all on table public.lux_desk_records from anon;
revoke all on table public.lux_billing_customers from anon;
revoke all on table public.lux_billing_events from anon;
revoke all on table public.lux_entitlements from anon;

revoke all on table public.lux_workspaces from authenticated;
grant select, insert, update on table public.lux_workspaces to authenticated;

revoke all on table public.lux_workspace_members from authenticated;
grant select, insert, update, delete on table public.lux_workspace_members to authenticated;

revoke all on table public.lux_profiles from authenticated;
grant select, insert, update on table public.lux_profiles to authenticated;

revoke all on table public.lux_contacts from authenticated;
grant select, insert, update, delete on table public.lux_contacts to authenticated;

revoke all on table public.lux_desk_records from authenticated;
grant select, insert, update, delete on table public.lux_desk_records to authenticated;

revoke all on table public.lux_billing_customers from authenticated;
grant select on table public.lux_billing_customers to authenticated;

revoke all on table public.lux_billing_events from authenticated;

revoke all on table public.lux_entitlements from authenticated;
grant select on table public.lux_entitlements to authenticated;

grant all on table public.lux_workspaces to service_role;
grant all on table public.lux_workspace_members to service_role;
grant all on table public.lux_profiles to service_role;
grant all on table public.lux_contacts to service_role;
grant all on table public.lux_desk_records to service_role;
grant all on table public.lux_billing_customers to service_role;
grant all on table public.lux_billing_events to service_role;
grant all on table public.lux_entitlements to service_role;
