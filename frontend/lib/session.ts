import { createClient } from "@/utils/supabase/server";
import { SafeUser, createSafeUser } from "@/lib/types/user";

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return null;
    }

    return createSafeUser(session.user);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
