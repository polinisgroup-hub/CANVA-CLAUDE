import {
  Suspense,
  lazy,
  useId,
  useState,
  type ReactNode,
} from 'react'
import { Sparkle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Botón con destellos + partículas (estrellas) al pasar el mouse.
 * Basado en el componente button-8 de 21st.dev, adaptado:
 *  • Colores de marca (morado Canva → naranja Claude), destellos blancos.
 *  • Reutilizable: acepta `children` y `href` (se renderiza como <a> si hay href).
 *  • Los destellos (iconos) son CSS y se ven de inmediato. El motor de
 *    partículas (tsparticles) se carga con React.lazy SOLO al primer hover,
 *    en un chunk aparte, para no afectar la carga inicial.
 *  • Respeta prefers-reduced-motion (sin partículas).
 */

const SparkleParticles = lazy(() => import('./sparkle-particles'))

interface SparkleButtonProps {
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
}

export const SparkleButton = ({
  children,
  href,
  className,
  onClick,
}: SparkleButtonProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const particleId = useId().replace(/:/g, '')
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleEnter = () => {
    setIsHovering(true)
    if (!reduce) setShowParticles(true) // dispara la carga diferida
  }

  const isExternal = href ? /^https?:\/\//.test(href) : false

  const inner = (
    <>
      <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple via-[#7c3aed] to-claude px-6 py-3 text-white">
        <Sparkle className="size-5 -translate-y-0.5 animate-sparkle fill-white" />
        <Sparkle
          style={{ animationDelay: '1s' }}
          className="absolute bottom-2.5 left-3.5 z-20 size-2 rotate-12 animate-sparkle fill-white"
        />
        <Sparkle
          style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}
          className="absolute left-5 top-2.5 size-1 -rotate-12 animate-sparkle fill-white"
        />
        <Sparkle
          style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}
          className="absolute left-3 top-3 size-1.5 animate-sparkle fill-white"
        />
        <span className="font-semibold tracking-tight">{children}</span>
      </div>
      {showParticles && (
        <Suspense fallback={null}>
          <SparkleParticles isHovering={isHovering} domId={`sparkle-${particleId}`} />
        </Suspense>
      )}
    </>
  )

  const cls = cn(
    'group relative inline-block rounded-full bg-gradient-to-r from-purple/40 via-[#7c3aed]/40 to-claude/40 p-1 text-white shadow-cta transition-transform duration-300 ease-expo hover:scale-[1.04] active:scale-100 focus-visible:scale-[1.04]',
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setIsHovering(false)}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cls}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setIsHovering(false)}
      className={cls}
    >
      {inner}
    </button>
  )
}
