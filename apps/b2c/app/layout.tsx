import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${playfair.variable} ${caveat.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
