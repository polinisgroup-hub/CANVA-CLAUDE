import { Pause, PlayCircle, Repeat, Radio } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'

const badges: { icon: LucideIcon; label: string }[] = [
  { icon: PlayCircle, label: '4 clases pregrabadas' },
  { icon: Repeat, label: 'Nivel principiante' },
  { icon: Pause, label: 'Aprende a tu ritmo' },
  { icon: Radio, label: 'Clase especial en vivo' },
]

export function PaceSection() {
  return (
    <Section id="a-tu-ritmo" tone="white" spacing="xl">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            index="12"
            eyebrow="Aprende a tu ritmo"
            title="Aprende. Pausa. Practica. Vuelve a intentarlo."
            subtitle="Las cuatro clases principales están pregrabadas para que puedas avanzar a tu propio ritmo, detenerte, practicar y volver a cada explicación cuando lo necesites. Después llevaremos todo al siguiente nivel en nuestra clase especial EN VIVO de Canva + Claude."
          />

          <RevealStagger className="grid grid-cols-2 gap-4">
            {badges.map((b) => (
              <RevealItem key={b.label}>
                <div className="flex h-full flex-col items-start gap-4 rounded-3xl bg-lavender/70 p-6 ring-1 ring-purple/[0.08]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple shadow-sm">
                    <b.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-ink">
                    {b.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </Section>
  )
}
