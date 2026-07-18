import withBundleAnalyzer from "@next/bundle-analyzer"
import createMDX from "@next/mdx"
import { type NextConfig } from "next"
import { withSentryConfig } from "@sentry/nextjs"

import { env } from "./env.mjs"

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

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
    {
      source: "/stats/script.js",
      destination: "https://umami.xigenis.com/script.js",
    },
    {
      source: "/stats/api/send",
      destination: "https://umami.xigenis.com/api/send",
    },
    {
      source: "/stats/api/send/",
      destination: "https://umami.xigenis.com/api/send/",
    },
    {
      source: "/stats/api/health",
      destination: "https://umami.xigenis.com/api/health",
    },
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          }
        ],
      }
    ]
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "pub-18a3a4375c514c64bedfd4c414fbfa08.r2.dev",
      },
    ],
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Sentry webpack plugin options
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  org: "xigenis-landing-page",
  project: "xigenis-landingpage",
  sentryUrl: "https://glitchtip.xigenis.com/",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true, //!process.env.CI Suppresses all logs
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: false,
  },
}

let finalConfig = withMDX(nextConfig)

// Wrap with Sentry
finalConfig = withSentryConfig(finalConfig, sentryWebpackPluginOptions)

// Wrap with Bundle Analyzer if enabled
export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(finalConfig) : finalConfig
