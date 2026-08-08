import { useEffect, useState } from 'react'

/**
 * Controla la visibilidad del CTA fijo móvil:
 *  • aparece después de abandonar el hero
 *  • se oculta al llegar al footer / sección de oferta
 */
export function useStickyCta(
  heroRef: React.RefObject<HTMLElement | null>,
  footerRef: React.RefObject<HTMLElement | null>,
) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    const footer = footerRef.current

    let heroVisible = true
    let footerVisible = false

    const update = () => setVisible(!heroVisible && !footerVisible)

    const observers: IntersectionObserver[] = []

    if (hero) {
      const io = new IntersectionObserver(
        ([entry]) => {
          heroVisible = entry.isIntersecting
          update()
        },
        { threshold: 0.15 },
      )
      io.observe(hero)
      observers.push(io)
    }

    if (footer) {
      const io = new IntersectionObserver(
        ([entry]) => {
          footerVisible = entry.isIntersecting
          update()
        },
        { threshold: 0.05 },
      )
      io.observe(footer)
      observers.push(io)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [heroRef, footerRef])

  return visible
}
