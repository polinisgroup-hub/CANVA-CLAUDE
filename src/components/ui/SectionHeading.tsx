import type { ReactNode } from 'react'
import { Reveal } from './RevealText'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  /** Número de sección editorial, p. ej. "02" */
  index?: string
}

/**
 * Encabezado editorial reutilizable con eyebrow, título display y subtítulo.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'dark',
  className = '',
  index,
}: SectionHeadingProps) {
  const isLight = tone === 'light'
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {(eyebrow || index) && (
        <Reveal>
          <div
            className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${
              isLight ? 'text-white/55' : 'text-muted'
            }`}
          >
            {index && (
              <span className="tabular text-claude">{index}</span>
            )}
            {eyebrow && (
              <>
                {index && (
                  <span
                    className={`h-px w-6 ${isLight ? 'bg-white/25' : 'bg-ink/15'}`}
                    aria-hidden="true"
                  />
                )}
                <span>{eyebrow}</span>
              </>
            )}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tightest ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <div
            className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isLight ? 'text-white/70' : 'text-muted'
            } ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </div>
        </Reveal>
      )}
    </div>
  )
}
