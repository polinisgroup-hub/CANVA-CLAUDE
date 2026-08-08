import { type ReactNode, type RefObject } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

type Tag = 'div' | 'p' | 'span' | 'section' | 'ul' | 'li' | 'article'

const tagMap = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  ul: motion.ul,
  li: motion.li,
  article: motion.article,
} as const

interface TimelineContentProps {
  as?: Tag
  children: ReactNode
  /** Índice para el stagger (se pasa como `custom` a las variants) */
  animationNum: number
  /** Ref del contenedor que dispara la animación al entrar en viewport */
  timelineRef: RefObject<HTMLElement | null>
  customVariants?: Variants
  className?: string
  once?: boolean
}

/**
 * Revela su contenido cuando `timelineRef` entra en viewport, aplicando
 * `customVariants` con `custom={animationNum}` (para escalonar por índice).
 * Compatible con el uso del componente de pricing de 21st.dev.
 */
export function TimelineContent({
  as = 'div',
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  once = true,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, {
    once,
    margin: '0px 0px -80px 0px',
  })

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  }

  const MotionTag = tagMap[as] ?? motion.div

  return (
    <MotionTag
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customVariants || defaultVariants}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
