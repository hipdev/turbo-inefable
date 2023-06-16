import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { Stack } from "expo-router"

import GoBack from "~/components/common/go-back"

export default function MoreAbout() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => <GoBack />,
          headerShown: true,
        }}
      />

      <View className="mx-3 items-center">
        <Text className="mb-4 mt-5 text-4xl font-black">Inefable?</Text>
        <ScrollView>
          <Text className="mb-3 text-lg">
            Hola!, mucho gusto, soy Julián, un programador de software y el
            creador de Inefable. {"\n"}
            Esta palabra si no la conocías, significa "Aquello que no se puede
            explicar con palabras". {"\n"} {"\n"}
            Así me he sentido muchas veces, tiendo a ser una persona nostalgica,
            que puede quedarse horas en el pasado. A veces, el trabajo, la
            carrera, me desbordaba, muchas cosas no podía ponerlas en palabras
            hasta que un día, decidí hacer algo con mi talento.
          </Text>

          <Text className="mb-3 text-lg">
            Así nació Inefable, una app para recordarme lo importante, para
            tener mi diario de notas, para mi bienestar, para mi salud mental.
            {"\n"}
            {"\n"}
            Espero que te guste, y que te sirva tanto como a mi, hay varias
            cosas que quiero agregarle, pero por ahora, es lo que hay, desde ya,
            muchas gracias por probarla.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
