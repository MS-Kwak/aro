-- ============================================
-- 아로(ARO) DB 스키마 — Supabase (PostgreSQL)
-- 2026-07-21
-- ============================================

-- 확장 모듈
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================
-- 1. stores (가게)
-- ============================================
create table public.stores (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  business_type text not null, -- 카페, 네일, 미용, 음식점, 필라테스, 기타
  address text not null,
  phone text,
  business_hours jsonb, -- {"mon": {"open": "09:00", "close": "21:00"}, ...}
  image_url text,
  qr_code text unique, -- 가게별 고유 QR 식별자 (uuid)
  stamp_goal int not null default 10, -- N회 적립 시 리워드
  reward_title text not null default '아메리카노 1잔 무료',
  reward_expires_days int not null default 30,
  subscription_plan text not null default 'free', -- free, premium
  subscription_started_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_stores_owner on public.stores(owner_id);

-- ============================================
-- 2. customers (손님/단골)
-- ============================================
create table public.customers (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  phone_hash text not null, -- SHA-256 해시
  phone_last4 text not null, -- 뒷자리 4자리 (마스킹 표시용)
  stamp_count int not null default 0,
  total_visits int not null default 0,
  first_visit timestamptz not null default now(),
  last_visit timestamptz not null default now(),
  status text not null default 'active', -- active, churned
  created_at timestamptz not null default now(),

  unique(store_id, phone_hash)
);

create index idx_customers_store on public.customers(store_id);
create index idx_customers_last_visit on public.customers(store_id, last_visit);
create index idx_customers_status on public.customers(store_id, status);

-- ============================================
-- 3. visits (방문 이력)
-- ============================================
create table public.visits (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  visited_at timestamptz not null default now()
);

create index idx_visits_customer on public.visits(customer_id);
create index idx_visits_store_date on public.visits(store_id, visited_at desc);

-- ============================================
-- 4. coupons (쿠폰)
-- ============================================
create table public.coupons (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  code text not null unique, -- 4자리 코드
  title text not null, -- 리워드 내용
  type text not null default 'stamp_reward', -- stamp_reward, churn_coupon
  expires_at timestamptz not null,
  issued_at timestamptz not null default now(),
  used_at timestamptz, -- null이면 미사용
  status text not null default 'active' -- active, used, expired
);

create index idx_coupons_customer on public.coupons(customer_id);
create index idx_coupons_store on public.coupons(store_id);
create index idx_coupons_status on public.coupons(store_id, status);

-- ============================================
-- 5. consents (개인정보 동의)
-- ============================================
create table public.consents (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  consent_type text not null default 'privacy', -- privacy, marketing
  version text not null default 'v1.0',
  agreed_at timestamptz not null default now(),
  ip_address text
);

create index idx_consents_customer on public.consents(customer_id);

-- ============================================
-- 6. reviews (리뷰) — 2단계
-- ============================================
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  platform text not null, -- naver, kakaomap, google, baemin, coupangeats
  review_url text,
  author text,
  rating int, -- 1~5
  content text not null,
  sentiment text, -- positive, negative, neutral
  keywords text[], -- AI 추출 키워드
  draft_reply text, -- AI 생성 답변 초안
  approved_reply text, -- 사장님 승인 답변
  approved_at timestamptz,
  published_at timestamptz, -- 플랫폼에 등록된 시각
  reviewed_at timestamptz, -- 원본 리뷰 작성 시각
  created_at timestamptz not null default now()
);

create index idx_reviews_store on public.reviews(store_id);
create index idx_reviews_sentiment on public.reviews(store_id, sentiment);
create index idx_reviews_unapproved on public.reviews(store_id) where approved_at is null;

-- ============================================
-- 7. notifications (알림톡 발송 이력) — 2단계
-- ============================================
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  coupon_id uuid references public.coupons(id),
  type text not null, -- churn_coupon, stamp_reward, marketing
  channel text not null default 'alimtalk', -- alimtalk, sms
  message text not null,
  sent_at timestamptz not null default now(),
  delivered_at timestamptz,
  opened_at timestamptz,
  result text -- success, failed, pending
);

create index idx_notifications_store on public.notifications(store_id);
create index idx_notifications_customer on public.notifications(customer_id);

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================

alter table public.stores enable row level security;
alter table public.customers enable row level security;
alter table public.visits enable row level security;
alter table public.coupons enable row level security;
alter table public.consents enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

-- stores: 본인 가게만 접근
create policy "stores_owner" on public.stores
  for all using (auth.uid() = owner_id);

-- customers: 본인 가게의 고객만 접근
create policy "customers_store_owner" on public.customers
  for all using (
    store_id in (select id from public.stores where owner_id = auth.uid())
  );

-- visits: 본인 가게의 방문만 접근
create policy "visits_store_owner" on public.visits
  for all using (
    store_id in (select id from public.stores where owner_id = auth.uid())
  );

-- coupons: 본인 가게의 쿠폰만 접근
create policy "coupons_store_owner" on public.coupons
  for all using (
    store_id in (select id from public.stores where owner_id = auth.uid())
  );

-- consents: 본인 가게의 동의만 접근
create policy "consents_store_owner" on public.consents
  for all using (
    store_id in (select id from public.stores where owner_id = auth.uid())
  );

-- reviews: 본인 가게의 리뷰만 접근
create policy "reviews_store_owner" on public.reviews
  for all using (
    store_id in (select id from public.stores where owner_id = auth.uid())
  );

-- notifications: 본인 가게의 알림만 접근
create policy "notifications_store_owner" on public.notifications
  for all using (
    store_id in (select id from public.stores where owner_id = auth.uid())
  );

-- ============================================
-- 손님용 INSERT 정책 (인증 없이 QR 적립 가능)
-- ============================================

-- 손님이 QR 스캔 시 방문 기록 삽입 가능 (anon)
create policy "visits_anon_insert" on public.visits
  for insert with check (true);

-- 손님이 customer 생성 가능 (anon)
create policy "customers_anon_insert" on public.customers
  for insert with check (true);

-- 손님이 동의 기록 삽입 가능 (anon)
create policy "consents_anon_insert" on public.consents
  for insert with check (true);

-- ============================================
-- Updated_at 자동 갱신 트리거
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger stores_updated_at
  before update on public.stores
  for each row execute function public.handle_updated_at();

-- ============================================
-- DB Functions (비즈니스 로직)
-- ============================================

-- --------------------------------------------
-- 1. generate_coupon_code(): 유니크 4자리 영숫자 쿠폰 코드 생성
-- --------------------------------------------
create or replace function public.generate_coupon_code()
returns text as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code text := '';
  i int;
begin
  loop
    code := '';
    for i in 1..4 loop
      code := code || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    end loop;
    exit when not exists (select 1 from public.coupons where coupons.code = code);
  end loop;
  return code;
end;
$$ language plpgsql;

-- --------------------------------------------
-- 2. record_visit(store_qr, phone_hash, phone_last4, ip)
--    QR 스캔 시 호출: customer upsert + visit insert + stamp 증가
--    리턴: customer_id, stamp_count, is_new, coupon_issued, coupon_code
-- --------------------------------------------
create or replace function public.record_visit(
  p_store_qr text,
  p_phone_hash text,
  p_phone_last4 text,
  p_ip text default null
)
returns jsonb as $$
declare
  v_store_id uuid;
  v_customer_id uuid;
  v_stamp_count int;
  v_stamp_goal int;
  v_reward_title text;
  v_reward_expires_days int;
  v_is_new boolean := false;
  v_coupon_issued boolean := false;
  v_coupon_code text;
begin
  -- 가게 조회
  select id, stamp_goal, reward_title, reward_expires_days
  into v_store_id, v_stamp_goal, v_reward_title, v_reward_expires_days
  from public.stores where qr_code = p_store_qr;

  if v_store_id is null then
    return jsonb_build_object('error', 'store_not_found');
  end if;

  -- customer upsert
  select id, stamp_count
  into v_customer_id, v_stamp_count
  from public.customers
  where store_id = v_store_id and phone_hash = p_phone_hash;

  if v_customer_id is null then
    insert into public.customers (store_id, phone_hash, phone_last4, stamp_count, total_visits)
    values (v_store_id, p_phone_hash, p_phone_last4, 0, 0)
    returning id, stamp_count into v_customer_id, v_stamp_count;
    v_is_new := true;
  end if;

  -- visit 기록
  insert into public.visits (customer_id, store_id)
  values (v_customer_id, v_store_id);

  -- stamp 증가 + 방문 횟수 갱신
  v_stamp_count := v_stamp_count + 1;
  update public.customers
  set stamp_count = v_stamp_count,
      total_visits = total_visits + 1,
      last_visit = now(),
      status = 'active'
  where id = v_customer_id;

  -- stamp_goal 달성 시 쿠폰 자동 발급 + stamp 리셋
  if v_stamp_count >= v_stamp_goal then
    v_coupon_code := public.generate_coupon_code();

    insert into public.coupons (store_id, customer_id, code, title, type, expires_at)
    values (
      v_store_id,
      v_customer_id,
      v_coupon_code,
      v_reward_title,
      'stamp_reward',
      now() + (v_reward_expires_days || ' days')::interval
    );

    update public.customers
    set stamp_count = 0
    where id = v_customer_id;

    v_stamp_count := 0;
    v_coupon_issued := true;
  end if;

  return jsonb_build_object(
    'customer_id', v_customer_id,
    'store_id', v_store_id,
    'stamp_count', v_stamp_count,
    'stamp_goal', v_stamp_goal,
    'is_new', v_is_new,
    'coupon_issued', v_coupon_issued,
    'coupon_code', v_coupon_code
  );
end;
$$ language plpgsql security definer;

-- --------------------------------------------
-- 3. redeem_coupon(coupon_code, store_id)
--    사장님이 쿠폰 사용 처리
-- --------------------------------------------
create or replace function public.redeem_coupon(
  p_coupon_code text,
  p_store_id uuid
)
returns jsonb as $$
declare
  v_coupon record;
begin
  select * into v_coupon
  from public.coupons
  where code = p_coupon_code and store_id = p_store_id;

  if v_coupon is null then
    return jsonb_build_object('error', 'coupon_not_found');
  end if;

  if v_coupon.status = 'used' then
    return jsonb_build_object('error', 'already_used', 'used_at', v_coupon.used_at);
  end if;

  if v_coupon.status = 'expired' or v_coupon.expires_at < now() then
    update public.coupons set status = 'expired' where id = v_coupon.id;
    return jsonb_build_object('error', 'expired', 'expires_at', v_coupon.expires_at);
  end if;

  update public.coupons
  set status = 'used', used_at = now()
  where id = v_coupon.id;

  return jsonb_build_object(
    'success', true,
    'coupon_id', v_coupon.id,
    'title', v_coupon.title,
    'customer_id', v_coupon.customer_id
  );
end;
$$ language plpgsql security definer;

-- --------------------------------------------
-- 4. detect_churned_customers(days_threshold)
--    N일 이상 미방문 고객을 churned로 변경
--    Supabase cron 또는 Edge Function에서 주기적 호출
-- --------------------------------------------
create or replace function public.detect_churned_customers(
  p_days int default 30
)
returns int as $$
declare
  v_count int;
begin
  update public.customers
  set status = 'churned'
  where status = 'active'
    and last_visit < now() - (p_days || ' days')::interval;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$ language plpgsql security definer;

-- --------------------------------------------
-- 5. issue_churn_coupon(store_id, customer_id, title, expires_days)
--    이탈 방지 쿠폰 수동/자동 발급
-- --------------------------------------------
create or replace function public.issue_churn_coupon(
  p_store_id uuid,
  p_customer_id uuid,
  p_title text default '다시 방문해주세요! 특별 할인',
  p_expires_days int default 14
)
returns jsonb as $$
declare
  v_code text;
  v_coupon_id uuid;
begin
  v_code := public.generate_coupon_code();

  insert into public.coupons (store_id, customer_id, code, title, type, expires_at)
  values (
    p_store_id,
    p_customer_id,
    v_code,
    p_title,
    'churn_coupon',
    now() + (p_expires_days || ' days')::interval
  )
  returning id into v_coupon_id;

  return jsonb_build_object(
    'success', true,
    'coupon_id', v_coupon_id,
    'code', v_code,
    'expires_at', now() + (p_expires_days || ' days')::interval
  );
end;
$$ language plpgsql security definer;

-- --------------------------------------------
-- 6. get_store_dashboard(store_id)
--    사장님 대시보드 요약 데이터 (단일 쿼리)
-- --------------------------------------------
create or replace function public.get_store_dashboard(p_store_id uuid)
returns jsonb as $$
declare
  v_total_customers int;
  v_active_customers int;
  v_churned_customers int;
  v_today_visits int;
  v_week_visits int;
  v_month_visits int;
  v_active_coupons int;
begin
  select count(*) into v_total_customers
  from public.customers where store_id = p_store_id;

  select count(*) into v_active_customers
  from public.customers where store_id = p_store_id and status = 'active';

  v_churned_customers := v_total_customers - v_active_customers;

  select count(*) into v_today_visits
  from public.visits
  where store_id = p_store_id and visited_at >= current_date;

  select count(*) into v_week_visits
  from public.visits
  where store_id = p_store_id and visited_at >= current_date - interval '7 days';

  select count(*) into v_month_visits
  from public.visits
  where store_id = p_store_id and visited_at >= current_date - interval '30 days';

  select count(*) into v_active_coupons
  from public.coupons
  where store_id = p_store_id and status = 'active' and expires_at > now();

  return jsonb_build_object(
    'total_customers', v_total_customers,
    'active_customers', v_active_customers,
    'churned_customers', v_churned_customers,
    'today_visits', v_today_visits,
    'week_visits', v_week_visits,
    'month_visits', v_month_visits,
    'active_coupons', v_active_coupons
  );
end;
$$ language plpgsql security definer;
