'use client';

import { useState } from 'react';
import { LoginForm } from '@mishki/shared';

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    // Logique de connexion universelle
    console.log('Login:', email);
    
    // Mock user pour démo
    const mockUser = {
      id: '1',
      email,
      role: email.includes('spa') || email.includes('pro') ? 'b2b' as const : 'b2c' as const,
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // La redirection automatique se fera selon le rôle
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      // Ne pas spécifier redirectUrl pour utiliser la redirection automatique
      logoSrc="/logo.svg"
      title="Connexion Mishki"
      subtitle="Accédez à votre espace personnel"
      showB2BInfo={false}
      primaryColor="#235730"
      backgroundColor="#F7F0E0"
    />
  );
}
