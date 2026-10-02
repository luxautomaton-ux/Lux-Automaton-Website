create table if not exists public.lux_agent_checkout_catalog (
  product_key text primary key
    check (product_key ~ '^[a-z0-9:_-]+$'),
  display_name text not null,
  kind text not null
    check (kind = any (array['core_team','success_pack','memory_pack','usb_travel','premium_team','other'])),
  stripe_price_id text unique,
  billing_mode text not null default 'payment'
    check (billing_mode = any (array['payment','subscription'])),
  active boolean not null default false,
  metadata jsonb not null default '{}'::jsonb
    check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    active = false
    or (stripe_price_id is not null and btrim(stripe_price_id) <> '')
  )
);

create table if not exists public.lux_agent_checkout_sessions (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending'
    check (status = any (array['pending','checkout_created','paid','expired','canceled','failed'])),
  customer_name text not null,
  customer_email text not null,
  customer_business text not null default '',
  setup jsonb not null
    check (jsonb_typeof(setup) = 'object'),
  setup_hash text not null
    check (setup_hash ~ '^[a-f0-9]{64}$'),
  request_origin text,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  amount_total bigint
    check (amount_total is null or amount_total >= 0),
  currency text,
  livemode boolean,
  error_code text,
  error_detail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists lux_agent_checkout_sessions_email_idx
  on public.lux_agent_checkout_sessions (lower(customer_email), created_at desc);

create index if not exists lux_agent_checkout_sessions_status_idx
  on public.lux_agent_checkout_sessions (status, created_at desc);

create table if not exists public.lux_agent_stripe_events (
  event_id text primary key,
  event_type text not null,
  checkout_id uuid references public.lux_agent_checkout_sessions(id) on delete set null,
  payload_hash text not null
    check (payload_hash ~ '^[a-f0-9]{64}$'),
  livemode boolean,
  processed_at timestamptz not null default now(),
  note text
);

create index if not exists lux_agent_stripe_events_checkout_idx
  on public.lux_agent_stripe_events (checkout_id);

create table if not exists public.lux_agent_entitlements (
  id uuid primary key default gen_random_uuid(),
  checkout_id uuid not null unique
    references public.lux_agent_checkout_sessions(id) on delete restrict,
  status text not null default 'paid_pending_signature'
    check (status = any (array['paid_pending_signature','active','revoked','refunded','expired'])),
  customer_email text not null,
  setup jsonb not null
    check (jsonb_typeof(setup) = 'object'),
  setup_hash text not null
    check (setup_hash ~ '^[a-f0-9]{64}$'),
  stripe_session_id text not null unique,
  signing_key_id text,
  signature text,
  issued_at timestamptz not null default now(),
  activated_at timestamptz,
  revoked_at timestamptz,
  updated_at timestamptz not null default now()
);
