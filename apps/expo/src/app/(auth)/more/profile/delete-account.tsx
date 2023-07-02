import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Stack } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import clsx from "clsx"
import { Trash } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import useSWR from "swr"

import { getUserCode } from "@inefable/api"

import GoBack from "~/components/common/go-back"
import LoadingSpinner from "~/components/common/loading-spinner"
import { type ValidateCodeResponse } from "~/components/common/security-code"
import { useAuthStore } from "~/components/stores/auth"
import supabase from "~/lib/supabase"
import { SITE_URL } from "~/lib/utils"

export default function DeleteCode() {
  const { user, session } = useAuthStore()

  const { data: codeData } = useSWR(
    user?.id ? ["getUserCode", user.id] : null,
    getUserCode,
  )

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm()

  const handleDelete = handleSubmit(async (data) => {
    if (!user) return

    if (codeData?.data && codeData.data.length > 0) {
      const res: ValidateCodeResponse = await fetch(
        `${SITE_URL}/api/validate-code`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: session?.access_token || "",
          },
          body: JSON.stringify({ value: data.value }),
        },
      ).then((res) => res.json())

      if (!res.isValid) return
    } else {
      if (data.value != user?.email) {
        return
      }
    }

    const res = await fetch(`${SITE_URL}/api/delete-inefable-user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: session?.access_token || "",
      },
    }).then((res) => res.json())

    if (res.ok) {
      await AsyncStorage.removeItem("unlockUntil")
      await supabase.auth.signOut()
    }
  })

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          title: "Eliminar cuenta",
          headerLeft: () => <GoBack />,
          headerShown: true,
        }}
      />
      <View className="mx-3 mt-10 items-center">
        <ScrollView>
          <Text className="mb-3 text-lg">
            Eliminar tu cuenta de forma definitiva, se eliminará toda la
            información que tengas en la aplicación, fotos, diarios y perfil.
          </Text>
          <Text className="mt-4 text-base">
            {codeData?.data && codeData.data.length > 0
              ? "Por seguridad, indica tu contraseña de bloqueo."
              : "Por seguridad, indica tu correo electrónico."}
          </Text>

          <View className="mt-3 flex-row items-center space-x-4 pb-2.5">
            <View className="h-10 flex-1 border-b border-black/50">
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) =>
                    codeData?.data && codeData.data.length > 0
                      ? value.length == 4
                      : value == user?.email,
                }}
                name="value"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={
                      codeData?.data && codeData.data.length > 0
                        ? "Código actual"
                        : "Correo electrónico"
                    }
                    className={clsx(
                      "h-9 flex-1 text-primary",
                      codeData?.data && codeData.data.length > 0
                        ? "text-3xl"
                        : "text-xl",
                    )}
                    inputMode="numeric"
                    placeholderTextColor={"#444"}
                    autoCapitalize="words"
                    maxLength={
                      codeData?.data && codeData.data.length > 0 ? 4 : 100
                    }
                  />
                )}
              />
            </View>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <TouchableOpacity disabled={isSubmitting} onPress={handleDelete}>
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
