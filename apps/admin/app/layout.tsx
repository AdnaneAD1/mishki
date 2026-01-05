import type { Metadata } from 'next';
import Layout from '../components/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mishki Admin',
  description: 'Administration Mishki',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
