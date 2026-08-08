# Recortes de Canva Magic Studio (versión HTML autónoma)

Coloca aquí los recortes reales para el carrusel de `standalone/index.html`,
con **estos nombres exactos** (`.jpg`, relación ~3:2, p. ej. 600×400 px):

```
magic-animate.jpg
grab-text.jpg
background-remover.jpg
magic-edit.jpg
magic-switch.jpg
text-to-image.jpg
```

La ruta es relativa al archivo `index.html`, así que la estructura debe quedar:

```
standalone/
├─ index.html
└─ assets/
   └─ canva-magic/
      ├─ magic-animate.jpg
      ├─ grab-text.jpg
      └─ …
```

Si un archivo no existe, la card usa el diseño CSS automáticamente (`onerror`),
así que el HTML sigue funcionando como archivo único aunque no pongas imágenes.

> ⚠️ Las imágenes pegadas en el chat NO se guardan solas: colócalas aquí tú
> (mismo nombre exacto).
