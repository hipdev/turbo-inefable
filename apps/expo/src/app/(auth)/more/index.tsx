import { SafeAreaView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Link } from "expo-router"

export default function MoreScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="mx-4 mt-10">
        {/* <Stack.Screen options={{ title: 'Overview', headerShown: false }} /> */}
        <Text className="mb-4 text-3xl font-semibold">Explorar</Text>

        <Link href="more/profile" className="mb-3 bg-white px-3 py-4 text-2xl">
          Mi cuenta
        </Link>

        <Link href="more/about" className="mb-3 bg-white px-3 py-4 text-2xl">
          Inefable ?
        </Link>
      </View>
    </SafeAreaView>
  )
}
