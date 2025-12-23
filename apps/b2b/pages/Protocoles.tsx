'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FileText, Download, Clock, Search, Filter, Eye } from 'lucide-react';
import { useProtocolesListB2B } from '../hooks/useProtocolesB2B';

export default function Protocoles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');
  const t = useTranslations('b2b.protocoles');
  const { items, categories: catList, loading, error } = useProtocolesListB2B();

  const types = ['Tous', 'Fiche Technique', 'Rituel Cabine'];
  const categories = useMemo(
    () => ['Toutes', ...catList.filter(Boolean)],
    [catList]
  );

  const filteredProtocoles = items.filter((protocole) => {
    const matchesSearch = (protocole.title || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'Tous' ||
      (selectedType === 'Fiche Technique' && protocole.type === 'fiche') ||
      (selectedType === 'Rituel Cabine' && protocole.type === 'rituel');
    const matchesCategorie =
      selectedCategorie === 'Toutes' || protocole.category === selectedCategorie;
    return matchesSearch && matchesType && matchesCategorie;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">
          {t('subtitle')}
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
                {type === 'Tous' ? t('filter_all_types') :
                  type === 'Fiche Technique' ? t('type_fiche') : t('type_rituel')}
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
                {cat === 'Toutes' ? t('filter_all_cats') : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {t('results_count', { count: filteredProtocoles.length })}
        </p>
      </div>

      {/* Protocoles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p className="text-gray-500">{t('loading') || 'Chargement...'}</p>}
        {error && <p className="text-red-600">{error}</p>}
        {filteredProtocoles.map((protocole) => (
          <div
            key={protocole.slug}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="aspect-video bg-gray-100 overflow-hidden relative">
              <Image
                src={protocole.image}
                alt={protocole.title}
                width={800}
                height={450}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${protocole.type === 'fiche'
                    ? 'bg-blue-600'
                    : 'bg-purple-600'
                    }`}
                >
                  {protocole.type === 'fiche' ? t('type_fiche') : t('type_rituel')}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {protocole.category || t('filter_all_cats')}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {protocole.duration || '-'}
                </span>
              </div>

              <h3 className="text-gray-900 mb-2">{protocole.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{protocole.description}</p>

              <div className="flex gap-2">
                <Link
                  href={`/pro/protocoles/${protocole.type}/${protocole.slug}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: '#235730' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
                >
                  <Eye className="w-4 h-4" />
                  {t('btn_consult')}
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
          <h3 className="text-gray-900 mb-2">{t('no_results')}</h3>
          <p className="text-gray-600 mb-4">
            {t('no_results_desc')}
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
            {t('reset_filters')}
          </button>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <FileText className="w-8 h-8 mb-3" style={{ color: '#235730' }} />
          <h3 className="text-gray-900 mb-2">{t('cards.fiches_title')}</h3>
          <p className="text-sm text-gray-600">
            {t('cards.fiches_desc')}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <FileText className="w-8 h-8 mb-3" style={{ color: '#235730' }} />
          <h3 className="text-gray-900 mb-2">{t('cards.rituels_title')}</h3>
          <p className="text-sm text-gray-600">
            {t('cards.rituels_desc')}
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
