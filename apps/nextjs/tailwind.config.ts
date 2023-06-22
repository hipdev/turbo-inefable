import type { Config } from "tailwindcss"

import baseConfig from "@inefable/tailwind-config"

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        primary: "#29ACF5",
      },
      borderRadius: {
        "2sm": "4px",
      },
    },
  },
} satisfies Config
