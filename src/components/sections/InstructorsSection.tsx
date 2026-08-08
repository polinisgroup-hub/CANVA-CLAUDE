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
                    {person.whatsapp && (
                      <a
                        href={`https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
                          `Hola ${person.name.split(' ')[0]} 👋, tengo dudas sobre el Taller Canva + Claude.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#128C4A] transition-opacity hover:opacity-80"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        </svg>
                        WhatsApp
                      </a>
                    )}
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
