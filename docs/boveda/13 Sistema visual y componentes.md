# Sistema visual y componentes
Estado: propuesta para aprobación, no diseño ya implementado.

## Dirección
Moda editorial sobria, personalidad rockera elegante y producto protagonista. No limitar marca a cuero, hombres o una temporada si la estrategia crecerá. Marca elegida NOBRALTA; identidad visual pendiente de aprobación.

## Tokens iniciales
| Token | Propuesta | Función |
|---|---|---|
| Fondo | #FAF8F5 | Lectura limpia y tonos de producto fieles |
| Texto | #191919 | Jerarquía y legibilidad |
| Superficie oscura | #181818 | Navegación/editorial, no toda la compra |
| Acento | #7B243C | Identidad y acciones principales |
| Borde | #D8D2CB | Separación; revisar contraste cuando comunique estado |
| Éxito/error | Tokens separados | Siempre texto/icono además del color |

No atribuir efectos psicológicos universales a un color: cultura, contexto, contraste y pruebas determinan uso. El color de fotos y muestras debe representar el producto, no teñirse por filtros.

Tipografía propuesta: una sans legible de licencia verificada y autoalojada WOFF2, 400/500/600, con alternativa de sistema; títulos editoriales opcionales tras prueba. Texto base 16 px, interlineado 1.5, máximo aproximado 65 caracteres por línea de lectura. Evitar cuerpos minúsculos, mayúsculas en párrafos y tipografías góticas en formularios. Escala sugerida 12/14/16/20/24/32/40, unidades relativas y títulos fluidos. Cifras de pagos alineadas y legibles. Cargar solo fuentes usadas con font-display adecuado.

Espaciado base 4 px: 4/8/12/16/24/32/48/64. Radios y sombras discretos y consistentes, imágenes con proporción reservada para evitar saltos. Diseñar sin depender de animaciones y respetar reduced-motion.

## Todos los controles estilizados
Conservar HTML semántico (button, input, select, table, headings, form), con componentes de diseño reutilizables. «Nada nativo» significa nada visualmente sin terminar; no reemplazar botones por divs. No ocultar foco ni perjudicar selector de archivos, teclado o autocompletado.

Componentes: Button, IconButton con nombre accesible, TextField, Select, ColorSwatch con texto, SizeSelector, QuantityStepper, ProductCard, Gallery, Price, StockStatus, ShippingEstimate, Accordion, Drawer, Dialog, Toast/InlineAlert, Skeleton, EmptyState, Table, Pagination, UploadDropzone, PaymentMethodCard y Timeline.
Cada uno debe definir default/hover/focus/pressed/disabled/loading/error/success cuando aplique. Foco y contraste comprobados. Formularios con etiqueta permanente, error asociado al campo y resumen si es largo; estados comunicados a lectores de pantalla sin anunciar cada tick de tiempo real.

Objetivo WCAG 2.2 AA: texto normal 4.5:1; grande 3:1; límites/estados interactivos necesarios 3:1. Controles de 44 px como objetivo cómodo interno; el mínimo AA 2.5.8 es 24×24 CSS px sujeto a excepciones, no confundir ambos. Verificar zoom 200%, reflujo y navegación por teclado.

## Aprobación
- [ ] Paleta y tipografía aprobadas tras mockup.
- [ ] Cada control pertenece a la biblioteca y tiene estados.
- [ ] No hay HTML visual sin estilizar, ni controles falsos sin semántica.

## Especificación adicional de tokens (propuesta)
Tokens semánticos: `surface=#FAF8F5`, `surface-raised=#FFFFFF`, `text=#191919`, `text-muted=#59534F`, `action=#7B243C`, `on-action=#FFFFFF`, `error=#A21D2B`, `success=#24613A`, `focus=#235C9B`. Borde decorativo #D8D2CB; borde interactivo #77716A cuando necesario para identificar control. Verificar pares y estados con contraste calculado antes de implementar; no declarar conformidad de toda la interfaz por esta paleta.

Tipografía inicial sin dependencia externa: stack de sistema `system-ui, sans-serif`; no distribuir fuentes propietarias del equipo. Candidata editorial Inter (SIL OFL según su repositorio oficial, licencia/archivo por verificar antes de incorporarla); no descargar ni incorporar fuente aquí. Si se elige, conservar OFL y autoalojar WOFF2 con pesos usados. Escala en rem 0.75/0.875/1/1.25/1.5/2/2.5; TV 2/3/4 según distancia, nunca texto privado. Espaciado en rem desde base 4px; radios 4/8/12px, borde 1px, sombra de elevación `0 8px 24px rgb(0 0 0 / 0.12)`, evitar sombra como único límite.

Grilla propuesta: móvil 4 columnas, margen 16px/gap16; tablet desde 48rem 8 columnas/margen24/gap24, lista+detalle si cabe; escritorio desde 75rem 12 columnas/margen32/max1280, tablas con encabezados/filtros; TV desde contexto de panel dedicado (no solo ancho), agregados con alto contraste y sin interacción necesaria. Verificar a 320 CSS px, zoom 200% y 400%, orientación y teclado abierto; breakpoints se ajustan al contenido, no al nombre del dispositivo. Tablas conservan semántica con región desplazable o resumen móvil etiquetado, sin borrar columnas críticas.

Iconos: SVG propios simples con currentColor, 20/24px, texto accesible en botones; nunca significado solo por icono. Si se adopta biblioteca verificar licencia y versión antes de copiar. Fotos autorizadas sin filtros de color, catálogo 3:4 y detalle con proporción original ampliable; reservar dimensiones y alt útil (sin repetir título). Animación 120–180ms, sin impedir tarea, reduced-motion sin desplazamientos/zoom decorativos.

## Contrato de estados por familia
| Familia | Estados y comportamiento |
|---|---|
| Botón/enlace/selector talla-color/cantidad | normal, hover, foco visible, presionado, deshabilitado con motivo, cargando sin doble envío; selección textual/aria; cantidad respeta stock servidor |
| Campo/select/carga | normal/foco, lectura/deshabilitado distintos; error asociado y resumen, éxito textual; carga por archivo/procesamiento separado; conservar valor en error/offline |
| Tarjeta/galería/precio/stock | cargando con espacio reservado, vacío/agotado real, error y reintento; disponibilidad de variante no solo producto; zoom accesible |
| Acordeón/dialog/drawer | expandido/cerrado semántico; foco inicial/retorno y cierre accesible; errores dentro sin perder contexto; no ocultar condiciones críticas |
| Alertas/seguimiento | pendiente, éxito, error, sin conexión, sincronizando, sin permisos; región live moderada; no anunciar cada tick |
| Tablas/paginación | normal/cargando/vacío/error/sin permiso, orden/filtro anunciados, posición conservada y resultados contados sin PII |

«Sin permisos» es estado de recurso, no licencia para entregar datos y esconderlos con CSS. Deshabilitado no puede ser la única explicación de rechazo. Éxito requiere respuesta canónica, no clic local. Redacción: «Constancia recibida; pendiente de verificar», «No pudimos procesar la imagen; tu reporte sigue pendiente», «No encontramos el abono; revisaremos los datos», «Sin conexión; último dato [hora]». Evitar culpar o afirmar fraude. Documento de componentes futuro debe mostrar cada estado aplicable con HTML semántico, foco nunca oculto por barra fija y prueba manual de lector de pantalla.

## Criterios expresos del propietario — 2026-10-21
Estos criterios corrigen las exploraciones anteriores; no aprueban ninguna maqueta, paleta o fuente definitiva.

### Identidad tipográfica única
El logotipo NOBRALTA y su icono/isotipo deben compartir el mismo dibujo tipográfico. El icono es la N inicial exacta del logotipo: mismos trazos, terminales, diagonal y proporciones. No combinar N de una familia con nombre de otra, ni generar por separado dos dibujos parecidos. Preparar un único archivo vectorial maestro del nombre y extraer su N para favicon, icono de app y usos reducidos. Los iconos de interfaz (buscar/bolsa/etc.) pertenecen a una familia consistente, pero no son letras del logotipo.

Adaptar margen de seguridad y contenedor a cada plataforma, preservando el contorno de la N. Evaluar legibilidad real en 16/24/32 px, versión monocroma y fondos claro/oscuro. Fuente y licencia deben permitir uso web, app y tratamiento de marca; selección definitiva pendiente. Las imágenes de ideación no demuestran coincidencia geométrica exacta: contrastar exportaciones del mismo maestro antes de aprobar identidad.

### Dirección y componentes
El propietario rechazó todas las direcciones visuales mostradas hasta este punto: no reutilizarlas como diseño aprobado. Busca creatividad editorial, tipografía distintiva, modelaje adulto sensual y elegante, productos bien modelados/aislados y compra intuitiva con pocas decisiones simultáneas. La exploración puede combinar lenguajes, manteniendo una sola lógica de componentes. Todo control debe tener acabado propio con HTML semántico accesible; cero apariencia de control sin estilizar.

### Comprobación previa a otra propuesta
- Icono N y N del nombre proceden del mismo maestro; no solo se parecen.
- Una acción prioritaria por sección y opciones de talla/color cuando sean necesarias para elegir producto.
- No repetir menú/categorías en el cuerpo como relleno; seguir la regla de arquitectura de la nota14.
- La fotografía editorial inspira; la ficha permite examinar producto aislado, ajuste en modelo, detalles y medidas.
- Revisar tipografía/jerarquía y redundancia antes de presentar nuevas variaciones; cambiar solo colores no resuelve una composición rechazada.
