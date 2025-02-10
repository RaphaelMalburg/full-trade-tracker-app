import { User } from "@prisma/client";

export type SafeUser = {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  emailVerified: Date | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
};

export function createSafeUser(user: any): SafeUser {
  return {
    id: user.id,
    email: user.email || "",
    name: user.user_metadata?.name || user.user_metadata?.full_name || null,
    avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
    role: "USER",
    status: "ACTIVE",
  };
}
