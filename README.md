# Taller online — Aprende y monetiza con Canva + Claude

Landing page premium, responsive y de alta conversión para el taller
**Canva + Claude** (4 clases pregrabadas + 1 clase especial EN VIVO · $47 USD).

Diseño editorial, moderno y sofisticado con:

- **React + TypeScript + Vite**
- **Tailwind CSS** (tokens de marca centralizados)
- **Framer Motion** para reveals, marquee y microinteracciones
- **Lenis** para smooth scroll (se desactiva con `prefers-reduced-motion`)
- **Lucide** para iconografía SVG (sin emojis como iconos)

## Ejecutar

```bash
npm install
npm run dev        # desarrollo
npm run build      # build de producción (tsc + vite)
npm run preview    # previsualizar el build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## ⚙️ Dónde editar (importante)

Toda la información del taller está **centralizada**. No hay datos
hardcodeados repetidos por los componentes.

### 1. Checkout, precio, fecha, hora e instructoras

Archivo: [`src/config/workshop.ts`](src/config/workshop.ts)

```ts
export const workshopConfig = {
  price: 47,
  compareAtPrice: 97,        // precio "normal" (promo). null para ocultarlo
  currency: 'USD',
  checkoutUrl: '#oferta',    // 👉 pega aquí tu enlace real (Hotmart/Stripe/…)
  liveDate: 'Por confirmar', // 👉 fecha real de la clase EN VIVO
  liveTime: 'Por confirmar', // 👉 hora real de la clase EN VIVO
  instructors: [{ name: 'Por confirmar', role: 'Instructora' }], // 👉
}
```

- **Todos los CTA** usan `checkoutUrl`. Mientras esté en `#oferta`, hacen
  scroll suave al bloque de precio. Cuando pegues una URL `https://…`, se
  abrirá en una pestaña nueva automáticamente.

### 2. Testimonios (reales, nunca inventados)

Archivo: [`src/components/sections/TestimonialsSection.tsx`](src/components/sections/TestimonialsSection.tsx)

```ts
const testimonials = [] // 👉 añade testimonios reales aquí
```

- Mientras el array esté **vacío**, se muestra un placeholder claramente
  marcado como *pendiente*.
- Para **ocultar** la sección hasta tener datos reales, pon
  `HIDE_UNTIL_REAL = true`.

### 3. Galería de resultados

Archivo: [`src/components/sections/GallerySection.tsx`](src/components/sections/GallerySection.tsx)

1. Coloca tus piezas reales en `public/assets/gallery/`.
2. Añade `image: '/assets/gallery/tu-archivo.jpg'` al item correspondiente.
3. La tarjeta mostrará la imagen en lugar del placeholder de color.

### 4. Cards del marquee (Canva Magic Studio)

Archivo: [`src/config/magicCards.ts`](src/config/magicCards.ts)

Cada feature es una **card individual** que replica el diseño real de Canva
Magic Studio (título + degradado + motivo), con rotación/offset/escala
**fijos** (nunca aleatorios). Se construyen con CSS porque la imagen de
referencia `Canva_AI_Magic_Studio.jpg` es un *sprite* (todas las cards juntas)
y no puede trocearse desde el chat.

Para usar los **recortes reales** cuando los tengas:

1. Recorta cada feature de `Canva_AI_Magic_Studio.jpg` (o expórtalas desde
   Canva) y guárdalas en `public/assets/canva-magic/` — p. ej.
   `magic-animate.jpg`, `grab-text.jpg`, `background-remover.jpg`, …
2. Añade `image: '/assets/canva-magic/magic-animate.jpg'` a la card
   correspondiente en `magicCards.ts`.
3. La card mostrará automáticamente el recorte real (relación 3:2) dentro del
   marco flotante, sin tocar nada más.

> Si en su lugar subes el sprite completo al repo, puedo trocearlo por ti.

### 5. Textos de las secciones

Archivo: [`src/config/content.ts`](src/config/content.ts) — módulos, bloques de la
clase en vivo, beneficios, FAQ, objeciones, comparación, etc.

## Estructura

```
src/
├─ App.tsx                     Orquesta todas las secciones
├─ config/
│  ├─ workshop.ts              ⭐ Fuente única de verdad (precio, checkout, fechas…)
│  ├─ content.ts               Copy de las secciones
│  └─ magicCards.ts            Data de las cards del marquee
├─ hooks/
│  ├─ useSmoothScroll.ts       Lenis (respeta reduced-motion)
│  └─ useStickyCta.ts          Visibilidad del CTA fijo móvil
├─ components/
│  ├─ hero/                    WorkshopHero · CanvaMagicMarquee · CanvaMagicCard
│  ├─ sections/                19 secciones (Problema → CTA final)
│  ├─ layout/                  Header · Footer · StickyMobileCTA
│  └─ ui/                      PrimaryCTA · SectionHeading · RevealText · Accordion · Section · BrandLockup · ClaudeSpark · WorkflowFlow
```

## Notas de marca

- **Canva** = ejecución visual · **Claude** = desarrollo, estructura y dirección
  creativa. El logo (`BrandLockup`) y el *spark* de Claude (`ClaudeSpark`) están
  reconstruidos como SVG nítido y adaptable a fondos claros/oscuros.
- Paleta: blanco · negro carbón `#17141D` · lavanda `#F4F0FF` · morado `#5B21B6`
  · morado profundo `#312E81` · acento Claude `#D97757` (hover `#C9684B`).
- Sin escasez falsa, sin countdowns, sin descuentos inventados, sin testimonios
  inventados. El único precio actual es **$47 USD** (promo sobre $97).

## Accesibilidad y performance

- HTML semántico, `alt` en imágenes, navegación por teclado, `focus-visible`,
  `aria-*` en acordeones y marquee, *skip link*.
- `prefers-reduced-motion`: se detiene el marquee (pasa a galería con scroll) y
  se neutralizan las animaciones.
- Reveals con `transform`/`opacity`, `will-change` en el marquee, imágenes
  `loading="lazy"`, sin overflow horizontal (verificado a 390px y 1440px).
