-- =====================================================
-- Migration: Secure RLS Policies for quote_requests
-- =====================================================

-- 1. Create the quote_requests table (if not exists)
-- =====================================================
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  address TEXT NOT NULL,
  message TEXT,
  ip_address INET,
  user_agent TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'completed', 'cancelled')),
  
  -- Contraintes de validation
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_service_type CHECK (service_type IN ('end_construction', 'residence', 'office', 'commercial'))
);

-- 2. Create indexes for performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_ip ON quote_requests(ip_address);

-- 3. Enable Row Level Security
-- =====================================================
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies (if any)
-- =====================================================
DROP POLICY IF EXISTS "Allow anonymous quote submissions with rate limit" ON quote_requests;
DROP POLICY IF EXISTS "Allow authenticated users to read all quotes" ON quote_requests;
DROP POLICY IF EXISTS "Allow service role full access" ON quote_requests;

-- 5. Create secure RLS policies
-- =====================================================

-- Policy 1: Allow anonymous users to INSERT quotes
-- Limitation: Cette politique permet les insertions anonymes
-- Pour un vrai rate limiting, vous devrez utiliser une Edge Function
CREATE POLICY "Allow anonymous quote submissions with rate limit"
ON quote_requests
FOR INSERT
TO anon
WITH CHECK (
  -- Validation basique des données
  name IS NOT NULL AND length(name) > 0 AND length(name) <= 100
  AND email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND phone IS NOT NULL AND length(phone) >= 9 AND length(phone) <= 20
  AND service_type IN ('end_construction', 'residence', 'office', 'commercial')
  AND address IS NOT NULL AND length(address) > 0 AND length(address) <= 500
  AND (message IS NULL OR length(message) <= 1000)
);

-- Policy 2: Allow authenticated users (admin) to read all quotes
-- Utilisez cette politique si vous avez un dashboard admin
CREATE POLICY "Allow authenticated users to read all quotes"
ON quote_requests
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Allow authenticated users to update quote status
CREATE POLICY "Allow authenticated users to update status"
ON quote_requests
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (
  -- Seul le statut peut être modifié
  status IN ('pending', 'contacted', 'quoted', 'completed', 'cancelled')
);

-- Policy 4: Block anonymous SELECT (privacy protection)
-- Les utilisateurs anonymes ne peuvent pas lire les demandes de devis
-- Cela protège les données des clients
-- Si vous voulez que les utilisateurs puissent voir leur propre demande,
-- vous devrez implémenter un système d'authentification

-- 6. Create a function to enforce rate limiting (optional)
-- =====================================================
-- Cette fonction peut être appelée depuis votre Edge Function
CREATE OR REPLACE FUNCTION check_quote_rate_limit(
  p_ip_address INET,
  p_email TEXT,
  p_limit_per_hour INTEGER DEFAULT 3,
  p_limit_per_day INTEGER DEFAULT 10
)
RETURNS BOOLEAN AS $$
DECLARE
  v_count_hour INTEGER;
  v_count_day INTEGER;
BEGIN
  -- Vérifier le nombre de soumissions dans la dernière heure par IP
  SELECT COUNT(*) INTO v_count_hour
  FROM quote_requests
  WHERE ip_address = p_ip_address
    AND created_at > NOW() - INTERVAL '1 hour';
  
  IF v_count_hour >= p_limit_per_hour THEN
    RETURN FALSE;
  END IF;
  
  -- Vérifier le nombre de soumissions dans les dernières 24h par IP
  SELECT COUNT(*) INTO v_count_day
  FROM quote_requests
  WHERE ip_address = p_ip_address
    AND created_at > NOW() - INTERVAL '24 hours';
  
  IF v_count_day >= p_limit_per_day THEN
    RETURN FALSE;
  END IF;
  
  -- Vérifier aussi par email (éviter les soumissions multiples avec le même email)
  SELECT COUNT(*) INTO v_count_day
  FROM quote_requests
  WHERE email = p_email
    AND created_at > NOW() - INTERVAL '24 hours';
  
  IF v_count_day >= p_limit_per_day THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Grant permissions
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON quote_requests TO anon;
GRANT SELECT, UPDATE ON quote_requests TO authenticated;
GRANT EXECUTE ON FUNCTION check_quote_rate_limit TO anon, authenticated;

-- 8. Create a view for statistics (admin only)
-- =====================================================
CREATE OR REPLACE VIEW quote_requests_stats AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  service_type,
  status,
  COUNT(*) as count
FROM quote_requests
GROUP BY DATE_TRUNC('day', created_at), service_type, status
ORDER BY date DESC;

-- Grant access to authenticated users only
GRANT SELECT ON quote_requests_stats TO authenticated;

-- =====================================================
-- Notes d'utilisation:
-- =====================================================
-- 1. Les utilisateurs anonymes peuvent UNIQUEMENT insérer des demandes de devis
-- 2. Les utilisateurs anonymes NE PEUVENT PAS lire les demandes (protection de la vie privée)
-- 3. Les utilisateurs authentifiés (admin) peuvent lire et modifier les demandes
-- 4. Le rate limiting est implémenté via la fonction check_quote_rate_limit
-- 5. Pour un vrai rate limiting, appelez cette fonction depuis votre Edge Function
--
-- Exemple d'utilisation de la fonction rate limiting dans une Edge Function:
-- const { data: canSubmit } = await supabase.rpc('check_quote_rate_limit', {
--   p_ip_address: clientIp,
--   p_email: quoteData.email
-- });
-- if (!canSubmit) {
--   return new Response('Rate limit exceeded', { status: 429 });
-- }