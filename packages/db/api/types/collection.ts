import type { Database } from "./supabase"

export type Diary = Database["public"]["Tables"]["diaries"]["Row"]
export type Code = Database["public"]["Tables"]["codes"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
