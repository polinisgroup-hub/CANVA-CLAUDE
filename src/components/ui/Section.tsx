import type { ReactNode } from 'react'

type Tone = 'white' | 'lavender' | 'dark' | 'gradient'

interface SectionProps {
  id?: string
  children: ReactNode
  tone?: Tone
  className?: string
  /** Espaciado vertical generoso (mucho espacio negativo) */
  spacing?: 'md' | 'lg' | 'xl'
  'aria-label'?: string
}

const toneClasses: Record<Tone, string> = {
  white: 'bg-white text-ink',
  lavender: 'bg-lavender text-ink',
  dark: 'bg-ink text-white',
  gradient: 'text-white',
}

const spacingClasses = {
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-28',
  xl: 'py-24 sm:py-36',
}

/** Sección con tono de fondo y ritmo vertical consistentes. */
export function Section({
  id,
  children,
  tone = 'white',
  className = '',
  spacing = 'lg',
  'aria-label': ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative overflow-hidden ${toneClasses[tone]} ${spacingClasses[spacing]} ${className}`}
    >
      {children}
    </section>
  )
}
