/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's email
  - `message` (text, not null) — message body
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `contact_messages`.
- Allow anon + authenticated INSERT only (public can submit messages).
- No SELECT/UPDATE/DELETE for anon or authenticated — only service role can read/manage messages.
3. Index
- Index on `created_at` for chronological ordering.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages (created_at DESC);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
