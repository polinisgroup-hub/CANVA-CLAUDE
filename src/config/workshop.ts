/**
 * ─────────────────────────────────────────────────────────────
 *  FUENTE ÚNICA DE VERDAD DEL TALLER
 * ─────────────────────────────────────────────────────────────
 *  Edita AQUÍ y solo aquí:
 *   • checkoutUrl → enlace real de compra (Hotmart / Stripe / etc.)
 *   • liveDate / liveTime → fecha y hora de la clase EN VIVO
 *   • instructors → nombre(s) de la(s) instructora(s)
 *   • price / currency → precio actual
 *
 *  No hardcodees estos datos en los componentes: consúmelos desde
 *  `workshopConfig`.
 */

export interface Instructor {
  name: string
  role: string
  /** Ruta opcional a la foto (p. ej. /brand/natasha.jpg). Si falta, se usa monograma. */
  photo?: string
  /** WhatsApp de la instructora (solo dígitos con código de país). */
  whatsapp?: string
}

export interface WhatsAppConfig {
  /** Número con código de país, solo dígitos. Vacío = sin número aún. */
  number: string
  message: string
}

export interface WorkshopConfig {
  name: string
  subtitle: string
  differentiator: string
  price: number
  compareAtPrice: number | null
  currency: string
  paymentType: string
  /**
   * Enlace de checkout. Mientras no exista una URL real, usa el
   * ancla interna segura `#oferta` (NO enlaces externos falsos).
   */
  checkoutUrl: string
  /** true si `checkoutUrl` es un ancla interna (#...) */
  liveDate: string // p. ej. "Por confirmar" o "2026-09-15"
  liveTime: string // p. ej. "Por confirmar" o "19:00 (GMT-5)"
  recordedClasses: number
  liveClasses: number
  /** Duración aproximada de cada clase, p. ej. "2–3 h". */
  classDuration: string
  instructors: Instructor[]
  whatsapp: WhatsAppConfig
}

export const workshopConfig: WorkshopConfig = {
  name: 'Aprende y monetiza con Canva',
  subtitle: 'Taller online',
  differentiator: 'Canva + Claude',
  price: 97,
  // Precio único actual: $97. Sin promo/tachado (compareAtPrice: null).
  compareAtPrice: null,
  currency: 'USD',
  paymentType: 'Pago único',

  // Enlace de checkout real (Beacons). Todos los CTA lo usan.
  checkoutUrl: 'https://shop.beacons.ai/napolinip/274ec424-6f39-492d-aa15-8fdcc087b76a',

  // Taller 100% pregrabado (sin clase en vivo).
  liveDate: 'Por confirmar',
  liveTime: 'Por confirmar',

  recordedClasses: 5,
  liveClasses: 0,
  classDuration: '2–3 h',

  instructors: [
    { name: 'Natasha Polini', role: 'Instructora', whatsapp: '13464255205' },
    { name: 'Lindamar Mercado', role: 'Instructora', whatsapp: '19174235383' },
  ],

  // Botón flotante de WhatsApp → contacto principal (Natasha).
  whatsapp: {
    number: '13464255205',
    message: 'Hola 👋, tengo dudas sobre el Taller Canva + Claude.',
  },
}

/** Enlace de WhatsApp (wa.me) con mensaje prellenado. */
export function getWhatsAppUrl(): string {
  const num = (workshopConfig.whatsapp.number || '').replace(/\D/g, '')
  const msg = encodeURIComponent(workshopConfig.whatsapp.message || '')
  return num ? `https://wa.me/${num}?text=${msg}` : `https://wa.me/?text=${msg}`
}

/** Devuelve el destino real de los CTA. */
export function getCheckoutUrl(): string {
  return workshopConfig.checkoutUrl || '#oferta'
}

/** true si el checkout apunta a un ancla interna (scroll suave). */
export function isInternalCheckout(): boolean {
  return getCheckoutUrl().startsWith('#')
}

/** Precio formateado, p. ej. "$97 USD". */
export const priceLabel = `$${workshopConfig.price} ${workshopConfig.currency}`
