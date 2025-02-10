"use client";

import { useEffect } from "react";
import type { User } from "@prisma/client";
import { useUserStore } from "@/lib/store/use-user-store";

export function InitUser({ user }: { user: User | null }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
