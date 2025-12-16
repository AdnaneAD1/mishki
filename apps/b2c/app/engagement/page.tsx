import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Recycle, Heart, TreePine, Droplets, Sun } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

const commitments = [
  {
    icon: Leaf,
    title: 'Ingredients naturels',
    description: '100% de nos ingredients sont d\'origine naturelle, issus de l\'agriculture biologique ou de cueillette sauvage responsable.'
  },
  {
    icon: Recycle,
    title: 'Emballages eco-concus',
    description: 'Nos emballages sont recyclables, biodegradables ou rechargeables. Nous minimisons le plastique a usage unique.'
  },
  {
    icon: TreePine,
    title: 'Reforestation',
    description: 'Pour chaque commande, nous plantons un arbre au Perou en partenariat avec des associations locales.'
  },
  {
    icon: Droplets,
    title: 'Preservation de l\'eau',
    description: 'Nos procedes de fabrication sont optimises pour minimiser la consommation d\'eau.'
  },
  {
    icon: Heart,
    title: 'Commerce equitable',
    description: 'Nous travaillons en direct avec les producteurs peruviens et leur garantissons des revenus justes.'
  },
  {
    icon: Sun,
    title: 'Energie renouvelable',
    description: 'Notre entrepot et nos bureaux fonctionnent a 100% avec de l\'energie renouvelable.'
  }
]

export default function SustainabilityPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Engagement Mishki"
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
                Notre engagement
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Une beaute responsable pour un avenir durable
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
            <div className="text-center mb-16">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '42px' }}>
                La beaute au service de la planete
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Chez Mishki, nous croyons qu'il est possible de prendre soin de soi tout en prenant soin
                de notre planete. Notre engagement environnemental et social est au coeur de chacune de
                nos decisions, de la selection des ingredients a la livraison de vos commandes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {commitments.map((commitment, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-[#235730]/10 rounded-full flex items-center justify-center mb-4">
                    <commitment.icon className="w-7 h-7 text-[#235730]" />
                  </div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{commitment.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{commitment.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#235730] rounded-lg p-8 md:p-12 text-white mb-16">
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-caveat)' }}>
                Notre impact en chiffres
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold mb-2">5000+</p>
                  <p className="text-white/80 text-sm">Arbres plantes</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">0%</p>
                  <p className="text-white/80 text-sm">Plastique vierge</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">50</p>
                  <p className="text-white/80 text-sm">Familles soutenues</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">-60%</p>
                  <p className="text-white/80 text-sm">Empreinte carbone</p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Notre chaine d'approvisionnement
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#235730] text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-1">Sourcing responsable</h3>
                    <p className="text-gray-600 text-sm">
                      Nous selectionnons nos ingredients directement aupres de producteurs peruviens
                      pratiquant une agriculture durable et respectueuse de la biodiversite.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#235730] text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-1">Fabrication ethique</h3>
                    <p className="text-gray-600 text-sm">
                      Nos produits sont fabriques en France dans des ateliers certifies, avec des
                      procedes respectueux de l'environnement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#235730] text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-1">Emballage minimal</h3>
                    <p className="text-gray-600 text-sm">
                      Nous utilisons uniquement des materiaux recycles ou recyclables et eliminons
                      tout emballage superflu.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#235730] text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-1">Livraison bas carbone</h3>
                    <p className="text-gray-600 text-sm">
                      Nous privilegions les transporteurs engages dans la reduction de leur empreinte
                      carbone et compensons les emissions restantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#235730]/5 rounded-lg p-8 text-center">
              <h2 className="text-[#235730] mb-4" style={{ fontFamily: 'var(--font-caveat)', fontSize: '32px' }}>
                Rejoignez le mouvement
              </h2>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                En choisissant Mishki, vous participez activement a un mode de consommation plus
                responsable. Ensemble, construisons un avenir ou beaute rime avec durabilite.
              </p>
              <Link href="/produits">
                <button className="bg-[#235730] hover:bg-[#1d4626] text-white px-8 py-3 rounded-sm transition-colors">
                  Decouvrir nos produits
                </button>
              </Link>
            </div>
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
