'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Clock, Search, Filter, Eye } from 'lucide-react';

interface Protocole {
  id: string;
  titre: string;
  type: 'fiche' | 'rituel';
  categorie: string;
  duree: string;
  description: string;
  image: string;
}

const mockProtocoles: Protocole[] = [
  {
    id: '1',
    titre: 'Soin Visage Anti-Âge Premium',
    type: 'fiche',
    categorie: 'Visage',
    duree: '60 min',
    description: 'Protocole complet de soin anti-âge avec protocoles détaillés',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
  },
  {
    id: '2',
    titre: 'Rituel Cabine Hydratation',
    type: 'rituel',
    categorie: 'Visage',
    duree: '45 min',
    description: 'Rituel cabine pour soin hydratation profonde',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
  },
  {
    id: '3',
    titre: 'Massage Relaxant Corps',
    type: 'fiche',
    categorie: 'Corps',
    duree: '90 min',
    description: 'Fiche technique massage relaxant corps complet',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400',
  },
  {
    id: '4',
    titre: 'Rituel Gommage & Enveloppement',
    type: 'rituel',
    categorie: 'Corps',
    duree: '75 min',
    description: 'Rituel spa gommage et enveloppement corporel',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
  },
  {
    id: '5',
    titre: 'Soin Purifiant Peaux Mixtes',
    type: 'fiche',
    categorie: 'Visage',
    duree: '50 min',
    description: 'Protocole de soin pour peaux mixtes à grasses',
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400',
  },
  {
    id: '6',
    titre: 'Rituel Détente Express',
    type: 'rituel',
    categorie: 'Express',
    duree: '30 min',
    description: 'Rituel rapide pour pause détente',
    image: 'https://images.unsplash.com/photo-1559599238-1c2e1a1c1045?w=400',
  },
];

export default function Protocoles() {
  const [protocoles] = useState<Protocole[]>(mockProtocoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');

  const types = ['Tous', 'Fiche Technique', 'Rituel Cabine'];
  const categories = ['Toutes', 'Visage', 'Corps', 'Express'];

  const filteredProtocoles = protocoles.filter((protocole) => {
    const matchesSearch = protocole.titre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'Tous' ||
      (selectedType === 'Fiche Technique' && protocole.type === 'fiche') ||
      (selectedType === 'Rituel Cabine' && protocole.type === 'rituel');
    const matchesCategorie =
      selectedCategorie === 'Toutes' || protocole.categorie === selectedCategorie;
    return matchesSearch && matchesType && matchesCategorie;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Protocoles & Rituels</h1>
        <p className="text-gray-600">
          Fiches techniques détaillées et rituels cabine professionnels
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un protocole..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategorie}
            onChange={(e) => setSelectedCategorie(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'Toutes' ? 'Toutes catégories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredProtocoles.length} protocole{filteredProtocoles.length > 1 ? 's' : ''}{' '}
          disponible{filteredProtocoles.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Protocoles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProtocoles.map((protocole) => (
          <div
            key={protocole.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="aspect-video bg-gray-100 overflow-hidden relative">
              <img
                src={protocole.image}
                alt={protocole.titre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${
                    protocole.type === 'fiche'
                      ? 'bg-blue-600'
                      : 'bg-purple-600'
                  }`}
                >
                  {protocole.type === 'fiche' ? 'Fiche Technique' : 'Rituel Cabine'}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {protocole.categorie}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {protocole.duree}
                </span>
              </div>

              <h3 className="text-gray-900 mb-2">{protocole.titre}</h3>
              <p className="text-sm text-gray-600 mb-4">{protocole.description}</p>

              <div className="flex gap-2">
                <Link
                  href={`/protocoles/${protocole.type}/${protocole.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: '#235730' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
                >
                  <Eye className="w-4 h-4" />
                  Consulter
                </Link>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProtocoles.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Aucun protocole trouvé</h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('Tous');
              setSelectedCategorie('Toutes');
            }}
            className="px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#235730' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <FileText className="w-8 h-8 mb-3" style={{ color: '#235730' }} />
          <h3 className="text-gray-900 mb-2">Fiches Techniques</h3>
          <p className="text-sm text-gray-600">
            Protocoles détaillés avec produits, gestes et timing pour chaque soin
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <FileText className="w-8 h-8 mb-3" style={{ color: '#235730' }} />
          <h3 className="text-gray-900 mb-2">Rituels Cabine</h3>
          <p className="text-sm text-gray-600">
            Déroulés complets de soins pour vos prestations spa et institut
          </p>
        </div>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build
export async function getServerSideProps() {
  return { props: {} };
}
