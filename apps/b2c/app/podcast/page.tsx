import Image from 'next/image'
import Link from 'next/link'
import { Play, Clock, Headphones, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

const episodes = [
  {
    id: 1,
    title: 'Les secrets de la beaute peruvienne',
    description: 'Decouvrez les ingredients ancestraux utilises par les femmes peruviennes depuis des siecles pour maintenir une peau eclatante.',
    duration: '45 min',
    date: '10 Dec 2024',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
    guest: 'Dr. Maria Santos',
    guestTitle: 'Ethnobotaniste'
  },
  {
    id: 2,
    title: 'L\'huile de jojoba: or liquide pour la peau',
    description: 'Tout ce que vous devez savoir sur l\'huile de jojoba, ses bienfaits et comment l\'integrer dans votre routine beaute.',
    duration: '38 min',
    date: '3 Dec 2024',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
    guest: 'Sophie Durand',
    guestTitle: 'Cosmetologue'
  },
  {
    id: 3,
    title: 'Beaute naturelle et developpement durable',
    description: 'Comment concilier beaute et respect de l\'environnement? Notre engagement pour une cosmetique responsable.',
    duration: '52 min',
    date: '26 Nov 2024',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    guest: 'Jean-Pierre Martin',
    guestTitle: 'Expert en developpement durable'
  },
  {
    id: 4,
    title: 'Les rituels de beaute a travers le monde',
    description: 'Voyage autour du monde a la decouverte des rituels de beaute traditionnels et leurs adaptations modernes.',
    duration: '48 min',
    date: '19 Nov 2024',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800',
    guest: 'Amelia Chen',
    guestTitle: 'Anthropologue'
  },
  {
    id: 5,
    title: 'Skincare: mythes et realites',
    description: 'Demystifions les idees recues sur les soins de la peau avec une dermatologue renommee.',
    duration: '42 min',
    date: '12 Nov 2024',
    image: 'https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=800',
    guest: 'Dr. Claire Dubois',
    guestTitle: 'Dermatologue'
  },
  {
    id: 6,
    title: 'L\'art du massage facial',
    description: 'Techniques de massage facial pour stimuler la circulation et obtenir un teint lumineux naturellement.',
    duration: '35 min',
    date: '5 Nov 2024',
    image: 'https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&cs=tinysrgb&w=800',
    guest: 'Yuki Tanaka',
    guestTitle: 'Specialiste en soins japonais'
  }
]

export default function PodcastPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Podcast Mishki"
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
                Notre Podcast
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Ecoutez nos experts partager leurs connaissances sur la beaute naturelle et le bien-etre
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
              Episodes
            </h2>
            <div className="w-full h-[1px] bg-[#235730]"></div>
          </div>

          <div className="mb-12 bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <Headphones className="w-10 h-10 text-[#235730]" />
              <div>
                <h3 className="text-xl font-semibold text-[#2d2d2d]">Beaute Naturelle par Mishki</h3>
                <p className="text-gray-500">Un podcast sur la beaute, le bien-etre et la nature</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Chaque semaine, nous invitons des experts pour discuter des secrets de la beaute naturelle,
              des ingredients ancestraux et des rituels de soins du monde entier. Abonnez-vous pour ne manquer aucun episode!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm">
                S'abonner sur Spotify
              </Button>
              <Button variant="outline" className="border-[#235730] text-[#235730] hover:bg-[#235730] hover:text-white rounded-sm">
                S'abonner sur Apple Podcasts
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {episodes.map((episode) => (
              <div key={episode.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                          {episode.guest.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#2d2d2d]">{episode.guest}</p>
                        <p className="text-xs text-gray-500">{episode.guestTitle}</p>
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
