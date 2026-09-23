import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** False until both env vars are set; the app runs on the mock data in src/data until then. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Browser-safe client (anon key, subject to row-level security). Null when not configured. */
export const supabase: SupabaseClient | null = isSupabaseConfigured ? createClient(url!, anonKey!) : null;
