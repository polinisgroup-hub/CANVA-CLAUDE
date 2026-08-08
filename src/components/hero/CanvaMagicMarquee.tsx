import { magicCards } from '../../config/magicCards'
import { CanvaMagicCard } from './CanvaMagicCard'

/**
 * Marquee infinito, horizontal, seamless y lento.
 *  • No se detiene al hacer hover.
 *  • Se duplica la secuencia para el loop sin cortes (translateX -50%).
 *  • Máscara de degradado obligatoria en los extremos.
 *  • prefers-reduced-motion → galería con scroll manual (ver index.css).
 *  • CSS puro (transform) para el mejor performance.
 */
export function CanvaMagicMarquee() {
  return (
    <div
      className="marquee-mask relative w-full overflow-hidden py-6"
      aria-label="Funciones de Canva Magic Studio"
      role="group"
    >
      <div className="marquee-track animate-marquee-x">
        {/* Primera secuencia (visible / accesible) */}
        {magicCards.map((card) => (
          <CanvaMagicCard key={card.id} card={card} />
        ))}
        {/* Segunda secuencia duplicada para el loop seamless */}
        {magicCards.map((card) => (
          <div key={`dup-${card.id}`} aria-hidden="true">
            <CanvaMagicCard card={card} />
          </div>
        ))}
      </div>
    </div>
  )
}
