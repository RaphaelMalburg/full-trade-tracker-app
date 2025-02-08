"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/language-store";
import { locales } from "@/i18n";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (newLocale: string) => {
    setLanguage(newLocale);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center space-x-1">
      {locales.map((locale) => (
        <Button key={locale} variant={locale === language ? "secondary" : "ghost"} size="sm" onClick={() => handleLanguageChange(locale)} className="w-12">
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
