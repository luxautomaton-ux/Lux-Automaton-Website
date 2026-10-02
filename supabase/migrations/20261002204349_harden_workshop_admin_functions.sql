alter function public.is_lux_workshop_admin() security invoker;
alter function public.reorder_workshop_lesson(bigint, integer) security invoker;
alter function public.reorder_workshop_module(bigint, integer) security invoker;

revoke execute on function public.reorder_workshop_lesson(bigint, integer) from anon;
revoke execute on function public.reorder_workshop_module(bigint, integer) from anon;
