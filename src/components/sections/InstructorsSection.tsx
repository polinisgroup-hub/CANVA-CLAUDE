import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'
import { workshopConfig } from '../../config/workshop'

const gradients: [string, string][] = [
  ['#5B21B6', '#D97757'],
  ['#D97757', '#5B21B6'],
]

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Sección "Impartido por" — instructoras del taller (desde workshopConfig).
 * Si una instructora tiene `photo`, se muestra; si no, se usa un monograma.
 */
export function InstructorsSection() {
  const { instructors } = workshopConfig
  const names = instructors.map((i) => i.name)
  const title =
    names.length === 2 ? `${names[0]} y ${names[1]}` : names.join(', ')

  return (
    <Section id="instructoras" tone="lavender" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Quiénes te acompañan"
          title={
            <>
              Impartido por <span className="grad-canva">{title}</span>.
            </>
          }
          subtitle="Te guiarán paso a paso en las 4 clases pregrabadas y en la clase especial EN VIVO de Canva + Claude."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <RevealStagger className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {instructors.map((person, i) => {
            const [from, to] = gradients[i % gradients.length]
            return (
              <RevealItem key={person.name}>
                <div className="flex items-center gap-5 rounded-3xl border border-ink/[0.06] bg-white p-6 shadow-[0_12px_40px_-22px_rgba(23,20,29,0.25)]">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold text-white"
                      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
                      aria-hidden="true"
                    >
                      {initials(person.name)}
                    </span>
                  )}
                  <div>
                    <span className="block text-lg font-bold text-ink">
                      {person.name}
                    </span>
                    <span className="block text-sm text-muted">{person.role}</span>
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealStagger>
      </div>
    </Section>
  )
}
