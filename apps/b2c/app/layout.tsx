import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import { CartProvider } from '@/apps/b2c/lib/cart-context';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial']
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['Georgia', 'serif']
});
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  fallback: ['cursive']
});

export const metadata: Metadata = {
  title: 'Mishki - Soins naturels du Pérou',
  description: 'Révélez une beauté pure et précieuse avec Mishki, soins d\'exception issus de la biodiversité péruvienne.',
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
      <body className={`${inter.className} ${playfair.variable} ${caveat.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            {children}
            <LanguageSwitcher />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
