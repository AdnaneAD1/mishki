import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

const blogPosts = [
  {
    id: 1,
    title: 'Les bienfaits de l\'huile de jojoba pour votre peau',
    excerpt: 'Decouvrez comment l\'huile de jojoba peut transformer votre routine de soins et apporter eclat et hydratation a votre peau.',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '10 Dec 2024',
    readTime: '5 min',
    category: 'Soins naturels'
  },
  {
    id: 2,
    title: 'Rituels de beaute peruviens ancestraux',
    excerpt: 'Plongez dans les traditions de beaute du Perou et decouvrez des secrets transmis de generation en generation.',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '5 Dec 2024',
    readTime: '7 min',
    category: 'Heritage'
  },
  {
    id: 3,
    title: 'Comment choisir le bon soin pour votre type de peau',
    excerpt: 'Guide complet pour identifier votre type de peau et selectionner les produits les plus adaptes a vos besoins.',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '28 Nov 2024',
    readTime: '6 min',
    category: 'Conseils'
  },
  {
    id: 4,
    title: 'L\'importance de l\'hydratation quotidienne',
    excerpt: 'Pourquoi hydrater sa peau chaque jour est essentiel et comment integrer cette habitude dans votre routine.',
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '20 Nov 2024',
    readTime: '4 min',
    category: 'Bien-etre'
  },
  {
    id: 5,
    title: 'Les ingredients stars de la cosmetique naturelle',
    excerpt: 'Focus sur les ingredients naturels les plus efficaces et leurs proprietes exceptionnelles pour votre peau.',
    image: 'https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '15 Nov 2024',
    readTime: '8 min',
    category: 'Ingredients'
  },
  {
    id: 6,
    title: 'Routine du soir: les etapes essentielles',
    excerpt: 'Decouvrez la routine du soir ideale pour preparer votre peau au renouvellement cellulaire nocturne.',
    image: 'https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '10 Nov 2024',
    readTime: '5 min',
    category: 'Routines'
  }
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Blog Mishki"
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
                Notre Blog
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Conseils beaute, rituels ancestraux et secrets de la nature peruvienne
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
              Articles
            </h2>
            <div className="w-full h-[1px] bg-[#235730]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#235730] text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-[#2d2d2d] mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-[#235730] text-sm font-medium hover:gap-3 transition-all">
                    Lire la suite
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
