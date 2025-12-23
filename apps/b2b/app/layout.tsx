import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Mishki B2B - Espace Professionnel",
  description: "Plateforme B2B pour professionnels de la beauté",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <LanguageSwitcher />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}