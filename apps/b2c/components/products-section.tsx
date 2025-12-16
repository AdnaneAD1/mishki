'use client'

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

const products = [
  {
    id: 1,
    name: "Creme Hydratante",
    price: 24,
    description: "Small description Small description Small description Small description",
    image: "/produit-1.png",
  },
  {
    id: 2,
    name: "Lotion de nettoyage",
    price: 22,
    description: "Small description Small description Small description Small description",
    image: "/produit-2.png",
  },
  {
    id: 3,
    name: "Huile de jojoba",
    price: 24,
    description: "Small description Small description Small description Small description",
    image: "/produit-3.png",
  },
  {
    id: 4,
    name: "Creme Hydratante",
    price: 28,
    description: "Small description Small description Small description Small description",
    image: "/produit-4.png",
  },
]

export function ProductsSection() {
  const { addToCart } = useCart()

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section className="py-16 bg-[#f5f1e8]">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2
            className="text-[#235730] mb-2"
            style={{
              fontFamily: 'var(--font-caveat)',
              fontSize: '48px',
              fontWeight: 400,
            }}
          >
            Nouveautes
          </h2>
          <div className="w-full h-[1px] bg-[#235730]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
    </section>
  )
}
