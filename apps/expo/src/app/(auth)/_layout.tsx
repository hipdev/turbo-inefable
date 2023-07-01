import { useEffect } from "react"
import { Text } from "react-native"
import { Stack, Tabs, useRouter, useSegments } from "expo-router"
import { Home, List, Plus } from "lucide-react-native"

import { useAuthStore } from "../../components/stores/auth"
import { softViolet } from "../../lib/colors"

export default function Layout() {
  const { user } = useAuthStore()

  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (!user) {
      router.replace("/")
    }
  }, [segments, user])

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#590696", //AC66CC
            paddingTop: 10,
            paddingBottom: 2,
          },
          tabBarLabelStyle: { color: "white" },
          tabBarLabel: ({ focused, children }) => (
            <Text
              style={{
                color: focused ? softViolet : "white",
                marginTop: 7,
                fontSize: 11,
              }}
            >
              {children}
            </Text>
          ),
        }}
      >
        {/* Start no authenticated routes */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Diario",
            tabBarIcon: ({ focused }) => (
              <Home color={focused ? softViolet : "white"} />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="today"
          options={{
            title: "Hoy",
            tabBarIcon: ({ focused }) => (
              <Plus color={focused ? softViolet : "white"} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: "Más",
            tabBarIcon: ({ focused }) => (
              <List color={focused ? softViolet : "white"} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="diary/[id]"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
        {/* End no authenticated routes */}
      </Tabs>
    </>
  )
}
