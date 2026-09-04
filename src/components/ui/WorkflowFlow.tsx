import { Fragment } from 'react'

interface WorkflowFlowProps {
  steps: string[]
  tone?: 'dark' | 'light'
  className?: string
  /** Resalta los pasos clave "Claude" y "Canva" */
  highlightBrands?: boolean
}

/**
 * Renderiza un flujo IDEA → CLAUDE → … → RESULTADO como chips con flechas.
 * Reutilizado en la clase estrella y en la sección de workflow.
 */
export function WorkflowFlow({
  steps,
  tone = 'dark',
  className = '',
  highlightBrands = true,
}: WorkflowFlowProps) {
  const isLight = tone === 'light'

  const chipClass = (step: string) => {
    const s = step.toLowerCase()
    if (highlightBrands && s === 'claude')
      return 'bg-claude/15 text-claude ring-1 ring-claude/30'
    if (highlightBrands && s === 'canva')
      return isLight
        ? 'bg-purple/10 text-purple ring-1 ring-purple/25'
        : 'bg-purple/25 text-white ring-1 ring-purple/40'
    return isLight
      ? 'bg-ink/5 text-ink/70 ring-1 ring-ink/10'
      : 'bg-white/5 text-white/70 ring-1 ring-white/10'
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-2 ${className}`}>
      {steps.map((step, i) => (
        <Fragment key={`${step}-${i}`}>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${chipClass(step)}`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              className={isLight ? 'text-ink/25' : 'text-white/25'}
              aria-hidden="true"
            >
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
