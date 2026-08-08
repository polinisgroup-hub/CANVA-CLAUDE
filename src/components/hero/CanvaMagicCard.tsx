import { useState } from 'react'
import type { MagicCard } from '../../config/magicCards'

interface CanvaMagicCardProps {
  card: MagicCard
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
export function CanvaMagicCard({ card }: CanvaMagicCardProps) {
  const { icon: Icon, gradient, textTone, rotation, offsetY, scale, title, image } = card
  const isLight = textTone === 'light'
  const titleColor = isLight ? 'text-white' : 'text-ink'
  const [imgOk, setImgOk] = useState(true)

  return (
    <div
      className="shrink-0 px-3 sm:px-4"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <div
        className="group relative w-[248px] overflow-hidden rounded-3xl shadow-card ring-1 ring-ink/[0.05] transition-transform duration-500 ease-expo sm:w-[280px]"
        style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
      >
        {/* Diseño CSS base (siempre presente) */}
        <div
          className="relative aspect-[3/2] w-full overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})`,
          }}
        >
          <h3
            className={`absolute left-5 top-4 z-10 whitespace-pre-line text-[1.35rem] font-bold leading-[1.08] tracking-tight sm:text-2xl ${titleColor}`}
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
            className={`absolute bottom-4 right-4 h-12 w-12 sm:h-14 sm:w-14 ${
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
