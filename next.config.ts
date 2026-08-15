import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const apiOrigin = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333"
).replace(/\/$/, "")

function getImageRemotePatterns() {
  try {
    const url = new URL(apiOrigin)

    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
        pathname: "/**" as const,
      },
    ]
  } catch {
    return [
      {
        protocol: "http" as const,
        hostname: "localhost",
        port: "3333",
        pathname: "/**" as const,
      },
    ]
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getImageRemotePatterns(),
  },
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
