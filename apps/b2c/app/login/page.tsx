'use client';

import { useState } from 'react';
import { LoginForm } from '@mishki/shared';

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    // En production : appel API qui retourne l'utilisateur avec son rôle depuis la BDD
    // Exemple : const user = await api.login(email, password);
    
    console.log('Login:', email);
    
    // Mock user pour démo - simule une réponse de l'API
    // En réalité, le rôle vient de la base de données, pas de l'email
    const mockUser = {
      id: '1',
      email,
      nom: 'Dupont',
      prenom: 'Jean',
      role: 'b2c' as const, // Rôle stocké en BDD lors de l'inscription
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Retourne l'utilisateur avec son rôle pour la redirection
    return mockUser;
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
