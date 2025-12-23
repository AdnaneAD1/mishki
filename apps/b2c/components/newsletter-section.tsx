import { Button } from "@/apps/b2c/components/ui/button"
import { Input } from "@/apps/b2c/components/ui/input"
import { useTranslations } from "next-intl"

export function NewsletterSection() {
  const t = useTranslations('b2c.home.newsletter')

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="mb-4 text-[#235730]"
          style={{
            fontFamily: 'var(--font-caveat)',
            fontSize: '48px',
            fontWeight: 400,
          }}
        >
          {t('title')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('desc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={t('placeholder')}
            className="flex-1 border-[#235730]"
          />
          <Button className="bg-[#235730] hover:bg-[#1d4626] text-white px-8">
            {t('btn')}
          </Button>
        </div>
      </div>
    </section>
  )
}
