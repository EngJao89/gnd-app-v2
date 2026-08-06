import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const apiOrigin = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333"
).replace(/\/$/, "")

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/products/images/:path*",
        destination: `${apiOrigin}/products/images/:path*`,
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withNextIntl(nextConfig)
