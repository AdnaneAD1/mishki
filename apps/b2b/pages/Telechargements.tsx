'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Download, Search, Filter, Heart, Image as ImageIcon, FileText, Video } from 'lucide-react';
import { useDownloadsB2B } from '../hooks/useDownloadsB2B';

export default function Telechargements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showFavorites, setShowFavorites] = useState(false);
  const t = useTranslations('b2b.downloads_page');
  const { assets, categories, loading, error } = useDownloadsB2B();

  const types = ['Tous', 'Images', 'PDF', 'Vidéos'];
  const categoriesWithAll = useMemo(() => ['Toutes', ...categories], [categories]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const normalizedAssets = useMemo(
    () =>
      assets.map((asset) => ({
        ...asset,
        isFavorite: favorites[asset.slug] || false,
        titre: asset.title,
        categorie: asset.category,
        taille: asset.size,
      })),
    [assets, favorites]
  );

  const filteredAssets = normalizedAssets.filter((asset) => {
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-700">{t('loading', { defaultMessage: 'Chargement...' })}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-6 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2 text-lg md:text-xl lg:text-2xl">{t('title')}</h1>
        <p className="text-xs md:text-sm text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
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
                {type === 'Tous' ? t('filter_all_types') : type}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategorie}
            onChange={(e) => setSelectedCategorie(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categoriesWithAll.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${showFavorites
              ? 'bg-pink-100 text-pink-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
            {t('filter_favorites')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.total')}</p>
          <p className="text-2xl text-gray-900">{normalizedAssets.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.images')}</p>
          <p className="text-2xl text-gray-900">
            {normalizedAssets.filter((a) => a.type === 'image').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.pdf')}</p>
          <p className="text-2xl text-gray-900">
            {normalizedAssets.filter((a) => a.type === 'pdf').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.favorites')}</p>
          <p className="text-2xl text-gray-900">
            {normalizedAssets.filter((a) => a.isFavorite).length}
          </p>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {t('results_count', { count: filteredAssets.length })}
        </p>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => {
          const TypeIcon = getTypeIcon(asset.type);
          return (
            <div
              key={asset.slug}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden relative">
                <Image
                  src={asset.url}
                  alt={asset.titre}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(asset.slug)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors shadow-lg"
                >
                  <Heart
                    className={`w-4 h-4 ${asset.isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'
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
                  {t('btn_download')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">{t('no_results')}</h3>
          <p className="text-gray-600 mb-4">{t('no_results_desc')}</p>
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
            {t('reset_filters')}
          </button>
        </div>
      )}

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-gray-900 mb-3">{t('info.title')}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            {t('info.line1')}
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            {t('info.line2')}
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            {t('info.line3')}
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            {t('info.line4')}
          </li>
        </ul>
      </div>
    </div>
  );
}
