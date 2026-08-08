import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { TestimonialsColumn } from '../ui/testimonials-columns'
import { testimonials } from '../../config/testimonials'

/**
 * Testimonios reales (capturas de mensajes de alumnas) en 3 columnas con
 * scroll vertical infinito. Nada inventado: todas son capturas aportadas.
 * En pantallas pequeñas se muestran menos columnas.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null

  // Reparte los testimonios en 3 columnas
  const columns = [0, 1, 2].map((c) =>
    testimonials.filter((_, i) => i % 3 === c),
  )
  const durations = [30, 38, 34]

  return (
    <Section id="testimonios" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="14"
          eyebrow="Testimonios"
          title="Ellas ya comenzaron a transformar su forma de crear."
          subtitle="Mensajes reales de alumnas del taller."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div
          className="mt-14 flex justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]"
          style={{ maxHeight: 640 }}
        >
          <TestimonialsColumn testimonials={columns[0]} duration={durations[0]} />
          <TestimonialsColumn
            testimonials={columns[1]}
            duration={durations[1]}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={columns[2]}
            duration={durations[2]}
            className="hidden lg:block"
          />
        </div>
      </div>
    </Section>
  )
}
