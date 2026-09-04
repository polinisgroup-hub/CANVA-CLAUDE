import { useEffect, useState } from 'react'
import { BrandLockup } from '../ui/BrandLockup'
import { PrimaryCTA } from '../ui/PrimaryCTA'
import { workshopConfig } from '../../config/workshop'

const navLinks = [
  { href: '#contenido', label: 'Contenido' },
  { href: '#clase-estrella', label: 'Clase estrella' },
  { href: '#incluye', label: 'Incluye' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-expo ${
        scrolled
          ? 'border-b border-ink/[0.06] bg-white/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between sm:h-20">
        <a href="#top" aria-label="Inicio — Taller Canva + Claude" className="shrink-0">
          <BrandLockup tone="dark" className="scale-[0.72] origin-left sm:scale-[0.8]" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <PrimaryCTA size="md" arrow={false} className="hidden sm:inline-flex">
          Entrar por ${workshopConfig.price}
        </PrimaryCTA>
      </div>
    </header>
  )
}
