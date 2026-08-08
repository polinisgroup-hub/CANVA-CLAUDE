import { ClaudeSpark } from './ClaudeSpark'

/**
 * Logo del taller (fiel al logo oficial):
 *   Taller online
 *   Canva ✳ Claude          ← "Canva" script · spark naranja · "Claude" sans
 *   ───────── (subrayado naranja)
 *   APRENDE CREA Y MONETIZA
 *
 * `full` muestra la composición completa (para footer / CTA final).
 * Sin `full` muestra solo el lockup "Canva ✳ Claude" (header / hero).
 * Adaptable a fondos claros (tone="dark") u oscuros (tone="light").
 */

interface BrandLockupProps {
  /** Tono del texto: "dark" para fondos claros, "light" para fondos oscuros */
  tone?: 'dark' | 'light'
  className?: string
  /** Muestra "Taller online", el subrayado y el tagline inferior */
  full?: boolean
}

export function BrandLockup({
  tone = 'dark',
  className = '',
  full = false,
}: BrandLockupProps) {
  const textColor = tone === 'light' ? 'text-white' : 'text-ink'
  const subColor = tone === 'light' ? 'text-white/70' : 'text-muted'

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {full && (
        <span
          className={`mb-1.5 font-sans text-xl font-bold leading-none tracking-tight sm:text-2xl ${textColor}`}
        >
          Taller online
        </span>
      )}
      <span className="flex items-center gap-2 sm:gap-3">
        <span className={`font-script text-3xl font-bold leading-none sm:text-4xl ${textColor}`}>
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
          <span
            className="mt-2 h-[2px] w-52 max-w-full rounded-full bg-claude"
            aria-hidden="true"
          />
          <span
            className={`mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] ${subColor}`}
          >
            Aprende crea y monetiza
          </span>
        </>
      )}
    </div>
  )
}
