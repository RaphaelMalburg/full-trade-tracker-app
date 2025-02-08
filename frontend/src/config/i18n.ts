export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en" satisfies Locale;

// Use the default: en
export const getLocale = (locale: string) => {
  if (!locale) return defaultLocale;
  const normalizedLocale = locale.toLowerCase();
  return locales.includes(normalizedLocale as Locale) ? (normalizedLocale as Locale) : defaultLocale;
};
