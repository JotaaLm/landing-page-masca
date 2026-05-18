-- ============================================
-- MASCATE LANDING PAGE — Schema Supabase
-- ============================================
-- Execute este SQL no SQL Editor do Supabase Dashboard
-- (Project > SQL Editor > New query)

-- 1. Tabela de leads da waitlist (captura rápida, só e-mail)
CREATE TABLE IF NOT EXISTS waitlist_leads (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       text NOT NULL,
  utm_source  text,
  utm_campaign text,
  created_at  timestamptz DEFAULT now() NOT NULL
);

-- Índice para evitar duplicatas e buscas rápidas
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_leads (email);

-- 2. Tabela de leads completos (formulário de contato)
CREATE TABLE IF NOT EXISTS leads (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name         text NOT NULL,
  email        text,
  whatsapp     text NOT NULL,
  revenue      text,
  store_name   text,
  store_segment text,
  budget       text,
  message      text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,
  created_at   timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE leads ALTER COLUMN email DROP NOT NULL;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS revenue text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS store_name text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS store_segment text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_term text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_content text;

-- Se voce ja tinha a versao antiga do schema, o e-mail era unico.
-- No formulario novo o contato principal e o WhatsApp, entao o e-mail fica opcional.
DROP INDEX IF EXISTS idx_leads_email;
DROP INDEX IF EXISTS idx_leads_email_unique;
DROP INDEX IF EXISTS idx_leads_store_name_unique;
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email_unique ON leads (lower(email)) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_store_name_unique ON leads (lower(store_name)) WHERE store_name IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads (whatsapp);


-- ============================================
-- Row Level Security (RLS)
-- ============================================
-- Habilita RLS em todas as tabelas.
-- A anon key só pode INSERT (captura de leads).
-- SELECT/UPDATE/DELETE só via service_role (admin).

ALTER TABLE waitlist_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Políticas de INSERT para anon (landing page)
DROP POLICY IF EXISTS "Allow anon insert waitlist" ON waitlist_leads;
CREATE POLICY "Allow anon insert waitlist"
  ON waitlist_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon insert leads" ON leads;
CREATE POLICY "Allow anon insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Políticas de SELECT para anon → NEGAR (ninguém lê dados pelo frontend)
-- (RLS habilitado sem policy de SELECT = negado por padrão)

-- Para ler os dados, use o Supabase Dashboard ou a service_role key no backend.

-- ============================================
-- MIGRAÇÃO: Remover tabela de analytics legada
-- ============================================
-- Se a tabela analytics_events já existia, execute:
-- DROP POLICY IF EXISTS "Allow anon insert analytics" ON analytics_events;
-- DROP TABLE IF EXISTS analytics_events CASCADE;
-- Analytics agora é gerenciado externamente (Umami).
