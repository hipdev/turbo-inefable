import { SafeAreaView, ScrollView } from "react-native"
import { getDiaries, getUserProfile } from "@inefable/api"
import useSWR from "swr"

import AddName from "~/components/home/add-name"
import Diaries from "~/components/home/diaries"
import Welcome from "~/components/home/welcome"
import { useAuthStore } from "~/components/stores/auth"

export default function HomeScreen() {
  const { user } = useAuthStore()

  const { data: diaries } = useSWR(
    user?.id ? ["getStories", user.id] : null,
    getDiaries,
  )
  const { data: userProfile } = useSWR(
    user?.id ? ["getUserProfile", user.id] : null,
    getUserProfile,
  )

  console.log(userProfile, "userProfile")

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-4 mt-10">
        {!userProfile?.data?.name ? (
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
