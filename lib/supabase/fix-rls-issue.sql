-- Complete fix for RLS and constraint issues
-- Run this in your Supabase SQL Editor

-- 1. Disable RLS on all tables
ALTER TABLE polls DISABLE ROW LEVEL SECURITY;
ALTER TABLE options DISABLE ROW LEVEL SECURITY;
ALTER TABLE votes DISABLE ROW LEVEL SECURITY;

-- 2. Drop all RLS policies
DROP POLICY IF EXISTS "Users can view their own polls." ON polls;
DROP POLICY IF EXISTS "Users can create polls." ON polls;
DROP POLICY IF EXISTS "Users can update their own polls." ON polls;
DROP POLICY IF EXISTS "Users can delete their own polls." ON polls;

DROP POLICY IF EXISTS "Users can view options." ON options;
DROP POLICY IF EXISTS "Users can create options for their polls." ON options;
DROP POLICY IF EXISTS "Users can update options for their polls." ON options;
DROP POLICY IF EXISTS "Users can delete options for their polls." ON options;

DROP POLICY IF EXISTS "Users can view votes." ON votes;
DROP POLICY IF EXISTS "Users can create votes." ON votes;
DROP POLICY IF EXISTS "Users can delete their own votes." ON votes;

-- 3. Remove foreign key constraints
ALTER TABLE polls DROP CONSTRAINT IF EXISTS polls_user_id_fkey;
ALTER TABLE options DROP CONSTRAINT IF EXISTS options_poll_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_user_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_option_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_poll_id_fkey;

-- 4. Verify the changes
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename IN ('polls', 'options', 'votes');

-- To re-enable later (when ready for production):
-- ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE options ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
-- (Then recreate the policies and constraints)
