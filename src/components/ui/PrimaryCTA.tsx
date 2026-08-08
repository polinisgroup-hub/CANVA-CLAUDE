import { ArrowRight } from 'lucide-react'
import { getCheckoutUrl } from '../../config/workshop'

interface PrimaryCTAProps {
  children: React.ReactNode
  className?: string
  /** Tamaño del botón */
  size?: 'md' | 'lg'
  /** Muestra la flecha final */
  arrow?: boolean
  /** id para tracking/analytics opcional */
  id?: string
}

/**
 * CTA principal. Es un <a> real que apunta al checkout central
 * (workshopConfig.checkoutUrl). Un único origen para todos los CTA.
 */
export function PrimaryCTA({
  children,
  className = '',
  size = 'lg',
  arrow = true,
  id,
}: PrimaryCTAProps) {
  const href = getCheckoutUrl()
  const isExternal = /^https?:\/\//.test(href)
  const sizing =
    size === 'lg'
      ? 'px-8 py-4 text-base sm:text-lg'
      : 'px-6 py-3 text-sm sm:text-base'

  return (
    <a
      id={id}
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-claude font-semibold text-white shadow-cta transition-all duration-300 ease-expo hover:scale-[1.02] hover:bg-claude-hover hover:shadow-cta-hover focus-visible:scale-[1.02] active:scale-100 ${sizing} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-[1.1em] w-[1.1em] transition-transform duration-300 ease-expo group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </a>
  )
}
