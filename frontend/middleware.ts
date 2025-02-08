import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

// This function can be marked `async` if using `await` inside
export default createMiddleware(routing);

// Only apply this middleware to pathname patterns that use dynamic routing
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|pt)/:path*"],
};
