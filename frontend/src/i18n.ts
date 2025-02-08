import { getRequestConfig } from "next-intl/server";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "pt"] as const;
export const defaultLocale = "en";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
});
