import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@prisma/client";

interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      initialized: false,
      setUser: (user) => set({ user }),
      setInitialized: (initialized) => set({ initialized }),
      signOut: async () => {
        const supabase = createClient();
        try {
          await supabase.auth.signOut();
          set({ user: null });
          window.location.href = "/";
        } catch (error) {
          console.error("Sign out error:", error);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              name: state.user.name,
              email: state.user.email,
              avatarUrl: state.user.avatarUrl,
              tier: state.user.tier,
            }
          : null,
      }),
    },
  ),
);
