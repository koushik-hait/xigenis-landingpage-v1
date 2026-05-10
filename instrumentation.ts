import { registerOTel } from "@vercel/otel"
import * as Sentry from "@sentry/nextjs"

export async function register() {
  registerOTel("next-app")

  // Initialize Sentry for Node.js runtime
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config")
  }

  // Initialize Sentry for Edge runtime
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config")
  }
}

export const onRequestError = Sentry.captureRequestError
