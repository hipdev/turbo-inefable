import { SafeAreaView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Link } from "expo-router"
import { LogOut } from "lucide-react-native"

import supabase from "~/lib/supabase"

export default function MoreScreen() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log("Error logging out:", error.message)
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-4 mt-10 flex-1 justify-between">
        {/* <Stack.Screen options={{ title: 'Overview', headerShown: false }} /> */}

        <View>
          <Text className="mb-4 text-3xl font-semibold">Explorar</Text>

          <Link
            href="more/profile"
            className="mb-3 bg-white px-3 py-4 text-2xl"
          >
            Mi cuenta
          </Link>

          <Link href="more/about" className="mb-3 bg-white px-3 py-4 text-2xl">
            Inefable ?
          </Link>
        </View>
        <TouchableOpacity onPress={handleLogout} className="mb-8 mr-2">
          <View className="flex-row items-center justify-end space-x-2">
            <Text className="text-base">Cerrar sesión</Text>
            <LogOut className="text-primary/60" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
