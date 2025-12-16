import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsPage() {
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
                Conditions generales
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
              <h2 className="text-[#235730] text-xl font-semibold mb-4">1. Objet</h2>
              <p className="text-gray-600 leading-relaxed">
                Les presentes conditions generales de vente regissent les relations contractuelles entre
                Mishki et toute personne effectuant un achat via notre site internet. Toute commande
                implique l'acceptation sans reserve de ces conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">2. Produits</h2>
              <p className="text-gray-600 leading-relaxed">
                Les produits proposes sont ceux decrits sur notre site. Les photographies sont les plus
                fideles possibles mais ne peuvent assurer une similitude parfaite avec le produit offert.
                Mishki se reserve le droit de modifier a tout moment la gamme de produits proposee.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">3. Prix</h2>
              <p className="text-gray-600 leading-relaxed">
                Les prix sont indiques en euros, toutes taxes comprises. Mishki se reserve le droit de
                modifier ses prix a tout moment mais les produits seront factures sur la base des tarifs
                en vigueur au moment de la validation de la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">4. Commande</h2>
              <p className="text-gray-600 leading-relaxed">
                Le client selectionne les produits qu'il souhaite commander et valide sa commande apres
                avoir pris connaissance des presentes conditions generales. La validation de la commande
                vaut acceptation de ces conditions. Une confirmation de commande est envoyee par email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">5. Paiement</h2>
              <p className="text-gray-600 leading-relaxed">
                Le paiement s'effectue en ligne par carte bancaire via une plateforme de paiement securisee.
                La commande est validee apres acceptation du paiement par les organismes bancaires.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">6. Livraison</h2>
              <p className="text-gray-600 leading-relaxed">
                Les produits sont livres a l'adresse indiquee lors de la commande. Les delais de livraison
                sont donnes a titre indicatif. Tout retard de livraison ne peut donner lieu a des dommages
                et interets ou a l'annulation de la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">7. Droit de retractation</h2>
              <p className="text-gray-600 leading-relaxed">
                Conformement a la legislation en vigueur, le client dispose d'un delai de 14 jours a
                compter de la reception de sa commande pour exercer son droit de retractation, sans avoir
                a justifier de motifs ni a payer de penalites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">8. Responsabilite</h2>
              <p className="text-gray-600 leading-relaxed">
                Mishki ne saurait etre tenu pour responsable des dommages resultant d'une mauvaise
                utilisation des produits. Il appartient au client de verifier l'adequation du produit
                a son usage et de respecter les precautions d'emploi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">9. Litiges</h2>
              <p className="text-gray-600 leading-relaxed">
                Les presentes conditions sont soumises au droit francais. En cas de litige, une solution
                amiable sera recherchee avant toute action judiciaire. A defaut, les tribunaux francais
                seront seuls competents.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-[#235730] text-xl font-semibold mb-4">10. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question relative aux presentes conditions, vous pouvez nous contacter a
                l'adresse suivante: contact@mishki.fr
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
