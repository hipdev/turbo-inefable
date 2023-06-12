import type { AuthUser, Session } from "@supabase/supabase-js"
import { create } from "zustand"

type AuthStore = {
  user: null | AuthUser
  setUser: (user: AuthUser) => void
  session: null | Session
  setSession: (user: Session) => void
}

export const useAuthStore = create<AuthStore>((set, _get) => ({
  user: null,
  setUser: (user) => set({ user }),
  session: null,
  setSession: (session) => set({ session }),
}))
