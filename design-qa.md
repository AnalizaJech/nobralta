# Revisión vigente:4

Ver docs/REVISION-4.md. Los informes siguientes se conservan como historial.

# Revisión vigente:3

Ver docs/REVISION-3.md. Los informes siguientes son historial de revisiones anteriores.

# Revisión actual

Ver `docs/REVISION-2.md` para los cambios y pruebas vigentes. La evidencia siguiente corresponde a la revisión anterior y se conserva como historial.

# Design QA — NOBRALTA

Fecha de revisión: 21/10/2026, America/Lima.
**final result: passed**

## Alcance
Revisión del frontend estático y su simulación local autorizada. El propietario pidió modificar la implementación directamente y amplió el alcance a cuenta/administración/localStorage. La fuente de verdad visual son sus correcciones actuales, el sistema existente y la bóveda; no se afirma clon pixel-perfect de un mock aprobado. «Passed» confirma la entrega técnica/visual de este alcance, no aprobación creativa del propietario ni conformidad de producción.

## Evidencia visual inspeccionada
- Antes: Documents/ChatGPT/Emprendimiento/nobralta-frontend/qa/desktop-final.jpg y captura actual output/playwright/desktop-final.png, misma clase de viewport desktop; la captura antigua tiene un área útil distinta por escalado/barra. Comparación cualitativa de marca, navegación y jerarquía, no equivalencia de píxeles.
- Actual: desktop-final.png, production-mobile.png, production-hover.png, mobile-menu-final.png, catalog-expanded.png, gabardina-desktop.png, product-desktop.png, account-mobile.png, pack-mobile.png, promo-mobile-final.png, admin-final.png, admin-mobile-final.png y receipt-final.png.
- El build final servido en4174 se abrió e inspeccionó además del dev server4173. Mismo layout, assets completos y autenticación administrativa comprobada.

## Verificaciones de interacción
Playwright CLI en navegador real, mediante controles y formularios visibles:

1. Menú de dos líneas despliega navegación bajo cabecera; no abre dialog/aside. Cierra con Escape.
2. Filtro por chaqueta/café devuelve variante correspondiente; orden, búsqueda y vacío funcionan.
3. Producto sin talla muestra error. Color vino cambia imagen. Talla M, cantidad2 y Comprar ahora producen bolsa coherente.
4. Código DIEGO10: subtotalS/118, descuentoS/11.80, productosS/106.20. Código inválido se rechaza. Pack de2 unidadesS/99 con tallas/colores independientes; sin descuento adicional sobre pack.
5. Registro de cuenta nueva y modificación de teléfono; datos conservados tras recargar. Admin y cliente muestran sus ámbitos correspondientes.
6. Pedido con DNI/nombres/apellidos/teléfono/correo y agenciaShalom. Cotización previaS/12 → totalS/118.20. Constancia con referencia textual000123456 y fechas separadas → En revisión.
7. Admin verifica importe y movimiento, prepara, registra guía/OS y prueba, marca Entregado. Antes del abono no existe acción de despacho. Ventas verificadas/ticket reflejanS/106.20 de productos.
8. PDF descargado desde cliente/admin, renderizado con Poppler e inspeccionado: marca, destinatario, agencia, guía, prendas, cantidades, descuento, envío, total y aclaración fiscal legibles; sin recortes.
9. Campaña creada desde admin visible en tienda. Registro de liquidación afiliado con referencia, marcaciones de entrada/salida y modificación de contacto administrativo comprobados.
10. Cafarena agotada mantiene ficha visible y compra deshabilitada; camisa muestra oferta y precio anterior. Disponibilidad por talla y mensaje de pocas unidades.
11. Guardado local y errores de cuota contemplados; límites de archivo explícitos. No se probaron como seguridad de servidor.

## Responsive y activos
Tienda y administración sin desbordamiento de página a320/390/768/1440. Área útil medida305/375/753/1425 por scrollbar. Titular de hero ajustado tras detectar corte a320 y768. Cabecera sin choque de marca y controles. Tablas/navegación administrativa desplazan solo su contenedor.

30 archivos de marca/fotografía;14 imágenesPNG y14WebP, dosSVG. Todos los recortes de prenda con alpha0–255 verificado; imágenes no rotas en la revisión final. Hero propio para móvil, sin estirar la captura desktop. Imágenes declaran dimensiones intrínsecas mediante AssetImage. Fuentes locales y licencias presentes.

## Revisión de código y comprobaciones
- npm run build: pasó con Vite6.4.5; dist/client y adaptador conservados.
- npm run test:sites:4/4 pruebas pasaron.
- npm audit final:0 avisos conocidos al consultar.
- Impeccable detector final:[]; no sustituye la revisión visual.
- Web Interface Guidelines de Vercel consultadas: controles semánticos, icon-only con nombre, etiquetas, foco neutro visible de teclado, reduced-motion, medidas de imagen y números tabulares. No se afirma auditoríaWCAG completa.
- Consola del build estático en navegador limpio:0 errores y0 warnings. Durante desarrollo hubo desconexión del servidor al actualizar Vite y un aviso transitorio de hot-reload al cambiar la firma de un hook; la recarga limpia y el build final no lo reproducen.

## Incidencias cerradas
P1: recorte de titular en móvil estrecho/tablet; corregido y medido. P1: todas las secciones usaban aside; navegación reemplazada por desplegable y ficha/compra por dialog amplio. P1: referencias a imágenes aún en generación; todos los archivos finales presentes antes del build. P2: marca repetida en símbolo/nombre; ahora un wordmark, icono derivado para favicon/app. P2: azul/cuadrado de foco al click; foco monocromo para teclado y sin overlaysQA. P2: PDF básico; composición actual con marca y tabla/total clara.

## Límites y seguimiento
No quedanP0/P1/P2 dentro de esta simulación. P3: revisar con el propietario la identidad y composición final; pruebas físicasSafari/iPhone, lector de pantalla, contraste exhaustivo, usuarios y contenido comercial aprobado pendientes. Auth, inventario concurrente, colas, seguridad de archivos, integraciones, envíos de mensajes y facturación reales se desarrollarán en Laravel, como detalla docs/COBERTURA.md. No se publicó el sitio ni se crearon pedidos o cobros externos.
