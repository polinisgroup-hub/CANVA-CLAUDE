import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getCheckoutUrl } from '../../config/workshop'
import { workshopConfig } from '../../config/workshop'

interface StickyMobileCTAProps {
  visible: boolean
}

/**
 * CTA fijo inferior para móvil. Aparece tras abandonar el hero y se oculta
 * al llegar al footer. Respeta la safe-area del dispositivo.
 */
export function StickyMobileCTA({ visible }: StickyMobileCTAProps) {
  const reduce = useReducedMotion()
  const href = getCheckoutUrl()
  const isExternal = /^https?:\/\//.test(href)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,0.96), rgba(255,255,255,0.75), transparent)',
          }}
        >
          <a
            href={href}
            {...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="flex items-center justify-between gap-3 rounded-full bg-claude px-6 py-3.5 text-white shadow-cta transition-colors duration-300 hover:bg-claude-hover"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">
              Entrar al taller
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold">
              ${workshopConfig.price}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
