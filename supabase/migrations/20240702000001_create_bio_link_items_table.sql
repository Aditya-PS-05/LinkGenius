-- Create bio_link_items table
CREATE TABLE IF NOT EXISTS bio_link_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bio_link_id UUID NOT NULL REFERENCES bio_links(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bio_link_items ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own bio link items" ON bio_link_items;
CREATE POLICY "Users can view their own bio link items"
  ON bio_link_items
  FOR SELECT
  USING (
    bio_link_id IN (
      SELECT id FROM bio_links WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert their own bio link items" ON bio_link_items;
CREATE POLICY "Users can insert their own bio link items"
  ON bio_link_items
  FOR INSERT
  WITH CHECK (
    bio_link_id IN (
      SELECT id FROM bio_links WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update their own bio link items" ON bio_link_items;
CREATE POLICY "Users can update their own bio link items"
  ON bio_link_items
  FOR UPDATE
  USING (
    bio_link_id IN (
      SELECT id FROM bio_links WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete their own bio link items" ON bio_link_items;
CREATE POLICY "Users can delete their own bio link items"
  ON bio_link_items
  FOR DELETE
  USING (
    bio_link_id IN (
      SELECT id FROM bio_links WHERE user_id = auth.uid()
    )
  );

-- Public access for viewing bio link items
DROP POLICY IF EXISTS "Public access to bio link items" ON bio_link_items;
CREATE POLICY "Public access to bio link items"
  ON bio_link_items
  FOR SELECT
  USING (true);

-- Enable realtime
alter publication supabase_realtime add table bio_link_items;
