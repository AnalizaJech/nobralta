# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Acuerdos del prototipo NOBRALTA — 2026-10-21
Autorización actual: frontend estático local e interacción de demostración. No construir backend Laravel, auth, pagos reales, base de datos ni publicar. La elección de React + Vite es provisional para iteración visual, no una decisión de separar backend/frontend en producción.

Marca centrada: símbolo N y nombre derivan de la misma fuente/contornos maestros en public/assets/brand-n.svg y brand-wordmark.svg. No cambiar una sin actualizar la otra desde la fuente. Cabecera sin «Colección». Menú a la izquierda, búsqueda/bolsa a la derecha. No duplicar navegación de categorías en el cuerpo. Todo control estilizado conservando semántica.

El propietario todavía no ha aprobado el diseño final. Sus futuras correcciones sobre layout/tipografía tienen prioridad sobre mocks anteriores. Mantener claridad de muestra conceptual: fotos y precios ilustrativos; no stock, composición completa o políticas aprobadas. El producto inicial es camiseta Pima slim; jeans y botas muestran visión futura.

Fuentes locales OFL, assets originales generados y Phosphor para iconos. No introducir imágenes externas, trackers ni fuentes remotas. CSS usa tokens :root para migración a Laravel. Mantener pruebas manuales de menú, búsqueda, talla, bolsa, cantidades, Escape, 390px y escritorio tras cambios de interacción relevantes.

## Revisión ampliada — 21/10/2026, prioridad sobre acuerdos anteriores
La carpeta canónica activa es Desktop/Proyecto. El propietario autorizó frontend React completo con condicionales/localStorage para simular cliente y administrador. Se autorizó instalar/actualizar prerrequisitos de Laravel, sin crear todavía la app Laravel ni publicar. Los rótulos «prototipo», «ilustrativo», «demostración» no van en la UI; mantener limitaciones y fixtures explícitos en README/PRODUCT/COBERTURA.

Cabecera: marca completa centrada sin símbolo al lado/arriba; iconos sin texto; menú Phosphor Equals de dos líneas y desplegable horizontal, sin drawer. Marca actual Manrope620 con incisión en N compartida con icono, generada por scripts/build-brand.py. Instrument queda para titulares. Foco de teclado neutro, sin overlays QA ni anillos azules al click. No eliminar foco accesible.

Catálogo masculino cubre Pima, chaquetas, denim, cafarenas, camisas, botas, pantalones de vestir, blazers y gabardinas. Variantes con imágenes reales por color y alfa. Filtros dentro del catálogo sin duplicar categorías como otro menú. Ficha amplia dos columnas, cantidad y Comprar ahora/Añadir bolsa. Cuenta, packs, cupones/vendedor y administración persistentes localmente.

Recojo Shalom exige DNI, nombres/apellidos, teléfono, correo y agencia por ubicación. No direcciones inventadas. Entrega 2–10 días desde confirmar pago y destino; cotizar envío antes de pagar. Sin cambios/devoluciones voluntarias por preferencia, conservando derechos legales. Mensajes externos no enviados; texto/PDF preparados para revisión manual. No prometer certificación de materiales, protección real de localStorage ni comprobante tributario.

El frontend tiene guard de admin solo para organizar UX; no seguridad de servidor. La bóveda y docs/COBERTURA distinguen mecanismos productivos pendientes. No presentar pruebas de concurrencia, legal, WCAG o integración bancaria/Shalom como realizadas.

## Reglas permanentes — reconstrucción UX solicitada 21/10/2026
Prioridad sobre reglas previas: no usar dropdowns/selectores del sistema ni controles con aspecto sin diseñar. Select es un combobox propio de React con listbox estilizado, teclado y hidden input para FormData; no renderizar select/option nativos. Nunca textarea redimensionable: altura fijada140px, resize:none, overflow-y:auto y límite de caracteres. Campos con altura50px y ancho contextual controlado; textos largos con scroll interno. Botones con superficie/borde y forma perceptible.
Cuenta, carrito, packs y detalle son páginas completas bajo navbar persistente, sin modales/backdrop. Despliegues de menú y búsqueda ocupan todo el viewport bajo navbar. Menú con dos líneas, superior completa e inferior mitad. Transiciones táctiles y de vistas, con reduced-motion.
Búsqueda local con sugerencias inmediatas, categorías, aproximación y sinónimos. Trabajos significa oportunidades laborales/afiliación; gestión de puestos/publicación y postulaciones locales desde admin. Panel administrativo reconstruido como espacio de tareas con navegación lateral desktop y menú mobile, no fila de módulos saturada.
Marca de esta revisión: Michroma, contornos idénticos para N y nombre completo. No mostrar ambos juntos. Referencia de carrito: captura Samsung adjuntada por propietario, productos/entrega amplios y resumen separado con botón Aplicar real. Seguimiento con estado actual, siguiente paso, agencia y movimientos, sin atribuir auditoría visual completa de Temu.
## Revisión 3 — dirección vintage y merchandising
Prioridad sobre la marca Michroma de revisión2: Cinzel Decorative Bold OFL, contornos compartidos entre nombre y N, sin icono separado cuando se muestra nombre completo. Inspiración masculina vintage y chaquetas de las referencias del propietario (Smallville/The Vampire Diaries), sin afirmar licencia ni vender personajes. Hero nuevo de aspecto fotográfico natural, denim masculino de muslo recto y bootcut sutil, índigo/carbón; chaquetas Racer Medianoche negra y Cuero Heritage cognac.
Botones de icono realmente circulares y centrados; botones de texto con extremos totalmente redondos. Carrito: papelera para eliminar; packs nuevos cambian cantidad y se eliminan como conjunto. Cards tienen acción explícita y tratamientos distintos para oferta, pocas unidades y agotado; agotado lleva a disponibles. Filtros alineados al pie de campos y paleta cálida. Packs muestran todas sus prendas/colores y admiten último producto distinto desde admin.
El propietario autorizó enlaces provisionales inventados para Instagram, TikTok, Facebook, WhatsApp, YouTube y LinkedIn; editables en Configuración. No se afirma que los perfiles pertenezcan a NOBRALTA. WhatsApp enlaza a plataforma, sin inventar el teléfono de una persona.
## Revisión 4 — prioridad de 22/10/2026
El propietario rechazó fondo crema y opciones cálidas. Sistema vigente: blanco #fff, superficies grises #f4f4f5, tinta #19191b y vino solo como acento de oferta/estado. No volver al crema por instrucciones históricas. Menú reestructurado en compra por prenda, seguimiento/ayuda y entradas visuales. Un único cierre contextual en la izquierda del navbar para menú/búsqueda/páginas; sin bandas con X ni separadores de filas molestos. Opciones de combobox redondeadas y neutras, selección oscura.
Cards de producto: color + talla + Añadir al carrito desde catálogo, sin obligar a abrir ficha. Validar talla/stock y dar feedback; imagen/nombre conservan acceso al detalle. Copy breve orientada al look. Una columna en teléfonos para decisiones de compra legibles.
Conjuntos y packs se distinguen; contenedores iguales. Conjunto recomendado incluye polo marfil, racer negra y denim índigo; mismas variantes en preview y constructor. Admin configura producto por cada posición y colores sugeridos en orden. Nuevas siluetas de chaquetas basadas en referencias Smallville/The Boys, sin afirmar licencia; biker con material natural y harness masculino ancho/tacón bajo. Polos18 variantes: se conservan Negro/Marfil/Vino y se añaden los15 tonos restantes del muestrario. Todas las variantes tienen imagen local propia, no recolor CSS.

## Harness — referencia del propietario, 22/10/2026
Prioridad sobre la horma redonda/caña media anterior: harness de caña corta al tobillo, punta alargada cuadrada con bordes suaves, tacón bajo, elástico lateral tipo Chelsea, correa y herrajes. Imagen local harness-tobillo PNG/WebP. No recuperar las botas de caña alta o punta redonda gruesa rechazadas.

## Packs y acciones secundarias — 22/10/2026
El polo blanco sustituye al marfil en catálogo y packs. Básicos: negro/blanco/vino. Conjunto racer: polo blanco, chaqueta negra, denim carbón. Nuevos conjuntos: polo blanco + denim índigo; biker negra + polo blanco + denim carbón. Precios locales de muestra 159 y 439, editables en admin. Mantener imágenes y colores del constructor sincronizados. Seguir explorando y Crear una cuenta: botones de contorno, sin icono, mismo ancho/alto que su acción principal.

## Compra, inputs y guía de medidas — 22/10/2026
Continuar mi compra conserva posición y tamaño al mostrar entrega; si falta sesión abre directamente Cuenta y regresa a la compra al iniciar sesión. Mantener placeholders claros y fondo blanco en inputs. Guía de medidas blanca, borde gris, radio16, tabla legible y cabecera con regla; no recuperar panel crema. Verificado desktop: botón antes/después x941.4 y601.6,312x50; móvil390 sin overflow.

## Ajustes de acceso y recojo — 22/10/2026
Botones de acceso agrupados con12px entre acciones. Cerrar sesión usa contorno neutro, fondo blanco y extremos redondos. Continuar compra desplaza al formulario de recojo tras abrirlo o regresar del login, respetando reduced-motion. Selectores habilitados blancos con texto oscuro; gris reservado para deshabilitados. Verificado en navegador390/1440: separación12px, logout999px, combobox blanco habilitado, recojo visible tras continuar.

## Pack cuero y alineación de recojo — 22/10/2026
Pack cuero: biker negra + botas harness negras, dos piezas, precio de muestra429 editable. Sustituye al conjunto biker/polo/denim. Tabla de medidas con borde y radio12px. En compra abierta, productos arriba y formulario de recojo junto al resumen: ambos comienzan al mismo nivel; en móvil una columna. Aviso de agencia blanco, borde gris, radio14px, icono MapPin y texto en dos niveles. QA1440: ambos paneles y220;390 sin overflow.

## Actualización de vistas — 22/10/2026
Etiqueta Precio total en carrito y recojo. Cerrar sesión con icono SignOut y hover negro/texto blanco. Servidor local y preview devuelven Cache-Control no-store/no-cache; imágenes AssetImage llevan revisión por recarga en desarrollo. Mantener datos personales/carrito separados del caché HTTP, sin borrar todo localStorage para actualizar el diseño.

## Historial y tablet — 22/10/2026
Cuenta incluye Historial de compras debajo de Mis pedidos, con prendas, variantes, cantidades, precios, descuentos, total y recojo; Mis pedidos mantiene seguimiento. Tablet hasta1100px: productos → resumen/subtotal → formulario. Historial probado con fixture aislado/restaurado; tablet1024 sin overflow. GitHub Pages preparado con base /nobralta/ y workflow de Actions.

## Estados seleccionados y salir — 22/10/2026
Las opciones de cuenta/combobox seleccionadas conservan fondo oscuro y texto blanco al hover. Cerrar sesión alinea icono y texto a la izquierda con el resto de navegación, sin margen extra; hover vino #622938.

## Directorio Shalom y cuero — 22/10/2026
Directorio oficial snapshot495 agencias/25 regiones desde shalom.com.pe/agencias; documentación docs/SHALOM.md. Departamento primero, selector agencia filtrado, búsqueda por texto y dirección visible. Precios cuero: Archivo429, Club439, biker449, Heritage459, Medianoche469, Abrigo589. Packs Medianoche599 y biker+harness579. Actualizar catálogo/carrito persistidos por migración, sin alterar órdenes históricas. Racer Archivo v2 usa referencia del propietario: cuello banda, cierre recto, bolsillo de pecho y dos laterales con cremallera, imagen local con alfa.

## Nomenclatura comercial — 22/10/2026
Nombres descriptivos verificados con referentes comerciales y comparación visual, documentados en docs/NOMBRES-CATALOGO.md. Usar café racer/biker/cuello camisero según corte; abrigo cuero simple no es trench cruzado. Jean bootcut de tiro medio; botín Chelsea con arnés y punta cuadrada. No usar nombres de marcas/modelos ajenos ni inferir fibra/acabado certificado por foto. Alias antiguos conservados en búsqueda; historial de pedidos intacto. QA390/1440 sin overflow; búsquedas cafe racer, biker, chelsea, bootcut y racer archivo correctas.
