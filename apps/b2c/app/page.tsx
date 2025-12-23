import { Header } from "@/apps/b2c/components/header"
import { HeroSection } from "@/apps/b2c/components/hero-section"
import { ProductsSection } from "@/apps/b2c/components/products-section"
import { ImageBanner } from "@/apps/b2c/components/image-banner"
import { ReviewsSection } from "@/apps/b2c/components/reviews-section"
import { NewsletterSection } from "@/apps/b2c/components/newsletter-section"
import { Footer } from "@/apps/b2c/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProductsSection />
      <ImageBanner />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
