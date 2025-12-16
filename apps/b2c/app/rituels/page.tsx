import Image from 'next/image'
import Link from 'next/link'
import { Clock, Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

const rituals = [
  {
    id: 1,
    title: 'Rituel du Matin',
    subtitle: 'Reveil Lumineux',
    description: 'Commencez votre journee avec un rituel revitalisant qui eveille votre peau et lui donne eclat et energie pour affronter la journee.',
    duration: '15 min',
    difficulty: 'Facile',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: ['Nettoyage doux', 'Tonique revitalisant', 'Serum hydratant', 'Creme de jour'],
    products: [1, 3]
  },
  {
    id: 2,
    title: 'Rituel du Soir',
    subtitle: 'Regeneration Nocturne',
    description: 'Un rituel apaisant pour preparer votre peau au renouvellement cellulaire nocturne et vous offrir un moment de detente.',
    duration: '20 min',
    difficulty: 'Facile',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: ['Demaquillage', 'Nettoyage profond', 'Huile nourrissante', 'Creme de nuit'],
    products: [2, 3]
  },
  {
    id: 3,
    title: 'Rituel Hebdomadaire',
    subtitle: 'Soin Intensif',
    description: 'Offrez a votre peau un soin complet une fois par semaine pour maintenir son eclat et sa sante a long terme.',
    duration: '45 min',
    difficulty: 'Intermediaire',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: ['Gommage doux', 'Bain de vapeur', 'Masque purifiant', 'Massage facial', 'Serum intensif'],
    products: [1, 2, 4]
  },
  {
    id: 4,
    title: 'Rituel Detox',
    subtitle: 'Purification Profonde',
    description: 'Un rituel de detoxification pour eliminer les impuretes et redonner a votre peau tout son eclat naturel.',
    duration: '30 min',
    difficulty: 'Intermediaire',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: ['Nettoyage en profondeur', 'Exfoliation', 'Masque detox', 'Hydratation intense'],
    products: [1, 4]
  }
]

export default function RituelsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Rituels Mishki"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#235730]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <Image
                src="/mishkilogo_w_2.png"
                alt="Mishki"
                width={150}
                height={75}
                className="mb-4 drop-shadow-lg"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
              />
              <h1 className="text-white text-4xl md:text-6xl" style={{ fontFamily: 'var(--font-caveat)' }}>
                Nos Rituels
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Decouvrez nos rituels de beaute inspires des traditions peruviennes pour une peau rayonnante
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image src="/akar-icons_arrow-back.svg" alt="Retour" width={32} height={32} />
            </Link>
            <h2 className="text-[#235730] mb-2" style={{ fontFamily: 'var(--font-caveat)', fontSize: '48px', fontWeight: 400 }}>
              Rituels de Beaute
            </h2>
            <div className="w-full h-[1px] bg-[#235730]"></div>
          </div>

          <div className="space-y-12">
            {rituals.map((ritual, index) => (
              <div
                key={ritual.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`relative h-[300px] md:h-[400px] rounded-lg overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image src={ritual.image} alt={ritual.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-[#235730] text-sm font-medium uppercase tracking-wide">
                      {ritual.subtitle}
                    </span>
                    <h3 className="text-3xl font-semibold text-[#2d2d2d] mt-2" style={{ fontFamily: 'var(--font-caveat)' }}>
                      {ritual.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {ritual.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-[#235730]" />
                      {ritual.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Sparkles className="w-4 h-4 text-[#235730]" />
                      {ritual.difficulty}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#2d2d2d] mb-3">Etapes du rituel:</h4>
                    <ol className="space-y-2">
                      {ritual.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="w-6 h-6 bg-[#235730] text-white rounded-full flex items-center justify-center text-xs">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-4">
                    <Link href={`/rituels/${ritual.id}`}>
                      <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm">
                        <Heart className="w-4 h-4 mr-2" />
                        Decouvrir ce rituel
                      </Button>
                    </Link>
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
