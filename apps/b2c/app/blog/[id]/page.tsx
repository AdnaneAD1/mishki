import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'
import { notFound } from 'next/navigation'

const blogPosts: Record<string, {
  id: number
  title: string
  excerpt: string
  content: string[]
  image: string
  date: string
  readTime: string
  category: string
  author: {
    name: string
    role: string
    avatar: string
  }
  relatedPosts: number[]
}> = {
  '1': {
    id: 1,
    title: 'Les bienfaits de l\'huile de jojoba pour votre peau',
    excerpt: 'Decouvrez comment l\'huile de jojoba peut transformer votre routine de soins et apporter eclat et hydratation a votre peau.',
    content: [
      'L\'huile de jojoba est l\'un des ingredients les plus precieux dans le monde de la cosmetique naturelle. Extraite des graines du jojoba, un arbuste originaire des deserts d\'Amerique du Nord, cette huile possede des proprietes exceptionnelles qui en font un allie incontournable pour la beaute de la peau.',
      'Contrairement a la plupart des huiles vegetales, l\'huile de jojoba est en realite une cire liquide dont la composition se rapproche etonnamment du sebum humain. Cette caracteristique unique lui permet d\'etre parfaitement assimilee par la peau, sans laisser de film gras ni obstruer les pores.',
      'Les bienfaits de l\'huile de jojoba sont nombreux. Elle hydrate en profondeur tout en regulant la production de sebum, ce qui la rend adaptee a tous les types de peau, y compris les peaux grasses et a tendance acneique. Ses proprietes anti-inflammatoires apaisent les irritations et les rougeurs.',
      'Riche en vitamines E et B, ainsi qu\'en mineraux essentiels, l\'huile de jojoba nourrit la peau et l\'aide a lutter contre les signes du vieillissement. Elle forme egalement une barriere protectrice qui preserve l\'hydratation naturelle de la peau.',
      'Pour integrer l\'huile de jojoba dans votre routine, vous pouvez l\'appliquer pure sur le visage et le corps, ou l\'utiliser comme ingredient dans vos preparations maison. Quelques gouttes suffisent pour profiter de tous ses bienfaits.',
      'Chez Mishki, nous avons fait de l\'huile de jojoba l\'un des piliers de nos formulations. Associee aux ingredients traditionnels peruviens, elle participe a l\'efficacite de nos soins tout en respectant votre peau et l\'environnement.'
    ],
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1600',
    date: '10 Dec 2024',
    readTime: '5 min',
    category: 'Soins naturels',
    author: { name: 'Sophie Martin', role: 'Experte en cosmetique naturelle', avatar: 'SM' },
    relatedPosts: [2, 3]
  },
  '2': {
    id: 2,
    title: 'Rituels de beaute peruviens ancestraux',
    excerpt: 'Plongez dans les traditions de beaute du Perou et decouvrez des secrets transmis de generation en generation.',
    content: [
      'Le Perou, terre de contrastes et de biodiversite exceptionnelle, abrite depuis des millenaires des traditions de beaute uniques. Les femmes peruviennes ont toujours su tirer parti des ressources naturelles extraordinaires de leur environnement pour prendre soin de leur peau et de leurs cheveux.',
      'Parmi les ingredients emblematiques de la cosmetique peruvienne, on trouve le quinoa, la maca, l\'aguaje et le camu-camu. Chacun de ces tresors de la nature possede des proprietes specifiques qui contribuent a la beaute et a la sante de la peau.',
      'Le quinoa, par exemple, est utilise depuis l\'epoque incaique pour ses vertus nourrissantes et reparatrices. Riche en proteines et en acides amines, il renforce la structure de la peau et lui redonne eclat et vitalite.',
      'L\'aguaje, fruit du palmier moriche, est surnomme le "fruit de la beaute" par les populations amazoniennes. Sa teneur exceptionnelle en vitamine A en fait un puissant antioxydant qui protege la peau des agressions exterieures.',
      'Ces rituels ancestraux ne se limitent pas aux ingredients utilises. Ils incluent egalement des gestes et des moments particuliers dedies au bien-etre. Les femmes peruviennes accordent une grande importance au massage et a la meditation, considerant que la beaute vient aussi de l\'interieur.',
      'Chez Mishki, nous nous inspirons de cette sagesse ancestrale pour creer des soins qui respectent a la fois les traditions et les besoins des peaux modernes. Chaque produit est une invitation a decouvrir les secrets de beaute du Perou.'
    ],
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1600',
    date: '5 Dec 2024',
    readTime: '7 min',
    category: 'Heritage',
    author: { name: 'Maria Santos', role: 'Ethnobotaniste', avatar: 'MS' },
    relatedPosts: [1, 5]
  },
  '3': {
    id: 3,
    title: 'Comment choisir le bon soin pour votre type de peau',
    excerpt: 'Guide complet pour identifier votre type de peau et selectionner les produits les plus adaptes a vos besoins.',
    content: [
      'Choisir les bons soins pour sa peau peut sembler complique face a la multitude de produits disponibles. Pourtant, tout commence par une etape essentielle: identifier votre type de peau. Cette connaissance vous permettra de selectionner les produits les plus adaptes a vos besoins specifiques.',
      'Il existe quatre types de peau principaux: normale, seche, grasse et mixte. La peau normale est equilibree, ni trop grasse ni trop seche. La peau seche manque de sebum et a tendance a tiraillement. La peau grasse produit un exces de sebum et presente souvent des brillances. La peau mixte combine zones grasses et zones seches.',
      'Pour identifier votre type de peau, nettoyez votre visage et attendez une heure sans appliquer de soin. Observez ensuite votre peau: si elle brille sur l\'ensemble du visage, elle est grasse. Si elle tire et presente des zones de secheresse, elle est seche. Si seule la zone T brille, elle est mixte.',
      'Une fois votre type de peau identifie, vous pouvez selectionner vos soins. Les peaux seches privilegieront les textures riches et nourrissantes. Les peaux grasses opteront pour des formules legeres et matifiantes. Les peaux mixtes pourront adapter leurs soins selon les zones du visage.',
      'N\'oubliez pas que votre peau evolue au fil du temps et des saisons. Il est important de rester a l\'ecoute de ses besoins et d\'adapter votre routine en consequence. Un bilan regulier vous aidera a maintenir une peau en pleine sante.',
      'Chez Mishki, nos experts sont a votre disposition pour vous guider dans le choix de vos soins. N\'hesitez pas a nous contacter pour beneficier de conseils personnalises adaptes a votre type de peau.'
    ],
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600',
    date: '28 Nov 2024',
    readTime: '6 min',
    category: 'Conseils',
    author: { name: 'Claire Dubois', role: 'Dermatologue', avatar: 'CD' },
    relatedPosts: [1, 4]
  },
  '4': {
    id: 4,
    title: 'L\'importance de l\'hydratation quotidienne',
    excerpt: 'Pourquoi hydrater sa peau chaque jour est essentiel et comment integrer cette habitude dans votre routine.',
    content: [
      'L\'hydratation est la cle d\'une peau saine et eclatante. Que votre peau soit seche, grasse ou mixte, elle a besoin d\'eau pour fonctionner correctement et conserver sa beaute. Pourtant, l\'hydratation reste souvent negligee dans les routines de soins.',
      'La peau est composee a 70% d\'eau. Cette eau est essentielle pour maintenir l\'elasticite de la peau, assurer le renouvellement cellulaire et proteger contre les agressions exterieures. Une peau deshydratee perd de sa souplesse, parait terne et vieillit prematurement.',
      'L\'hydratation de la peau se fait de deux manieres complementaires: de l\'interieur, en buvant suffisamment d\'eau, et de l\'exterieur, en appliquant des soins hydratants. Les deux approches sont indispensables pour une hydratation optimale.',
      'Pour hydrater efficacement votre peau, commencez par boire au moins 1,5 litre d\'eau par jour. Completez cette hydratation interne par l\'application quotidienne d\'un soin adapte a votre type de peau. Le matin, optez pour une creme legere. Le soir, privilegiez une formule plus riche.',
      'Les ingredients hydratants les plus efficaces sont l\'acide hyaluronique, qui peut retenir jusqu\'a 1000 fois son poids en eau, la glycerine, le beurre de karite et les huiles vegetales comme l\'huile de jojoba ou d\'argan.',
      'Chez Mishki, nous formulons des soins hydratants a base d\'ingredients naturels qui apportent a la peau l\'eau dont elle a besoin tout au long de la journee. Nos formules combinent tradition peruvienne et efficacite moderne pour une hydratation optimale.'
    ],
    image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1600',
    date: '20 Nov 2024',
    readTime: '4 min',
    category: 'Bien-etre',
    author: { name: 'Sophie Martin', role: 'Experte en cosmetique naturelle', avatar: 'SM' },
    relatedPosts: [3, 6]
  },
  '5': {
    id: 5,
    title: 'Les ingredients stars de la cosmetique naturelle',
    excerpt: 'Focus sur les ingredients naturels les plus efficaces et leurs proprietes exceptionnelles pour votre peau.',
    content: [
      'La cosmetique naturelle connait un essor sans precedent, et pour cause: les ingredients issus de la nature offrent des bienfaits exceptionnels pour la peau, sans les effets indesirables des molecules de synthese. Decouvrez les stars de la beaute naturelle.',
      'L\'aloe vera est sans doute l\'ingredient naturel le plus connu. Cette plante grasse contient plus de 200 composants actifs qui hydratent, apaisent et reparent la peau. Elle est particulierement recommandee pour les peaux sensibles et irritees.',
      'Le beurre de karite, issu du karite d\'Afrique, est un tresor de nutrition pour la peau. Riche en vitamines A, E et F, il nourrit intensement, protege et regenere les peaux les plus seches. Il est egalement excellent pour les cheveux.',
      'L\'huile d\'argan, appelee "or liquide du Maroc", est reconnue pour ses proprietes anti-age exceptionnelles. Sa richesse en antioxydants et en acides gras essentiels en fait un soin precieux pour lutter contre le vieillissement cutane.',
      'Le the vert est un puissant antioxydant qui protege la peau des radicaux libres responsables du vieillissement premature. Il possede egalement des proprietes anti-inflammatoires et antibacteriennes.',
      'Chez Mishki, nous associons ces ingredients universels aux tresors de la biodiversite peruvienne pour creer des formules uniques et efficaces. Chaque produit est le fruit d\'une selection rigoureuse des meilleurs ingredients naturels.'
    ],
    image: 'https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    date: '15 Nov 2024',
    readTime: '8 min',
    category: 'Ingredients',
    author: { name: 'Maria Santos', role: 'Ethnobotaniste', avatar: 'MS' },
    relatedPosts: [1, 2]
  },
  '6': {
    id: 6,
    title: 'Routine du soir: les etapes essentielles',
    excerpt: 'Decouvrez la routine du soir ideale pour preparer votre peau au renouvellement cellulaire nocturne.',
    content: [
      'La routine du soir est un moment crucial pour la beaute de votre peau. Pendant la nuit, votre peau se regenere et se repare. En adoptant les bons gestes avant le coucher, vous optimisez ce processus naturel et vous vous reveillez avec une peau reposee et eclatante.',
      'La premiere etape, et la plus importante, est le demaquillage. Meme si vous ne vous etes pas maquillee, cette etape permet d\'eliminer les impuretes et les polluants accumules tout au long de la journee. Utilisez une huile ou un lait demaquillant doux.',
      'Apres le demaquillage, procedez au nettoyage. Cette double cleansing, comme l\'appellent les experts, assure une peau parfaitement propre. Choisissez un nettoyant adapte a votre type de peau: gel moussant pour les peaux grasses, lait ou creme pour les peaux seches.',
      'L\'etape suivante est l\'application d\'un tonique ou d\'une lotion. Ce soin permet de retablir le pH de la peau et de la preparer a recevoir les soins suivants. Appliquez-le avec un coton ou directement avec les mains.',
      'Terminez votre routine par l\'application d\'un serum et d\'une creme de nuit. Le serum, concentre en actifs, cible des problematiques specifiques. La creme de nuit, plus riche que celle du jour, nourrit et repare la peau pendant votre sommeil.',
      'Chez Mishki, nous avons concu une gamme complete pour votre rituel du soir. Nos soins travaillent en synergie pour offrir a votre peau tout ce dont elle a besoin pour se regenerer pendant la nuit.'
    ],
    image: 'https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&cs=tinysrgb&w=1600',
    date: '10 Nov 2024',
    readTime: '5 min',
    category: 'Routines',
    author: { name: 'Claire Dubois', role: 'Dermatologue', avatar: 'CD' },
    relatedPosts: [4, 3]
  }
}

const allPosts = Object.values(blogPosts)

export function generateStaticParams() {
  return Object.keys(blogPosts).map((id) => ({ id }))
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id]

  if (!post) {
    notFound()
  }

  const relatedPostsData = post.relatedPosts.map(id => blogPosts[id.toString()]).filter(Boolean)

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[450px] w-full pt-16 md:pt-20">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 pb-12">
              {/* <Image
                src="/mishkilogo_w_2.png"
                alt="Mishki"
                width={130}
                height={65}
                className="mb-4 drop-shadow-lg"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
              /> */}
              <span className="inline-block bg-[#235730] text-white text-xs px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-white text-3xl md:text-5xl font-semibold max-w-3xl leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 mt-4 text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de lecture
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#235730] hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              Retour aux articles
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="w-12 h-12 bg-[#235730] text-white rounded-full flex items-center justify-center font-semibold">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="font-medium text-[#2d2d2d]">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>

              <article className="prose prose-lg max-w-none">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </article>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Partager cet article</span>
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-[#235730]/10 rounded-full flex items-center justify-center hover:bg-[#235730] hover:text-white transition-colors text-[#235730]">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-[#235730]/10 rounded-full flex items-center justify-center hover:bg-[#235730] hover:text-white transition-colors text-[#235730]">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-[#235730]/10 rounded-full flex items-center justify-center hover:bg-[#235730] hover:text-white transition-colors text-[#235730]">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-[#235730]/10 rounded-full flex items-center justify-center hover:bg-[#235730] hover:text-white transition-colors text-[#235730]">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-[#235730] mb-4" style={{ fontFamily: 'var(--font-caveat)', fontSize: '24px' }}>
                    Articles similaires
                  </h3>
                  <div className="space-y-4">
                    {relatedPostsData.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-[#2d2d2d] line-clamp-2 mb-1">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-gray-500">{relatedPost.readTime} de lecture</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-[#235730] rounded-lg p-6 text-white">
                  <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-caveat)' }}>
                    Newsletter
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Recevez nos conseils beaute et nos dernieres actualites directement dans votre boite mail.
                  </p>
                  <Link href="/#newsletter">
                    <button className="w-full bg-white text-[#235730] px-4 py-2 rounded-sm font-medium hover:bg-white/90 transition-colors">
                      S'inscrire
                    </button>
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
