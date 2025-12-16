'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CreditCard, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsletterSection } from '@/components/newsletter-section'

type Step = 'compte' | 'livraison' | 'paiement'

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState<Step>('compte')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '',
    phone: '',
    city: '',
    postalCode: '',
    deliveryType: 'Point relais',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'compte', label: 'Compte' },
    { key: 'livraison', label: 'Livraison' },
    { key: 'paiement', label: 'Paiement' },
  ]

  const getStepStatus = (stepKey: Step) => {
    const stepOrder: Step[] = ['compte', 'livraison', 'paiement']
    const currentIndex = stepOrder.indexOf(currentStep)
    const stepIndex = stepOrder.indexOf(stepKey)

    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'pending'
  }

  const handleValidate = () => {
    setShowConfirmation(true)
  }

  if (showConfirmation) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-12 shadow-lg text-center max-w-md mx-4">
            <h2
              className="text-[#235730] mb-6"
              style={{
                fontFamily: 'var(--font-caveat)',
                fontSize: '32px',
                fontWeight: 400,
              }}
            >
              Commande en<br />cours de validation
            </h2>
            <div className="w-24 h-24 mx-auto bg-[#235730] rounded-full flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
              <div className="w-20 h-20 bg-[#235730] rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="mt-8">
              <Link href="/">
                <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm px-8">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="mb-10">
            <Link href="/panier" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <Image
                src="/akar-icons_arrow-back.svg"
                alt="Retour"
                width={32}
                height={32}
              />
            </Link>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#235730]" />
              <h2
                className="text-[#235730]"
                style={{
                  fontFamily: 'var(--font-caveat)',
                  fontSize: '48px',
                  fontWeight: 400,
                }}
              >
                Payement
              </h2>
            </div>
            <div className="w-full h-[1px] bg-[#235730] mt-2"></div>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-8">
                {steps.map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${getStepStatus(step.key) === 'current' ? 'text-[#235730] font-medium' : 'text-gray-500'}`}>
                        {step.label}
                      </span>
                      {getStepStatus(step.key) === 'completed' && (
                        <div className="w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {getStepStatus(step.key) === 'current' && (
                        <div className="w-5 h-5 border-2 border-[#235730] rounded-full" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-[1px] bg-gray-300 mx-2" />
                    )}
                  </div>
                ))}
              </div>

              {currentStep === 'compte' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-[#2d2d2d]">Informations de compte</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm text-gray-500">Email address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="Email@myemail.com"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                        {formData.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm text-gray-500">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          placeholder="********"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                        {formData.password && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-4">
                    <button className="text-sm text-gray-500 hover:text-[#235730] underline">
                      Inscription
                    </button>
                    <Button className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm px-8">
                      Connexion
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
                    <button className="text-sm text-gray-500 hover:text-[#235730]">
                      Annuler
                    </button>
                    <Button
                      onClick={() => setCurrentStep('livraison')}
                      className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm px-6"
                    >
                      Informations<br />de livraisons
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'livraison' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-[#2d2d2d]">Informations de livraisons</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-500">Utiliser l'adresse sauvegarder</Label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#235730] focus:ring-[#235730]">
                        <option>123 , Electric avenue</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-sm text-gray-500">Adresse</Label>
                      <div className="relative">
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          placeholder="123"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                        {formData.address && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm text-gray-500">Numéro de téléphone</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+33XXXXXXX"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                        {formData.phone && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-sm text-gray-500">Ville</Label>
                      <div className="relative">
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          placeholder="Electric avenue"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                        {formData.city && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode" className="text-sm text-gray-500">Code postal</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => updateFormData('postalCode', e.target.value)}
                          placeholder="ABC - 123"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Type de livraison</Label>
                        <select
                          value={formData.deliveryType}
                          onChange={(e) => updateFormData('deliveryType', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#235730] focus:ring-[#235730]"
                        >
                          <option>Point relais</option>
                          <option>Domicile</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-8">
                    <button
                      onClick={() => setCurrentStep('compte')}
                      className="text-sm text-gray-500 hover:text-[#235730]"
                    >
                      Annuler
                    </button>
                    <Button
                      onClick={() => setCurrentStep('paiement')}
                      className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm px-8"
                    >
                      Payer
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'paiement' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-[#2d2d2d]">Infos de paiement</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-500">Utiliser votre carte enregistrer</Label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#235730] focus:ring-[#235730]">
                        <option>Mastercard ending 234</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="cardName" className="text-sm text-gray-500">Nom sur la carte</Label>
                      <div className="relative">
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => updateFormData('cardName', e.target.value)}
                          placeholder="John Smith"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                        {formData.cardName && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#235730] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="text-sm text-gray-500">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => updateFormData('cardNumber', e.target.value)}
                        placeholder="123 - 456 -"
                        className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label className="text-sm text-gray-500">Expiration</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={formData.expMonth}
                            onChange={(e) => updateFormData('expMonth', e.target.value)}
                            placeholder="03"
                            className="border-gray-300 focus:border-[#235730] focus:ring-[#235730] text-center"
                          />
                          <span className="text-gray-400">/</span>
                          <Input
                            value={formData.expYear}
                            onChange={(e) => updateFormData('expYear', e.target.value)}
                            placeholder="24"
                            className="border-gray-300 focus:border-[#235730] focus:ring-[#235730] text-center"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500 flex items-center gap-1">
                          CVC <Info className="w-3 h-3" />
                        </Label>
                        <Input
                          value={formData.cvc}
                          onChange={(e) => updateFormData('cvc', e.target.value)}
                          placeholder="123"
                          className="border-gray-300 focus:border-[#235730] focus:ring-[#235730]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-8">
                    <button
                      onClick={() => setCurrentStep('livraison')}
                      className="text-sm text-gray-500 hover:text-[#235730]"
                    >
                      Annuler l'achat
                    </button>
                    <Button
                      onClick={handleValidate}
                      className="bg-[#235730] hover:bg-[#1d4626] text-white rounded-sm px-8"
                    >
                      Valider l'achat
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
}
