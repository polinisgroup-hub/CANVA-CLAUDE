import { X, Check } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem, Reveal } from '../ui/RevealText'
import { beforeItems, afterItems } from '../../config/content'

/**
 * Antes y después. Composición editorial asimétrica (no dos cards gigantes):
 * la columna "antes" apagada, la "después" luminosa y elevada.
 */
export function TransformationSection() {
  return (
    <Section id="transformacion" tone="lavender" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="03"
          eyebrow="La transformación"
          title={
            <>
              De diseñar por intuición…{' '}
              <span className="grad-canva">a crear con intención.</span>
            </>
          }
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
          {/* ANTES */}
          <div className="rounded-3xl border border-ink/[0.06] bg-white/50 p-7 sm:p-9">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Antes
            </p>
            <RevealStagger className="space-y-4">
              {beforeItems.map((item) => (
                <RevealItem key={item}>
                  <div className="flex items-start gap-3 text-muted">
                    <X
                      className="mt-0.5 h-5 w-5 shrink-0 text-ink/30"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    <span className="text-[0.98rem] leading-snug line-through decoration-ink/20">
                      {item}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          {/* Flecha / conector */}
          <Reveal className="flex items-center justify-center py-2 lg:py-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-claude text-white shadow-cta">
              <span className="text-xl" aria-hidden="true">
                →
              </span>
              <span className="sr-only">se transforma en</span>
            </div>
          </Reveal>

          {/* DESPUÉS */}
          <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-purple/10 sm:p-9 lg:-translate-y-3">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-purple">
              Después
            </p>
            <RevealStagger className="space-y-4">
              {afterItems.map((item) => (
                <RevealItem key={item}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple/10">
                      <Check
                        className="h-3.5 w-3.5 text-purple"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-[0.98rem] font-medium leading-snug text-ink">
                      {item}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </Section>
  )
}
