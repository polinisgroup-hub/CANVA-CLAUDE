import type { MagicCard } from '../../config/magicCards'

interface CanvaMagicCardProps {
  card: MagicCard
}

/**
 * Card individual de una feature de Canva Magic Studio, replicando el diseño
 * real: título grande arriba a la izquierda sobre un degradado vibrante, con
 * un motivo decorativo. Cada card es una pieza propia (no una captura repetida)
 * y flota con rotación/offset/scale fijos.
 *
 * Si `card.image` está definido (recorte real en /public/assets/canva-magic/),
 * se muestra la imagen recortada en lugar del diseño CSS.
 */
export function CanvaMagicCard({ card }: CanvaMagicCardProps) {
  const { icon: Icon, gradient, textTone, rotation, offsetY, scale, title, image } = card
  const isLight = textTone === 'light'
  const titleColor = isLight ? 'text-white' : 'text-ink'

  return (
    <div
      className="shrink-0 px-3 sm:px-4"
      // El desplazamiento vertical vive en el wrapper para no interferir con
      // la animación horizontal del marquee.
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <div
        className="group relative w-[248px] overflow-hidden rounded-3xl shadow-card ring-1 ring-ink/[0.05] transition-transform duration-500 ease-expo sm:w-[280px]"
        style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
      >
        {image ? (
          <div className="aspect-[3/2] w-full overflow-hidden">
            <img
              src={image}
              alt={`${title.replace('\n', ' ')} — función de Canva`}
              width={280}
              height={187}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="relative aspect-[3/2] w-full overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})`,
            }}
          >
            {/* Título de la feature (arriba-izquierda, como en Canva) */}
            <h3
              className={`absolute left-5 top-4 z-10 whitespace-pre-line text-[1.35rem] font-bold leading-[1.08] tracking-tight sm:text-2xl ${titleColor}`}
            >
              {title}
            </h3>

            {/* Motivo decorativo + icono translúcido */}
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

            {/* Barra inferior sutil tipo "app UI" en algunas cards */}
            <span
              className={`absolute bottom-4 left-5 h-2 w-16 rounded-full ${
                isLight ? 'bg-white/30' : 'bg-white/50'
              }`}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  )
}
