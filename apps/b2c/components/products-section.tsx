'use client'

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ZoomIn } from "lucide-react"
import { Button } from "@/apps/b2c/components/ui/button"
import { Input } from "@/apps/b2c/components/ui/input"
import { useCart } from "@/apps/b2c/lib/cart-context"
import { useProducts } from "@/apps/b2c/hooks/useProducts"
import { useLocale, useTranslations } from "next-intl"
import { useMemo, useState } from "react"

export function ProductsSection() {
  const { addToCart } = useCart()
  const t = useTranslations('b2c.home.products')
  const locale = useLocale()
  const { products, loading, error } = useProducts()
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const minQty = 1
  const limitedProducts = products.slice(0, 4)

  const formatMoney = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale]
  )

  const openQuantityPicker = (slug: string) => {
    setActiveProduct(slug)
    setQuantity(minQty)
  }

  const handleQuantityChange = (value: string) => {
    const parsed = parseInt(value, 10)
    setQuantity(Number.isNaN(parsed) ? minQty : parsed)
  }

  const handleConfirm = (product: typeof products[number]) => {
    const qty = Math.max(minQty, quantity || minQty)
    addToCart(
      {
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty
    )
    setActiveProduct(null)
  }

  const handleCancel = () => {
    setActiveProduct(null)
    setQuantity(minQty)
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
            {t('title')}
          </h2>
          <div className="w-full h-[1px] bg-[#235730]"></div>
        </div>

        {loading && (
          <div className="py-8 text-center text-gray-600">{t('loading') ?? 'Chargement...'}</div>
        )}
        {error && !loading && (
          <div className="py-8 text-center text-red-600">{error}</div>
        )}
        {!loading && !error && limitedProducts.length === 0 && (
          <div className="py-8 text-center text-gray-600">{t('empty') ?? 'Aucun produit.'}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {limitedProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-transparent"
            >
              <Link href={`/produits/${product.slug}`}>
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
                <Link href={`/produits/${product.slug}`}>
                  <h3 className="font-semibold text-base text-[#2d2d2d] hover:text-[#235730] transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-[#2d2d2d] leading-relaxed">
                  {product.desc || product.long_desc || ''}
                </p>
                <p className="text-[#235730] font-semibold">{formatMoney.format(product.price)}</p>
                {activeProduct === product.slug ? (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <div className="flex items-center w-full max-w-[180px] border border-[#235730]/40 rounded-sm overflow-hidden mx-auto">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(minQty, (q || minQty) - 1))}
                        className="px-2.5 py-2 text-[#235730] hover:bg-[#235730]/10"
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        min={minQty}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        className="h-10 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(minQty, (q || minQty) + 1))}
                        className="px-2.5 py-2 text-[#235730] hover:bg-[#235730]/10"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleConfirm(product)}
                        className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm text-xs px-3 py-2 h-auto"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('add_to_cart')}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="secondary"
                        className="bg-white text-[#235730] border border-[#235730] hover:bg-[#235730] hover:text-white rounded-sm text-xs px-3 py-2 h-auto"
                      >
                        {t('cancel') ?? 'Annuler'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => openQuantityPicker(product.slug)}
                    className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm text-sm px-6 py-2 h-auto"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('add_to_cart')}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
