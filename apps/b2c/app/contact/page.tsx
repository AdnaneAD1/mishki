import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Contact Mishki"
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
                Contactez-nous
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Une question, une suggestion? Notre equipe est a votre ecoute
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Envoyez-nous un message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm text-gray-600">Prenom</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prenom"
                      className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm text-gray-600">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm text-gray-600">Sujet</Label>
                  <Input
                    id="subject"
                    placeholder="Le sujet de votre message"
                    className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm text-gray-600">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    rows={5}
                    className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                  />
                </div>
                <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm px-8">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <h2 className="text-[#235730] mb-6" style={{ fontFamily: 'var(--font-caveat)', fontSize: '36px' }}>
                Nos coordonnees
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#235730]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#235730]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2d2d2d] mb-1">Email</h3>
                    <p className="text-gray-600">contact@mishki.fr</p>
                    <p className="text-gray-600">support@mishki.fr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#235730]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#235730]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2d2d2d] mb-1">Telephone</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#235730]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#235730]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2d2d2d] mb-1">Adresse</h3>
                    <p className="text-gray-600">123 Avenue de la Nature</p>
                    <p className="text-gray-600">75001 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#235730]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#235730]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2d2d2d] mb-1">Horaires</h3>
                    <p className="text-gray-600">Lundi - Vendredi: 9h - 18h</p>
                    <p className="text-gray-600">Samedi: 10h - 16h</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#235730]/5 rounded-lg p-6 mt-8">
                <h3 className="font-medium text-[#2d2d2d] mb-2">Service client reactif</h3>
                <p className="text-gray-600 text-sm">
                  Notre equipe repond generalement dans les 24 heures ouvrees.
                  Pour les questions urgentes, n'hesitez pas a nous appeler directement.
                </p>
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
