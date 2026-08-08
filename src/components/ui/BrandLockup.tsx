import { ClaudeSpark } from './ClaudeSpark'

/**
 * Logo del taller: "Canva ✳ Claude".
 *  • "Canva" en tipografía script
 *  • spark de Claude (acento naranja) en el centro
 *  • "Claude" en sans redondeada
 * Adaptable a fondos claros (tone="dark") u oscuros (tone="light").
 */

interface BrandLockupProps {
  /** Tono del texto: "dark" para fondos claros, "light" para fondos oscuros */
  tone?: 'dark' | 'light'
  className?: string
  /** Muestra el eyebrow "Taller online" y el tagline inferior */
  full?: boolean
}

export function BrandLockup({
  tone = 'dark',
  className = '',
  full = false,
}: BrandLockupProps) {
  const textColor = tone === 'light' ? 'text-white' : 'text-ink'
  const lineColor = tone === 'light' ? 'bg-white/25' : 'bg-claude/40'
  const subColor = tone === 'light' ? 'text-white/60' : 'text-muted'

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {full && (
        <span
          className={`mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.35em] ${subColor}`}
        >
          Taller online
        </span>
      )}
      <span className="flex items-center gap-2 sm:gap-3">
        <span className={`font-script text-3xl leading-none sm:text-4xl ${textColor}`}>
          Canva
        </span>
        <ClaudeSpark className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" title="Canva + Claude" />
        <span
          className={`font-sans text-2xl font-semibold leading-none sm:text-3xl ${textColor}`}
        >
          Claude
        </span>
      </span>
      {full && (
        <>
          <span className={`mt-2 h-px w-40 ${lineColor}`} aria-hidden="true" />
          <span
            className={`mt-2 text-[0.6rem] font-medium uppercase tracking-[0.3em] ${subColor}`}
          >
            Aprende · Crea · Monetiza
          </span>
        </>
      )}
    </div>
  )
}
