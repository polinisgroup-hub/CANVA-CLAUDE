import { Section } from '../ui/Section'
import { Reveal } from '../ui/RevealText'

const phrases = [
  { text: 'No necesitas convertirte en diseñador gráfico.', muted: true },
  { text: 'Necesitas aprender a comunicar visualmente tus ideas.', muted: false },
  { text: 'Y eso es exactamente lo que vamos a hacer.', muted: false, accent: true },
]

/** Transición editorial: mucho espacio negativo, texto que aparece al hacer scroll. */
export function EditorialTransition() {
  return (
    <Section tone="white" spacing="xl" aria-label="Transición">
      <div className="container-editorial">
        <div className="mx-auto flex max-w-4xl flex-col gap-14 py-10 text-center sm:gap-20 sm:py-16">
          {phrases.map((p, i) => (
            <Reveal key={p.text} delay={i * 0.05} y={30}>
              <p
                className={`font-display text-[clamp(1.6rem,4.5vw,3.25rem)] font-medium leading-[1.12] tracking-tight ${
                  p.accent
                    ? 'grad-canva font-semibold'
                    : p.muted
                      ? 'text-ink/35'
                      : 'text-ink'
                }`}
              >
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
