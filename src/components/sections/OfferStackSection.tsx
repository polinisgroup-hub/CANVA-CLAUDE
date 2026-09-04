import { PlayCircle, Check } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal, RevealStagger, RevealItem } from '../ui/RevealText'
import { PrimaryCTA } from '../ui/PrimaryCTA'
import { modules } from '../../config/content'
import { workshopConfig } from '../../config/workshop'

export function OfferStackSection() {
  return (
    <Section id="incluye" tone="lavender" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="11"
          eyebrow="Todo lo que recibes"
          title={
            <>
              Esto es todo lo que desbloqueas por{' '}
              <span className="text-claude">${workshopConfig.price}</span>.
            </>
          }
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Lista de clases */}
          <RevealStagger className="space-y-3">
            {modules.map((mod) => (
              <RevealItem key={mod.id}>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/[0.04]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lavender text-purple">
                    <PlayCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                      Clase {mod.number}
                    </span>
                    <span className="block font-medium text-ink">{mod.title}</span>
                  </div>
                </div>
              </RevealItem>
            ))}
            <RevealItem>
              <div className="flex items-center gap-4 rounded-2xl bg-ink p-5 text-white ring-1 ring-white/10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-claude">
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-claude">
                    Clase 05 · La clase estrella
                  </span>
                  <span className="block font-medium">Canva + Claude en acción</span>
                </div>
              </div>
            </RevealItem>
          </RevealStagger>

          {/* Resumen destacado */}
          <Reveal delay={0.1}>
            <div className="sticky top-8 rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-purple/10">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-ink">
                <span className="tabular text-2xl font-bold text-purple">
                  {workshopConfig.recordedClasses}
                </span>
                <span className="text-left uppercase leading-tight tracking-wide">
                  clases
                  <br />
                  pregrabadas
                </span>
                <span className="mx-2 text-2xl text-claude">·</span>
                <span className="text-left uppercase leading-tight tracking-wide">
                  {workshopConfig.classDuration}
                  <br />
                  cada una
                </span>
              </div>

              <div className="my-6 h-px w-full bg-ink/10" />

              <div className="flex items-baseline justify-center gap-2">
                <span className="font-display text-6xl font-bold text-ink">
                  ${workshopConfig.price}
                </span>
                <span className="text-lg font-medium text-muted">
                  {workshopConfig.currency}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-muted">
                {workshopConfig.paymentType}
              </p>

              <PrimaryCTA className="mt-7 w-full" size="lg">
                QUIERO TODO POR ${workshopConfig.price}
              </PrimaryCTA>

              <ul className="mt-6 space-y-2 text-left">
                {['Acceso a las 5 clases pregrabadas', '2–3 h de contenido por clase', 'Aprende a tu propio ritmo'].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-muted"
                    >
                      <Check className="h-4 w-4 shrink-0 text-purple" strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
