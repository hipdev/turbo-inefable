import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import * as Progress from "react-native-progress"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Trash } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { useSWRConfig } from "swr"

import { deleteUserCode } from "@inefable/api"

import { type ValidateCodeResponse } from "~/components/common/security-code"
import { useAuthStore } from "~/components/stores/auth"
import { SITE_URL } from "~/lib/utils"

export default function DeleteCode() {
  const { user, session } = useAuthStore()
  const { mutate } = useSWRConfig()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm()

  const handleName = handleSubmit(async (data) => {
    if (!user) return
    const res: ValidateCodeResponse = await fetch(
      `${SITE_URL}/api/validate-code`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: session?.access_token || "",
        },
        body: JSON.stringify({ value: data.code }),
      },
    ).then((res) => res.json())

    if (res.isValid) {
      const res = await deleteUserCode({ user_id: user.id })

      if (res.ok) {
        await mutate(["getUserCode", user.id])
        await AsyncStorage.removeItem("unlockUntil")
        router.push("more/profile")
      }
    }
  })

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="mx-3 mt-10 items-center">
        <ScrollView>
          <Text className="mb-3 text-lg">
            Para eliminar tu código y eliminar esta restricción sólo tienes que
            ingresar tu código actual y presionar eliminar.
          </Text>
          <View className="mt-3 flex-row items-center space-x-4 pb-2.5">
            <View className="h-10 flex-1 border-b border-black/50">
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => value.length == 4,
                }}
                name="code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Código actual"
                    className="h-9 flex-1 text-3xl text-primary"
                    inputMode="numeric"
                    placeholderTextColor={"#444"}
                    autoCapitalize="words"
                    maxLength={4}
                  />
                )}
              />
            </View>
            {isSubmitting ? (
              <Progress.Circle size={28} indeterminate={true} color="#AC66CC" />
            ) : (
              <TouchableOpacity disabled={isSubmitting} onPress={handleName}>
                <View className="flex-row items-center space-x-2 rounded-md border-2 border-red-500 px-2 py-1">
                  <Trash size={24} color="red" />
                  <Text className="text-lg font-medium text-red-500">
                    Eliminar
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
