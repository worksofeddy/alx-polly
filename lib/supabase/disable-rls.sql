-- Temporarily disable RLS for development
-- Run this in your Supabase SQL Editor

-- Disable RLS on polls table
ALTER TABLE polls DISABLE ROW LEVEL SECURITY;

-- Disable RLS on options table  
ALTER TABLE options DISABLE ROW LEVEL SECURITY;

-- Disable RLS on votes table
ALTER TABLE votes DISABLE ROW LEVEL SECURITY;

-- To re-enable RLS later, run:
-- ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE options ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
