import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef } from 'react'
import { CanvaMagicMarquee } from './CanvaMagicMarquee'
import { PrimaryCTA } from '../ui/PrimaryCTA'
import { ClaudeSpark } from '../ui/ClaudeSpark'
import { priceLabel, workshopConfig } from '../../config/workshop'

const EASE = [0.16, 1, 0.3, 1] as const

/** Hero centrado sobre fondo blanco con marquee + CTA superpuesto. */
export const WorkshopHero = forwardRef<HTMLElement>(function WorkshopHero(
  _props,
  ref,
) {
  const reduce = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-28 sm:pt-32"
      aria-labelledby="hero-title"
    >
      {/* Halo lavanda muy sutil detrás del contenido */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[520px] max-w-4xl rounded-full bg-lavender/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-editorial flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div {...rise(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur sm:text-sm">
            <span className="text-claude" aria-hidden="true">
              ✦
            </span>
            <span className="hidden sm:inline">
              4 clases pregrabadas + 1 clase EN VIVO
            </span>
            <span className="sm:hidden">4 clases + 1 clase EN VIVO</span>
            <span className="hidden text-ink/20 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="hidden font-semibold text-ink/70 sm:inline">
              Canva + Claude
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-title"
          {...rise(0.08)}
          className="mt-7 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tightest text-ink"
        >
          Aprende y monetiza
          <span className="mt-1 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
            <span className="text-ink/80">con</span>
            <span className="grad-canva font-script text-[1.12em] font-bold">
              Canva
            </span>
            <ClaudeSpark
              className="inline-block h-[0.7em] w-[0.7em] align-middle"
              title=""
            />
            <span className="grad-canva">Claude</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:max-w-3xl"
        >
          Aprende a diseñar contenido profesional con Canva y descubre cómo
          utilizar Claude para crear tu marca personal, carruseles para
          Instagram y productos digitales desde cero.
        </motion.p>
        <motion.p {...rise(0.22)} className="mt-3 text-sm font-medium text-ink/70">
          No necesitas experiencia previa.
        </motion.p>

        {/* Microinformación */}
        <motion.p
          {...rise(0.28)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-muted sm:text-sm"
        >
          <span>{workshopConfig.recordedClasses} clases pregrabadas</span>
          <span className="text-claude" aria-hidden="true">
            •
          </span>
          <span>1 clase EN VIVO</span>
          <span className="text-claude" aria-hidden="true">
            •
          </span>
          <span className="text-ink">{priceLabel}</span>
        </motion.p>
      </div>

      {/* Marquee de cards con CTA superpuesto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.36 }}
        className="relative mt-12 sm:mt-16"
      >
        <CanvaMagicMarquee />

        {/* CTA superpuesto en el centro del marquee (z-index superior) */}
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <div className="pointer-events-auto flex flex-col items-center">
            {/* Glow para legibilidad del CTA sobre las cards */}
            <div
              className="absolute h-40 w-40 rounded-full bg-white/70 blur-2xl sm:h-52 sm:w-52"
              aria-hidden="true"
            />
            <PrimaryCTA className="relative" size="lg">
              QUIERO ENTRAR POR ${workshopConfig.price}
            </PrimaryCTA>
          </div>
        </div>
      </motion.div>

      {/* Separación inferior */}
      <div className="h-16 sm:h-24" />
    </section>
  )
})
