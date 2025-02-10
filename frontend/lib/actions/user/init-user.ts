"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function initUser() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return null;
    }

    // Directly query Prisma instead of using getCurrentUser to avoid recursion
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        bio: true,
        emailVerified: true,
        tier: true,
        credits: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error initializing user:", error);
    return null;
  }
}
