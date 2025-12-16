import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Heart, Globe, Users } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

const values = [
  {
    icon: Leaf,
    title: 'Naturel',
    description: 'Tous nos produits sont formules a partir d\'ingredients naturels soigneusement selectionnes.'
  },
  {
    icon: Heart,
    title: 'Authenticite',
    description: 'Nous preservons les recettes ancestrales peruviennes transmises de generation en generation.'
  },
  {
    icon: Globe,
    title: 'Durabilite',
    description: 'Notre engagement pour l\'environnement guide chacune de nos decisions et actions.'
  },
  {
    icon: Users,
    title: 'Communaute',
    description: 'Nous soutenons les communautes locales et les producteurs avec qui nous travaillons.'
  }
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="A propos de Mishki"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#235730]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              {/* <Image
                src="/mishkilogo_w_2.png"
                alt="Mishki"
                width={150}
                height={75}
                className="mb-4 drop-shadow-lg"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
              /> */}
              <h1 className="text-white text-4xl md:text-6xl" style={{ fontFamily: 'var(--font-caveat)' }}>
                A propos
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Decouvrez l'histoire et les valeurs qui animent Mishki
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image src="/akar-icons_arrow-back.svg" alt="Retour" width={32} height={32} />
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '42px' }}>
                Notre histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Mishki est ne d'une passion pour la beaute naturelle et d'un profond respect pour les traditions
                  ancestrales peruviennes. Notre fondatrice, apres plusieurs voyages au Perou, a ete emerveilllee
                  par la richesse de la biodiversite locale et les secrets de beaute transmis de mere en fille
                  depuis des generations.
                </p>
                <p>
                  En quechua, "Mishki" signifie "doux" - une reference a la douceur des soins que nous proposons
                  et a notre approche respectueuse envers la nature et les communautes avec lesquelles nous travaillons.
                </p>
                <p>
                  Aujourd'hui, Mishki propose une gamme de soins naturels qui allie le meilleur de la tradition
                  peruvienne aux exigences de la cosmetique moderne, pour des produits efficaces, ethiques et
                  respectueux de votre peau.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-[#235730] mb-8" style={{ fontFamily: 'var(--font-caveat)', fontSize: '42px' }}>
                Nos valeurs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-14 h-14 bg-[#235730]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-[#235730]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2d2d2d] mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '42px' }}>
                Notre engagement
              </h2>
              <div className="bg-[#235730]/5 rounded-lg p-8 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Chez Mishki, nous croyons que la beaute ne devrait jamais se faire au detriment de la planete
                  ou des communautes. C'est pourquoi nous nous engageons a:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#235730] rounded-full mt-2 flex-shrink-0"></span>
                    Utiliser uniquement des ingredients naturels et biodegradables
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#235730] rounded-full mt-2 flex-shrink-0"></span>
                    Travailler en partenariat equitable avec les producteurs locaux
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#235730] rounded-full mt-2 flex-shrink-0"></span>
                    Reduire notre empreinte carbone a chaque etape de production
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#235730] rounded-full mt-2 flex-shrink-0"></span>
                    Proposer des emballages recyclables et eco-concus
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <p className="text-4xl font-bold text-[#235730] mb-2">100%</p>
                <p className="text-gray-600">Ingredients naturels</p>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-[#235730] mb-2">50+</p>
                <p className="text-gray-600">Familles soutenues</p>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-[#235730] mb-2">0</p>
                <p className="text-gray-600">Tests sur animaux</p>
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
