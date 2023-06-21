import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import * as Progress from "react-native-progress"
import { Stack, useRouter } from "expo-router"
import { deleteUserCode, getUserCode } from "@inefable/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import clsx from "clsx"
import { Trash } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import useSWR, { useSWRConfig } from "swr"

import GoBack from "~/components/common/go-back"
import { type ValidateCodeResponse } from "~/components/common/security-code"
import { useAuthStore } from "~/components/stores/auth"

export default function DeleteCode() {
  const { user, session } = useAuthStore()
  const { mutate } = useSWRConfig()
  const router = useRouter()

  const { data: codeData } = useSWR(
    user?.id ? ["getUserCode", user.id] : null,
    getUserCode,
  )

  console.log(codeData, "codeData")

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm()

  const handleDelete = handleSubmit(async (data) => {
    if (!user) return
    if (codeData?.data && codeData.data.length > 0) {
      // Delete with code
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
                  validate: (value) => value.length == 4,
                }}
                name="value"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    y
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
              <Progress.Circle size={28} indeterminate={true} color="#AC66CC" />
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
