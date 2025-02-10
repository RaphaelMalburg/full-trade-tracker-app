import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Disable debug mode and minimize logging
  debug: false,

  // Set environment
  environment: process.env.NODE_ENV,

  // Disable features we don't need
  enableTracing: false,
  integrations: [],

  // Only capture errors in production
  beforeSend(event) {
    if (process.env.NODE_ENV === "production") {
      return event;
    }
    return null;
  },

  // Ignore noisy errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Loading chunk",
    "Failed to fetch",
    "Network request failed",
    "Failed to load resource",
    "Load failed",
  ],
});
