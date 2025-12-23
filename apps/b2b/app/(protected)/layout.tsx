'use client';

import { useAuth } from '@/apps/b2b/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '@/apps/b2b/components/Layout';
import './globals.css';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedLayout: isLoading=', isLoading, 'user=', user);

    if (!isLoading) {
      if (!user) {
        console.log('ProtectedLayout: Pas d\'utilisateur, redirection vers /login');
        router.replace('/login');
      } else if (!user.validated) {
        console.log('ProtectedLayout: Utilisateur non validé, redirection vers /validation-attente');
        router.replace('/pro/validation');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!user || !user.validated) {
    return null;
  }

  return <Layout>{children}</Layout>;
}
