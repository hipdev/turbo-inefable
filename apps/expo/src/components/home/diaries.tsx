import { useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import clsx from "clsx"
import { isToday, parseISO } from "date-fns"
import useSWR from "swr"

import { getUserCode, type Diary } from "@inefable/api"

import { BUCKET_URL } from "~/lib/utils"
import { useAuthStore } from "../../components/stores/auth"
import SecurityCode from "../common/security-code"

export default function Diaries({ diaries }: { diaries: Diary[] }) {
  const { user } = useAuthStore()
  const router = useRouter()

  const { data: codeData, isLoading } = useSWR(
    user?.id ? ["getUserCode", user.id] : null,
    getUserCode,
  )

  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
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
        console.error("Error retrieving data:", error)
      }
    }

    fetchData()
  }, [codeData]) // Empty dependency array ensures this effect only runs once

  if (isLoading) return <Text>Loading...</Text>

  return (
    <View className="flex flex-row flex-wrap justify-between">
      {!isAllowed && codeData?.data && codeData.data.length > 0 && (
        <SecurityCode />
      )}
      {(isAllowed || codeData?.data?.length == 0) &&
        diaries?.map((diary, index: number) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isToday(parseISO(diary.date))) {
                router.push("/today")
              }
            }}
            key={diary.id}
            className={clsx(
              "relative flex  h-40 w-1/2 flex-row items-center justify-center pb-px",
              index % 2 == 0 && "pr-px",
            )}
          >
            {diary?.picture_id ? (
              <>
                <View className="absolute z-10 h-full w-full flex-1">
                  <Image
                    source={{
                      uri: `${BUCKET_URL}/${diary?.picture_id}`,
                    }}
                    className="flex-1 object-cover"
                    alt="Foto del diario"
                  />
                </View>
              </>
            ) : null}
            <View
              className={clsx(
                "relative z-20 h-full w-full items-center justify-end",
                diary?.picture_id ? "" : "bg-zinc-800",
              )}
            >
              <Text className="w-full bg-black/25 text-center text-lg  font-bold text-white">
                {diary.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  )
}
