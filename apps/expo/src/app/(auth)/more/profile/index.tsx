import { SafeAreaView, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Progress from "react-native-progress"
import { Link } from "expo-router"
import { getUserCode, updateUserName } from "@inefable/api"
import { Save } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"
import useSWR from "swr"

import { useAuthStore } from "~/components/stores/auth"
import { errorToast, successToast } from "~/lib/utils"

export default function Profile() {
  const { user } = useAuthStore()

  const { data: codeData } = useSWR(
    user?.id ? ["getUserCode", user.id] : null,
    getUserCode,
  )

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm()

  const handleName = handleSubmit(async (data) => {
    if (!user) return

    const res = user && (await updateUserName({ name: data.name, user }))

    if (res.ok) {
      successToast({ isUpdate: true })
    } else {
      errorToast()
    }
  })

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-4 mt-7 flex flex-1 justify-between">
        <View>
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

            <View className="mt-8">
              {isSubmitting ? (
                <Progress.Circle
                  size={28}
                  indeterminate={true}
                  color="#AC66CC"
                />
              ) : (
                <TouchableOpacity disabled={isSubmitting} onPress={handleName}>
                  <View className="flex-row items-center justify-center rounded-sm bg-primary py-2">
                    <Text className="mr-2 text-xl font-semibold text-white">
                      Guardar
                    </Text>
                    <Save size={24} color="white" />
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <Text className="mb-2 mt-5 text-xl font-semibold">Seguridad</Text>
            {codeData?.data?.length !== 0 ? (
              <View>
                <Text className="text-base">
                  Has establecido un código de seguridad
                </Text>

                <View className="mt-3 flex-row items-center space-x-5">
                  <View className="rounded-md border border-black/50">
                    <Link href="#" className=" px-3 py-0.5 text-base">
                      Cambiar
                    </Link>
                  </View>
                  <View className="rounded-md border border-red-400">
                    <Link
                      href="more/profile/delete-code"
                      className=" px-3 py-0.5 text-base text-red-500"
                    >
                      Eliminar
                    </Link>
                  </View>
                </View>
              </View>
            ) : (
              <View className="flex-row items-center">
                <Text className="w-3/4 text-lg leading-6">
                  Puedes añadir un código de 4 dígitos, las historias solo
                  podrán verse cuando ingresas el código.
                </Text>
                <View className="mt-4 w-20 rounded-md border border-black/50">
                  <Link
                    href="more/profile/create-code"
                    className="px-3 py-0.5 text-lg font-medium"
                  >
                    Añadir
                  </Link>
                </View>
              </View>
            )}
          </View>
        </View>
        <View className="pb-8">
          <Link href="more/profile/delete-account" className="text-base">
            Eliminar cuenta ☠️
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}
