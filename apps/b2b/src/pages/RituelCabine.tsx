'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Sparkles, CheckCircle2, Download, Printer } from 'lucide-react';

const mockRituel = {
  id: '2',
  titre: 'Rituel Hydratation Divine',
  reference: 'RC-HYD-002',
  categorie: 'Visage',
  duree: '45 min',
  theme: 'Hydratation & Éclat',
  ambiance: 'Zen & Cocooning',
  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=400&fit=crop',
  introduction: 'Un rituel dédié à l\'hydratation profonde de la peau pour retrouver éclat et souplesse. Une expérience sensorielle complète.',
  preparation: {
    cabine: [
      'Température : 22-24°C',
      'Lumière tamisée ou bougies LED',
      'Diffusion d\'huiles essentielles d\'agrumes',
      'Musique douce type spa',
    ],
    materiel: [
      'Serviettes chaudes',
      'Compresses tièdes',
      'Bols pour préparations',
      'Spatule et pinceau',
    ],
    produits: [
      'Lait démaquillant',
      'Lotion tonique',
      'Gommage doux enzymatique',
      'Sérum hydratant',
      'Masque hydratation intense',
      'Crème confort',
    ],
  },
  deroulement: [
    {
      phase: 'Accueil & Installation',
      duree: '5 min',
      description: 'Création de l\'ambiance et mise en confiance',
      actions: [
        'Accueillir la cliente avec une tisane relaxante',
        'Expliquer le déroulement du rituel',
        'Installer confortablement sur la table de soin',
        'Placer des protections et bande à cheveux',
      ],
    },
    {
      phase: 'Rituel d\'Ouverture',
      duree: '3 min',
      description: 'Connexion et respiration',
      actions: [
        'Placer les mains sur les épaules',
        'Inviter à 3 respirations profondes',
        'Effectuer des pressions douces sur les épaules',
        'Créer une intention de détente',
      ],
    },
    {
      phase: 'Nettoyage Sensoriel',
      duree: '7 min',
      description: 'Démaquillage et purification',
      actions: [
        'Appliquer le lait démaquillant en mouvements enveloppants',
        'Retirer avec des compresses tièdes parfumées',
        'Vaporiser la lotion tonique en fine brume',
        'Sécher en tamponnant délicatement',
      ],
    },
    {
      phase: 'Exfoliation Lumière',
      duree: '8 min',
      description: 'Gommage pour révéler l\'éclat',
      actions: [
        'Appliquer le gommage enzymatique au pinceau',
        'Masser en mouvements circulaires doux',
        'Laisser poser 3-4 minutes',
        'Retirer avec des compresses humides',
      ],
    },
    {
      phase: 'Massage Hydratant',
      duree: '12 min',
      description: 'Massage profond du visage et décolleté',
      actions: [
        'Appliquer le sérum hydratant généreux',
        'Effectuer le massage drainant du décolleté',
        'Réaliser les manœuvres lissantes du visage',
        'Terminer par des pressions calmantes',
      ],
    },
    {
      phase: 'Pause Cocooning',
      duree: '10 min',
      description: 'Application du masque et relaxation',
      actions: [
        'Appliquer le masque hydratation en couche généreuse',
        'Placer des compresses fraîches sur les yeux',
        'Effectuer un massage des mains et bras',
        'Laisser la cliente se reposer',
      ],
    },
    {
      phase: 'Rituel de Fermeture',
      duree: '5 min',
      description: 'Retour en douceur et finalisation',
      actions: [
        'Retirer le masque délicatement',
        'Vaporiser une brume d\'eau florale',
        'Appliquer la crème confort en effleurages',
        'Effectuer des pressions sur les points énergétiques',
      ],
    },
  ],
  retail: [
    'Crème hydratante format maison',
    'Sérum hydratant voyage',
    'Masque hydratation à faire chez soi',
  ],
  notes: [
    'Adapter les textures selon le type de peau',
    'Maintenir un contact permanent avec la cliente',
    'Créer une ambiance olfactive personnalisée',
    'Proposer une tisane détox en fin de soin',
  ],
};

export default function RituelCabine() {
  const { id } = useParams();
  const router = useRouter();

  // Mock data - in production, fetch from API
  const rituel = mockRituel;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/protocoles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux protocoles
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="aspect-[21/9] bg-gray-100 overflow-hidden">
          <img
            src={rituel.image}
            alt={rituel.titre}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-3">
                Rituel Cabine
              </span>
              <h1 className="text-gray-900 mb-2">{rituel.titre}</h1>
              <p className="text-gray-600">{rituel.introduction}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                <Download className="w-5 h-5" />
                Télécharger PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                <Printer className="w-5 h-5" />
                Imprimer
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <Clock className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">Durée totale</p>
              <p className="text-gray-900">{rituel.duree}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Sparkles className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">Thème</p>
              <p className="text-gray-900">{rituel.theme}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Sparkles className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">Ambiance</p>
              <p className="text-gray-900">{rituel.ambiance}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">Catégorie</p>
              <p className="text-gray-900">{rituel.categorie}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Préparation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Préparation Cabine</h3>
          <ul className="space-y-2">
            {rituel.preparation.cabine.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Matériel</h3>
          <ul className="space-y-2">
            {rituel.preparation.materiel.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Produits</h3>
          <ul className="space-y-2">
            {rituel.preparation.produits.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Déroulement */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Déroulement du rituel</h2>
        <div className="space-y-8">
          {rituel.deroulement.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900">{phase.phase}</h3>
                      <p className="text-sm text-gray-600">{phase.description}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap ml-4">
                      <Clock className="w-4 h-4" />
                      {phase.duree}
                    </span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 mt-3">
                    <ul className="space-y-2">
                      {phase.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {index < rituel.deroulement.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Retail & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-gray-900 mb-4">💝 Produits Retail à proposer</h3>
          <ul className="space-y-2">
            {rituel.retail.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
          <h3 className="text-gray-900 mb-4">📝 Notes importantes</h3>
          <ul className="space-y-2">
            {rituel.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
