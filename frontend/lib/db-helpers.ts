import { prisma } from "./prisma";

interface PrismaError {
  name: string;
  code: string;
  message: string;
}

// Type guard for Prisma errors
function isPrismaError(error: unknown): error is PrismaError {
  return (
    typeof (error as any)?.name === "string" &&
    (error as any)?.name === "PrismaClientKnownRequestError" &&
    typeof (error as any)?.code === "string" &&
    ["P1017", "P1001", "P1002"].includes((error as any)?.code)
  );
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000,
): Promise<T> {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: unknown) {
      lastError = error;

      // Check if it's a connection error using type guard
      if (isPrismaError(error)) {
        console.error(
          `Database operation failed (attempt ${attempt}/${maxRetries}):`,
          error.message,
        );

        if (attempt < maxRetries) {
          // Wait before retrying
          await new Promise((resolve) =>
            setTimeout(resolve, delayMs * attempt),
          );

          // Try to reconnect
          try {
            await prisma.$disconnect();
            await prisma.$connect();
          } catch (reconnectError) {
            console.error("Failed to reconnect:", reconnectError);
          }

          continue;
        }
      }

      // If it's not a connection error or we're out of retries, throw the error
      throw error;
    }
  }

  throw lastError;
}
