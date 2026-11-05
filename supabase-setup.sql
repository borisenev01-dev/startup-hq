-- Startup HQ — Supabase setup
-- Paste this whole file into Supabase → SQL Editor → New query → Run.

-- 1. Team allowlist: only these emails can read or edit the workspace.
--    EDIT THESE before running (add one line per teammate).
create table if not exists public.team_members (
  email text primary key
);
insert into public.team_members (email) values
  ('you@example.com'),
  ('friend1@example.com'),
  ('friend2@example.com')
on conflict do nothing;

-- 2. Shared key/value store for all progress, notes and tables.
create table if not exists public.kv (
  key        text primary key,
  value      jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- 3. Security: row-level security so only logged-in team members have access.
alter table public.kv enable row level security;
alter table public.team_members enable row level security;

create or replace function public.is_team_member()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.team_members
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

drop policy if exists "team can read"   on public.kv;
drop policy if exists "team can insert" on public.kv;
drop policy if exists "team can update" on public.kv;
drop policy if exists "team can delete" on public.kv;
create policy "team can read"   on public.kv for select to authenticated using (public.is_team_member());
create policy "team can insert" on public.kv for insert to authenticated with check (public.is_team_member());
create policy "team can update" on public.kv for update to authenticated using (public.is_team_member()) with check (public.is_team_member());
create policy "team can delete" on public.kv for delete to authenticated using (public.is_team_member());
-- (team_members has RLS on and no policies → not readable through the API at all.)

-- 4. Live updates: teammates see each other's changes without refreshing.
do $$
begin
  alter publication supabase_realtime add table public.kv;
exception when duplicate_object then null;
end $$;

-- To add a teammate later:
--   insert into public.team_members (email) values ('new.person@example.com');
-- and create their login under Authentication → Users → Add user.
