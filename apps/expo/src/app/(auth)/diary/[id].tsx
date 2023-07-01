import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { Stack, useLocalSearchParams } from "expo-router"
import useSWR from "swr"

import { getDiary } from "@inefable/api"

import GoBack from "~/components/common/go-back"
import { BUCKET_URL } from "~/lib/utils"

export default function TodayScreen() {
  const { id } = useLocalSearchParams()

  const { data } = useSWR(id ? ["getDiary", id] : null, getDiary)

  if (!data) return null

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-lg font-medium capitalize text-black/70">
              {new Date(data.date).toLocaleDateString("es-CO", {
                month: "long",
                day: "numeric",
              })}
            </Text>
          ),
          title: "Hoy",
          headerLeft: () => <GoBack />,
        }}
      />
      <SafeAreaView className="relative flex-1">
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView className="mx-4 flex-1" keyboardDismissMode="on-drag">
            {data?.picture_id ? (
              <>
                <View className="h-40 w-full">
                  <Image
                    source={{
                      uri: `${BUCKET_URL}/${data?.picture_id}`,
                    }}
                    className="w-full flex-1 object-contain"
                    alt="Foto del diario"
                  />
                </View>
              </>
            ) : null}

            {data.title ? (
              <Text className="mt-4 text-center text-3xl font-medium capitalize text-black/80">
                {data.title}
              </Text>
            ) : null}

            <TouchableWithoutFeedback>
              <View className="mt-5 h-10 flex-1">
                <Text className="text-lg">{data?.diary || "..."}</Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}
