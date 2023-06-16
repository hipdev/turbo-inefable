import { Button, SafeAreaView, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Progress from "react-native-progress"
import { Link, Stack } from "expo-router"
import { updateUserName } from "@inefable/api"
import { Save, Send } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"

import GoBack from "~/components/common/go-back"
import { useAuthStore } from "~/components/stores/auth"
import { successToast } from "~/lib/utils"

export default function Profile() {
  const { user } = useAuthStore()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm()

  const handleName = async ({ name }: { name: string }) => {
    const res = await updateUserName({ name, user })

    if (res.ok) {
      successToast({ isUpdate: true })
    } else {
    }
  }

  console.log(user, "user")
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          title: "Cuenta",
          headerLeft: () => <GoBack />,
          headerShown: true,
        }}
      />
      <View className="mx-4 mt-7">
        {/* <Stack.Screen options={{ title: 'Overview', headerShown: false }} /> */}
        <Text className="mb-2 text-xl font-semibold">Info básica</Text>

        <View className="mb-10">
          <View className="border-b border-black/50 pb-2">
            <Text className="text-lg text-black/70">Nombre</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) => value.length > 1,
              }}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  defaultValue={user?.user_metadata?.name || ""}
                  placeholder="Tu nombre"
                  className="text-xl"
                  inputMode="text"
                  placeholderTextColor={"#444"}
                  autoCapitalize="words"
                />
              )}
            />
          </View>
          <View className="mt-4 border-b border-black/50 pb-2">
            <Text className="text-lg text-black/70">Fecha de nacimiento</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) => value.length > 1,
              }}
              name="birthday"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  defaultValue={user?.user_metadata?.birthday || ""}
                  placeholder="Ejemplo: 13/11/1992"
                  className="text-xl"
                  inputMode="text"
                  placeholderTextColor={"#444"}
                  autoCapitalize="words"
                />
              )}
            />
          </View>

          <Text className="mb-2 mt-5 text-xl font-semibold">Seguridad</Text>
        </View>

        {isSubmitting ? (
          <Progress.Circle size={28} indeterminate={true} color="#AC66CC" />
        ) : (
          <TouchableOpacity
            disabled={isSubmitting}
            onPress={() => handleSubmit(handleName)()}
          >
            <View className="flex-row items-center justify-center rounded-sm bg-primary py-2">
              <Text className="mr-2 text-xl font-semibold text-white">
                Guardar
              </Text>
              <Save size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}
