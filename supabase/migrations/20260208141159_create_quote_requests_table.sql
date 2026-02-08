/*
  # Create quote requests table

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key) - Unique identifier for each quote request
      - `name` (text) - Customer's full name
      - `email` (text) - Customer's email address
      - `phone` (text) - Customer's phone number
      - `service_type` (text) - Type of cleaning service requested
      - `address` (text) - Address where service is needed
      - `message` (text) - Additional details or special requests
      - `created_at` (timestamptz) - Timestamp when request was created
  
  2. Security
    - Enable RLS on `quote_requests` table
    - Add policy for anyone to insert quote requests (public form)
    - Add policy for authenticated admins to view all requests

  3. Notes
    - This table stores customer quote requests from the contact form
    - Public can only insert (submit quotes), not read
    - Future: Add admin authentication to manage quotes
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  address text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);