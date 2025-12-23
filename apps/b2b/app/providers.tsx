'use client';

import { AuthProvider } from '@/apps/b2b/context/AuthContext';
import { CartProvider } from '@/apps/b2b/context/CartContext';
import { Toaster } from '@/apps/b2b/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
}
