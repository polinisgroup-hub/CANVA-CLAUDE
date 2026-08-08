import { Quote } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'

/**
 * Testimonios reales.
 *
 * ⚠️ IMPORTANTE: NO se inventan testimonios, nombres ni cifras.
 *   • Añade testimonios reales al array `testimonials` de abajo.
 *   • Mientras el array esté VACÍO, se muestra un placeholder editorial
 *     claramente marcado como PENDIENTE.
 *   • Si prefieres OCULTAR la sección hasta tener datos reales, cambia
 *     `HIDE_UNTIL_REAL` a `true`.
 */
interface Testimonial {
  name: string
  role: string
  quote: string
  avatar?: string
}

// EDITAR: pega aquí testimonios reales (con permiso de la persona).
const testimonials: Testimonial[] = []

const HIDE_UNTIL_REAL = false

export function TestimonialsSection() {
  const hasReal = testimonials.length > 0

  if (!hasReal && HIDE_UNTIL_REAL) return null

  return (
    <Section id="testimonios" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="14"
          eyebrow="Testimonios"
          title="Ellos ya comenzaron a transformar su forma de crear."
          align="center"
          className="mx-auto max-w-2xl"
        />

        {hasReal ? (
          <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.name}>
                <figure className="flex h-full flex-col rounded-3xl border border-ink/[0.06] bg-white p-7 shadow-soft">
                  <Quote className="h-7 w-7 text-claude/40" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.avatar && (
                      <img
                        src={t.avatar}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {t.name}
                      </span>
                      <span className="block text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : (
          // Placeholder editorial claramente marcado como PENDIENTE.
          <div className="mt-14">
            <div className="grid gap-5 md:grid-cols-3" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex h-full flex-col rounded-3xl border border-dashed border-ink/15 bg-lavender/40 p-7"
                >
                  <Quote className="h-7 w-7 text-ink/20" />
                  <div className="mt-4 flex-1 space-y-2.5">
                    <span className="block h-3 w-full rounded-full bg-ink/10" />
                    <span className="block h-3 w-11/12 rounded-full bg-ink/10" />
                    <span className="block h-3 w-4/5 rounded-full bg-ink/10" />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-ink/10" />
                    <span className="space-y-1.5">
                      <span className="block h-2.5 w-24 rounded-full bg-ink/10" />
                      <span className="block h-2 w-16 rounded-full bg-ink/10" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted">
              <span className="font-semibold text-ink">Sección pendiente:</span>{' '}
              añade testimonios reales en{' '}
              <code className="rounded bg-ink/5 px-1.5 py-0.5 text-[0.75rem]">
                TestimonialsSection.tsx
              </code>{' '}
              (no se muestran testimonios inventados).
            </p>
          </div>
        )}
      </div>
    </Section>
  )
}
