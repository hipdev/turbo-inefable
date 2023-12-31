// Importing env files here to validate on build
import "./src/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  experimental: { appDir: true },
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@inefable/api", "@inefable/auth", "@inefable/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

export default config
