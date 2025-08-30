-- Remove all constraints for development
-- Run this in your Supabase SQL Editor

-- Disable RLS
ALTER TABLE polls DISABLE ROW LEVEL SECURITY;
ALTER TABLE options DISABLE ROW LEVEL SECURITY;
ALTER TABLE votes DISABLE ROW LEVEL SECURITY;

-- Remove foreign key constraints
ALTER TABLE polls DROP CONSTRAINT IF EXISTS polls_user_id_fkey;
ALTER TABLE options DROP CONSTRAINT IF EXISTS options_poll_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_user_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_option_id_fkey;
ALTER TABLE votes DROP CONSTRAINT IF EXISTS votes_poll_id_fkey;

-- To re-enable later, run:
-- ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE options ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE polls ADD CONSTRAINT polls_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
-- ALTER TABLE options ADD CONSTRAINT options_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;
-- ALTER TABLE votes ADD CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
-- ALTER TABLE votes ADD CONSTRAINT votes_option_id_fkey FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE;
-- ALTER TABLE votes ADD CONSTRAINT votes_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;
