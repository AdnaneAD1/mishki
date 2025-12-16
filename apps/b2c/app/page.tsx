import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ImageBanner } from "@/components/image-banner"
import { ReviewsSection } from "@/components/reviews-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

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
