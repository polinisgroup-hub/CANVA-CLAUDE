import { Section } from '../ui/Section'
import { Reveal } from '../ui/RevealText'
import { PrimaryCTA } from '../ui/PrimaryCTA'

export function ProblemSection() {
  return (
    <Section id="problema" tone="white" spacing="xl">
      <div className="container-editorial">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
              <span className="text-claude tabular">02</span>
              <span className="mx-3 inline-block h-px w-6 align-middle bg-ink/15" />
              El problema real
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.08] tracking-tightest text-ink">
              Si crear contenido te toma horas, probablemente no te falta
              creatividad…{' '}
              <span className="grad-canva">te falta un sistema.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 text-base leading-relaxed text-muted sm:text-lg">
            <Reveal delay={0.1}>
              <p>
                Tal vez tienes una idea en la cabeza, abres Canva y después de 40
                minutos sigues cambiando colores, tipografías y elementos sin
                conseguir que el diseño se vea como imaginabas.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                O guardas publicaciones de otras cuentas pensando:{' '}
                <span className="text-ink">
                  «Quiero que mi contenido se vea así»
                </span>
                , pero cuando intentas hacerlo tú, algo no se siente igual.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Canva tiene muchísimas posibilidades. Y ahora también existe la
                inteligencia artificial. El problema no es tener más
                herramientas. Es saber cómo utilizarlas juntas.
              </p>
            </Reveal>
          </div>

          {/* Highlight editorial */}
          <Reveal delay={0.1}>
            <blockquote className="mt-12 border-l-2 border-claude pl-6 sm:pl-8">
              <p className="font-display text-xl font-medium italic leading-snug text-ink sm:text-2xl">
                Crear contenido profesional no empieza teniendo más herramientas.
                Empieza sabiendo cómo utilizarlas.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <PrimaryCTA size="md">QUIERO APRENDER EL SISTEMA</PrimaryCTA>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
