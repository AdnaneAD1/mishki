import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="mb-4 text-[#235730]"
          style={{
            fontFamily: 'var(--font-caveat)',
            fontSize: '48px',
            fontWeight: 400,
          }}
        >
          Abonnez-vous à nos réseaux offres
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez notre communauté et recevez en exclusivité nos dernières nouveautés,
          conseils beauté et offres spéciales directement dans votre boîte mail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre adresse e-mail"
            className="flex-1 border-[#235730]"
          />
          <Button className="bg-[#235730] hover:bg-[#1d4626] text-white px-8">
            Je m'abonne !
          </Button>
        </div>
      </div>
    </section>
  )
}
