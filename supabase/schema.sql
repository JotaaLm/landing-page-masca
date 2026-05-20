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
  email        text NOT NULL,
  whatsapp     text NOT NULL,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,
  created_at   timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE leads ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS whatsapp text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_term text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_content text;

-- Compatibilidade com versoes antigas do formulario:
-- se essas colunas antigas existirem no banco, elas nao devem ser obrigatorias.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'store_name') THEN
    ALTER TABLE leads ALTER COLUMN store_name DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'store_segment') THEN
    ALTER TABLE leads ALTER COLUMN store_segment DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'budget') THEN
    ALTER TABLE leads ALTER COLUMN budget DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'message') THEN
    ALTER TABLE leads ALTER COLUMN message DROP NOT NULL;
  END IF;
END $$;

-- Se voce ja tinha a versao antiga do schema, as colunas extras podem continuar no banco,
-- mas o formulario novo envia apenas nome, e-mail, WhatsApp e UTMs.
DROP INDEX IF EXISTS idx_leads_email;
DROP INDEX IF EXISTS idx_leads_email_unique;
DROP INDEX IF EXISTS idx_leads_store_name_unique;
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email_unique ON leads (lower(email)) WHERE email IS NOT NULL;
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
