CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  end_date TIMESTAMPTZ,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own polls."
  ON polls FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create polls."
  ON polls FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own polls."
  ON polls FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own polls."
  ON polls FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  text VARCHAR(255) NOT NULL
);

ALTER TABLE options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view options."
  ON options FOR SELECT USING (true);

CREATE POLICY "Users can create options for their polls."
  ON options FOR INSERT WITH CHECK ((SELECT user_id FROM polls WHERE id = poll_id) = auth.uid());

CREATE POLICY "Users can update options for their polls."
  ON options FOR UPDATE USING ((SELECT user_id FROM polls WHERE id = poll_id) = auth.uid());

CREATE POLICY "Users can delete options for their polls."
  ON options FOR DELETE USING ((SELECT user_id FROM polls WHERE id = poll_id) = auth.uid());

CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  option_id UUID REFERENCES options(id) ON DELETE CASCADE,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view votes."
  ON votes FOR SELECT USING (true);

CREATE POLICY "Users can create votes."
  ON votes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes."
  ON votes FOR DELETE USING (auth.uid() = user_id);
