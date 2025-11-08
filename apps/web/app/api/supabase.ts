
import { createClient as createClientSupabase } from "@supabase/supabase-js";

// Initialize local Supabase client
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => createClientSupabase(supabaseUrl, supabaseKey);