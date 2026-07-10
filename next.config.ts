import type { NextConfig } from "next";

const apiOrigin = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/products/images/:path*",
        destination: `${apiOrigin}/products/images/:path*`,
      },
    ];
  },
};

export default nextConfig;
