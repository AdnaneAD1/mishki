'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Lock,
  Building2,
  FileText,
  Phone,
  MapPin,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import Image from 'next/image';

export default function InscriptionPro() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    societe: '',
    siret: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    typeActivite: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [kbisFile, setKbisFile] = useState<File | null>(null);
  const [pieceIdentiteFile, setPieceIdentiteFile] = useState<File | null>(null);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKbisUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKbisFile(e.target.files[0]);
    }
  };

  const handlePieceIdentiteUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPieceIdentiteFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (!acceptConditions) {
      alert('Veuillez accepter les conditions générales');
      return;
    }
    if (!kbisFile) {
      alert('Veuillez télécharger votre KBIS');
      return;
    }
    if (!pieceIdentiteFile) {
      alert('Veuillez télécharger votre pièce d\'identité');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData, kbisFile, pieceIdentiteFile);
      router.push('/validation-attente');
    } catch (err) {
      alert('Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F7F0E0' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-2 px-6 py-4 rounded-xl" style={{ backgroundColor: '#235730' }}>
            <Image 
              src="/images/logo-mishki.png" 
              alt="Mishki B2B" 
              width={140} 
              height={50}
              className="object-contain"
            />
          </div>
          <h1 className="text-gray-900 mb-2">Inscription Professionnelle</h1>
          <p className="text-gray-600">Créez votre compte B2B avec tarifs HT et remises exclusives</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" style={{ color: '#235730' }} />
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Marie"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informations de connexion */}
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" style={{ color: '#235730' }} />
                Informations de connexion
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email professionnel *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@votrespa.fr"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Mot de passe *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Confirmer le mot de passe *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Informations entreprise */}
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" style={{ color: '#235730' }} />
                Informations entreprise
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Raison sociale *</label>
                    <input
                      type="text"
                      name="societe"
                      value={formData.societe}
                      onChange={handleChange}
                      placeholder="Spa Beauté Paris"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">SIRET *</label>
                    <input
                      type="text"
                      name="siret"
                      value={formData.siret}
                      onChange={handleChange}
                      placeholder="123 456 789 00012"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Type d'activité *</label>
                    <select
                      name="typeActivite"
                      value={formData.typeActivite}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Sélectionner...</option>
                      <option value="spa">Spa</option>
                      <option value="institut">Institut de beauté</option>
                      <option value="salon">Salon de coiffure</option>
                      <option value="centre">Centre de bien-être</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="01 23 45 67 89"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Adresse *</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    placeholder="123 rue de la Beauté"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Code postal *</label>
                    <input
                      type="text"
                      name="codePostal"
                      value={formData.codePostal}
                      onChange={handleChange}
                      placeholder="75001"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Ville *</label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      placeholder="Paris"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: '#235730' }} />
                Documents
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">KBIS *</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleKbisUpload}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Pièce d'identité *</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handlePieceIdentiteUpload}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Avantages B2B */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
              <h4 className="text-gray-900 mb-4">Vos avantages B2B :</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Prix HT affichés
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Remises professionnelles
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Protocoles et fiches techniques
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Réassort automatique
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  PLV et visuels marketing
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  Support dédié
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptConditions}
                  onChange={(e) => setAcceptConditions(e.target.checked)}
                  className="w-5 h-5 border-gray-300 rounded mt-0.5 flex-shrink-0"
                  style={{ accentColor: '#235730' }}
                  required
                />
                <span className="text-sm text-gray-600">
                  J'accepte les{' '}
                  <a href="#" className="hover:underline" style={{ color: '#235730' }}>
                    conditions générales de vente
                  </a>{' '}
                  et la{' '}
                  <a href="#" className="hover:underline" style={{ color: '#235730' }}>
                    politique de confidentialité
                  </a>
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 text-white py-3 rounded-lg transition-all disabled:opacity-50"
                style={{ backgroundColor: '#235730' }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#1a4023')}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#235730')}
              >
                {isLoading ? 'Inscription en cours...' : 'Créer mon compte professionnel'}
              </button>
              <Link
                href="/login"
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Votre compte sera validé sous 24-48h après vérification de vos documents</p>
        </div>
      </div>
    </div>
  );
}
