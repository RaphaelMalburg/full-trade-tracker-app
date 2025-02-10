import { createClient } from "@/utils/supabase/server";
import { prisma } from "./prisma";
import { withRetry } from "./db-helpers";

// Lightweight auth check for middleware - only checks Supabase session
export async function getAuthSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Full auth check for routes - includes database validation
export async function auth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return null;
  }

  try {
    // Use withRetry for database operations
    const userPrisma = await withRetry(() =>
      prisma.user.findUnique({
        where: { id: user.id },
        select: { isActive: true },
      })
    );

    if (!userPrisma?.isActive) {
      return null;
    }

    await withRetry(() =>
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })
    );

    return user;
  } catch (error) {
    console.error("Auth database operation failed:", error);
    return null;
  }
}
