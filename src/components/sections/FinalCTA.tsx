import { Reveal } from '../ui/RevealText'
import { SparkleButton } from '@/components/ui/button-8'
import { BrandLockup } from '../ui/BrandLockup'
import { getCheckoutUrl, workshopConfig } from '../../config/workshop'

/**
 * CTA final casi fullscreen con gradiente violeta + azul profundo.
 * Cierre del recorrido psicológico: visualización → oferta → precio → acción.
 */
export function FinalCTA() {
  const { price, currency, paymentType } = workshopConfig

  return (
    <section
      id="acceso"
      className="relative flex min-h-[88vh] items-center overflow-hidden py-24 text-white"
      aria-labelledby="final-cta-title"
      style={{
        backgroundImage:
          'linear-gradient(140deg, #312E81 0%, #4C1D95 40%, #5B21B6 70%, #4338CA 100%)',
      }}
    >
      {/* Glows atmosféricos */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple/50 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-500/40 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-claude/20 blur-[120px]" aria-hidden="true" />

      <div className="container-editorial relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3.6vw,2.4rem)] font-medium italic leading-tight text-white/80">
              Tu próxima idea merece algo mejor que quedarse en tu cabeza.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="final-cta-title"
              className="mt-6 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.03] tracking-tightest"
            >
              Aprende a convertir tus ideas en diseños.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              4 clases pregrabadas + 1 clase especial EN VIVO para aprender
              Canva, potenciar tu proceso creativo con Claude y crear contenido
              visual que represente tus ideas.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex justify-center">
              <BrandLockup tone="light" />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex items-baseline justify-center gap-2">
              <span className="font-display text-6xl font-bold sm:text-7xl">
                ${price}
              </span>
              <span className="text-lg font-medium text-white/60">{currency}</span>
            </div>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.24em] text-white/60">
              {paymentType}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex justify-center">
              <SparkleButton href={getCheckoutUrl()}>
                QUIERO MI ACCESO POR ${price}
              </SparkleButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
