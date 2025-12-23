'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Clock, Sparkles, CheckCircle2, Download, Printer } from 'lucide-react';
import { useRituelB2B } from '../hooks/useProtocolesB2B';

export default function RituelCabine() {
  const t = useTranslations('b2b.cabinet_ritual');
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { rituel, loading, error } = useRituelB2B(id);

  if (loading) {
    return <p className="text-gray-600">{t('loading') || 'Chargement...'}</p>;
  }

  if (error || !rituel) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error || 'Rituel introuvable'}</p>
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
            src={rituel.image}
            alt={rituel.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-3">
                {t('badge')}
              </span>
              <h1 className="text-gray-900 mb-2">{rituel.title}</h1>
              <p className="text-gray-600">{rituel.introduction}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                <Download className="w-5 h-5" />
                {t('btn_download')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                <Printer className="w-5 h-5" />
                {t('btn_print')}
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <Clock className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.duration')}</p>
              <p className="text-gray-900">{rituel.duration}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Sparkles className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.theme')}</p>
              <p className="text-gray-900">{rituel.theme}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Sparkles className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.ambiance')}</p>
              <p className="text-gray-900">{rituel.ambiance}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600">{t('stats.category')}</p>
              <p className="text-gray-900">{rituel.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Préparation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">{t('prep.cabine')}</h3>
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
          <h3 className="text-gray-900 mb-4">{t('prep.materiel')}</h3>
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
          <h3 className="text-gray-900 mb-4">{t('prep.produits')}</h3>
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
        <h2 className="text-gray-900 mb-6">{t('steps.title')}</h2>
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
          <h3 className="text-gray-900 mb-4">{t('footer.retail_title')}</h3>
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
          <h3 className="text-gray-900 mb-4">{t('footer.notes_title')}</h3>
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

// Force SSR pour éviter les erreurs de build
export async function getServerSideProps() {
  return { props: {} };
}
