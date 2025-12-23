export type Locale = (typeof locales)[number];

export const locales = ['en', 'fr', 'es-PE'] as const;
export const defaultLocale: Locale = 'es-PE';
