import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

export interface AccordionItemData {
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItemData[]
  /** Índice abierto por defecto (null = todos cerrados) */
  defaultOpen?: number | null
}

/**
 * Acordeón accesible (disclosure) con un solo panel abierto a la vez.
 * Usa <button> reales, aria-expanded / aria-controls y navegación por teclado.
 */
export function Accordion({ items, defaultOpen = null }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const reduce = useReducedMotion()
  const baseId = useId()

  return (
    <div className="divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-btn-${i}`
        const panelId = `${baseId}-panel-${i}`
        return (
          <div key={item.title}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-purple sm:py-6"
              >
                <span className="text-base font-semibold text-ink sm:text-lg">
                  {item.title}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lavender text-purple transition-transform duration-300 ease-expo ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-[0.98rem] leading-relaxed text-muted">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
