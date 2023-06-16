import { Text, TextInput, TouchableOpacity, View } from "react-native"
import * as Progress from "react-native-progress"
import { updateUserName } from "@inefable/api"
import { Send } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"

import { useAuthStore } from "../../components/stores/auth"

export default function AddName() {
  const { user } = useAuthStore()
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm()

  const handleName = async ({ name }: { name: string }) => {
    const res = await updateUserName({ name, user })

    if (res.ok) {
      reset({ name: "" })
    }
  }

  return (
    <>
      <Text className="text-4xl text-black/80">
        Hola, antes de empezar, me gustaría saber tu nombre
      </Text>
      <View className="mt-3 flex-row items-center space-x-4 pb-2.5">
        <View className="h-10 flex-1 border-b border-black/50">
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
                placeholder="..."
                className="h-9 flex-1 text-3xl text-primary"
                inputMode="text"
                placeholderTextColor={"#444"}
                autoCapitalize="words"
              />
            )}
          />
        </View>
        {isSubmitting ? (
          <Progress.Circle size={28} indeterminate={true} color="#AC66CC" />
        ) : (
          <TouchableOpacity
            disabled={isSubmitting}
            onPress={() => handleSubmit(handleName)()}
          >
            <Send size={28} color="#444" />
          </TouchableOpacity>
        )}
      </View>
      <Text className="mt-7 text-lg">
        Toda tu información viaja segura, aún así, procura no guardar nada
        bancario aquí, no esta permitido. Inefable es una app segura, pero no es
        un banco. {"\n"}
        Solo tu tienes acceso a toda tu información, no se comparte con nadie.
      </Text>
    </>
  )
}
