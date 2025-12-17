'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle2, Mail, Phone } from 'lucide-react';

export default function ValidationAttente() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F7F0E0' }}>
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4 px-8 py-4 rounded-xl" style={{ backgroundColor: '#235730' }}>
            <span className="text-white text-2xl md:text-3xl font-bold">Mishki B2B</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>

          <h1 className="text-gray-900 mb-4">Compte en attente de validation</h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Merci pour votre inscription, <span className="text-gray-900">{user?.prenom}</span> !
            Votre compte professionnel est actuellement en cours de validation par notre équipe.
          </p>

          {/* Timeline */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
            <h3 className="text-gray-900 mb-4">Étapes de validation :</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-900">Inscription reçue</p>
                  <p className="text-sm text-gray-600">Vos informations ont été enregistrées</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-900">Vérification en cours</p>
                  <p className="text-sm text-gray-600">SIRET et documents professionnels</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">3</span>
                </div>
                <div>
                  <p className="text-gray-900">Activation du compte</p>
                  <p className="text-sm text-gray-600">Sous 24-48h ouvrées</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5" style={{ color: '#235730' }} />
                <h4 className="text-gray-900">Confirmation par email</h4>
              </div>
              <p className="text-sm text-gray-600">
                Vous recevrez un email de confirmation dès que votre compte sera activé
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5" style={{ color: '#235730' }} />
                <h4 className="text-gray-900">Besoin d'aide ?</h4>
              </div>
              <p className="text-sm text-gray-600">
                Contactez-nous au 01 23 45 67 89 pour toute question
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={logout}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Se déconnecter
            </button>
            <Link
              href="/login"
              className="px-6 py-3 text-white rounded-lg transition-all"
              style={{ backgroundColor: '#235730' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
            >
              Retour à la connexion
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Compte enregistré : <span className="text-gray-700">{user?.email}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Société : <span className="text-gray-700">{user?.societe}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build avec useAuth
export async function getServerSideProps() {
  return { props: {} };
}
