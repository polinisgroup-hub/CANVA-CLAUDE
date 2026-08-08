import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { CheckCheck, PlayCircle, Radio, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TimelineContent } from '@/components/ui/timeline-animation'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import { Section } from '../ui/Section'
import { getCheckoutUrl, workshopConfig } from '../../config/workshop'

/**
 * Bloque de oferta — basado en el componente de pricing de 21st.dev
 * (VerticalCutReveal + TimelineContent + NumberFlow + tarjeta con CTA
 * degradado), adaptado a la oferta ÚNICA del taller: $47, pago único.
 * Sin planes ni facturación mensual/anual (no aplican).
 */
export function PricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(pricingRef, { once: true, margin: '-120px' })
  const { price, compareAtPrice, currency, recordedClasses, liveClasses } =
    workshopConfig
  const href = getCheckoutUrl()
  const isExternal = /^https?:\/\//.test(href)

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
    hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
  }

  const includes = [
    `${recordedClasses} clases pregrabadas`,
    `${liveClasses} clase especial EN VIVO · Canva + Claude`,
    'Aprende a tu propio ritmo',
    'Acceso de por vida',
    'Sin experiencia previa',
  ]

  return (
    <Section id="oferta" tone="lavender" spacing="xl">
      <div ref={pricingRef} className="container-editorial relative">
        {/* Encabezado */}
        <article className="mx-auto mb-10 max-w-2xl space-y-4 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tightest text-ink">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              reverse
              containerClassName="justify-center"
              transition={{ type: 'spring', stiffness: 250, damping: 40 }}
            >
              Todo lo que necesitas para empezar
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="mx-auto max-w-xl text-base text-muted"
          >
            Un solo taller, un solo pago. Sin suscripciones ni cobros
            recurrentes.
          </TimelineContent>
        </article>

        {/* Tarjeta única de la oferta */}
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="mx-auto max-w-md"
        >
          <Card className="relative border-2 border-claude/60 bg-white shadow-card ring-2 ring-claude/20">
            <CardHeader className="text-left">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  Taller Canva + Claude
                </h3>
                <span className="rounded-full bg-claude px-3 py-1 text-xs font-semibold text-white">
                  Promo
                </span>
              </div>
              <p className="mb-2 text-sm text-muted">
                Aprende a diseñar con Canva y a potenciar tus ideas con Claude.
                4 clases pregrabadas + 1 clase especial EN VIVO.
              </p>

              {compareAtPrice && (
                <p className="text-sm text-muted">
                  <span className="rounded-full bg-claude/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-claude">
                    Precio promocional
                  </span>
                  <span className="ml-2 align-middle">
                    Normalmente ${compareAtPrice} {currency}
                  </span>
                </p>
              )}

              <div className="flex items-baseline">
                <span className="font-display text-5xl font-bold text-ink">
                  $
                  <NumberFlow
                    value={inView ? price : 0}
                    className="font-display text-5xl font-bold"
                  />
                </span>
                <span className="ml-2 text-muted">{currency} · pago único</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <a
                href={href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="mb-6 block w-full rounded-xl border border-claude/40 bg-gradient-to-t from-claude-hover to-claude p-4 text-center text-lg font-semibold text-white shadow-lg shadow-claude/40 transition-transform duration-300 ease-expo hover:scale-[1.02]"
              >
                QUIERO ENTRAR AL TALLER POR ${price}
              </a>

              <div className="space-y-3 border-t border-neutral-200 pt-4">
                <h4 className="mb-1 text-base font-semibold text-ink">
                  Esto incluye:
                </h4>
                <ul className="space-y-2.5">
                  {includes.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-3 grid h-6 w-6 place-content-center rounded-full border border-claude bg-white">
                        <CheckCheck className="h-4 w-4 text-claude" />
                      </span>
                      <span className="text-sm text-ink/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Pago único · Acceso a todo el contenido del taller
              </p>
            </CardContent>
          </Card>
        </TimelineContent>

        {/* Refuerzo visual (iconos de lo que incluye) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-auto mt-8 flex max-w-md items-center justify-center gap-6 text-sm text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-purple" /> {recordedClasses} pregrabadas
          </span>
          <span className="inline-flex items-center gap-2">
            <Radio className="h-4 w-4 text-claude" /> {liveClasses} EN VIVO
          </span>
        </motion.div>
      </div>
    </Section>
  )
}
