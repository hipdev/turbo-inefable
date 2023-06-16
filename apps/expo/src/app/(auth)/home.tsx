import { SafeAreaView, ScrollView } from "react-native"
import { getDiaries } from "@inefable/api"
import useSWR from "swr"

import AddName from "~/components/home/add-name"
import Diaries from "~/components/home/diaries"
import Welcome from "~/components/home/welcome"
import { useAuthStore } from "~/components/stores/auth"
import supabase from "~/lib/supabase"

export default function HomeScreen() {
  const { user } = useAuthStore()

  const { data: diaries } = useSWR(
    user?.id ? ["getStories", user.id] : null,
    getDiaries,
    { revalidateOnFocus: true, refreshInterval: 1000 },
  )

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log("Error logging out:", error.message)
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-4 mt-10">
        {!user?.user_metadata?.name ? (
          <AddName />
        ) : diaries?.length == 0 ? (
          <Welcome />
        ) : (
          <Diaries diaries={diaries} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
