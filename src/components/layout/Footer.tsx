import { forwardRef } from 'react'
import { BrandLockup } from '../ui/BrandLockup'
import { workshopConfig } from '../../config/workshop'

const columns = [
  {
    title: 'Taller',
    links: [
      { href: '#contenido', label: 'Contenido' },
      { href: '#clase-en-vivo', label: 'Clase en vivo' },
      { href: '#faq', label: 'FAQ' },
      { href: '#oferta', label: 'Comprar' },
    ],
  },
  {
    title: 'Legal',
    links: [
      // Placeholders: reemplaza con las páginas reales cuando existan.
      { href: '#', label: 'Política de privacidad' },
      { href: '#', label: 'Términos y condiciones' },
    ],
  },
]

export const Footer = forwardRef<HTMLElement>(function Footer(_props, ref) {
  const year = 2026 // fecha del proyecto; actualiza si corresponde

  return (
    <footer ref={ref} className="bg-ink text-white">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <BrandLockup tone="light" full />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              Taller online para aprender a diseñar con Canva y potenciar tu
              proceso creativo con Claude. Aprende, crea y monetiza.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>
            © {year} · Taller {workshopConfig.name} · {workshopConfig.differentiator}
          </p>
          <p>Diseño + inteligencia artificial · {workshopConfig.paymentType}</p>
        </div>
      </div>
    </footer>
  )
})
