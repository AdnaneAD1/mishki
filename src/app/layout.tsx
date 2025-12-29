import "./globals.css";

import { AuthProvider } from "@/apps/b2b/context/AuthContext";
import { CartProvider } from "@/apps/b2c/lib/cart-context";
import { Caveat, Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { auth, db, doc, getDoc } from '@mishki/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import RoleRedirector from '@/components/RoleRedirector';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  fallback: ["cursive"],
});

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${inter.className} ${inter.variable} ${playfair.variable} ${caveat.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <CartProvider>
              <RoleRedirector />
              {children}
              <LanguageSwitcher />
            </CartProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
