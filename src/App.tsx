import { useRef } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { StickyMobileCTA } from './components/layout/StickyMobileCTA'
import { WorkshopHero } from './components/hero/WorkshopHero'
import { ProblemSection } from './components/sections/ProblemSection'
import { TransformationSection } from './components/sections/TransformationSection'
import { AudienceSection } from './components/sections/AudienceSection'
import { EditorialTransition } from './components/sections/EditorialTransition'
import { ModulesSection } from './components/sections/ModulesSection'
import { LiveClassSection } from './components/sections/LiveClassSection'
import { WorkflowSection } from './components/sections/WorkflowSection'
import { PossibilitiesSection } from './components/sections/PossibilitiesSection'
import { BenefitsSection } from './components/sections/BenefitsSection'
import { OfferStackSection } from './components/sections/OfferStackSection'
import { PaceSection } from './components/sections/PaceSection'
import { GallerySection } from './components/sections/GallerySection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { PricingSection } from './components/sections/PricingSection'
import { ComparisonSection } from './components/sections/ComparisonSection'
import { ObjectionsSection } from './components/sections/ObjectionsSection'
import { FAQSection } from './components/sections/FAQSection'
import { FinalCTA } from './components/sections/FinalCTA'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useStickyCta } from './hooks/useStickyCta'

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useSmoothScroll()
  const stickyVisible = useStickyCta(heroRef, footerRef)

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="top">
        <WorkshopHero ref={heroRef} />
        <ProblemSection />
        <TransformationSection />
        <AudienceSection />
        <EditorialTransition />
        <ModulesSection />
        <LiveClassSection />
        <WorkflowSection />
        <PossibilitiesSection />
        <BenefitsSection />
        <OfferStackSection />
        <PaceSection />
        <GallerySection />
        <TestimonialsSection />
        <PricingSection />
        <ComparisonSection />
        <ObjectionsSection />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer ref={footerRef} />

      <StickyMobileCTA visible={stickyVisible} />
    </>
  )
}
