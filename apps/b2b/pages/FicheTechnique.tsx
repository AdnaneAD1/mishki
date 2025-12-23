'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  CheckCircle2,
  Download,
  Printer,
  Shield,
  Droplets,
  FlaskConical,
  Beaker,
} from 'lucide-react';
import { useFicheB2B } from '../hooks/useProtocolesB2B';

export default function FicheTechnique() {
  const t = useTranslations('b2b.technical_sheet');
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { fiche, loading, error } = useFicheB2B(id);

  if (loading) {
    return <p className="text-gray-600">{t('loading') || 'Chargement...'}</p>;
  }

  if (error || !fiche) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error || 'Fiche introuvable'}</p>
        <button
          onClick={() => router.push('/pro/protocoles')}
          className="px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: '#235730' }}
        >
          {t('back_btn')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/pro/protocoles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('back_btn')}
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="aspect-[21/9] bg-gray-100 overflow-hidden">
          <Image
            src={fiche.image}
            alt={fiche.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
                {t('badge')}
              </span>
              <h1 className="text-gray-900 mb-2">{fiche.title}</h1>
              <p className="text-gray-600">{fiche.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                <Download className="w-5 h-5" />
                {t('btn_download')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                <Printer className="w-5 h-5" />
                {t('btn_print')}
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <Shield className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.reference')}</p>
              <p className="text-gray-900 font-medium">{fiche.reference}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <Droplets className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.volume')}</p>
              <p className="text-gray-900 font-medium">{fiche.volume}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <FlaskConical className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.category')}</p>
              <p className="text-gray-900 font-medium">{fiche.category}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <Clock className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.duration')}</p>
              <p className="text-gray-900 font-medium">{fiche.utilisation.temps}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Actifs & Propriétés */}
        <div className="lg:col-span-2 space-y-6">
          {/* Actifs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-blue-600" />
              {t('assets.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fiche.actifs.map((actif, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-blue-700 font-medium mb-1">{actif.nom}</h4>
                  <p className="text-sm text-gray-600">{actif.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Propriétés */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              {t('properties.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fiche.proprietes.map((prop, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700 bg-blue-50/50 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">{prop}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilisation */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">{t('usage.title')}</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium">{t('usage.frequency')}</h4>
                  <p className="text-sm text-gray-600">{fiche.utilisation.frequence}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium">{t('usage.method')}</h4>
                  <p className="text-sm text-gray-600">{fiche.utilisation.methode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Caractéristiques & Avis */}
        <div className="space-y-6">
          {/* Caractéristiques */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">{t('specs.title')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-bottom border-gray-100">
                <span className="text-sm text-gray-600">{t('specs.texture')}</span>
                <span className="text-sm font-medium text-gray-900">{fiche.caracteristiques.texture}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-bottom border-gray-100">
                <span className="text-sm text-gray-600">{t('specs.smell')}</span>
                <span className="text-sm font-medium text-gray-900">{fiche.caracteristiques.odeur}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-bottom border-gray-100">
                <span className="text-sm text-gray-600">{t('specs.ph')}</span>
                <span className="text-sm font-medium text-gray-900">{fiche.caracteristiques.ph}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">{t('specs.paot')}</span>
                <span className="text-sm font-medium text-gray-900">{fiche.caracteristiques.conservation}</span>
              </div>
            </div>
          </div>

          {/* Expert Note */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
            <Sparkles className="w-8 h-8 mb-4 text-blue-200" />
            <h3 className="text-lg font-bold mb-2">{t('expert.title')}</h3>
            <p className="text-blue-50 text-sm leading-relaxed italic">
              &quot;{fiche.avis_experts}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build
export async function getServerSideProps() {
  return { props: {} };
}
