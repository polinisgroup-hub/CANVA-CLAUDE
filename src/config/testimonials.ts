/**
 * Testimonios reales del taller (capturas de mensajes de alumnas).
 * Imágenes en public/assets/testimonials/.
 *
 * Para añadir más: sube la imagen a esa carpeta y agrega su ruta aquí.
 * No se inventan testimonios: todas son capturas reales aportadas.
 */
export interface Testimonial {
  image: string
  /** Opcionales (para el alt / futuros formatos de texto) */
  name?: string
  role?: string
  text?: string
}

export const testimonials: Testimonial[] = Array.from({ length: 14 }, (_, i) => ({
  image: `/assets/testimonials/${i + 1}.png`,
}))
