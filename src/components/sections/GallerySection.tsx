import { ImageIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealStagger, RevealItem } from '../ui/RevealText'

/**
 * Galería de resultados. Estructura lista para ASSETS REALES.
 *
 * ⚠️ PENDIENTE: sustituye cada placeholder por una imagen real cuando la tengas.
 *   1. Coloca los archivos en /public/assets/gallery/ (p. ej. carrusel-01.jpg)
 *   2. En `galleryItems`, añade `image: '/assets/gallery/carrusel-01.jpg'`
 *   3. La tarjeta mostrará automáticamente la imagen en lugar del placeholder.
 *
 * No se atribuyen diseños a estudiantes: son ejemplos del tipo de piezas
 * que aprenderás a crear.
 */
interface GalleryItem {
  label: string
  aspect: string
  gradient: [string, string]
  image?: string
}

const galleryItems: GalleryItem[] = [
  { label: 'Carrusel', aspect: 'aspect-[4/5]', gradient: ['#7C3AED', '#EC4899'] },
  { label: 'Branding', aspect: 'aspect-square', gradient: ['#0D9488', '#22C55E'] },
  { label: 'Ebook', aspect: 'aspect-[3/4]', gradient: ['#2563EB', '#06B6D4'] },
  { label: 'Story', aspect: 'aspect-[9/16]', gradient: ['#F59E0B', '#EF4444'] },
  { label: 'Workbook', aspect: 'aspect-[4/5]', gradient: ['#6366F1', '#A855F7'] },
  { label: 'Presentación', aspect: 'aspect-[16/10]', gradient: ['#D946EF', '#7C3AED'] },
]

export function GallerySection() {
  return (
    <Section id="galeria" tone="white" spacing="xl">
      <div className="container-editorial">
        <SectionHeading
          index="13"
          eyebrow="Galería de resultados"
          title={
            <>
              No se trata solo de aprender.{' '}
              <span className="grad-canva">Se trata de crear.</span>
            </>
          }
          align="center"
          className="mx-auto max-w-2xl"
        />

        <RevealStagger className="mt-14 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {galleryItems.map((item) => (
            <RevealItem key={item.label} className="break-inside-avoid">
              <div className="group overflow-hidden rounded-2xl ring-1 ring-ink/[0.06]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Ejemplo de ${item.label} creado con Canva`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover ${item.aspect}`}
                  />
                ) : (
                  <div
                    className={`relative flex w-full items-center justify-center ${item.aspect}`}
                    style={{
                      backgroundImage: `linear-gradient(140deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                    }}
                  >
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
                      <ImageIcon className="h-3 w-3" aria-hidden="true" />
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-white/70">
                      Espacio para tu diseño
                    </span>
                  </div>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <p className="mt-8 text-center text-xs text-muted/70">
          {/* Nota para el desarrollador visible discretamente; elimínala al añadir assets reales */}
          Galería de ejemplo — reemplaza con tus piezas reales en{' '}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 text-[0.7rem]">
            /public/assets/gallery/
          </code>
        </p>
      </div>
    </Section>
  )
}
