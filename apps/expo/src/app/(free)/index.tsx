import { useEffect, useRef, useState } from "react"
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import * as Linking from "expo-linking"
import { useRouter, useSegments } from "expo-router"
import { Controller, useForm } from "react-hook-form"

import { useAuthStore } from "../../components/stores/auth"
import supabase from "../../lib/supabase"

export default function Login() {
  const { user } = useAuthStore()
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (user) {
      router.replace("/home")
    }
  }, [segments, user])

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setSuccess(false)
    reset()
  }, [segments])

  const inputRef = useRef(null)

  const handleLogin = async ({ email }) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

    inputRef?.current?.blur()

    const redirectURL = Linking.createURL("/")

    const result = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectURL,
      },
    })

    if (result.error) {
      console.log(JSON.stringify(result))
    } else {
      setSuccess(true)
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="items-center">
        <Text className="mb-14 text-4xl font-black">Inefable</Text>

        <Text className="mb-3 text-xl">Obtener un link mágico de ingreso</Text>
        <View className="mx-4 flex-row rounded-md border border-black/50 pb-2.5">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value.toLowerCase())}
                value={value}
                placeholder="Correo electrónico"
                className="h-9 flex-1 text-lg"
                textAlign="center"
                inputMode="email"
                placeholderTextColor={"#444"}
                autoCapitalize="none"
                ref={inputRef}
              />
            )}
          />
        </View>
        {errors.email && (
          <View className="mt-0.5 flex-row">
            <Text className="mx-4 flex-1 text-right text-red-500">
              Añade un email válido
            </Text>
          </View>
        )}

        <View className="mt-4 flex-row space-x-2">
          <TouchableOpacity
            onPress={() => handleSubmit(handleLogin)()}
            className="flex-row items-center space-x-2 rounded-md bg-primary px-3 py-2"
          >
            <Text className="text-lg text-white">Obtener link</Text>
          </TouchableOpacity>
        </View>
      </View>

      {success && (
        <View className="mt-4">
          <Text className="text-lg font-medium text-black/90">
            Te acabo de envíar un link mágico para entrar
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
