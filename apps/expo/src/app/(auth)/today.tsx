import { useEffect, useState } from "react"
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { TapGestureHandler } from "react-native-gesture-handler"
import { useRouter } from "expo-router"
import { createDiary, getToday, updateDiary } from "@inefable/api"
import { debounce } from "lodash"
import { Pencil } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import useSWR, { useSWRConfig } from "swr"

import { useAuthStore } from "~/components/stores/auth"
import { successToast } from "~/lib/utils"

export default function TodayScreen() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [currentDate] = useState(new Date())

  const { data: todayData, mutate: mutateToday } = useSWR(
    user?.id ? ["getToday", user.id] : null,
    getToday,
  )

  const { mutate } = useSWRConfig()

  const { control, setValue } = useForm()

  useEffect(() => {
    setValue("title", todayData?.title)
  }, [todayData?.title, setValue])

  const debouncedSaveTitle = debounce(async (title) => {
    // if there is no diary, we create it
    if (!todayData) {
      const res = await createDiary({
        isTitle: true,
        formData: title,
        user_id: user?.id,
      })

      if (res.ok) {
        successToast()
        await mutateToday()
        await mutate(["getStories", user?.id])
      }

      if (res.error) {
        console.error(res.error, "error")
      }

      return
    }

    // There is a diary, so we update it
    const res = await updateDiary({
      isTitle: true,
      formData: title,
      story_id: todayData.id,
    })

    if (res.ok) {
      successToast({ isUpdate: true })
      await mutateToday()
      await mutate(["getStories", user?.id])
    }
  }, 1500)

  return (
    <SafeAreaView className="relative flex-1">
      {/* Floating button */}
      <TouchableOpacity
        onPress={() => router.push("/edit-today")}
        className="absolute bottom-20 right-8 z-10 rounded-full bg-black/10 p-3"
      >
        <View>
          <Pencil size={24} color="black" />
        </View>
      </TouchableOpacity>

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="mx-4 mt-3 flex-1" keyboardDismissMode="on-drag">
          <Text className="mt-4 text-center text-3xl font-medium capitalize text-black/80">
            {currentDate.toLocaleDateString("es-CO", {
              month: "long",
              day: "numeric",
            })}
          </Text>

          <TouchableWithoutFeedback>
            <View className="mt-5 h-10 flex-1">
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => value.length > 1,
                }}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text)
                      debouncedSaveTitle(text)
                    }}
                    value={value}
                    defaultValue={todayData?.title || ""}
                    placeholder="Titulo...(Opcional)"
                    className="text-primary h-9 flex-1 text-center text-xl"
                    inputMode="text"
                    placeholderTextColor={"#444"}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    maxLength={40}
                  />
                )}
              />
            </View>
          </TouchableWithoutFeedback>

          <View>
            <TapGestureHandler
              numberOfTaps={2}
              onActivated={() => router.push("/edit-today")}
            >
              <Text className="mt-5 text-lg">
                {todayData?.diary
                  ? todayData.diary
                  : "Para escribir puedes dar un doble tap a este texto o presionar el boton de editar en la esquina inferior derecha."}
              </Text>
            </TapGestureHandler>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
