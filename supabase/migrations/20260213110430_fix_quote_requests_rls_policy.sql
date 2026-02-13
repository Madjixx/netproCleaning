/*
  # Fix quote requests RLS policy

  1. Changes
    - Drop existing insert policy that only applies to 'anon' role
    - Add new insert policy that applies to both 'anon' and 'public' roles
    - This ensures anyone can submit quote requests from the public form

  2. Security
    - Maintains RLS protection
    - Allows public form submissions
    - Only INSERT permission, no SELECT for public users
*/

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON quote_requests;

-- Create a new policy that allows public inserts
CREATE POLICY "Public can submit quote requests"
  ON quote_requests
  FOR INSERT
  WITH CHECK (true);
