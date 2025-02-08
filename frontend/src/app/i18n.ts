import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "@/config/i18n";

export default async function getNextIntlConfig() {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") || defaultLocale;

  return getRequestConfig(async () => ({
    messages: (await import(`../messages/${locale}.json`)).default,
  }));
}

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
