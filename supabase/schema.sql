CREATE TABLE IF NOT EXISTS waitlist_leads (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       text NOT NULL,
  utm_source  text,
  utm_campaign text,
  created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_leads (email);

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

DROP INDEX IF EXISTS idx_leads_email;
DROP INDEX IF EXISTS idx_leads_email_unique;
DROP INDEX IF EXISTS idx_leads_store_name_unique;
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email_unique ON leads (lower(email)) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads (whatsapp);

ALTER TABLE waitlist_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

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
