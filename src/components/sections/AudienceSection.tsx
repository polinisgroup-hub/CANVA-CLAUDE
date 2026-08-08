import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'
import { audience } from '../../config/content'

export function AudienceSection() {
  return (
    <Section id="para-quien" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="04"
          eyebrow="Para quién es"
          title="Este taller es para ti si…"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <RevealStagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => (
            <RevealItem key={item.number}>
              <div className="group h-full bg-white p-8 transition-colors duration-300 hover:bg-lavender">
                <span className="font-display text-4xl font-semibold text-ink/15 transition-colors duration-300 group-hover:text-purple/40">
                  {item.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold uppercase tracking-wide text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </Section>
  )
}
