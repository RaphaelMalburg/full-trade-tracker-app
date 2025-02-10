import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" ||
    process.env.NEXT_RUNTIME === "edge"
  ) {
    await import("./sentry.config");
  }
}

// Only export what we need
export const onRequestError = (error: Error) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error);
  }
};
