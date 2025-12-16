import Image from 'next/image'
import Link from 'next/link'
import { Truck, Package, RotateCcw, Clock } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const deliveryOptions = [
  {
    icon: Truck,
    title: 'Livraison standard',
    delay: '3-5 jours ouvrables',
    price: 'Gratuit des 50 EUR',
    description: 'Livraison a domicile ou en point relais'
  },
  {
    icon: Clock,
    title: 'Livraison express',
    delay: '24-48h',
    price: '9,90 EUR',
    description: 'Livraison rapide a domicile'
  },
  {
    icon: Package,
    title: 'Point relais',
    delay: '3-5 jours ouvrables',
    price: '3,90 EUR',
    description: 'Retirez votre colis dans le point relais de votre choix'
  }
]

export default function ShippingPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[200px] md:h-[300px] w-full pt-16 md:pt-20">
          <div className="absolute inset-0 bg-[#235730]" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              {/* <Image
                src="/mishkilogo_w_2.png"
                alt="Mishki"
                width={130}
                height={65}
                className="mb-4 drop-shadow-lg"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
              /> */}
              <h1 className="text-white text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-caveat)' }}>
                Livraison et retours
              </h1>
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
            <section className="mb-16">
              <h2 className="text-[#235730] mb-8" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Options de livraison
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deliveryOptions.map((option, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#235730]/10 rounded-full flex items-center justify-center mb-4">
                      <option.icon className="w-6 h-6 text-[#235730]" />
                    </div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-2">{option.title}</h3>
                    <p className="text-[#235730] font-bold mb-1">{option.price}</p>
                    <p className="text-sm text-gray-500 mb-2">{option.delay}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Zones de livraison
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong className="text-[#2d2d2d]">France metropolitaine:</strong> Toutes les options
                    de livraison sont disponibles.
                  </p>
                  <p>
                    <strong className="text-[#2d2d2d]">DOM-TOM:</strong> Livraison standard uniquement,
                    delais de 7-14 jours ouvrables. Frais de port: 14,90 EUR.
                  </p>
                  <p>
                    <strong className="text-[#2d2d2d]">Union europeenne:</strong> Livraison standard
                    uniquement, delais de 5-10 jours ouvrables. Frais de port: 9,90 EUR.
                  </p>
                  <p>
                    <strong className="text-[#2d2d2d]">International:</strong> Nous contacter pour un
                    devis personnalise.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Suivi de commande
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 leading-relaxed">
                  Des l'expedition de votre commande, vous recevrez un email contenant votre numero de
                  suivi. Vous pourrez suivre l'acheminement de votre colis directement sur le site du
                  transporteur. Si vous ne recevez pas cet email, verifiez vos spams ou contactez notre
                  service client.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <RotateCcw className="w-8 h-8 text-[#235730]" />
                <h2 className="text-[#235730]" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                  Politique de retours
                </h2>
              </div>
              <div className="bg-[#235730]/5 rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Delai de retour</h3>
                  <p className="text-gray-600">
                    Vous disposez de 14 jours a compter de la reception de votre commande pour nous
                    retourner un produit, conformement a votre droit de retractation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Conditions de retour</h3>
                  <p className="text-gray-600">
                    Les produits doivent etre retournes dans leur emballage d'origine, non ouverts et
                    non utilises. Pour des raisons d'hygiene, les produits ouverts ou utilises ne
                    peuvent etre retournes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Procedure de retour</h3>
                  <ol className="text-gray-600 space-y-2">
                    <li>1. Contactez notre service client a retours@mishki.fr</li>
                    <li>2. Vous recevrez une etiquette de retour prepayee</li>
                    <li>3. Emballez soigneusement les produits</li>
                    <li>4. Deposez le colis dans un point relais</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Remboursement</h3>
                  <p className="text-gray-600">
                    Le remboursement sera effectue dans les 14 jours suivant la reception de votre
                    retour, par le meme moyen de paiement que celui utilise lors de la commande.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Questions frequentes
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Ma commande est en retard, que faire?</h3>
                  <p className="text-gray-600 text-sm">
                    Les delais indiques sont estimatifs. En cas de retard significatif, contactez notre
                    service client avec votre numero de commande.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Puis-je modifier mon adresse de livraison?</h3>
                  <p className="text-gray-600 text-sm">
                    Vous pouvez modifier votre adresse tant que la commande n'a pas ete expediee.
                    Contactez-nous rapidement apres votre commande.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">Mon colis est arrive endommage, que faire?</h3>
                  <p className="text-gray-600 text-sm">
                    Prenez des photos du colis et des produits endommages, puis contactez notre service
                    client. Nous procederons a un remplacement ou remboursement.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
