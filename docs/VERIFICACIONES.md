# Verificaciones finales
Fecha:21/10/2026.

Build estático y pruebas de packaging: pasaron. Browser QA: tienda/admin320/390/768/1440, sin overflow de página;9familias,12variantes de prendas y2encuadres editoriales. Consola de build0errores/0warnings.

Controles comprobados: talla requerida, color/cantidad, compra, código válido/inválido, pack, registro, acceso, perfil persistente, creaciónpedido/agencia, cotización, reporte/archivo, verificación/preparación/despacho/entrega, PDF, campañas, liquidación afiliado y asistencia.

PHP8.5.12, Composer2.10.3, LaravelInstaller5.25.3, extensiones y requisitosglobales verificados. npm audit0avisos al consultar. Evidencia detallada en design-qa.md y docs/entorno.

## Directorio y administrador — 23/10/2026
Fuente oficial Shalom: 565 registros, 509 públicos, 500 con recepción; cinco destinos PRO recuperados. En checkout se comprobaron 509 opciones de ubicación más placeholder, nueve sin recepción deshabilitadas; búsqueda global Larcomar, autocompletado de departamento y dirección. Sin desbordamiento a 390 px.
Revisión de los 11 módulos admin a 1440, 1024, 768 y 390 px: sin desbordamiento horizontal de página ni fondos verdes heredados. Pruebas funcionales en navegador aislado: guardar precio/stock por talla, crear código de descuento, guardar pack existente, modificar enlace social, pausar/habilitar Larcomar y paginar el directorio. Pedido de prueba En revisión abierto desde Resumen y abono confirmado: Pago verificado. Fixtures restaurados al terminar; sin errores de ejecución en ese recorrido.
Build de GitHub Pages y cuatro pruebas Sites correctos. Advertencia conocida de Vite por bundle principal mayor de 500 KB. Evidencia local ignorada en output/playwright/r21-*; no son pruebas de integración con Shalom ni de seguridad del servidor.

## Pulido admin r22 — 23/10/2026
Recorrido de los 11 módulos a 1440, 1024, 768 y 390 px: sin desbordamientos ni errores de ejecución; menú cubre exactamente el alto disponible bajo cabecera. Escape devuelve el foco y el fondo permanece inerte durante el menú. Mensajes de postulaciones, stock y catálogo revisados visualmente. Acciones visibles de los módulos incorporan iconos semánticos. Guardado de stock/precio desde nueva tarjeta, promoción de código, configuración social y pausa/habilitación de agencias comprobados con fixtures restaurados. Build de Pages y cuatro pruebas Sites correctos; se conserva aviso Vite de bundle grande.

## Espaciado y botones r23 — 23/10/2026
Con un pedido En revisión de prueba, gap entre Ver pagos y primera tarjeta medido: 24px en 1440/1024/768/390px. Borgoña por defecto y hover oscuro comprobados. Iconos46x46px desktop/tablet y44x44px móvil, radio50%; menú999px. Sin overflow ni errores de ejecución, fixture restaurado. Se corrigió la regla heredada admin-section/section-title que anulaba el margen.

## Colores admin r24 — 23/10/2026
11 módulos revisados a1440/1024/768/390px sin overflow ni errores de ejecución. Trabajos: pausa cambia Publicada→Pausada y publicación restaura el estado; fixtures restaurados. Colores y hover de Nueva/Editar/Pausar comprobados en navegador; badges con icono y colores diferentes. Contraste de texto de primarios, secundarios y cuatro tonos de badges calculado: todos superan4.5:1.

## Gestión de pedidos r25 — 23/10/2026
Fixture de pedido En revisión con voucher PNG: vista previa decodificada, ampliación/cierre nativo comprobados; PDF válido cargado en iframe. No errores de ejecución. Detalle revisado a1440/1024/768/390px sin desbordamiento, separación de Copiar mensaje20px respecto al textarea y ningún botón con dos iconos. Revisión en los11 módulos también sin botones con dos iconos. Importe incorrecto mantiene En revisión y el correcto cambia a Pago verificado; observación puede abrirse y cancelarse. Encabezado de tabla negro/blanco y hover comprobados. Fixtures restaurados.

## Perfil/pagos r26 — 23/10/2026
Foto PNG cargada, decodificada, guardada y conservada tras reload; eliminación guardada comprobada. Yape demo muestra número y QR válido como imagen; BCP muestra cuenta y retira el QR. Admin cambia y elimina QR guardando configuración. Pruebas con fixtures restaurados. Checkout y admin sin overflow a390px; evidencia r26 en output/playwright. QR local generado con qrcode, contenido textual NOBRALTA - YAPE DE PRUEBA - NO REALIZAR PAGOS, sin payload de transferencia.

## Búsqueda de agencias r27
Selección directa de Larcomar guarda idshalom-661 y completa Lima/dirección. Megaplaza elegida con ArrowDown y Enter. Estado sin coincidencias comprobado. Vista390px sin overflow. Fixtures restaurados.

## Ajustes r28
Anchos input/resultados iguales:555.33px en1440,453.83 en1024,686 en768 y308 en390. Recorte con zoom guarda JPEG400x400, persiste tras reload y permite eliminar. Pagos ya sin rótulos de prueba; migración quita QR de muestra y preserva QR subido. Upload/cambio/eliminación QR admin continúa funcionando. Cabecera sin logout y sin overflow a1440/1024/768/390/360; cuenta y búsqueda abren sus secciones.

## Retorno y detalle r29
En Catálogo admin a600px de scroll, abrir/cerrar cuenta, búsqueda y bolsa mediante clic de puntero devuelve exactamente a600px y conserva Catálogo. Se utilizó clic por coordenadas visibles para evitar que el auto-scroll de locator.click alterase la posición antes del evento. Cliente con pedido En revisión: título Pedido NB-UX-29, cinco contenedores y movimientos desplegables;1440/1024/768/390 sin overflow. Fixtures restaurados, sin errores de ejecución.

## Trabajos/footer r30
Siete páginas informativas abiertas/cerradas desde footer a1440/1024/768/390px: sin botón Volver dentro del contenido ni desbordamiento. Trabajos listado/detalle revisados; formulario público guarda postulación y presenta confirmación; fixture restaurado. Todos los enlaces internos de información cierran con X. Sin errores de ejecución. Capturas r30 finales con animaciones terminadas. No se verificó cumplimiento legal productivo; datos comerciales oficiales continúan pendientes, sin inventarlos en la UI.

## PDF/Trabajos r33
PDF generado en navegador con jsPDF: pedido corto1página y28prendas de nombres largos6páginas. Todas las páginas renderizadas con Poppler e inspeccionadas: sin corte/solapamiento, logo/imágenes, repetición de cabeceras, numeración y total correctos. Render de1página con envío por cotizar y6páginas con descuento/envío. Artefactos locales output/pdf/detalle-compra.pdf y detalle-extenso.pdf; ignorados por Git. Borders superior/inferior de intro/listado/proceso Trabajos comprobados0px.

## Seguimiento compacto r34
Pedido cliente: botón Volver a mi cuenta0, bloque de recojo de seguimiento1, tarjeta de recojo duplicada0; datos de compra agrupados en1panel.1440/1024/768/390 sin desbordamiento. Frase de confirmación retirada del checkout. Fixture restaurado.

## Tipografía PDF r35
Se generaron PDF de1 y6páginas con las fuentes de la tienda. Inspección de recursos PDF:3archivos FontFile2 incrustados, únicamente Manrope e Instrument en BaseFont; sin Helvetica. Páginas renderizadas con Poppler e inspeccionadas sin cortes/solapamientos. Nombres largos, acentos, precios y paginación conservados. Fuentes derivadas de TTF locales OFL mediante fontTools; sin dependencias nuevas de runtime.

## r37 — Gestión y catálogo
Playwright1440/390: alta con foto, dos tallas y existencias3/5; segunda alta de dos colores, validación por imagen faltante, categoría Camisas, persistencia al recargar y compra desde card (Blanco/M/S159). Editor de producto conserva guardado previo a campos. Trabajos: formulario0 antes de Nueva,1 al editar y0 tras guardar; confirmación visible. Módulos Medios de pago/Configuración/Trabajos/Agencias Shalom/Promociones/Personal/Afiliados sin overflow a390px. PDF filtrado1p y completo4p descargados desde navegador, primera/última páginas renderizadas e inspeccionadas. Assets QA solo en output ignorado; fixtures restaurados.

## r38 — Iconos en seguimiento y PDF
Playwright1440/390:2 movimientos con estado/nota, control desplegable y descarga con1 icono cada uno; cierre con Enter correcto; sin desbordamiento móvil. PDF descargado desde seguimiento; render de1p y final del documento extenso6p revisados con iconos locales y texto sin solapamiento. Fixtures restaurados. Build Pages y4 tests de empaquetado correctos.
