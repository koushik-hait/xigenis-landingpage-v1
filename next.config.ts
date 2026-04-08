import withBundleAnalyzer from "@next/bundle-analyzer"
import createMDX from "@next/mdx"
import { type NextConfig } from "next"

import { env } from "./env.mjs"

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(withMDX(nextConfig)) : withMDX(nextConfig)
