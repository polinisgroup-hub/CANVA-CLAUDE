import { forwardRef, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import MarqueeAlongSvgPath from '@/components/ui/marquee-along-svg-path'
import { CanvaMagicMarquee } from './CanvaMagicMarquee'
import { CanvaMagicCard } from './CanvaMagicCard'
import { SparkleButton } from '@/components/ui/button-8'
import { ClaudeSpark } from '../ui/ClaudeSpark'
import { magicCards } from '../../config/magicCards'
import { getCheckoutUrl, priceLabel, workshopConfig } from '../../config/workshop'

const EASE = [0.16, 1, 0.3, 1] as const

// Trayectoria orgánica que hace que las cards floten y se crucen en 3D
// (el z-index rodante del componente crea la sensación de profundidad).
const CARD_PATH =
  'M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5'

/** Detecta viewports de escritorio para activar el hero 3D con path. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setIsDesktop(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return isDesktop
}

export const WorkshopHero = forwardRef<HTMLElement>(function WorkshopHero(
  _props,
  ref,
) {
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()
  const use3D = isDesktop && !reduce

  // Parallax de profundidad con el mouse (suavizado con springs)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const orb1X = useTransform(sx, [-0.5, 0.5], [-28, 28])
  const orb1Y = useTransform(sy, [-0.5, 0.5], [-22, 22])
  const orb2X = useTransform(sx, [-0.5, 0.5], [26, -26])
  const orb2Y = useTransform(sy, [-0.5, 0.5], [20, -20])
  const tiltX = useTransform(sy, [-0.5, 0.5], [4, -4])
  const tiltY = useTransform(sx, [-0.5, 0.5], [-4, 4])

  const handleMouse = (e: React.MouseEvent) => {
    if (!use3D) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen overflow-hidden pt-28 sm:pt-32"
      aria-labelledby="hero-title"
      style={{
        background:
          'radial-gradient(120% 90% at 50% -10%, #F4F0FF 0%, #FBFAFF 45%, #FFFFFF 100%)',
      }}
    >
      {/* ── Fondo: orbes de color con profundidad (parallax) ── */}
      <motion.div
        aria-hidden="true"
        style={use3D ? { x: orb1X, y: orb1Y } : undefined}
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-[380px] w-[380px] rounded-full bg-purple/25 blur-[110px]"
      />
      <motion.div
        aria-hidden="true"
        style={use3D ? { x: orb2X, y: orb2Y } : undefined}
        className="pointer-events-none absolute -right-20 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-claude/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-[120px]"
      />

      {/* ── Encabezado del hero ── */}
      <div className="container-editorial relative z-10 flex flex-col items-center text-center">
        <motion.div {...rise(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur-md sm:text-sm">
            <span className="text-claude" aria-hidden="true">✦</span>
            <span className="hidden sm:inline">4 clases pregrabadas + 1 clase EN VIVO</span>
            <span className="sm:hidden">4 clases + 1 clase EN VIVO</span>
            <span className="hidden text-ink/20 sm:inline" aria-hidden="true">·</span>
            <span className="hidden font-semibold text-ink/70 sm:inline">Canva + Claude</span>
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...rise(0.08)}
          className="mt-7 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tightest text-ink"
        >
          Aprende y monetiza
          <span className="mt-1 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
            <span className="text-ink/80">con</span>
            <span className="grad-canva font-script text-[1.12em] font-bold">Canva</span>
            <ClaudeSpark className="inline-block h-[0.7em] w-[0.7em] align-middle" title="" />
            <span className="grad-canva">Claude</span>
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg lg:max-w-3xl"
        >
          Aprende a diseñar contenido profesional con Canva y descubre cómo
          utilizar Claude para crear tu marca personal, carruseles para
          Instagram y productos digitales desde cero.
        </motion.p>
        <motion.p {...rise(0.22)} className="mt-3 text-sm font-medium text-ink/70">
          No necesitas experiencia previa.
        </motion.p>
      </div>

      {/* ── Marquee a lo largo de la curva (hero 3D) o recto (fallback) ── */}
      <div className="relative z-10 mt-16 sm:mt-20">
        {use3D ? (
          <div className="relative mx-auto h-[340px] w-full max-w-6xl px-4">
            <MarqueeAlongSvgPath
              path={CARD_PATH}
              viewBox="0 0 996 330"
              baseVelocity={5}
              repeat={2}
              slowdownOnHover
              slowDownFactor={0.25}
              draggable
              grabCursor
              dragSensitivity={0.08}
              enableRollingZIndex
              zIndexRange={16}
              responsive
              className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_100%)]"
            >
              {magicCards.map((card) => (
                <div key={card.id} className="drop-shadow-xl">
                  <CanvaMagicCard card={card} size="compact" />
                </div>
              ))}
            </MarqueeAlongSvgPath>

            {/* Scrim radial para legibilidad del CTA sobre las cards */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(closest-side at 50% 55%, rgba(251,250,255,0.92) 0%, rgba(251,250,255,0.55) 40%, transparent 72%)',
              }}
              aria-hidden="true"
            />

            {/* CTA superpuesto (glassmorphism + profundidad) */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30 grid place-items-center"
              style={use3D ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 } : undefined}
            >
              <div className="pointer-events-auto flex flex-col items-center gap-4 rounded-[1.75rem] border border-white/60 bg-white/40 px-6 py-6 shadow-[0_30px_80px_-30px_rgba(49,46,129,0.45)] backdrop-blur-xl">
                <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  <span>{workshopConfig.recordedClasses} clases pregrabadas</span>
                  <span className="text-claude" aria-hidden="true">•</span>
                  <span>1 clase EN VIVO</span>
                  <span className="text-claude" aria-hidden="true">•</span>
                  <span className="text-ink">{priceLabel}</span>
                </p>
                <SparkleButton href={getCheckoutUrl()}>
                  QUIERO ENTRAR POR ${workshopConfig.price}
                </SparkleButton>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <CanvaMagicMarquee />
            <div className="container-editorial mt-8 flex flex-col items-center gap-4">
              <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                <span>{workshopConfig.recordedClasses} clases pregrabadas</span>
                <span className="text-claude" aria-hidden="true">•</span>
                <span>1 clase EN VIVO</span>
                <span className="text-claude" aria-hidden="true">•</span>
                <span className="text-ink">{priceLabel}</span>
              </p>
              <SparkleButton href={getCheckoutUrl()}>
                QUIERO ENTRAR POR ${workshopConfig.price}
              </SparkleButton>
            </div>
          </>
        )}
      </div>

      {/* ── Indicador de scroll cinematográfico ── */}
      <div className="relative z-10 mt-10 flex justify-center pb-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-muted"
          aria-hidden="true"
        >
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em]">
            Desliza
          </span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/20 p-1">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-claude"
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  )
})
