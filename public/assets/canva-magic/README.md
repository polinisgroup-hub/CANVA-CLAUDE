# Recortes de Canva Magic Studio (app React)

Coloca aquí los recortes reales de las cards del carrusel del hero, con
**estos nombres exactos** (formato `.jpg`, relación ~3:2, p. ej. 600×400 px):

```
magic-animate.jpg
grab-text.jpg
background-remover.jpg
magic-edit.jpg
magic-switch.jpg
text-to-image.jpg
```

En cuanto el archivo exista con ese nombre, la card mostrará el recorte real
automáticamente. Si falta alguno, esa card usa el diseño CSS (no se rompe nada).

¿Quieres añadir más cards reales (Brand voice, Magic Design, Upload your own
media, Image to video, Flourish charts, Swap languages)? Guarda el `.jpg` aquí
y añade `image: '/assets/canva-magic/<archivo>.jpg'` a esa card en
`src/config/magicCards.ts`.

> ⚠️ Las imágenes que se pegan en el chat NO se guardan como archivos: hay que
> colocarlas aquí manualmente (commit al repo o arrastrarlas a esta carpeta).
