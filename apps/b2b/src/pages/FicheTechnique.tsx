'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Users, Package, CheckCircle2, Download, Printer } from 'lucide-react';

const mockFiche = {
  id: '1',
  titre: 'Soin Anti-Âge Complet',
  reference: 'FT-AAC-001',
  categorie: 'Visage',
  duree: '60 min',
  niveau: 'Avancé',
  objectif: 'Réduire les signes de l\'âge et raffermir la peau',
  image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=400&fit=crop',
  produits: [
    { nom: 'Crème Visage Pro', reference: 'CV-PRO-001', quantite: '2 noisettes' },
    { nom: 'Sérum Anti-âge', reference: 'SA-PRO-002', quantite: '3-4 gouttes' },
    { nom: 'Masque Purifiant', reference: 'MP-PUR-005', quantite: '1 couche fine' },
    { nom: 'Lotion Tonique', reference: 'LT-TON-006', quantite: '2 applications' },
  ],
  etapes: [
    {
      numero: 1,
      titre: 'Nettoyage & Préparation',
      duree: '5 min',
      description: 'Démaquillage en profondeur et préparation de la peau',
      gestes: [
        'Appliquer la lotion tonique sur coton',
        'Nettoyer le visage en mouvements circulaires',
        'Sécher délicatement en tamponnant',
      ],
    },
    {
      numero: 2,
      titre: 'Gommage Enzymatique',
      duree: '10 min',
      description: 'Exfoliation douce pour éliminer les cellules mortes',
      gestes: [
        'Appliquer le gommage en évitant le contour des yeux',
        'Masser en mouvements circulaires ascendants',
        'Laisser poser 5 minutes',
        'Rincer à l\'eau tiède',
      ],
    },
    {
      numero: 3,
      titre: 'Application du Sérum',
      duree: '5 min',
      description: 'Pénétration des actifs anti-âge',
      gestes: [
        'Déposer 3-4 gouttes de sérum',
        'Chauffer entre les mains',
        'Appliquer par pressions sur visage et cou',
        'Faire pénétrer par effleurages',
      ],
    },
    {
      numero: 4,
      titre: 'Massage Liftant',
      duree: '20 min',
      description: 'Massage raffermissant et drainant',
      gestes: [
        'Appliquer la crème de massage',
        'Réaliser les manœuvres de lissage',
        'Effectuer les pressions drainantes',
        'Terminer par des effleurages relaxants',
      ],
    },
    {
      numero: 5,
      titre: 'Pose du Masque',
      duree: '15 min',
      description: 'Masque tenseur et repulpant',
      gestes: [
        'Appliquer le masque en couche épaisse',
        'Éviter le contour des yeux et des lèvres',
        'Laisser poser 15 minutes',
        'Retirer délicatement',
      ],
    },
    {
      numero: 6,
      titre: 'Finalisation',
      duree: '5 min',
      description: 'Application des soins de finition',
      gestes: [
        'Vaporiser la lotion tonique',
        'Appliquer le contour des yeux',
        'Masser la crème de jour',
        'Protéger avec SPF si besoin',
      ],
    },
  ],
  conseils: [
    'Adapter la pression selon la sensibilité de la peau',
    'Maintenir une température de cabine à 22-24°C',
    'Proposer une cure de 6 séances espacées de 2 semaines',
    'Recommander les produits de retail adaptés',
  ],
};

export default function FicheTechnique() {
  const { id } = useParams();
  const router = useRouter();

  // Mock data - in production, fetch from API
  const fiche = mockFiche;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/protocoles')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux protocoles
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="aspect-[21/9] bg-gray-100 overflow-hidden">
          <img
            src={fiche.image}
            alt={fiche.titre}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
                Fiche Technique
              </span>
              <h1 className="text-gray-900 mb-2">{fiche.titre}</h1>
              <p className="text-gray-600">{fiche.objectif}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors whitespace-nowrap"
                style={{ backgroundColor: '#235730' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
              >
                <Download className="w-5 h-5" />
                Télécharger PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors whitespace-nowrap"
                style={{ backgroundColor: '#235730' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
              >
                <Printer className="w-5 h-5" />
                Imprimer
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Clock className="w-5 h-5 mb-2" style={{ color: '#235730' }} />
              <p className="text-sm text-gray-600">Durée</p>
              <p className="text-gray-900">{fiche.duree}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Users className="w-5 h-5 mb-2" style={{ color: '#235730' }} />
              <p className="text-sm text-gray-600">Niveau</p>
              <p className="text-gray-900">{fiche.niveau}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Package className="w-5 h-5 mb-2" style={{ color: '#235730' }} />
              <p className="text-sm text-gray-600">Produits</p>
              <p className="text-gray-900">{fiche.produits.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 mb-2" style={{ color: '#235730' }} />
              <p className="text-sm text-gray-600">Catégorie</p>
              <p className="text-gray-900">{fiche.categorie}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Produits nécessaires</h2>
        <div className="space-y-3">
          {fiche.produits.map((produit, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="text-gray-900">{produit.nom}</p>
                <p className="text-sm text-gray-500">{produit.reference}</p>
              </div>
              <span className="text-sm text-gray-600">{produit.quantite}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Déroulé du protocole</h2>
        <div className="space-y-6">
          {fiche.etapes.map((etape) => (
            <div key={etape.numero} className="relative">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 text-white rounded-full flex items-center justify-center" style={{ backgroundColor: '#235730' }}>
                    {etape.numero}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900">{etape.titre}</h3>
                    <span className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap ml-4">
                      <Clock className="w-4 h-4" />
                      {etape.duree}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{etape.description}</p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900 mb-2">Gestes techniques :</p>
                    <ul className="space-y-2">
                      {etape.gestes.map((geste, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#235730' }} />
                          {geste}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {etape.numero < fiche.etapes.length && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conseils */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <h3 className="text-gray-900 mb-4">Conseils professionnels</h3>
        <ul className="space-y-3">
          {fiche.conseils.map((conseil, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              {conseil}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
