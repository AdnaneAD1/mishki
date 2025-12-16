import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrivacyPage() {
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
                Politique de confidentialite
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

          <div className="max-w-3xl mx-auto prose prose-gray">
            <p className="text-sm text-gray-500 mb-8">Derniere mise a jour: 11 decembre 2024</p>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Mishki s'engage a proteger la vie privee des utilisateurs de son site. Cette politique
                de confidentialite explique comment nous collectons, utilisons et protegeons vos donnees
                personnelles conformement au Reglement General sur la Protection des Donnees (RGPD).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Donnees collectees</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous collectons les donnees suivantes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Donnees d'identification: nom, prenom, adresse email</li>
                <li>Donnees de contact: adresse postale, numero de telephone</li>
                <li>Donnees de transaction: historique des commandes, moyens de paiement</li>
                <li>Donnees de navigation: cookies, adresse IP, pages visitees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Utilisation des donnees</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vos donnees sont utilisees pour:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Traiter et suivre vos commandes</li>
                <li>Gerer votre compte client</li>
                <li>Vous envoyer des communications commerciales (avec votre consentement)</li>
                <li>Ameliorer nos services et notre site web</li>
                <li>Repondre a vos demandes de contact</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Base legale</h2>
              <p className="text-gray-600 leading-relaxed">
                Le traitement de vos donnees repose sur: l'execution du contrat (commandes), votre
                consentement (newsletter), nos interets legitimes (amelioration des services), et
                nos obligations legales (facturation, comptabilite).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Conservation des donnees</h2>
              <p className="text-gray-600 leading-relaxed">
                Vos donnees sont conservees pendant la duree necessaire aux finalites pour lesquelles
                elles ont ete collectees. Les donnees de transaction sont conservees pendant 10 ans
                a des fins comptables. Les donnees de navigation sont conservees pendant 13 mois maximum.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Vos droits</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conformement au RGPD, vous disposez des droits suivants:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Droit d'acces a vos donnees</li>
                <li>Droit de rectification des donnees inexactes</li>
                <li>Droit a l'effacement (droit a l'oubli)</li>
                <li>Droit a la limitation du traitement</li>
                <li>Droit a la portabilite des donnees</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Notre site utilise des cookies pour ameliorer votre experience de navigation. Vous pouvez
                configurer votre navigateur pour refuser les cookies ou etre averti lorsqu'un cookie est
                envoye. Certaines fonctionnalites du site peuvent ne pas fonctionner correctement sans cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Securite</h2>
              <p className="text-gray-600 leading-relaxed">
                Nous mettons en oeuvre des mesures de securite appropriees pour proteger vos donnees
                contre l'acces non autorise, la modification, la divulgation ou la destruction. Les
                paiements sont securises par une plateforme certifiee.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant cette politique ou pour exercer vos droits, contactez
                notre Delegue a la Protection des Donnees a: dpo@mishki.fr
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
