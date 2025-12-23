import { Button } from "@/apps/b2c/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations('b2c.home.hero')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/b2c/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(35, 87, 48, 0) 0%, rgba(35, 87, 48, 0.9) 80%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl text-white space-y-4 sm:space-y-6 md:space-y-8">
          <h1
            className="text-white text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-caveat)',
            }}
          >
            {t('title')}
          </h1>

          <p className="text-white text-left text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-3xl">
            {t('desc')}
          </p>

          <div className="pt-2 sm:pt-4">
            <Link href="/produits">
              <Button className="bg-white text-[#235730] hover:bg-white/90 text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 rounded-sm font-medium flex items-center gap-2">
                {t('cta')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
