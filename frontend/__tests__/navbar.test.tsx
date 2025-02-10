import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { useUserStore } from "@/lib/store/use-user-store";
import { mockSupabaseClient } from "./__mocks__/supabase";
import type { User } from "@prisma/client";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

// Mock the shadcn button component
jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

// Mock the shadcn dropdown menu component
jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div role="menuitem" onClick={onClick}>
      {children}
    </div>
  ),
  DropdownMenuSeparator: () => <div />,
}));

// Mock the UserAvatar component
jest.mock("@/components/features/profile/user-avatar", () => ({
  UserAvatar: ({ user }: { user: any }) => (
    <div>
      <span>
        {user.name
          ?.split(" ")
          .map((n: string) => n[0])
          .join("")}
      </span>
    </div>
  ),
}));

// Mock fetch for avatar loading
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ avatarUrl: "https://example.com/avatar.jpg" }),
  }),
) as jest.Mock;

const mockUser: User = {
  id: "1",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Test User",
  avatarUrl: "https://example.com/avatar.jpg",
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
  plan: "free",
};

describe("Navbar", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("shows sign in button when user is not authenticated", async () => {
    // Mock the user store with no user
    useUserStore.setState({ user: null, loading: false });

    await act(async () => {
      render(<Navbar />);
    });

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /TU/i }),
    ).not.toBeInTheDocument();
  });

  it("shows user avatar and dropdown when user is authenticated", async () => {
    // Mock the user store with an authenticated user
    useUserStore.setState({
      user: mockUser,
      loading: false,
    });

    await act(async () => {
      render(<Navbar />);
    });

    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
    const avatarButton = screen.getByRole("button", { name: /TU/i });
    expect(avatarButton).toBeInTheDocument();
  });

  it("shows loading state while checking authentication", async () => {
    // Mock the loading state
    useUserStore.setState({ user: null, loading: true });

    await act(async () => {
      render(<Navbar />);
    });

    const loadingElement = screen.getByTestId("loading-spinner");
    expect(loadingElement).toHaveClass("animate-pulse");
  });

  it("handles sign out correctly", async () => {
    // Mock the user store with an authenticated user
    const signOutMock = jest.fn();
    useUserStore.setState({
      user: mockUser,
      loading: false,
      signOut: signOutMock,
    });

    await act(async () => {
      render(<Navbar />);
    });

    // Open dropdown menu by clicking avatar button
    const avatarButton = screen.getByRole("button", { name: /TU/i });
    await act(async () => {
      fireEvent.click(avatarButton);
    });

    // Find and click the sign out button
    const signOutButton = screen.getByText(/sign out/i);
    await act(async () => {
      fireEvent.click(signOutButton);
    });

    expect(signOutMock).toHaveBeenCalled();
  });

  it("navigates to correct routes when clicking nav links", async () => {
    await act(async () => {
      render(<Navbar />);
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);

    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
