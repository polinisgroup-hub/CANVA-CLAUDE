/**
 * El "spark" de Claude: ráfaga de rayos redondeados estilo asterisco,
 * en el color de acento #D97757. Reconstruido como SVG para que sea
 * nítido a cualquier tamaño y adaptable a fondos claros u oscuros.
 */

interface ClaudeSparkProps {
  className?: string
  color?: string
  title?: string
}

// Longitudes variables para un aspecto orgánico (no aleatorio).
const RAYS = [
  1, 0.72, 0.92, 0.66, 1, 0.74, 0.9, 0.68, 0.98, 0.7, 0.88,
]

export function ClaudeSpark({
  className,
  color = '#D97757',
  title,
}: ClaudeSparkProps) {
  const cx = 50
  const cy = 50
  const inner = 7
  const maxLen = 40
  const step = 360 / RAYS.length

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g fill={color}>
        {RAYS.map((r, i) => {
          const len = inner + r * maxLen
          const angle = i * step
          return (
            <rect
              key={i}
              x={cx - 3.1}
              y={cy - len}
              width={6.2}
              height={len}
              rx={3.1}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          )
        })}
      </g>
    </svg>
  )
}
