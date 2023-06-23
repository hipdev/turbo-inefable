import { useState } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Stack } from "expo-router"
import { Save } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import useSWR from "swr"

import { createDiary, getToday, updateDiary } from "@inefable/api"

import GoBack from "~/components/common/go-back"
import { useAuthStore } from "~/components/stores/auth"
import { successToast } from "~/lib/utils"

export default function EditDiary() {
  const [currentDate] = useState(new Date())

  const { user } = useAuthStore()

  const { data: todayData, mutate } = useSWR(
    user?.id ? ["getToday", user.id] : null,
    getToday,
  )

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleDiary = async ({ story }) => {
    if (!todayData) {
      const res = await createDiary({
        isTitle: false,
        formData: story,
        user_id: user?.id,
      })

      if (res.ok) {
        successToast()
        mutate()
      }

      if (res.error) {
        console.error(res.error, "error")
      }
    }

    // There is a diary, so we update it
    const res = await updateDiary({
      isTitle: false,
      formData: story,
      story_id: todayData?.id,
    })

    if (res.ok) {
      successToast({ isUpdate: true })
      mutate()
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: currentDate.toLocaleDateString("es-CO", {
            month: "long",
            day: "numeric",
          }),
          headerLeft: () => <GoBack />,
          headerRight: () => (
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={() => handleSubmit(handleDiary)()}
            >
              <View className="mr-1">
                <Save size={28} className="text-primary" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView className="relative flex-1">
        {errors.story && (
          <View className="absolute top-1 mt-0.5 flex-row">
            <Text className="mx-4 flex-1 text-right text-red-500">
              Escribe algo jujuju 😅...
            </Text>
          </View>
        )}

        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView
            className="mx-4 mt-3 flex-1"
            keyboardDismissMode="on-drag"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="mt-5 h-[80vh] flex-1 rounded-md border border-black/10 bg-white p-3 shadow-sm">
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="never"
                >
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) => value.length > 5,
                    }}
                    name="story"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        defaultValue={todayData?.diary || ""}
                        placeholder="Hoy"
                        className="items-start overflow-y-scroll text-xl text-black/70"
                        inputMode="text"
                        placeholderTextColor={"#444"}
                        autoCapitalize="sentences"
                        multiline
                        autoCorrect={false}
                      />
                    )}
                  />
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}
