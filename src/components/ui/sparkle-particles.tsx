import { useEffect, useMemo, useState } from 'react'
import type { ISourceOptions } from '@tsparticles/engine'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { cn } from '@/lib/utils'

/**
 * Capa de partículas (estrellas) del SparkleButton. Vive en su propio módulo
 * para que TODO tsparticles (engine + react + loadFull) quede en un chunk
 * aparte cargado con React.lazy — solo al primer hover. Así la carga inicial
 * de la página no descarga tsparticles.
 */
const options: ISourceOptions = {
  key: 'star',
  name: 'Star',
  particles: {
    number: { value: 20, density: { enable: false } },
    color: {
      value: ['#7c3aed', '#a78bfa', '#D97757', '#F4F0FF', '#fafafa', '#5B21B6'],
    },
    shape: { type: 'star', options: { star: { sides: 4 } } },
    opacity: { value: 0.8 },
    size: { value: { min: 1, max: 4 } },
    rotate: {
      value: { min: 0, max: 360 },
      enable: true,
      direction: 'clockwise',
      animation: { enable: true, speed: 10, sync: false },
    },
    links: { enable: false },
    reduceDuplicates: true,
    move: { enable: true, center: { x: 120, y: 45 } },
  },
  interactivity: { events: {} },
  smooth: true,
  fpsLimit: 120,
  background: { color: 'transparent', size: 'cover' },
  fullScreen: { enable: false },
  detectRetina: true,
  absorbers: [
    {
      enable: true,
      opacity: 0,
      size: { value: 1, density: 1, limit: { radius: 5, mass: 5 } },
      position: { x: 110, y: 45 },
    },
  ],
  emitters: [
    {
      autoPlay: true,
      fill: true,
      life: { wait: true },
      rate: { quantity: 5, delay: 0.5 },
      position: { x: 110, y: 45 },
    },
  ],
}

interface SparkleParticlesProps {
  isHovering: boolean
  domId: string
}

export default function SparkleParticles({
  isHovering,
  domId,
}: SparkleParticlesProps) {
  const [state, setState] = useState<'loaded' | 'ready'>()

  useEffect(() => {
    let active = true
    import('tsparticles').then(async ({ loadFull }) => {
      await initParticlesEngine(async (engine) => {
        await loadFull(engine)
      })
      if (active) setState('loaded')
    })
    return () => {
      active = false
    }
  }, [])

  const modifiedOptions = useMemo(() => {
    options.autoPlay = isHovering
    return options
  }, [isHovering])

  if (!state) return null

  return (
    <Particles
      id={domId}
      className={cn(
        'pointer-events-none absolute -bottom-4 -left-4 -right-4 -top-4 z-0 opacity-0 transition-opacity duration-300',
        isHovering && state === 'ready' && 'opacity-100',
      )}
      particlesLoaded={async () => {
        setState('ready')
      }}
      options={modifiedOptions}
    />
  )
}
