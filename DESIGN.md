# NOBRALTA — sistema visual vigente, revisión4

## Dirección
Moda masculina vintage con fotografía natural, cuero y denim. Fondo blanco #fff, superficie #f4f4f5, tinta #19191b, borde #e4e4e7 y vino #5d2639 solo como acento. El propietario rechazó crema y tonos cálidos para UI. Campaña editorial en tienda; administración sobria orientada a tareas. Prioridad: feedback del propietario, todavía sin aprobación creativa final.

## Tipografía y marca
Instrument Serif regular/italic para titulares, Manrope variable en UI. Marca Cinzel Decorative Bold OFL convertida a contornos con tracking30: mismo path N en nombre e icono; no se muestran ambos juntos. Fuente/licencias locales. Fuente de generación: scripts/build-brand.py; dimensiones y metadatos actualizados. Marca completa centrada, glifo del menú centrado en su botón. Menú de dos líneas: superior entera, inferior mitad.

## Composición y componentes
Hero de patio cálido con modelo adulto, polo marfil y racer negra. Desktop foto completa a ancho de pantalla y texto sobre zona vacía; móvil foto arriba y copy sobre superficie vino debajo con empalme curvo. No cortar cabeza para lograr encuadre.

Cards con recortes alfa sobre superficie cálida y esquinas30px. Nombre/precio, swatches, acción Elegir talla y botón circular de detalle. Oferta: fondo rosado cálido y porcentaje vino. Stock bajo: latón. Agotado: superficie desaturada, borde discontinuo y sello circular; CTA a disponibles y detalle accesible. No depender de hover para comprar.

Filtros con etiquetas, misma línea base, cápsulas cálidas y disponibilidad. Orden y conteo reflejan resultados. Búsqueda con categorías, sinónimos y aproximación. Packs muestran todas las prendas y colores iniciales; tres polos o combinaciones con última prenda distinta. Color/talla por unidad. Cantidad y papelera de packs nuevos afectan al conjunto; precio distribuido proporcionalmente con ajuste final de céntimos.

Botones de texto con extremos totalmente redondos; iconos circulares centrados. Transiciones de pulsación, selección y entrada; reduced-motion. Footer con seis iconos sociales y enlaces provisionales editables desde admin.

## Flujos
Cuenta, producto, pack, carrito y seguimiento son páginas completas bajo navbar persistente. Menú/búsqueda llenan viewport bajo navbar; sin drawer ni dialog. Cuenta separa pedidos/datos; carrito productos y destinatario en área amplia y resumen aparte. Seguimiento con estado, siguiente paso, etapas, agencia y movimientos.

Select/listbox y calendario propios. Campos de altura50px y ancho contextual. Todo textarea altura140px, resize:none, overflow-y:auto. Estados de error textuales; foco de teclado visible y neutro. No overlays QA ni controles de sistema sin diseñar.

Admin: navegación lateral desktop, menú plegable mobile, buscador de pedidos/clientes, operación de pedidos, catálogo, campañas, afiliados, envíos, pagos, personal, Trabajos y configuración. Redes y campañas mixtas editables. Persistencia local; no seguridad productiva ni servicios externos conectados.

## Verificación
Playwright CLI en sesión aislada. Revisiones a320/390/768/1440; imágenes sin errores de carga, filtros, packs mixtos y de tres unidades, cantidades, papelera y configuración. Ver docs/REVISION-4.md. No se afirma auditoría WCAG completa ni aprobación creativa.


## Reglas vigentes de revisión4, prioridad sobre anatomía anterior
Menú jerárquico de compra/servicio/descubrimiento. Cierre único en navbar, sin banda secundaria. Cards con color, talla y Añadir al carrito directo; acceso al detalle mediante imagen/nombre. Contenedores de packs alineados y look de tres prendas coordinadas. Móvil: una card por fila para selección legible. Todos los colores con fotografías locales; no filtros CSS para recolor. Véase docs/REVISION-4.md para inventario de cambios y QA.
