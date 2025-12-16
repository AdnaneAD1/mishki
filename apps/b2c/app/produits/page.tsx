'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'
import { useCart } from '@/lib/cart-context'

const categories = ['Tous', 'Soins du visage', 'Soins du corps', 'Soins du cheveu']

const products = [
  {
    id: 1,
    name: 'Gommage corps',
    category: 'Soins du corps',
    price: 24,
    description: 'Exfoliant naturel pour une peau douce et eclatante',
    image: '/produit-1.png'
  },
  {
    id: 2,
    name: 'Savon exfoliant',
    category: 'Soins du corps',
    price: 12,
    description: 'Nettoie en profondeur tout en exfoliant delicatement',
    image: '/produit-2.png'
  },
  {
    id: 3,
    name: 'Huile de beaute',
    category: 'Soins du visage',
    price: 24,
    description: 'Nourrit et hydrate intensement votre peau',
    image: '/produit-3.png'
  },
  {
    id: 4,
    name: 'Lotion de definition',
    category: 'Soins du cheveu',
    price: 22,
    description: 'Definit et sublime vos boucles naturelles',
    image: '/produit-4.png'
  },
  {
    id: 5,
    name: 'Creme hydratante',
    category: 'Soins du visage',
    price: 28,
    description: 'Hydratation longue duree pour tous types de peaux',
    image: '/produit-1.png'
  },
  {
    id: 6,
    name: 'Creme reparatrice',
    category: 'Soins du corps',
    price: 24,
    description: 'Repare et apaise les peaux seches et abimees',
    image: '/produit-2.png'
  },
  {
    id: 7,
    name: 'Eau de toilette',
    category: 'Soins du visage',
    price: 16,
    description: 'Rafraichit et tonifie votre peau en douceur',
    image: '/produit-3.png'
  },
  {
    id: 8,
    name: 'Masque en poudre',
    category: 'Soins du visage',
    price: 20,
    description: 'Purifie et revitalise votre peau naturellement',
    image: '/produit-4.png'
  }
]

export default function ProduitsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const { addToCart } = useCart()

  const filteredProducts = selectedCategory === 'Tous'
    ? products
    : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="relative h-[300px] md:h-[400px] w-full pt-16 md:pt-20">
          <Image
            src="/hero-produits.png"
            alt="Nos produits"
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
                Nos Produits
              </h1>
              <p className="text-white/90 mt-4 max-w-xl">
                Decouvrez nos soins naturels issus de la biodiversite peruvienne
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-12">
            <div className="mb-10">
              <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                <Image
                  src="/akar-icons_arrow-back.svg"
                  alt="Retour"
                  width={32}
                  height={32}
                />
              </Link>
              <h2
                className="text-[#235730] mb-2"
                style={{
                  fontFamily: 'var(--font-caveat)',
                  fontSize: '48px',
                  fontWeight: 400,
                }}
              >
                Categories
              </h2>
              <div className="w-full h-[1px] bg-[#235730]"></div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm transition-all rounded-sm ${
                    selectedCategory === category
                      ? 'bg-[#235730] text-white'
                      : 'bg-white text-[#235730] border border-[#235730] hover:bg-[#235730] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-transparent"
              >
                <Link href={`/produits/${product.id}`}>
                  <div className="relative h-72 mb-4 cursor-pointer group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 p-3 rounded-full">
                        <ZoomIn className="w-6 h-6 text-[#235730]" />
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="space-y-3">
                  <Link href={`/produits/${product.id}`}>
                    <h3 className="font-semibold text-base text-[#2d2d2d] hover:text-[#235730] transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#2d2d2d] leading-relaxed">
                    {product.description}
                  </p>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm text-sm px-6 py-2 h-auto"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
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
