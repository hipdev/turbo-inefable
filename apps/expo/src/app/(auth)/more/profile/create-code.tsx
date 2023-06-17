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
import { Save } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import { useSWRConfig } from "swr"

import { type ValidateCodeResponse } from "~/components/common/security-code"
import { useAuthStore } from "~/components/stores/auth"

export default function CreateCode() {
  const { user, session } = useAuthStore()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm()

  const handleCode = handleSubmit(async (data) => {
    if (!user) return
    const res: ValidateCodeResponse = await fetch(
      "http://localhost:3000/api/create-code",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: session?.access_token || "",
        },
        body: JSON.stringify({ inputCode: data.code }),
      },
    ).then((res) => res.json())

    if (res) {
      await mutate(["getUserCode", user.id])
      router.push("more/profile")
    }
  })

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="mx-3 mt-10 items-center">
        <ScrollView>
          <Text className="mb-3 text-lg">
            Deberás ingresar el código para ver el diario, de ser correcto,
            podrás verlo por la siguiente hora.
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
                    placeholder="Código"
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
              <TouchableOpacity disabled={isSubmitting} onPress={handleCode}>
                <View className="flex-row items-center space-x-2 rounded-md border-2 border-primary px-2 py-1">
                  <Save size={24} color="#590696" />
                  <Text className="text-lg font-medium text-primary">
                    Crear
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
