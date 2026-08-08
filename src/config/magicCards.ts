import {
  Wand2,
  ScanText,
  Scissors,
  AudioLines,
  Brush,
  ImagePlus,
  Shuffle,
  Film,
  BarChart3,
  Sparkles,
  Languages,
  Upload,
  type LucideIcon,
} from 'lucide-react'

export interface MagicCard {
  id: string
  /** Título de la feature tal como aparece en Canva (puede ser 2 líneas) */
  title: string
  icon: LucideIcon
  /** Degradado vibrante estilo Canva [from, to] tomado de la referencia */
  gradient: [string, string]
  /** Color del texto sobre la card según el fondo */
  textTone: 'light' | 'dark'
  /** Rotación fija en grados (nunca aleatoria) */
  rotation: number
  /** Desplazamiento vertical en px para el efecto flotante */
  offsetY: number
  /** Escala sutil */
  scale: number
  /**
   * Ruta opcional a un recorte real de Canva_AI_Magic_Studio.jpg.
   * Si colocas los recortes en /public/assets/canva-magic/ y añades la ruta
   * aquí, la card mostrará la imagen real en lugar del diseño CSS.
   */
  image?: string
}

/**
 * Cada feature es una CARD INDIVIDUAL que replica el diseño real de
 * Canva Magic Studio (título grande + degradado + motivo), no una captura
 * repetida. Rotación/offset/scale fijos para el efecto de piezas flotando.
 */
export const magicCards: MagicCard[] = [
  { id: 'magic-animate', title: 'Magic\nAnimate', icon: Wand2, gradient: ['#9333EA', '#C026D3'], textTone: 'light', rotation: -2, offsetY: -8, scale: 0.98 },
  { id: 'grab-text', title: 'Grab Text', icon: ScanText, gradient: ['#F97316', '#FBBF24'], textTone: 'dark', rotation: 1.5, offsetY: 4, scale: 1 },
  { id: 'background-remover', title: 'Background\nRemover', icon: Scissors, gradient: ['#7DD3FC', '#BAE6FD'], textTone: 'dark', rotation: -1, offsetY: -3, scale: 1.02 },
  { id: 'brand-voice', title: 'Brand\nvoice', icon: AudioLines, gradient: ['#EDE9FE', '#F5F3FF'], textTone: 'dark', rotation: 2, offsetY: 8, scale: 0.96 },
  { id: 'magic-edit', title: 'Magic\nEdit', icon: Brush, gradient: ['#DB2777', '#9333EA'], textTone: 'light', rotation: -2.5, offsetY: -5, scale: 1 },
  { id: 'text-to-image', title: 'Text to\nimage', icon: ImagePlus, gradient: ['#7C3AED', '#4C1D95'], textTone: 'light', rotation: 1, offsetY: 6, scale: 1.02 },
  { id: 'magic-switch', title: 'Magic\nSwitch', icon: Shuffle, gradient: ['#4C1D95', '#5B21B6'], textTone: 'light', rotation: 2.5, offsetY: -6, scale: 0.98 },
  { id: 'upload-media', title: 'Upload your\nown media', icon: Upload, gradient: ['#FDA4AF', '#FDBA74'], textTone: 'dark', rotation: -1, offsetY: 4, scale: 1.01 },
  { id: 'image-to-video', title: 'Image\nto video', icon: Film, gradient: ['#8B1F9E', '#A21CAF'], textTone: 'light', rotation: -1.5, offsetY: 5, scale: 1 },
  { id: 'flourish-charts', title: 'Flourish\ncharts', icon: BarChart3, gradient: ['#FB7185', '#F87171'], textTone: 'dark', rotation: 2, offsetY: -4, scale: 1.02 },
  { id: 'magic-design', title: 'Magic\nDesign', icon: Sparkles, gradient: ['#EF4444', '#F97316'], textTone: 'light', rotation: -2, offsetY: 7, scale: 0.97 },
  { id: 'swap-languages', title: 'Swap\nlanguages', icon: Languages, gradient: ['#A5B4FC', '#C7D2FE'], textTone: 'dark', rotation: 1.5, offsetY: -5, scale: 1 },
]
