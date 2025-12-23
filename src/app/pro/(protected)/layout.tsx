'use client'

import Layout from '@/apps/b2b/components/Layout';

// Auth/role/validation sont déjà gérés par src/app/pro/layout.tsx (ProGate).
// Ce wrapper sert uniquement à appliquer le Layout UI pour les pages protégées.
export default function ProProtectedLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
