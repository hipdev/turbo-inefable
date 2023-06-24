import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

import type { Database } from "./api/types/supabase"

import "react-native-url-polyfill/auto"

const supabase = createClient<Database>(
  Constants.expoConfig.extra.supabaseUrl,
  Constants.expoConfig.extra.supabasePublicKey,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      detectSessionInUrl: false,
      autoRefreshToken: true,
    },
  },
)

export default supabase
