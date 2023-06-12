import { createClient } from "@supabase/supabase-js"

export const supabaseServer = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_PUBLIC_KEY || "",
  {
    auth: {
      persistSession: false,
    },
  },
)
