import { SafeAreaView, ScrollView } from "react-native"
import useSWR from "swr"

import { getDiaries, getUserProfile } from "@inefable/api"

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

  return (
    <SafeAreaView className="mt-4 flex-1">
      <ScrollView className="mt-10">
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
