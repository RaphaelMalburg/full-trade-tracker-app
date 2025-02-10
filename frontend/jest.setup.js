import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Mock Next.js modules
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
  redirect: jest.fn(),
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }) => <>{children}</>,
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
  },
}));

// Set up TextEncoder/TextDecoder for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};
