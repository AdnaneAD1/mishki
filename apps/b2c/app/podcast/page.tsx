'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play, Clock, Headphones, Calendar } from 'lucide-react'
import { Button } from '@/apps/b2c/components/ui/button'
import { Header } from '@/apps/b2c/components/header'
import { Footer } from '@/apps/b2c/components/footer'
import { NewsletterSection } from '@/apps/b2c/components/newsletter-section'
import { useTranslations } from 'next-intl'
import { usePodcasts } from '@/apps/b2c/hooks/usePodcasts'

export default function PodcastPage() {
  const t = useTranslations('b2c.podcast')
  const { episodes, loading, error } = usePodcasts()

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt={t('title')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#235730]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-white text-4xl md:text-6xl" style={{ fontFamily: 'var(--font-caveat)' }}>
                {t('title')}
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image src="/b2c/akar-icons_arrow-back.svg" alt={t('back')} width={32} height={32} />
            </Link>
            <h2 className="text-[#235730] mb-2" style={{ fontFamily: 'var(--font-caveat)', fontSize: '48px', fontWeight: 400 }}>
              {t('heading')}
            </h2>
            <div className="w-full h-[1px] bg-[#235730]"></div>
          </div>

          <div className="mb-12 bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <Headphones className="w-10 h-10 text-[#235730]" />
              <div>
                <h3 className="text-xl font-semibold text-[#2d2d2d]">{t('info.title')}</h3>
                <p className="text-gray-500">{t('info.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              {t('info.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm">
                {t('info.spotify')}
              </Button>
              <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm">
                {t('info.apple')}
              </Button>
            </div>
          </div>

          {loading && (
            <div className="py-12 text-center text-gray-600">{t('loading') ?? 'Chargement...'}</div>
          )}
          {error && !loading && (
            <div className="py-12 text-center text-red-600">{error}</div>
          )}
          {!loading && !error && episodes.length === 0 && (
            <div className="py-12 text-center text-gray-600">{t('empty') ?? 'Aucun épisode.'}</div>
          )}

          <div className="space-y-6">
            {episodes.map((episode) => (
              <div key={episode.slug} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                  <div className="relative h-48 md:h-full">
                    <Image src={episode.image} alt={episode.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button className="w-16 h-16 bg-[#235730] rounded-full flex items-center justify-center hover:bg-[#1d4626] transition-colors">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {episode.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {episode.duration}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl text-[#2d2d2d] mb-2">
                      {episode.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {episode.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#235730]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#235730] font-semibold text-sm">
                          {episode.guest.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#2d2d2d]">{episode.guest}</p>
                        <p className="text-xs text-gray-500">{episode.guest_title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
