import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

import "react-native-url-polyfill/auto"

import { type Database } from "@inefable/api/api/types/supabase"

const supabase = createClient<Database>(
  Constants?.expoConfig?.extra?.supabaseUrl || "",
  Constants?.expoConfig?.extra?.supabasePublicKey || "",
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
