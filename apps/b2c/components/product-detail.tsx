'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Play, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'
import { useCart } from '@/lib/cart-context'

const products: Record<string, {
  id: number
  name: string
  category: string
  description: string
  longDescription: string
  volume: string
  price: number
  oldPrice: string
  image: string
  reviews: number
  rating: number
  inStock: boolean
  deliveryDate: string
  loyaltyPoints: number
  nutritionalInfo: { name: string; value: string }[]
}> = {
  '1': {
    id: 1,
    name: 'Gommage corps',
    category: 'Soins du corps',
    description: 'Exfoliant naturel pour une peau douce et eclatante',
    longDescription: 'Fruit de la jungle peruvienne, riche en lipides, proteines et vitamines. Grace a ses acides gras omega 6, 9 et 3, il apporte une grande contribution nutritive a la peau et accelere la regeneration des tissus.',
    volume: '100ml',
    price: 24,
    oldPrice: '30',
    image: '/produit-1.png',
    reviews: 10,
    rating: 5,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 10,
    nutritionalInfo: [{ name: 'Huile de jojoba', value: '100 ml' }]
  },
  '2': {
    id: 2,
    name: 'Savon exfoliant',
    category: 'Soins du corps',
    description: 'Nettoie en profondeur tout en exfoliant delicatement',
    longDescription: 'Un savon enrichi en ingredients naturels qui nettoie votre peau en profondeur tout en la laissant douce et hydratee.',
    volume: '150g',
    price: 12,
    oldPrice: '15',
    image: '/produit-2.png',
    reviews: 8,
    rating: 4,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 8,
    nutritionalInfo: [{ name: 'Savon exfoliant', value: '150 g' }]
  },
  '3': {
    id: 3,
    name: 'Huile de jojoba',
    category: 'Soins du visage',
    description: 'Nourrit et hydrate intensement votre peau',
    longDescription: 'Fruit de la jungle peruvienne, riche en lipides, proteines et vitamines. Grace a ses acides gras omega 6, 9 et 3, il apporte une grande contribution nutritive a la peau et accelere la regeneration des tissus.',
    volume: '100ml',
    price: 24,
    oldPrice: '30',
    image: '/produit-3.png',
    reviews: 10,
    rating: 5,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 10,
    nutritionalInfo: [{ name: 'Huile de jojoba', value: '100 ml' }]
  },
  '4': {
    id: 4,
    name: 'Lotion de definition',
    category: 'Soins du cheveu',
    description: 'Definit et sublime vos boucles naturelles',
    longDescription: 'Une lotion legere qui definit parfaitement vos boucles sans les alourdir. Enrichie en huiles naturelles pour nourrir vos cheveux en profondeur.',
    volume: '200ml',
    price: 22,
    oldPrice: '28',
    image: '/produit-4.png',
    reviews: 15,
    rating: 5,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 12,
    nutritionalInfo: [{ name: 'Lotion de definition', value: '200 ml' }]
  },
  '5': {
    id: 5,
    name: 'Creme hydratante',
    category: 'Soins du visage',
    description: 'Hydratation longue duree pour tous types de peaux',
    longDescription: 'Une creme riche et onctueuse qui hydrate intensement votre peau pendant 24 heures.',
    volume: '50ml',
    price: 28,
    oldPrice: '35',
    image: '/produit-1.png',
    reviews: 12,
    rating: 5,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 15,
    nutritionalInfo: [{ name: 'Creme hydratante', value: '50 ml' }]
  },
  '6': {
    id: 6,
    name: 'Creme reparatrice',
    category: 'Soins du corps',
    description: 'Repare et apaise les peaux seches et abimees',
    longDescription: 'Une creme reparatrice intensive qui restaure la barriere cutanee et apaise les peaux les plus sensibles.',
    volume: '100ml',
    price: 24,
    oldPrice: '30',
    image: '/produit-2.png',
    reviews: 9,
    rating: 4,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 10,
    nutritionalInfo: [{ name: 'Creme reparatrice', value: '100 ml' }]
  },
  '7': {
    id: 7,
    name: 'Eau de toilette',
    category: 'Soins du visage',
    description: 'Rafraichit et tonifie votre peau en douceur',
    longDescription: 'Une eau de toilette legere et rafraichissante aux notes florales et boisees.',
    volume: '100ml',
    price: 16,
    oldPrice: '20',
    image: '/produit-3.png',
    reviews: 7,
    rating: 4,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 8,
    nutritionalInfo: [{ name: 'Eau de toilette', value: '100 ml' }]
  },
  '8': {
    id: 8,
    name: 'Masque en poudre',
    category: 'Soins du visage',
    description: 'Purifie et revitalise votre peau naturellement',
    longDescription: 'Un masque en poudre a melanger avec de l\'eau pour un soin purifiant et revitalisant.',
    volume: '50g',
    price: 20,
    oldPrice: '25',
    image: '/produit-4.png',
    reviews: 11,
    rating: 5,
    inStock: true,
    deliveryDate: 'mardi 2 dec. et vendredi 6 dec.',
    loyaltyPoints: 10,
    nutritionalInfo: [{ name: 'Masque en poudre', value: '50 g' }]
  }
}

type Tab = 'Description' | 'Reviews' | 'Questions'

interface Review {
  id: number
  author: string
  rating: number
  text: string
  date: string
}

interface Question {
  id: number
  author: string
  question: string
  answer?: string
  date: string
}

export function ProductDetail({ productId }: { productId: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('Description')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviewName, setReviewName] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [questionName, setQuestionName] = useState('')
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, author: 'Marie L.', rating: 5, text: 'Produit exceptionnel, ma peau est transformee!', date: '10/12/2024' },
    { id: 2, author: 'Sophie D.', rating: 4, text: 'Tres satisfaite de ce produit, je recommande.', date: '05/12/2024' }
  ])
  const [questions, setQuestions] = useState<Question[]>([])

  const { addToCart } = useCart()
  const product = products[productId] || products['1']

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (reviewText && reviewName) {
      const newReview: Review = {
        id: reviews.length + 1,
        author: reviewName,
        rating: reviewRating,
        text: reviewText,
        date: new Date().toLocaleDateString('fr-FR')
      }
      setReviews([newReview, ...reviews])
      setReviewText('')
      setReviewName('')
      setReviewRating(5)
    }
  }

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (questionText && questionName) {
      const newQuestion: Question = {
        id: questions.length + 1,
        author: questionName,
        question: questionText,
        date: new Date().toLocaleDateString('fr-FR')
      }
      setQuestions([newQuestion, ...questions])
      setQuestionText('')
      setQuestionName('')
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/produits" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image src="/akar-icons_arrow-back.svg" alt="Retour" width={32} height={32} />
            </Link>
            <h2 className="text-[#235730] mb-2" style={{ fontFamily: 'var(--font-caveat)', fontSize: '48px', fontWeight: 400 }}>
              {product.name}
            </h2>
            <div className="w-full h-[1px] bg-[#235730]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] lg:h-[500px]">
              <Image src={product.image} alt={product.name} fill className="object-contain" />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-[#2d2d2d] mb-1">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.volume}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.reviews} reviews</span>
                <span className="text-sm text-[#235730] underline cursor-pointer">{questions.length} question</span>
              </div>

              <p className="text-gray-600">
                {product.description}
                <br />
                <span className="text-sm text-[#235730] underline cursor-pointer">Voir la description</span>
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#2d2d2d]">{product.price} EUR</span>
                <span className="text-lg text-gray-400 line-through">{product.oldPrice} EUR</span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#235730]">EN STOCK</p>
                <p className="text-sm text-gray-600">
                  Achetez-le aujourd'hui et<br />
                  recevez-le a partir du<br />
                  <span className="font-medium">{product.deliveryDate}</span>
                </p>
              </div>

              <div className="border border-dashed border-[#235730] rounded px-4 py-2 inline-block">
                <p className="text-sm text-[#235730]">Vous obtiendrez jusqu'a {product.loyaltyPoints} points !</p>
              </div>

              <Button onClick={handleAddToCart} className="w-full bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm text-base px-8 py-6 h-auto">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </Button>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex flex-wrap gap-0 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('Description')}
                className={`px-8 py-4 text-sm font-medium transition-all ${
                  activeTab === 'Description'
                    ? 'bg-[#235730] text-white'
                    : 'bg-transparent text-gray-600 hover:text-[#235730]'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('Reviews')}
                className={`px-8 py-4 text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'Reviews'
                    ? 'bg-[#235730] text-white'
                    : 'bg-transparent text-gray-600 hover:text-[#235730]'
                }`}
              >
                Reviews ({reviews.length})
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${activeTab === 'Reviews' ? 'fill-white text-white' : 'fill-yellow-400 text-yellow-400'}`} />
                  ))}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('Questions')}
                className={`px-8 py-4 text-sm font-medium transition-all ${
                  activeTab === 'Questions'
                    ? 'bg-[#235730] text-white'
                    : 'bg-transparent text-gray-600 hover:text-[#235730]'
                }`}
              >
                Questions et Reponses ({questions.length})
              </button>
            </div>

            {activeTab === 'Description' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{product.longDescription}</p>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] mb-2">{product.name} - Booster d'eclat & d'hydratation</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Melangee a la creme Mishki pour peaux normales a seches, l'huile de jojoba
                      renforce l'hydratation, aide a lisser l'apparence des rides et laisse la peau
                      plus souple et confortable.
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Riche en vitamines E, elle favorise la regeneration cellulaire, ameliore
                    l'elasticite, et apporte a la peau douceur, fermete et protection contre les
                    agressions exterieures.
                  </p>
                  <button className="text-sm text-[#235730] underline">Voir plus</button>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <button className="text-sm text-[#235730] underline font-medium">Valeurs nutritionnelles</button>
                    <button className="text-sm text-gray-500">Fiche technique</button>
                  </div>
                  <table className="w-full text-sm">
                    <tbody>
                      {product.nutritionalInfo.map((info, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-3 text-gray-600">{info.name}</td>
                          <td className="py-3 text-right text-gray-900">{info.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="relative h-48 bg-[#6B8E5B] rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2" style={{ fontFamily: 'var(--font-caveat)' }}>Mishki</div>
                      <p className="text-sm mb-4">Decouvrez notre produit en video</p>
                      <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors mx-auto">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg text-[#2d2d2d] mb-4">Laisser un avis</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Votre note</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="focus:outline-none"
                          >
                            <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input
                      placeholder="Votre nom"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="border-gray-300"
                    />
                    <Textarea
                      placeholder="Votre avis..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="border-gray-300 min-h-[100px]"
                    />
                    <Button type="submit" className="bg-[#235730] hover:bg-[#1d4626] text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer mon avis
                    </Button>
                  </form>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#2d2d2d]">Avis clients ({reviews.length})</h3>
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-3">{review.text}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="font-medium">{review.author}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Questions' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg text-[#2d2d2d] mb-4">Poser une question</h3>
                  <form onSubmit={handleSubmitQuestion} className="space-y-4">
                    <Input
                      placeholder="Votre nom"
                      value={questionName}
                      onChange={(e) => setQuestionName(e.target.value)}
                      className="border-gray-300"
                    />
                    <Textarea
                      placeholder="Votre question..."
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      className="border-gray-300 min-h-[100px]"
                    />
                    <Button type="submit" className="bg-[#235730] hover:bg-[#1d4626] text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer ma question
                    </Button>
                  </form>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#2d2d2d]">Questions ({questions.length})</h3>
                  {questions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Aucune question pour le moment. Soyez le premier a poser une question!</p>
                  ) : (
                    questions.map((q) => (
                      <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="font-medium text-[#2d2d2d] mb-2">Q: {q.question}</p>
                        {q.answer && <p className="text-gray-600 mb-2">R: {q.answer}</p>}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{q.author}</span>
                          <span>{q.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image src="/femme-mishki.png" alt="Femme utilisant un produit Mishki" fill className="object-cover" />
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image src="/huile.png" alt="Huile naturelle" fill className="object-cover" />
              </div>
            </div>
            <div className="mt-4">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image src="/beurre.png" alt="Beurre naturel" fill className="object-cover" />
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
