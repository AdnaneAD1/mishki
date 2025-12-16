import Image from 'next/image'
import Link from 'next/link'
import { Clock, Sparkles, Heart, CheckCircle, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'
import { notFound } from 'next/navigation'

const rituals = [
  {
    id: 1,
    title: 'Rituel du Matin',
    subtitle: 'Reveil Lumineux',
    description: 'Commencez votre journee avec un rituel revitalisant qui eveille votre peau et lui donne eclat et energie pour affronter la journee.',
    fullDescription: 'Ce rituel matinal est concu pour preparer votre peau a affronter les agressions quotidiennes. En suivant ces etapes simples mais efficaces, vous offrez a votre peau une protection optimale tout en stimulant son eclat naturel. Les ingredients actifs de nos produits travaillent en synergie pour hydrater, proteger et illuminer votre teint.',
    duration: '15 min',
    difficulty: 'Facile',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1600',
    steps: [
      { name: 'Nettoyage doux', description: 'Commencez par nettoyer delicatement votre visage avec notre savon exfoliant pour eliminer les impuretes de la nuit.' },
      { name: 'Tonique revitalisant', description: 'Appliquez le tonique pour equilibrer le pH de votre peau et la preparer aux soins suivants.' },
      { name: 'Serum hydratant', description: 'Massez quelques gouttes de notre huile de beaute pour nourrir en profondeur.' },
      { name: 'Creme de jour', description: 'Terminez avec votre creme hydratante pour sceller l\'hydratation et proteger votre peau.' }
    ],
    products: [
      { id: 1, name: 'Gommage corps', price: 24, image: '/produit-1.png' },
      { id: 3, name: 'Huile de beaute', price: 24, image: '/produit-3.png' }
    ],
    tips: [
      'Effectuez ce rituel chaque matin pour des resultats optimaux',
      'Prenez le temps de masser votre visage pour stimuler la circulation',
      'Attendez quelques minutes entre chaque etape pour une meilleure absorption'
    ]
  },
  {
    id: 2,
    title: 'Rituel du Soir',
    subtitle: 'Regeneration Nocturne',
    description: 'Un rituel apaisant pour preparer votre peau au renouvellement cellulaire nocturne et vous offrir un moment de detente.',
    fullDescription: 'La nuit est le moment ideal pour la regeneration de votre peau. Ce rituel du soir vous aide a eliminer toutes les impuretes accumulees durant la journee et a preparer votre peau pour sa phase de reparation nocturne. Les actifs de nos soins travaillent pendant votre sommeil pour une peau regeneree au reveil.',
    duration: '20 min',
    difficulty: 'Facile',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1600',
    steps: [
      { name: 'Demaquillage', description: 'Retirez tout maquillage et impuretes avec notre huile demaquillante douce.' },
      { name: 'Nettoyage profond', description: 'Utilisez notre savon exfoliant pour un nettoyage en profondeur.' },
      { name: 'Huile nourrissante', description: 'Appliquez generusement notre huile de beaute pour nourrir intensement.' },
      { name: 'Creme de nuit', description: 'Scellez avec une creme riche pour une hydratation nocturne optimale.' }
    ],
    products: [
      { id: 2, name: 'Savon exfoliant', price: 12, image: '/produit-2.png' },
      { id: 3, name: 'Huile de beaute', price: 24, image: '/produit-3.png' }
    ],
    tips: [
      'Effectuez ce rituel au moins 30 minutes avant le coucher',
      'Profitez de ce moment pour vous detendre et decompresser',
      'Changez regulierement vos taies d\'oreiller pour une peau saine'
    ]
  },
  {
    id: 3,
    title: 'Rituel Hebdomadaire',
    subtitle: 'Soin Intensif',
    description: 'Offrez a votre peau un soin complet une fois par semaine pour maintenir son eclat et sa sante a long terme.',
    fullDescription: 'Ce rituel hebdomadaire est un veritable moment de spa a domicile. Il permet d\'effectuer un nettoyage en profondeur et de traiter votre peau avec des soins intensifs. En le pratiquant regulierement, vous maintenez l\'eclat et la jeunesse de votre peau sur le long terme.',
    duration: '45 min',
    difficulty: 'Intermediaire',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600',
    steps: [
      { name: 'Gommage doux', description: 'Exfoliez votre peau avec notre gommage corps pour eliminer les cellules mortes.' },
      { name: 'Bain de vapeur', description: 'Ouvrez vos pores avec un bain de vapeur de 5 minutes.' },
      { name: 'Masque purifiant', description: 'Appliquez notre masque en poudre et laissez poser 15 minutes.' },
      { name: 'Massage facial', description: 'Massez votre visage avec notre huile pour stimuler la circulation.' },
      { name: 'Serum intensif', description: 'Terminez avec un serum concentre pour des resultats visibles.' }
    ],
    products: [
      { id: 1, name: 'Gommage corps', price: 24, image: '/produit-1.png' },
      { id: 2, name: 'Savon exfoliant', price: 12, image: '/produit-2.png' },
      { id: 4, name: 'Lotion de definition', price: 22, image: '/produit-4.png' }
    ],
    tips: [
      'Reservez ce moment pour le week-end quand vous avez plus de temps',
      'Creez une ambiance relaxante avec de la musique douce',
      'Hydratez-vous bien avant et apres ce rituel'
    ]
  },
  {
    id: 4,
    title: 'Rituel Detox',
    subtitle: 'Purification Profonde',
    description: 'Un rituel de detoxification pour eliminer les impuretes et redonner a votre peau tout son eclat naturel.',
    fullDescription: 'Exposee a la pollution, au stress et aux agressions quotidiennes, votre peau a besoin d\'une detoxification reguliere. Ce rituel elimine en profondeur toutes les toxines accumulees et permet a votre peau de retrouver son equilibre naturel et son eclat d\'origine.',
    duration: '30 min',
    difficulty: 'Intermediaire',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1600',
    steps: [
      { name: 'Nettoyage en profondeur', description: 'Double nettoyage pour eliminer toutes les impuretes.' },
      { name: 'Exfoliation', description: 'Gommage doux pour desincruster les pores.' },
      { name: 'Masque detox', description: 'Application d\'un masque purifiant a base d\'argile.' },
      { name: 'Hydratation intense', description: 'Serum et creme pour restaurer l\'hydratation.' }
    ],
    products: [
      { id: 1, name: 'Gommage corps', price: 24, image: '/produit-1.png' },
      { id: 4, name: 'Lotion de definition', price: 22, image: '/produit-4.png' }
    ],
    tips: [
      'Idealement a faire apres une periode de stress ou d\'exces',
      'Buvez beaucoup d\'eau pour accompagner la detox',
      'Evitez le maquillage pendant 24h apres ce rituel'
    ]
  }
]

export function generateStaticParams() {
  return rituals.map((ritual) => ({
    id: ritual.id.toString(),
  }))
}

export default function RitualDetailPage({ params }: { params: { id: string } }) {
  const ritual = rituals.find(r => r.id === parseInt(params.id))

  if (!ritual) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[450px] w-full pt-16 md:pt-20">
          <Image
            src={ritual.image}
            alt={ritual.title}
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
              <span className="text-white/90 text-sm uppercase tracking-wide">{ritual.subtitle}</span>
              <h1 className="text-white text-4xl md:text-6xl mt-2" style={{ fontFamily: 'var(--font-caveat)' }}>
                {ritual.title}
              </h1>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Clock className="w-5 h-5" />
                  {ritual.duration}
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Sparkles className="w-5 h-5" />
                  {ritual.difficulty}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/rituels" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image src="/akar-icons_arrow-back.svg" alt="Retour" width={32} height={32} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-[#235730] mb-4" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                  A propos de ce rituel
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {ritual.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                  Les etapes du rituel
                </h2>
                <div className="space-y-6">
                  {ritual.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#235730] text-white rounded-full flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="font-semibold text-[#2d2d2d] mb-1">{step.name}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                  Conseils pratiques
                </h2>
                <div className="bg-[#235730]/5 rounded-lg p-6 space-y-4">
                  {ritual.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#235730] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '28px' }}>
                  Produits recommandes
                </h3>
                <div className="space-y-4">
                  {ritual.products.map((product) => (
                    <Link key={product.id} href={`/produits/${product.id}`}>
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2d2d2d] text-sm">{product.name}</h4>
                          <p className="text-[#235730] font-bold">{product.price} EUR</p>
                        </div>
                        <ShoppingCart className="w-5 h-5 text-[#235730]" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link href="/produits">
                    <Button className="w-full bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Voir tous les produits
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
