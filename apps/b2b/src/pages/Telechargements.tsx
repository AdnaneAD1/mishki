'use client';

import { useState } from 'react';
import { Download, Search, Filter, Heart, Image as ImageIcon, FileText, Video } from 'lucide-react';

interface Asset {
  id: string;
  titre: string;
  type: 'image' | 'pdf' | 'video';
  categorie: string;
  format: string;
  taille: string;
  url: string;
  isFavorite: boolean;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    titre: 'Affiche Promotionnelle Printemps 2025',
    type: 'image',
    categorie: 'PLV',
    format: 'JPG',
    taille: '2.4 MB',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    isFavorite: false,
  },
  {
    id: '2',
    titre: 'Catalogue Produits 2025',
    type: 'pdf',
    categorie: 'Catalogues',
    format: 'PDF',
    taille: '15.2 MB',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    isFavorite: true,
  },
  {
    id: '3',
    titre: 'Vidéo Tutoriel Massage Visage',
    type: 'video',
    categorie: 'Formations',
    format: 'MP4',
    taille: '45.8 MB',
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400',
    isFavorite: false,
  },
  {
    id: '4',
    titre: 'Bannière Web Anti-âge',
    type: 'image',
    categorie: 'Digital',
    format: 'PNG',
    taille: '1.2 MB',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    isFavorite: false,
  },
  {
    id: '5',
    titre: 'Présentoir Comptoir',
    type: 'image',
    categorie: 'PLV',
    format: 'JPG',
    taille: '3.1 MB',
    url: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400',
    isFavorite: true,
  },
  {
    id: '6',
    titre: 'Guide d\'utilisation Produits',
    type: 'pdf',
    categorie: 'Documentation',
    format: 'PDF',
    taille: '8.5 MB',
    url: 'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=400',
    isFavorite: false,
  },
  {
    id: '7',
    titre: 'Post Instagram - Nouveauté',
    type: 'image',
    categorie: 'Social Media',
    format: 'JPG',
    taille: '0.8 MB',
    url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400',
    isFavorite: false,
  },
  {
    id: '8',
    titre: 'Flyer Promotion Été',
    type: 'pdf',
    categorie: 'PLV',
    format: 'PDF',
    taille: '4.2 MB',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    isFavorite: false,
  },
];

export default function Telechargements() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');
  const [showFavorites, setShowFavorites] = useState(false);

  const types = ['Tous', 'Images', 'PDF', 'Vidéos'];
  const categories = ['Toutes', 'PLV', 'Digital', 'Catalogues', 'Social Media', 'Formations', 'Documentation'];

  const toggleFavorite = (id: string) => {
    setAssets(
      assets.map((asset) =>
        asset.id === id ? { ...asset, isFavorite: !asset.isFavorite } : asset
      )
    );
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'Tous' ||
      (selectedType === 'Images' && asset.type === 'image') ||
      (selectedType === 'PDF' && asset.type === 'pdf') ||
      (selectedType === 'Vidéos' && asset.type === 'video');
    const matchesCategorie =
      selectedCategorie === 'Toutes' || asset.categorie === selectedCategorie;
    const matchesFavorites = !showFavorites || asset.isFavorite;
    return matchesSearch && matchesType && matchesCategorie && matchesFavorites;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return ImageIcon;
      case 'pdf':
        return FileText;
      case 'video':
        return Video;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-700';
      case 'pdf':
        return 'bg-red-100 text-red-700';
      case 'video':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Téléchargements</h1>
        <p className="text-gray-600">
          PLV, visuels marketing et supports de communication professionnels
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
                placeholder="Rechercher un fichier..."
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
                {cat}
              </option>
            ))}
          </select>

          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              showFavorites
                ? 'bg-pink-100 text-pink-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
            Favoris
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total fichiers</p>
          <p className="text-2xl text-gray-900">{assets.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Images</p>
          <p className="text-2xl text-gray-900">
            {assets.filter((a) => a.type === 'image').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">PDF</p>
          <p className="text-2xl text-gray-900">
            {assets.filter((a) => a.type === 'pdf').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Favoris</p>
          <p className="text-2xl text-gray-900">
            {assets.filter((a) => a.isFavorite).length}
          </p>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredAssets.length} fichier{filteredAssets.length > 1 ? 's' : ''} trouvé
          {filteredAssets.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => {
          const TypeIcon = getTypeIcon(asset.type);
          return (
            <div
              key={asset.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden relative">
                <img
                  src={asset.url}
                  alt={asset.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(asset.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors shadow-lg"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      asset.isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getTypeColor(
                      asset.type
                    )}`}
                  >
                    <TypeIcon className="w-3 h-3" />
                    {asset.format}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mb-2">
                  {asset.categorie}
                </span>
                <h3 className="text-sm text-gray-900 mb-2 line-clamp-2">{asset.titre}</h3>
                <p className="text-xs text-gray-500 mb-4">{asset.taille}</p>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: '#235730' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Aucun fichier trouvé</h3>
          <p className="text-gray-600 mb-4">Essayez de modifier vos filtres de recherche</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('Tous');
              setSelectedCategorie('Toutes');
              setShowFavorites(false);
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

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-gray-900 mb-3">📌 Informations importantes</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Tous les fichiers sont en haute résolution et prêts à l'impression
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Les PLV sont personnalisables avec votre logo (contactez le support)
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Nouveaux contenus ajoutés régulièrement
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Utilisez les favoris pour accéder rapidement à vos fichiers préférés
          </li>
        </ul>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build
export async function getServerSideProps() {
  return { props: {} };
}
