# Diseña en Minutos — Claude + Canva

Lead magnet descargable en PDF (7 páginas, tamaño carta/vertical) para crear
diseños profesionales de marketing digital con Claude + Canva.

## Entregable
- `Guia-Disena-en-Minutos-Claude-Canva.pdf` — guía final lista para descargar.

## Fuente (reproducible)
- `build/guia.html` — maquetación completa (7 páginas) con CSS de impresión.
- `build/fonts/fonts-embedded.css` — fuentes Anton + Poppins embebidas en base64.
- `build/embed_fonts.py` — script que descarga y embebe las fuentes.

## Regenerar el PDF
```bash
chromium --headless --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=build/guia.pdf "file://$PWD/build/guia.html"
```

Marca: naranja `#D97757`, teal `#008080`, púrpura `#4910bc` · Tipografías: Anton + Poppins · @lindamarmercado
