import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Server client with service role key (bypasses RLS)
// Use this ONLY in API routes or server components for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper function to check if Supabase is properly configured
export function isSupabaseServerConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceKey && supabaseUrl.startsWith('http'));
}
