# Recursos de NOBRALTA

Todos los recursos usados en la tienda están dentro de esta carpeta. Las imágenes son generadas para esta simulación; no acreditan composición, proveedor ni stock comercial. No se copiaron fotografías de referencias ajenas.

## Fotografía y prendas

Carpeta `public/assets`, cada fotografía con original PNG y WebP optimizado:

| Familia | Archivos base | Dirección |
|---|---|---|
| Editorial | hero-editorial, hero-mobile | Modelo masculino adulto, polo negro, denim y cuero, estudio vino; encuadres propios para desktop/móvil |
| Polos | polo-negro, polo-marfil, polo-vino | Slim cuello redondo; algodón de aspecto natural, volumen de prenda sin maniquí visible |
| Chaquetas | chaqueta-negra, chaqueta-cafe | Biker frontal, textura de cuero y herrajes discretos |
| Denim | jean-indigo | Bootcut índigo, largo completo |
| Botas | bota-harness | Par negro, arnés metálico |
| Cafarena | cafarena-negra | Cuello alto, manga larga |
| Camisa | camisa-marfil | Manga larga marfil, frente completo |
| Sastrería | pantalon-negro, blazer-negro | Pantalón de vestir y blazer negro |
| Abrigo | gabardina-arena | Gabardina larga beige/taupe con cinturón |

Generación: ImageGen integrado. Prompts de producto: fotografía ecommerce premium de prenda masculina frontal, ghost mannequin, prenda completa centrada y sin logos, detalle textil/material, alpha transparente real y coherencia entre variantes; chaquetas y prendas largas en torno a1100×1430. Polos1145×1374; medidas exactas y hashes en `docs/assets-manifest.json`.

QA de alfa: cada recorte de prenda PNG y WebP conserva canal transparente, verificado por `scripts/verify-assets.py` y por inspección visual. No se colorearon las variantes con filtros CSS. Imágenes hero opacas, recortes transparentes. Carga local sin CDN de fotografías.

## Marca y tipografía

`brand-wordmark.svg` y `brand-n.svg`: contornos maestros de Cinzel Decorative Bold con espaciado30. El icono reutiliza exactamente ese glifo. Generador `scripts/build-brand.py`; control `docs/brand-master.json`. No mostrar ambos juntos. No se afirma registro ni exclusividad legal.

Fuentes Instrument Serif, Manrope, Cinzel Decorative y archivo Michroma de revisión anterior, TTF/WOFF2 y licencias OFL en `public/fonts`. Fuente oficial: https://github.com/google/fonts (ofl/instrumentserif, ofl/manrope, ofl/michroma, ofl/cinzeldecorative). Iconos Phosphor React; menú local `public/icons/menu-two.svg`, dos trazos con inferior a mitad, adaptado de Hugeicons menu09.

## Publicación

Los assets y fuentes se copian al compilar a `dist/client`. Publicar esa carpeta; conservar originales y licencias en el proyecto. `docs/boveda`, `docs/entorno`, scripts, QA e instaladores son privados de trabajo y no pertenecen a la publicación estática.


## Recursos de revisión3
Activos actuales nuevos: hero-vintage (foto horizontal), denim-route-indigo y denim-route-carbon (jean masculino recto con apertura sutil), racer-medianoche (cuello de banda y cierres de pecho), cuero-heritage (cognac, cuello camisero, bolsillos de tapa). PNG maestros y WebP de entrega en public/assets. Generación ImageGen; prendas con transparencia. Referencias del propietario orientan siluetas, no se insertan fotos de actores ni se afirma licencia de series. Hero-editorial/hero-mobile y jean-indigo se conservan como archivos anteriores sin usarlos en el catálogo actual.


## Recursos de revisión4
15 nuevos polos: polo-crema/marron/celeste/gris-claro/blanco/camello/rojo/azul-acero/gris-oscuro/beige/azul-electrico/guinda/verde/palo-rosa/cemento. Chaquetas: biker-real-negro, biker-real-cafe, racer-archivo, cuero-camisero, abrigo-cuero-negro. Botas: harness-hombre. Cada uno con PNG maestro y WebP en public/assets; dimensiones y hashes en manifiesto82 archivos. Generación ImageGen. Fotos de actores/prendas adjuntas orientaron siluetas; no se insertan esas fotos en publicidad ni se afirma licencia de series.

## Ajuste de harness por referencia directa
Reemplazo actual: harness-tobillo.png/webp. Caña corta al tobillo, punta alargada cuadrada suavizada y tacón bajo; elástico lateral, correa, hebilla y cadena discreta. Generado con la foto adjuntada como referencia; sin marca ajena. Los archivos harness-hombre anteriores se conservan para historial, sin usarlos en el catálogo actual.

Racer Archivo v2: public/assets/racer-archivo-v2.png y .webp, generado a partir de referencia de diseño del propietario el22/10/2026;1086x1448, fondo transparente, sin persona/marca. Sustituye imagen de archivo anterior en catálogo.
