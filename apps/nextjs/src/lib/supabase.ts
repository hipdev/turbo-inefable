import { createClient } from "@supabase/supabase-js"

console.log(process.env.SUPABASE_PUBLIC_KEY, "supabase public key")
export const supabase = createClient(
  process.env.SUPABASE_PUBLIC_KEY,
  process.env.SUPABASE_URL,
)
