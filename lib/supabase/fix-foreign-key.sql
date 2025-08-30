-- Fix foreign key constraint issue for development
-- Run this in your Supabase SQL Editor

-- Remove the foreign key constraint temporarily
ALTER TABLE polls DROP CONSTRAINT polls_user_id_fkey;

-- To re-add the foreign key constraint later, run:
-- ALTER TABLE polls ADD CONSTRAINT polls_user_id_fkey 
--   FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
