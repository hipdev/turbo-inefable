import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import { getUserCode } from "@inefable/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { isToday, parseISO } from "date-fns"
import useSWR from "swr"

import { useAuthStore } from "../../components/stores/auth"
import SecurityCode from "../common/security-code"

export default function Diaries({ diaries }) {
  const { user } = useAuthStore()
  const router = useRouter()

  const { data: codeData, isLoading } = useSWR(
    user?.id ? ["getUserCode", user.id] : null,
    getUserCode,
  )

  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    console.log("ok")
    const fetchData = async () => {
      try {
        const unBlockDate = await AsyncStorage.getItem("unlockUntil")
        if (unBlockDate) {
          // Data retrieved successfully, do something with it
          const currentDate = new Date()
          const savedDateObj = new Date(unBlockDate)
          if (currentDate < savedDateObj) {
            // Then no need to show the security code
            setIsAllowed(true)
          } else {
            setIsAllowed(false)
          }
        }
      } catch (error) {
        // Error retrieving data
        console.log("Error retrieving data:", error)
      }
    }

    fetchData()
  }, [codeData]) // Empty dependency array ensures this effect only runs once

  if (isLoading) return <Text>Loading...</Text>

  return (
    <View className="flex flex-row flex-wrap">
      {!isAllowed && !codeData?.data && <SecurityCode />}
      {(isAllowed || codeData?.data?.length == 0) &&
        diaries?.map((diary) => (
          <TouchableOpacity
            onPress={() => {
              if (isToday(parseISO(diary.date))) {
                router.push("/today")
              }
            }}
            key={diary.id}
            className="flex h-24  w-1/3 items-center justify-center p-0.5"
          >
            <View className="h-full w-full items-center justify-center bg-black/20">
              <Text className="text-lg font-bold text-black/80">
                {diary.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  )
}
