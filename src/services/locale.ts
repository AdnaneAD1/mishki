'use server';

import { cookies, headers } from 'next/headers';
import { Locale, locales, defaultLocale } from '@/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get(COOKIE_NAME)?.value;

  if (localeFromCookie && locales.includes(localeFromCookie as Locale)) {
    return localeFromCookie as Locale;
  }

  const headerList = await headers();
  const acceptLanguage = headerList.get('accept-language');

  if (acceptLanguage) {
    // Basic detection: "fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5"
    const preferredLocales = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().split('-')[0].toLowerCase());

    for (const pref of preferredLocales) {
      if (pref === 'es') return 'es-PE';
      const match = locales.find((l) => l.startsWith(pref));
      if (match) return match as Locale;
    }
  }

  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}
