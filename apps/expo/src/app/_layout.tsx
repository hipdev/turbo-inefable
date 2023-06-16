import { AppState, type AppStateStatus } from "react-native"
import Toast from "react-native-toast-message"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SWRConfig } from "swr"

import { AuthContextProvider } from "../components/common/auth-context"
import { toastConfig } from "../lib/toastConfig"

export default function Layout() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => {
          return true
        },
        initFocus(callback) {
          let appState = AppState.currentState

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              appState.match(/inactive|background/) &&
              nextAppState === "active"
            ) {
              callback()
            }
            appState = nextAppState
          }

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            "change",
            onAppStateChange,
          )

          return () => {
            subscription.remove()
          }
        },
      }}
    >
      <AuthContextProvider>
        <Stack />
        <StatusBar style="dark" />
        <Toast config={toastConfig} />
      </AuthContextProvider>
    </SWRConfig>
  )
}
