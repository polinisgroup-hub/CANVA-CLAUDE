import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Testimonial } from '../../config/testimonials'

/**
 * Columna de testimonios con scroll vertical infinito.
 * Basado en el componente aportado (21st.dev); adaptado de "motion/react" a
 * "framer-motion" (ya instalada) y para mostrar capturas de testimonios reales.
 * Respeta prefers-reduced-motion (se detiene).
 */
export const TestimonialsColumn = (props: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) => {
  const reduce = useReducedMotion()
  return (
    <div className={props.className}>
      <motion.div
        animate={reduce ? undefined : { translateY: '-50%' }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ image, name }, i) => (
                <div
                  className="w-full max-w-xs overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-lg shadow-purple/10"
                  key={i}
                >
                  <img
                    src={image}
                    alt={name ? `Testimonio de ${name}` : 'Testimonio de una alumna del taller'}
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
