import { Stack } from "expo-router"

import GoBack from "~/components/common/go-back"

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Cuenta",
          headerLeft: () => <GoBack />,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="delete-code"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          title: "Eliminar código",
          headerLeft: () => <GoBack />,
          headerShown: true,
        }}
      />
    </Stack>
  )
}
