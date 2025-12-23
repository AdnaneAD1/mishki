'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/apps/b2b/context/AuthContext';
import { useTranslations } from 'next-intl';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const t = useTranslations('b2b');

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (!user.validated) {
        router.push('/validation-attente');
      } else {
        router.push('/pro/accueil');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">{t('redirecting')}</div>
    </div>
  );
}
