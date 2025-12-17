'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import type { LoginProps } from '../../types/auth';
import { getRedirectUrl } from '../../utils/auth';

export function LoginForm({
  onLogin,
  isLoading: externalLoading = false,
  error: externalError,
  redirectUrl,
  logoSrc = '/images/logo-mishki.png',
  title = 'Connexion',
  subtitle = 'Connectez-vous à votre compte',
  showB2BInfo = false,
  primaryColor = '#235730',
  backgroundColor = '#F7F0E0',
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [internalError, setInternalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const error = externalError || internalError;
  const loading = externalLoading || isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError('');
    setIsLoading(true);

    try {
      // onLogin retourne maintenant l'utilisateur avec son rôle depuis la BDD
      const user = await onLogin(email, password);
      
      // Obtenir l'URL de redirection basée sur le rôle stocké en BDD
      const currentDomain = window.location.hostname;
      const targetUrl = redirectUrl || getRedirectUrl(user.role, currentDomain);
      
      console.log(`Redirection utilisateur ${user.role} (${user.email}) vers:`, targetUrl);
      
      // Redirection vers le dashboard approprié
      window.location.href = targetUrl;
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setInternalError('Email ou mot de passe incorrect');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor }}
    >
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center mb-2 px-6 py-4 rounded-xl"
            style={{ backgroundColor: primaryColor }}
          >
            <Image
              src={logoSrc}
              alt="Mishki"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-gray-900 mb-2 text-2xl font-semibold">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded"
                  style={{ accentColor: primaryColor }}
                  disabled={loading}
                />
                <span className="text-gray-600">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="hover:underline"
                style={{ color: primaryColor }}
              >
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Pas encore de compte ?{' '}
              <Link
                href="/inscription"
                className="font-medium hover:underline"
                style={{ color: primaryColor }}
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>

        {/* Info B2B */}
        {showB2BInfo && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Réservé aux professionnels uniquement</p>
            <p className="mt-1">Validation manuelle sous 24-48h</p>
          </div>
        )}
      </div>
    </div>
  );
}
