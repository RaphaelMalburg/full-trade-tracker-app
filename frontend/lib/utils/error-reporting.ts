import * as Sentry from "@sentry/nextjs";

interface ErrorWithMessage {
  message: string;
  name?: string;
  stack?: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

interface ErrorContext {
  [key: string]: unknown;
}

export function reportError(error: unknown, context?: ErrorContext) {
  const errorWithMessage = toErrorWithMessage(error);

  // Add context to the error
  const eventId = Sentry.captureException(errorWithMessage, {
    extra: context,
  });

  // In development, also log to console
  if (process.env.NODE_ENV === "development") {
    console.error("Error captured and sent to Sentry:", {
      error: errorWithMessage,
      context,
      eventId,
    });
  }

  return eventId;
}

export function reportMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: ErrorContext,
) {
  // Add context to the message
  const eventId = Sentry.captureMessage(message, {
    level,
    extra: context,
  });

  // In development, also log to console
  if (process.env.NODE_ENV === "development") {
    console.log(`[${level}] ${message}`, { context, eventId });
  }

  return eventId;
}

export function withErrorReporting<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: ErrorContext,
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      reportError(error, {
        functionName: fn.name,
        arguments: args,
        ...context,
      });
      throw error;
    }
  }) as T;
}
