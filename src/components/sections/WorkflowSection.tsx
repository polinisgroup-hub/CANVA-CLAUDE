import { Lightbulb, Sparkles, Compass, Palette, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem, Reveal } from '../ui/RevealText'

const steps: { n: string; label: string; icon: LucideIcon }[] = [
  { n: '01', label: 'Idea', icon: Lightbulb },
  { n: '02', label: 'Claude', icon: Sparkles },
  { n: '03', label: 'Dirección visual', icon: Compass },
  { n: '04', label: 'Canva', icon: Palette },
  { n: '05', label: 'Resultado', icon: CheckCircle2 },
]

export function WorkflowSection() {
  return (
    <Section id="workflow" tone="lavender" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="08"
          eyebrow="El sistema"
          title="Así se ve crear cuando tienes un sistema."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <RevealStagger className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step) => (
            <RevealItem key={step.n}>
              <div className="group relative flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center shadow-[0_10px_40px_-24px_rgba(23,20,29,0.3)] ring-1 ring-ink/[0.04]">
                <span className="font-display text-sm font-bold text-claude tabular">
                  {step.n}
                </span>
                <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender text-purple transition-colors duration-300 group-hover:bg-purple group-hover:text-white">
                  <step.icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink">
                  {step.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-xl leading-snug text-ink sm:text-2xl">
            IA para desarrollar tus ideas.{' '}
            <span className="grad-canva">Canva para convertirlas en algo visual.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
