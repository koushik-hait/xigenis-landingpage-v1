import { registerOTel } from "@vercel/otel"
import * as Sentry from "@sentry/nextjs"

export function register() {
  registerOTel("next-app")

  // Initialize Sentry for Node.js runtime
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: process.env.NODE_ENV || "development",
    })
  }
}

// import * as Sentry from '@sentry/nextjs';

// export async function register() {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     await import('./sentry.server.config');
//   }

//   if (process.env.NEXT_RUNTIME === 'edge') {
//     await import('./sentry.edge.config');
//   }
// }

// export const onRequestError = Sentry.captureRequestError;
