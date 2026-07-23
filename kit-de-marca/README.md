# Guía · Define tu Kit de Marca — generador de PDF autónomo

Proyecto que produce **`guia-kit-de-marca.pdf`**: un PDF de 4 páginas
(tamaño carta / vertical) construido con **un único HTML + CSS embebido** y
convertido a PDF. El PDF es 100 % autónomo: **sin fuentes del sistema, sin
imágenes externas y sin hojas de estilo externas**.

## Ejecutar (un solo comando)

```bash
python3 generar_pdf.py
```

Genera `guia-kit-de-marca.html` (intermedio) y `guia-kit-de-marca.pdf` (final).

## Motor de PDF

El script detecta automáticamente el motor disponible:

1. **headless Chromium** (el mismo motor que usa Puppeteer) — vía `chromium`,
   `google-chrome`, la variable `CHROME_BIN`, o una instalación de Playwright.
2. **WeasyPrint** como alternativa (`pip install weasyprint`) si no hay Chromium.

No requiere `npm install` ni descargar navegadores: reutiliza el Chromium ya
presente en el entorno.

## Cómo se logra la autonomía del PDF

- **CSS embebido** con `<style>` inline (nada de `<link>` externos).
- **Tipografía Poppins incrustada** como `@font-face` con
  `src: url(data:font/woff2;base64,...)`. Se usan 2 pesos:
  `fonts/Poppins-Regular.woff2` (400) y `fonts/Poppins-SemiBold.woff2` (600).
  El script los lee y los convierte a base64 al generar el HTML.
- **Tamaño y paginación** con `@page { size: letter }` y
  `page-break-after: always` para producir exactamente 4 páginas.

## Paleta de marca

| Color        | HEX       | Uso |
|--------------|-----------|-----|
| Naranja      | `#D97757` | `.pill-tag`, acentos |
| Teal         | `#008080` | `.checkbox`, `.checkmark`, pills |
| Púrpura      | `#4910bc` | numeración, pills, etiquetas |
| Gris oscuro  | `#26262b` | texto base / neutro |

Máximo 3 colores de marca por página + el gris de texto.

## Componentes reutilizables (clases CSS)

- `.pill-tag` — etiqueta píldora naranja (variantes `.teal`, `.purple`).
- `.box-formula` — caja de fondo negro para "fórmulas" / prompts.
- `.box-result` — caja rosa pálido para "verificación" / resultado esperado.
- `.checkbox` — casilla `☐` dibujada en CSS puro (borde cuadrado).
- `.checkmark` — `✓` dibujado en CSS (dos bordes rotados) en teal.
- `.footer` — pie con número de página a la izquierda y `@lindamarmercado`
  a la derecha.
- `.two-col` — layout de 2 columnas con flexbox y `gap` generoso.

## Estructura

```
kit-de-marca/
├── generar_pdf.py            # script principal (un comando)
├── fonts/
│   ├── Poppins-Regular.woff2 # peso 400
│   └── Poppins-SemiBold.woff2# peso 600
├── guia-kit-de-marca.html    # HTML generado (autónomo)
└── guia-kit-de-marca.pdf     # PDF final de 4 páginas
```

## Contenido (4 páginas)

1. **Portada** — "GUÍA / DEFINE TU KIT DE MARCA" + pill `BRANDING`.
2. **¿Qué es un kit de marca?** + Paso 1 (colores) en `.two-col` con checklist
   (`.checkbox`) y `.box-result`.
3. **Pasos 2 y 3** (tipografías y logo) en `.two-col`, cada uno con `.pill-tag`,
   checklist y `.box-formula` con un mini-framework.
4. **AFIANZA** — vista previa del kit (logo, paleta con HEX, tipografía y estilo
   de imágenes, todo en CSS), checklist final con `.checkmark` en teal y un botón
   **"Usar la plantilla"** enlazado a la plantilla de Canva.

## Plantilla de Canva

El botón de la página 4 apunta a la plantilla editable de Canva. El enlace se
define en `generar_pdf.py` con la constante `CANVA_TEMPLATE_URL`
(actualmente `https://canva.link/irjtxfu8xkdlqca`); cámbialo ahí si necesitas
otro enlace y vuelve a ejecutar el script.
