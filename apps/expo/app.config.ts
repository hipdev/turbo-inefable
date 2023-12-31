import type { ExpoConfig } from "@expo/config"

import "dotenv/config"

const defineConfig = (): ExpoConfig => ({
  name: "Inefable",
  slug: "inefable",
  scheme: "inefable",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
    package: "com.julianux.turbo-inefable",
    permissions: [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO",
    ],
  },
  extra: {
    eas: {
      projectId: "a5de1fb0-263d-422a-8669-01e159ba75be",
    },
    supabaseUrl: "https://wvwiljxejnwmtlrvqlcw.supabase.co",
    supabasePublicKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2d2lsanhlam53bXRscnZxbGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMzgxMzYsImV4cCI6MTk5ODYxNDEzNn0.Xfz3C-BnIMEgLbIVE9qPQpiHaT14H4XBGERek51MtfU",
  },
  plugins: [
    "./expo-plugins/with-modify-gradle.js",
    [
      "expo-camera",
      {
        cameraPermission: "Allow Inefable to access your camera.",
      },
    ],
  ],
})

export default defineConfig
