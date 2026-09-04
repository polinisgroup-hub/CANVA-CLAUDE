/**
 * Contenido estructurado del taller (copy en español).
 * Centralizado para no repetir información en los componentes.
 */

export interface Module {
  id: string
  number: string
  title: string
  learn: string[]
  result: string
}

export const modules: Module[] = [
  {
    id: 'clase-01',
    number: '01',
    title: 'Canva desde cero',
    learn: [
      'Interfaz y proyectos',
      'Herramientas esenciales',
      'Elementos, imágenes y texto',
      'Capas, posición y alineación',
      'Espaciado y composición',
    ],
    result:
      'Deja de sentirte perdido dentro de Canva y empieza a diseñar con seguridad.',
  },
  {
    id: 'clase-02',
    number: '02',
    title: 'Diseño que capta la atención',
    learn: [
      'Jerarquía visual',
      'Colores, paletas y contraste',
      'Tipografía y combinaciones',
      'Espaciado y alineación',
      'Coherencia visual',
    ],
    result:
      'Entiende por qué un diseño funciona y aprende a aplicarlo a tus propias piezas.',
  },
  {
    id: 'clase-03',
    number: '03',
    title: 'Canva Pro + herramientas que aceleran tu proceso',
    learn: [
      'Canva Pro y Brand Kit',
      'Background Remover',
      'Redimensionamiento y recursos premium',
      'Herramientas inteligentes',
      'Funciones de IA y Magic Studio cuando aplique',
    ],
    result: 'Crea más rápido sin sacrificar calidad.',
  },
  {
    id: 'clase-04',
    number: '04',
    title: 'Convierte Canva en una habilidad monetizable',
    learn: [
      'Marca personal y contenido',
      'Servicios digitales',
      'Community Management',
      'Presentaciones y material promocional',
      'Productos digitales y recursos descargables',
    ],
    result:
      'Cuando aprendes una habilidad digital, dejas de ver una herramienta y empiezas a ver oportunidades.',
  },
]

export interface Audience {
  number: string
  title: string
  text: string
}

export const audience: Audience[] = [
  {
    number: '01',
    title: 'Estás comenzando',
    text: 'Quieres aprender Canva desde cero sin sentirte abrumado.',
  },
  {
    number: '02',
    title: 'Tienes una marca personal',
    text: 'Quieres que tu contenido represente mejor quién eres y lo que haces.',
  },
  {
    number: '03',
    title: 'Tienes un negocio',
    text: 'Quieres crear contenido más profesional.',
  },
  {
    number: '04',
    title: 'Creas contenido',
    text: 'Quieres mejorar posts, carruseles, stories y presentaciones.',
  },
  {
    number: '05',
    title: 'Quieres una habilidad digital',
    text: 'Quieres aprender una herramienta aplicable a distintos proyectos.',
  },
  {
    number: '06',
    title: 'Quieres utilizar IA',
    text: 'Quieres combinar diseño + inteligencia artificial en tu proceso creativo.',
  },
]

export interface LiveBlock {
  id: string
  tag: string
  title: string
  points: string[]
  workflow: string[]
}

export const liveBlocks: LiveBlock[] = [
  {
    id: 'live-01',
    tag: 'Bloque 01 · Canva + Claude',
    title:
      'Descubre cómo unir Canva + Claude dentro de un mismo proceso creativo.',
    points: [
      'Desarrollar conceptos visuales',
      'Organizar información',
      'Crear briefs creativos',
      'Definir direcciones visuales',
      'Estructurar piezas',
      'Transformar ideas en diseños',
    ],
    workflow: ['Idea', 'Claude', 'Concepto', 'Estructura', 'Canva', 'Diseño', 'Resultado'],
  },
  {
    id: 'live-02',
    tag: 'Bloque 02 · Marca personal',
    title: 'De una idea a una identidad visual.',
    points: [
      'Personalidad y concepto creativo',
      'Moodboard y dirección visual',
      'Paleta y tipografías',
      'Elementos y Brand Kit',
      'Aplicación a redes sociales',
    ],
    workflow: ['Información', 'Claude', 'Concepto', 'Moodboard', 'Paleta', 'Canva', 'Identidad'],
  },
  {
    id: 'live-03',
    tag: 'Bloque 03 · Carruseles de Instagram',
    title:
      'Convierte una idea en un carrusel que la gente quiera seguir deslizando.',
    points: [
      'Concepto y estructura',
      'Jerarquía visual y portada',
      'Distribución y composición',
      'Imágenes y tipografías',
      'Consistencia y CTA visual',
    ],
    workflow: ['Idea', 'Claude', 'Estructura', 'Canva', 'Diseño', 'Carrusel'],
  },
  {
    id: 'live-04',
    tag: 'Bloque 04 · Producto digital',
    title: 'De una idea en tu cabeza a un producto digital diseñado por ti.',
    points: [
      'Ebook, guía o workbook',
      'Checklist y PDF',
      'Plantilla y lead magnet',
      'Estructura de contenido',
      'Branding del producto',
    ],
    workflow: ['Idea', 'Claude', 'Estructura', 'Contenido', 'Canva', 'Branding', 'Producto'],
  },
]

export interface PossibilityGroup {
  title: string
  items: string[]
}

export const possibilities: PossibilityGroup[] = [
  {
    title: 'Marca personal',
    items: ['Moodboards', 'Brand Kits', 'Paletas', 'Media kits'],
  },
  {
    title: 'Social media',
    items: ['Carruseles', 'Posts', 'Stories', 'Portadas', 'Reels covers'],
  },
  {
    title: 'Productos digitales',
    items: ['Ebooks', 'Guías', 'Workbooks', 'Checklists', 'Plantillas'],
  },
  {
    title: 'Negocios',
    items: ['Presentaciones', 'Flyers', 'Propuestas', 'Catálogos', 'Material promocional'],
  },
]

export interface Benefit {
  number: string
  title: string
  text: string
}

export const benefits: Benefit[] = [
  { number: '01', title: 'Dominar Canva', text: 'Manejas la herramienta con soltura y sin bloqueos.' },
  { number: '02', title: 'Diseñar con intención', text: 'Cada decisión visual tiene un porqué.' },
  { number: '03', title: 'Crear más rápido', text: 'Un proceso claro que reduce el tiempo por pieza.' },
  { number: '04', title: 'Construir tu identidad', text: 'Una imagen coherente y reconocible.' },
  { number: '05', title: 'Integrar IA', text: 'Claude como copiloto para desarrollar tus ideas.' },
  { number: '06', title: 'Crear activos digitales', text: 'Del concepto al producto terminado.' },
]

export interface FAQ {
  q: string
  a: string
}

export const faqs: FAQ[] = [
  { q: '¿Necesito experiencia en Canva?', a: 'No. Puedes comenzar desde cero.' },
  {
    q: '¿Cuántas clases incluye?',
    a: '5 clases pregrabadas de Canva + Claude, de 2–3 h cada una aproximadamente.',
  },
  { q: '¿Cuánto cuesta?', a: '$97 USD, pago único.' },
  {
    q: '¿Las clases son en vivo?',
    a: 'No. Las 5 clases están pregrabadas (2–3 h cada una), así avanzas a tu propio ritmo: pausa, practica y vuelve cuando quieras.',
  },
  {
    q: '¿Qué veremos con Canva + Claude?',
    a: 'Cómo utilizar ambas herramientas dentro de un proceso creativo para desarrollar conceptos visuales, crear una marca personal, carruseles de Instagram y un producto digital.',
  },
  { q: '¿Necesito saber utilizar Claude?', a: 'No.' },
  {
    q: '¿Necesito Canva Pro?',
    a: 'Muchos conceptos pueden aplicarse en Canva gratuito. También se mostrarán herramientas de Canva Pro cuando corresponda.',
  },
  { q: '¿Sirve si tengo negocio?', a: 'Sí.' },
  { q: '¿Sirve si estoy comenzando?', a: 'Sí.' },
]

export interface Objection {
  claim: string
  answer: string
}

export const objections: Objection[] = [
  {
    claim: 'Pero yo no soy creativo.',
    answer:
      'No pasa nada. Aprenderás principios y procesos que puedes repetir.',
  },
  {
    claim: 'Estoy comenzando desde cero.',
    answer: 'El taller está diseñado también para principiantes.',
  },
  {
    claim: 'Ya utilizo Canva.',
    answer:
      'Podrás fortalecer fundamentos y aprender un proceso más estratégico.',
  },
  {
    claim: 'No tengo marca personal.',
    answer:
      'Puedes comenzar a construirla o aplicar lo aprendido a otro proyecto.',
  },
  {
    claim: 'No tengo producto digital.',
    answer:
      'Precisamente veremos cómo estructurar una idea y llevarla visualmente a Canva.',
  },
]

export const beforeItems: string[] = [
  'Abres Canva sin saber qué hacer',
  'Pasas demasiado tiempo diseñando',
  'Cambias colores constantemente',
  'No existe coherencia visual',
  'No sabes combinar tipografías',
  'No sabes aprovechar las herramientas de IA',
  'No sabes cómo crear productos digitales',
]

export const afterItems: string[] = [
  'Sabes estructurar un diseño',
  'Diseñas con más seguridad',
  'Utilizas colores con intención',
  'Creas una identidad consistente',
  'Puedes crear contenido profesional',
  'Utilizas IA como apoyo creativo',
  'Puedes crear productos digitales',
]

export const comparison = {
  without: {
    title: 'Sin el taller',
    items: [
      'Tutoriales sueltos',
      'Diseños inconsistentes',
      'Demasiado tiempo',
      'Poca claridad',
      'No saber integrar IA',
      'No saber estructurar productos digitales',
    ],
  },
  with: {
    title: 'Con el taller',
    items: [
      'Ruta clara',
      'Fundamentos sólidos',
      'Herramientas que aceleran',
      'Diseño con intención',
      'Canva + Claude',
      'Marca, carruseles y productos digitales',
    ],
  },
}
