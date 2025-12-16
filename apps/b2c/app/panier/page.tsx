'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/produits" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image
                src="/akar-icons_arrow-back.svg"
                alt="Retour"
                width={32}
                height={32}
              />
            </Link>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[#235730]" />
              <h2
                className="text-[#235730]"
                style={{
                  fontFamily: 'var(--font-caveat)',
                  fontSize: '48px',
                  fontWeight: 400,
                }}
              >
                Mon panier
              </h2>
            </div>
            <div className="w-full h-[1px] bg-[#235730] mt-2"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2d2d2d]">{item.name}</h3>
                    <p className="text-[#235730] font-bold">{item.price} EUR</p>
                    <p className="text-sm text-gray-500">Quantite: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="border-[#8B2323] text-[#8B2323] hover:bg-[#8B2323] hover:text-white rounded-sm text-sm px-4 flex-1 sm:flex-initial"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Retirer du panier
                    </Button>
                    <Link href="/paiement" className="flex-1 sm:flex-initial">
                      <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm text-sm px-6 w-full">
                        Acheter
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 ? (
              <div className="text-center space-y-4">
                <p className="text-lg font-bold text-[#2d2d2d]">
                  TOTAL: {total} EUR
                </p>
                <Link href="/paiement">
                  <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm text-base px-8 py-3 h-auto">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Valider mon panier
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Votre panier est vide</p>
                <Link href="/produits">
                  <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm">
                    Decouvrir nos produits
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
