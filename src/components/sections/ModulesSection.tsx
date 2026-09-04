import { Check } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/RevealText'
import { modules } from '../../config/content'

/**
 * Contenido del taller como timeline editorial (no 4 cards idénticas).
 * Rail vertical con número grande + tarjeta de contenido a la derecha.
 */
export function ModulesSection() {
  return (
    <Section id="contenido" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="06"
          eyebrow="Contenido del taller"
          title="Tu ruta para pasar de principiante a creador."
          subtitle="5 clases pregrabadas de 2–3 h cada una para aprender a tu ritmo y llevar Canva al siguiente nivel utilizando Claude."
          className="max-w-3xl"
        />

        <ol className="mt-16 space-y-4 sm:space-y-6">
          {modules.map((mod, i) => (
            <li key={mod.id}>
              <Reveal delay={i * 0.04}>
                <div className="grid gap-6 rounded-3xl border border-ink/[0.06] bg-white p-6 transition-shadow duration-500 hover:shadow-soft sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-9">
                  {/* Número + etiqueta clase */}
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-2">
                    <span className="font-display text-6xl font-bold leading-none text-ink/10 sm:text-7xl">
                      {mod.number}
                    </span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-claude">
                      Clase {mod.number}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="sm:border-l sm:border-ink/[0.07] sm:pl-10">
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.7rem]">
                      {mod.title}
                    </h3>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
                      {mod.learn.map((l) => (
                        <li
                          key={l}
                          className="inline-flex items-center gap-2 text-sm text-muted"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-purple/40" aria-hidden="true" />
                          {l}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-start gap-3 rounded-2xl bg-lavender/70 px-5 py-4">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple/15">
                        <Check className="h-3 w-3 text-purple" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <p className="text-[0.95rem] font-medium leading-snug text-ink">
                        {mod.result}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
