import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

export default function Details() {
  const router = useRouter()
  return (
    <View>
      {/* <Stack.Screen options={{ title: 'Overview', headerShown: false }} /> */}
      <Text
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          router.back()
        }}
      >
        Details Screen
      </Text>
    </View>
  )
}
