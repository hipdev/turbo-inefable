import baseConfig from "@inefable/tailwind-config"
import { type Config } from "tailwindcss"

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
