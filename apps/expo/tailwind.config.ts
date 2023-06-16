import { type Config } from "tailwindcss"

import baseConfig from "@acme/tailwind-config"

export default {
  presets: [baseConfig],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#590696",
      },
    },
  },
} satisfies Config
