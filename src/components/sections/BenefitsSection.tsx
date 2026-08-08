import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'
import { benefits } from '../../config/content'

export function BenefitsSection() {
  return (
    <Section id="beneficios" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="10"
          eyebrow="Al terminar el taller"
          title="Al terminar este taller no solo sabrás usar Canva."
          subtitle={
            <span className="font-display text-xl italic text-ink sm:text-2xl">
              Sabrás qué hacer con él.
            </span>
          }
          className="max-w-3xl"
        />

        <RevealStagger className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {benefits.map((b) => (
            <RevealItem key={b.number}>
              <div className="flex items-start gap-5 border-b border-ink/[0.07] py-6">
                <span className="font-display text-3xl font-bold text-ink/15 tabular">
                  {b.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-wide text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                    {b.text}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </Section>
  )
}
