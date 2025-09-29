const SUPPORTED_LOCALES = ['en', 'pl', 'de'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'en';

export const getLocaleFromSearchParams = (
  searchParams: Record<string, string | string[] | undefined>
): Locale => {
  const langParam = searchParams.locale;
  if (typeof langParam === 'string' && SUPPORTED_LOCALES.includes(langParam as Locale)) {
    return langParam as Locale;
  }

  return DEFAULT_LOCALE;
};

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
] as const;

interface Language {
  code: string;
  label: string;
  flag: string;
}
