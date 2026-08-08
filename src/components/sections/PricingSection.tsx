import { PlayCircle, Radio, Check, ShieldCheck } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/RevealText'
import { PrimaryCTA } from '../ui/PrimaryCTA'
import { ClaudeSpark } from '../ui/ClaudeSpark'
import { workshopConfig } from '../../config/workshop'

/**
 * Bloque de oferta premium.
 * El precio actual es $47 (precio promocional autorizado). Se muestra el
 * precio normal ($97) sin recurrir a un tachado agresivo ni a descuentos
 * inventados: solo el dato promocional que indicó el cliente.
 */
export function PricingSection() {
  const { price, compareAtPrice, currency, recordedClasses, liveClasses } =
    workshopConfig

  const included = [
    { icon: PlayCircle, text: `${recordedClasses} clases pregrabadas` },
    { icon: Radio, text: `${liveClasses} clase especial EN VIVO · Canva + Claude` },
  ]

  return (
    <Section id="oferta" tone="lavender" spacing="xl">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-glow sm:p-12">
              {/* Glows internos */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple/40 blur-[100px]" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-claude/20 blur-[100px]" aria-hidden="true" />

              <div className="relative text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  <ClaudeSpark className="h-3.5 w-3.5" />
                  La oferta
                </span>

                <h2 className="mt-6 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-tight">
                  Todo lo que necesitas para empezar.
                </h2>

                {/* Incluye */}
                <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
                  {included.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-claude">
                        <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium sm:text-base">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Precio */}
                <div className="mt-10">
                  {compareAtPrice && (
                    <p className="text-sm font-medium text-white/50">
                      <span className="rounded-full bg-claude/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-claude">
                        Precio promocional
                      </span>
                      <span className="ml-3 align-middle">
                        Normalmente ${compareAtPrice} {currency}
                      </span>
                    </p>
                  )}
                  <div className="mt-3 flex items-baseline justify-center gap-2">
                    <span className="font-display text-7xl font-bold leading-none sm:text-8xl">
                      ${price}
                    </span>
                    <span className="text-xl font-medium text-white/60">
                      {currency}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-white/60">
                    {workshopConfig.paymentType}
                  </p>
                </div>

                <PrimaryCTA className="mt-8 w-full sm:w-auto" size="lg">
                  QUIERO ENTRAR AL TALLER POR ${price}
                </PrimaryCTA>

                <p className="mt-5 flex items-center justify-center gap-2 text-xs text-white/50">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Pago único · Acceso a todo el contenido del taller
                </p>
              </div>
            </div>
          </Reveal>

          {/* Micro-lista de refuerzo */}
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              {['Sin experiencia previa', 'Aprende a tu ritmo', 'Diseño + IA'].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-purple" strokeWidth={2.5} aria-hidden="true" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
