import { createClient } from "@/utils/supabase/client";
import { mockSupabaseClient } from "./__mocks__/supabase";
import { useUserStore } from "@/lib/store/use-user-store";

// Mock createClient to return our mockSupabaseClient
jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}));

// Mock fetch for avatar loading
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ avatarUrl: "https://example.com/avatar.jpg" }),
  }),
) as jest.Mock;

const mockUser = {
  id: "1",
  email: "test@example.com",
  name: "Test User",
  createdAt: new Date(),
  updatedAt: new Date(),
  avatarUrl: null,
  emailVerified: null,
  apiKey: null,
  bio: null,
  tier: "free",
  credits: 0,
  isActive: true,
  lastLoginAt: null,
  hasCompletedOnboarding: false,
  hasAcceptedToS: false,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  stripePriceId: null,
  plan: "free",
};

describe("Authentication System", () => {
  let originalWindow: Window & typeof globalThis;

  beforeEach(() => {
    jest.clearAllMocks();
    useUserStore.setState({ user: null, loading: false });
    // Store original window
    originalWindow = window;
    // Create a new window object with the properties we need
    const windowMock = {
      location: {
        href: "",
        origin: "http://localhost",
      },
    };
    // @ts-ignore - we know this is not a complete window object
    global.window = windowMock;
  });

  afterEach(() => {
    // Restore original window
    global.window = originalWindow;
    // Clear fetch mock
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Sign Out", () => {
    it("should clear user data and redirect to home page", async () => {
      // Setup mock user
      useUserStore.setState({ user: mockUser });

      // Call signOut
      await useUserStore.getState().signOut();

      // Verify Supabase signOut was called
      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();

      // Verify user was cleared from store
      expect(useUserStore.getState().user).toBeNull();

      // Verify redirect - check if it ends with "/"
      expect(window.location.href).toMatch(/\/$/);
    });

    it("should handle sign out errors gracefully", async () => {
      // Mock console.error
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      // Mock Supabase signOut to throw
      mockSupabaseClient.auth.signOut.mockRejectedValueOnce(
        new Error("Sign out failed"),
      );

      // Call signOut
      await useUserStore.getState().signOut();

      // Verify error was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        "Sign out error:",
        expect.any(Error),
      );

      // Cleanup
      consoleSpy.mockRestore();
    });
  });

  describe("User Store", () => {
    it("should initialize with null user and not loading", () => {
      const state = useUserStore.getState();
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
    });

    it("should update user state correctly", () => {
      useUserStore.getState().setUser(mockUser);
      expect(useUserStore.getState().user).toEqual(mockUser);
    });

    it("should persist user data in localStorage", () => {
      useUserStore.getState().setUser(mockUser);

      // Get data from localStorage
      const storedData = JSON.parse(
        localStorage.getItem("user-storage") || "{}",
      );

      // Verify basic user data was stored
      expect(storedData.state.user).toBeTruthy();
      expect(storedData.state.user.id).toBe(mockUser.id);
      expect(storedData.state.user.email).toBe(mockUser.email);
      expect(storedData.state.user.name).toBe(mockUser.name);
    });
  });
});
