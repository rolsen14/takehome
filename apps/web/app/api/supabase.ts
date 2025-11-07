
import { createClient as createClientSupabase } from "@supabase/supabase-js";

// Initialize local Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-local-anon-key";

export const createClient = () => createClientSupabase(supabaseUrl, supabaseKey);