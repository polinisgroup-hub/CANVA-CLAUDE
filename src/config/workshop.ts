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
  instructors: Instructor[]
}

export const workshopConfig: WorkshopConfig = {
  name: 'Aprende y monetiza con Canva',
  subtitle: 'Taller online',
  differentiator: 'Canva + Claude',
  price: 47,
  // El precio actual es $47. Se muestra como promo respecto a $97.
  compareAtPrice: 97,
  currency: 'USD',
  paymentType: 'Pago único',

  // ⚠️ EDITAR: pega aquí tu enlace de checkout real.
  // Mientras esté vacío se usa el ancla interna `#oferta`.
  checkoutUrl: '#oferta',

  // ⚠️ EDITAR: fecha y hora reales de la clase EN VIVO.
  liveDate: 'Por confirmar',
  liveTime: 'Por confirmar',

  recordedClasses: 4,
  liveClasses: 1,

  // ⚠️ EDITAR: instructoras reales del taller.
  instructors: [{ name: 'Por confirmar', role: 'Instructora' }],
}

/** Devuelve el destino real de los CTA. */
export function getCheckoutUrl(): string {
  return workshopConfig.checkoutUrl || '#oferta'
}

/** true si el checkout apunta a un ancla interna (scroll suave). */
export function isInternalCheckout(): boolean {
  return getCheckoutUrl().startsWith('#')
}

/** Precio formateado, p. ej. "$47 USD". */
export const priceLabel = `$${workshopConfig.price} ${workshopConfig.currency}`
