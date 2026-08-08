import { X, Check } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/RevealText'
import { comparison } from '../../config/content'

export function ComparisonSection() {
  return (
    <Section id="comparacion" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="16"
          eyebrow="La diferencia"
          title={
            <>
              Puedes seguir aprendiendo por prueba y error…{' '}
              <span className="grad-canva">o empezar con un sistema.</span>
            </>
          }
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {/* Sin el taller */}
          <Reveal>
            <div className="h-full rounded-3xl border border-ink/[0.07] bg-white p-8 sm:p-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                {comparison.without.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {comparison.without.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-ink/25" strokeWidth={2.4} aria-hidden="true" />
                    <span className="text-[0.98rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Con el taller */}
          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-card sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple/40 blur-[90px]" aria-hidden="true" />
              <h3 className="relative text-xs font-bold uppercase tracking-[0.22em] text-claude">
                {comparison.with.title}
              </h3>
              <ul className="relative mt-6 space-y-3.5">
                {comparison.with.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-claude/20">
                      <Check className="h-3.5 w-3.5 text-claude" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[0.98rem] font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
