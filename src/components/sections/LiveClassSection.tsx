import { Radio, ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/RevealText'
import { BrandLockup } from '../ui/BrandLockup'
import { WorkflowFlow } from '../ui/WorkflowFlow'
import { liveBlocks } from '../../config/content'

/**
 * Clase especial EN VIVO — sección protagonista.
 * Atmósfera oscura (violeta profundo) con glows azul/violeta y acentos Claude.
 * Enfoque: DISEÑO + IA + MARCA PERSONAL + CONTENIDO VISUAL + PRODUCTOS DIGITALES.
 */
export function LiveClassSection() {
  return (
    <Section id="clase-en-vivo" tone="dark" spacing="xl" className="isolate">
      {/* Glows atmosféricos */}
      <div
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-purple/40 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-purple-deep/60 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-claude/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-editorial">
        {/* Cabecera */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              <Radio className="h-3.5 w-3.5 text-claude" aria-hidden="true" />
              Clase especial EN VIVO
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-8 flex justify-center">
              <BrandLockup tone="light" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.06] tracking-tightest text-white">
              Diseña con Canva.{' '}
              <span className="text-claude">Potencia tus ideas con Claude.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Aprende a combinar diseño + inteligencia artificial para construir
              tu marca, crear contenido profesional y transformar una idea en un
              producto digital.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl border-t border-white/10 pt-6 font-display text-lg italic text-white/85">
              No será una clase para mirar. Verás cómo construimos cada pieza
              desde cero.
            </p>
          </Reveal>
        </div>

        {/* Bloques de la clase en vivo */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {liveBlocks.map((block, i) => (
            <Reveal key={block.id} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] sm:p-8">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-claude">
                  {block.tag}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {block.title}
                </h3>
                <ul className="mt-5 grid gap-2">
                  {block.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 text-sm text-white/70"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-purple/70" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Workflow
                  </p>
                  <WorkflowFlow steps={block.workflow} tone="dark" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Nota conceptual */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-xl leading-snug text-white/90 sm:text-2xl">
            «Claude te ayuda a desarrollar la idea.{' '}
            <span className="text-claude">Canva te ayuda a darle forma.»</span>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
