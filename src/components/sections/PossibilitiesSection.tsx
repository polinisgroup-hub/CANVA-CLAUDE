import { UserCircle2, Instagram, FileText, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'
import { possibilities } from '../../config/content'

const meta: { icon: LucideIcon; gradient: [string, string] }[] = [
  { icon: UserCircle2, gradient: ['#7C3AED', '#C026D3'] },
  { icon: Instagram, gradient: ['#2563EB', '#06B6D4'] },
  { icon: FileText, gradient: ['#0D9488', '#22C55E'] },
  { icon: Briefcase, gradient: ['#F59E0B', '#EF4444'] },
]

export function PossibilitiesSection() {
  return (
    <Section id="posibilidades" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="09"
          eyebrow="Todo lo que puedes crear"
          title={
            <>
              Una herramienta.{' '}
              <span className="grad-canva">Decenas de posibilidades.</span>
            </>
          }
          align="center"
          className="mx-auto max-w-2xl"
        />

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2">
          {possibilities.map((group, i) => {
            const { icon: Icon, gradient } = meta[i]
            return (
              <RevealItem key={group.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-ink/[0.06] bg-white p-8 transition-shadow duration-500 hover:shadow-card">
                  {/* Halo de color de la categoría */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                    }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-ink">
                    {group.title}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-lavender px-3.5 py-1.5 text-sm font-medium text-ink/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            )
          })}
        </RevealStagger>
      </div>
    </Section>
  )
}
