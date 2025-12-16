"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const { itemCount } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#235730]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden text-white hover:opacity-80 transition-opacity">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#235730] border-[#235730]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="pb-4 border-b border-white/20">
                    <button className="w-full flex items-center gap-3 text-white text-lg hover:opacity-80 transition-opacity">
                      <Search className="w-5 h-5" />
                      <span>Recherche</span>
                    </button>
                  </div>
                  <nav className="flex flex-col gap-6">
                    <Link href="/produits" className="text-white text-lg hover:opacity-80 transition-opacity">
                      Produits
                    </Link>
                    <Link href="/blog" className="text-white text-lg hover:opacity-80 transition-opacity">
                      Blog
                    </Link>
                    <Link href="/rituels" className="text-white text-lg hover:opacity-80 transition-opacity">
                      Rituels
                    </Link>
                    <Link href="/podcast" className="text-white text-lg hover:opacity-80 transition-opacity">
                      Podcast
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/produits" className="text-white text-sm hover:opacity-80 transition-opacity">
                Produits
              </Link>
              <Link href="/blog" className="text-white text-sm hover:opacity-80 transition-opacity">
                Blog
              </Link>
              <Link href="/rituels" className="text-white text-sm hover:opacity-80 transition-opacity">
                Rituels
              </Link>
              <Link href="/podcast" className="text-white text-sm hover:opacity-80 transition-opacity">
                Podcast
              </Link>
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo-mishki.png"
              alt="Mishki"
              width={160}
              height={53}
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden md:block text-white hover:opacity-80 transition-opacity">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/panier" className="text-white hover:opacity-80 transition-opacity relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#235730] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
            <Link href="/connexion" className="hidden md:block">
              <Button variant="ghost" className="text-white text-sm hover:bg-white/10">
                Connexion/Inscription
              </Button>
            </Link>
            <Link href="/connexion" className="md:hidden">
              <button className="text-white hover:opacity-80 transition-opacity">
                <User className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
