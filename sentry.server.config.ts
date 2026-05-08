import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV || "development",
  beforeSend(event) {
    if (event.request?.headers) {
      delete event.request.headers["Authorization"];
      delete event.request.headers["Cookie"];
    }
    return event;
  },
});
