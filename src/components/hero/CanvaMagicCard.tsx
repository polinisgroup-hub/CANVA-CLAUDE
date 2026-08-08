import { useState } from 'react'
import type { MagicCard } from '../../config/magicCards'

interface CanvaMagicCardProps {
  card: MagicCard
  /** 'default' para el marquee recto; 'compact' para el hero 3D (path) */
  size?: 'default' | 'compact'
}

/**
 * Card individual de una feature de Canva Magic Studio.
 *
 * Estrategia de imagen:
 *  • Siempre se renderiza un diseño CSS (título + degradado + motivo) que
 *    replica la card de Canva y funciona sin ningún asset.
 *  • Si `card.image` apunta a un recorte real en /public/assets/canva-magic/,
 *    la imagen se superpone encima. Si el archivo NO existe (404), `onError`
 *    la oculta y queda visible el diseño CSS — nunca una imagen rota.
 *
 * Cada card es una pieza propia (no una captura repetida) y flota con
 * rotación/offset/scale fijos (sin Math.random).
 */
export function CanvaMagicCard({ card, size = 'default' }: CanvaMagicCardProps) {
  const { icon: Icon, gradient, textTone, rotation, offsetY, scale, title, image } = card
  const isLight = textTone === 'light'
  const titleColor = isLight ? 'text-white' : 'text-ink'
  const [imgOk, setImgOk] = useState(true)
  const compact = size === 'compact'

  const widthClass = compact
    ? 'w-[150px] sm:w-[168px]'
    : 'w-[248px] sm:w-[280px]'
  const titleClass = compact
    ? 'left-3 top-2.5 text-[0.82rem] sm:text-sm'
    : 'left-5 top-4 text-[1.35rem] sm:text-2xl'
  const iconClass = compact ? 'bottom-2.5 right-2.5 h-7 w-7' : 'bottom-4 right-4 h-12 w-12 sm:h-14 sm:w-14'

  return (
    <div
      className={compact ? 'shrink-0' : 'shrink-0 px-3 sm:px-4'}
      style={compact ? undefined : { transform: `translateY(${offsetY}px)` }}
    >
      <div
        className={`group relative overflow-hidden rounded-3xl shadow-card ring-1 ring-ink/[0.05] transition-transform duration-500 ease-expo ${widthClass}`}
        style={{ transform: compact ? undefined : `rotate(${rotation}deg) scale(${scale})` }}
      >
        {/* Diseño CSS base (siempre presente) */}
        <div
          className="relative aspect-[3/2] w-full overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})`,
          }}
        >
          <h3
            className={`absolute z-10 whitespace-pre-line font-bold leading-[1.08] tracking-tight ${titleClass} ${titleColor}`}
          >
            {title}
          </h3>
          <span
            className={`absolute -bottom-3 -right-2 h-24 w-24 rounded-2xl ${
              isLight ? 'bg-white/10' : 'bg-white/40'
            } rotate-12 blur-[2px]`}
            aria-hidden="true"
          />
          <span
            className={`absolute bottom-6 right-16 h-3 w-3 rounded-full ${
              isLight ? 'bg-white/40' : 'bg-white/70'
            }`}
            aria-hidden="true"
          />
          <Icon
            className={`absolute ${iconClass} ${
              isLight ? 'text-white/90' : 'text-ink/80'
            } drop-shadow-sm`}
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <span
            className={`absolute bottom-4 left-5 h-2 w-16 rounded-full ${
              isLight ? 'bg-white/30' : 'bg-white/50'
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Recorte real superpuesto (si existe). onError → fallback al CSS. */}
        {image && imgOk && (
          <img
            src={image}
            alt={`${title.replace('\n', ' ')} — función de Canva`}
            width={280}
            height={187}
            loading="lazy"
            decoding="async"
            onError={() => setImgOk(false)}
            className="absolute inset-0 z-20 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
