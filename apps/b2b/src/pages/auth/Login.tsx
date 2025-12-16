'use client';

import { useAuth } from '../../context/AuthContext';
import { LoginForm } from '@mishki/shared';

export default function Login() {
  const { login } = useAuth();

  return (
    <LoginForm
      onLogin={login}
      // Ne pas spécifier redirectUrl pour utiliser la redirection automatique
      redirectUrl='/accueil'
      logoSrc="/images/logo-mishki.png"
      title="Connexion Espace Professionnel"
      subtitle="Accédez à votre espace professionnel"
      showB2BInfo={true}
      primaryColor="#235730"
      backgroundColor="#F7F0E0"
    />
  );
}
