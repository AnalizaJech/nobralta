# Revisión 3 — 21/10/2026 America/Lima

Dirección: vintage masculino, cuero envejecido, papel cálido y vino. Referencias visuales proporcionadas por el propietario; no afiliación ni licencia de series.

## Implementación
- Hero nuevo generado, reemplaza figura anterior. Fotografía original generada, sin usar las fotos de actores como publicidad.
- Marca Cinzel Decorative Bold OFL: SVG de contornos, mismo glifo N en nombre y app. Fuente y licencia autoalojadas; generador scripts/build-brand.py.
- Denim Route01 masculino, variantes índigo/carbón. Racer Medianoche de cuello de banda y Cuero Heritage cognac con cuello camisero y bolsillos de tapa.
- Cards redondeadas, CTA de talla/detalle; agotado con superficie y sello propios, oferta con descuento porcentual, pocas unidades en tono latón. Menú centrado dentro de su botón; iconos circulares y botones de texto en cápsula.
- Filtros cálidos, base alineada, disponibilidad real de variantes. Acción de agotado muestra disponibles.
- Packs de tres polos y polo+chaqueta. Vista previa representa mismos productos/colores por defecto que el constructor. Precio distribuido proporcionalmente, último importe ajusta céntimos. Packs nuevos tienen bundleId; cantidad y papelera afectan al conjunto completo. Las líneas históricas ya almacenadas sin bundleId conservan su formato anterior.
- Seis iconos sociales con enlaces provisionales autorizados por propietario, configurables en admin. WhatsApp no contiene teléfono inventado.

## QA de navegador
Playwright CLI, perfil r2-qa separado del navegador del propietario. Capturas en output/playwright/r3-*.png.
- Menú: diferencia entre centro de botón y glifo x=0px, y=0px.
- Color Carbón devuelve únicamente Denim Route01; dropdown cierra al elegir.
- Agotadas devuelve1 card; Explorar disponibles devuelve0 cards agotadas.
- Pack mixto abierto, tallas elegidas y añadido a bolsa; controles y papelera visibles.
- Admin edita campaña con principal Pima y última prenda Racer; seis campos sociales presentes y guardables.
- Sin desbordamiento horizontal a320/390/768/1440 (scrollWidth305/375/753/1425 con scrollbar15px).
- Impeccable detector sobre App, Admin, Merchandising y CSS: [] tras cambios visuales.

No se publicaron enlaces ni se enviaron comunicaciones externas; sigue siendo frontend con localStorage.

## Resultado final
Build Vite correcto y test:sites4/4. Consola de QA sin errores ni advertencias. Catálogo/tienda/carrito sin desbordamientos a320/390/768/1440. Cero select/dialog nativos en DOM revisado. Pack mixto: cantidades2/2 vinculadas; papelera elimina sus2 líneas. Tres polos: negro/marfil/vino, importes49.67+49.67+49.66=S/149.00. Recursos40 con transparencia de prendas verificada; algunos recortes generados tienen alfa máximo254, válido como opacidad prácticamente completa, y fondo0. Auditoría mecánica Impeccable final: []. Esto no sustituye la aprobación creativa del propietario.
