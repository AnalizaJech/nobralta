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

## Administración — revisión 23/10/2026
Área de trabajo con fondo blanco, texto negro y superficies grises neutras; botones y controles compartidos con la tienda. Navegación agrupada por tarea y encabezados con descripción funcional. El resumen prioriza vouchers pendientes, preparación, despachos y stock bajo. Directorio y clientes usan búsqueda y paginación; catálogo resume variantes y despliega stock por color al editar. Promociones abren su formulario bajo demanda y muestran solo los campos del tipo elegido. Configuración divide atención, redes y perfil. En tablet y móvil el menú se contrae y las tablas conservan desplazamiento interno sin ampliar el viewport.

## Pulido admin r22 — 23/10/2026
Sustituye la navegación lateral: cabecera de marca centrada y menú de pantalla completa, con grupos en cuatro/dos/una columna según ancho. El logo sirve de retorno a tienda. Catálogo como galería de productos y stock bajo como tarjetas visuales con estado y acceso a edición. Métricas separadas, acciones de preparación/despacho con contorno y estados con iconos. Componentes AdminEmpty y AdminNotice unifican mensajes con padding y tipografía del sistema. Primarios negros/hover borgoña, secundarios blancos/hover gris y destructivos con borde borgoña.

## Paleta de acciones y estados admin r24
Primario: borgoña #622938 y hover #451b28. Secundario: fondo #f6edf1, texto #622938, borde #d7b8c4; hover #eddae2. Advertencia/pausa: ámbar #805019 sobre #fff3df; destrucción: rojo #962c43 sobre #fbeef1. AdminBadge incluye icono y texto: éxito #155e52/#eaf5f1, advertencia #805019/#fff3df, información #284e83/#edf3fc, error #962c43/#fbeef1 y neutro gris. No usar un único gris para estados diferentes; el color siempre acompaña texto e icono.

## Pedido y tablas r25
Encabezados de tabla #19191b/#fff, filas hover #f8f1f4; acción de fila rosada que pasa a borgoña. Detalle con bloques de destinatario, agencia, importes, historial y pago; etiquetas discretas, cifras destacadas e iconos de contexto. Imágenes del voucher conservan proporción y pueden ampliarse en visor con cierre accesible; PDF embebido y descarga disponible. Acciones con ancho según contenido y20px bajo textarea; cada botón lleva un solo icono.

## Foto opcional y QR r26
Selector de imagen compartido OptionalImage: vista circular de perfil y cuadrada para QR, validación500KB, cambiar/eliminar y texto de ayuda. Foto guardada con datos de perfil. En checkout, instrucciones del medio incluyen cuenta destacada, QR de210px con fondo blanco y aviso de datos de prueba únicamente en medios demo.

## Ajustes r28
QR configurable por administrador, sin rótulos de demostración en UI. Avatar admite encuadre cuadrado antes de guardarse; controles de zoom y posición accesibles. Admin replica las tres acciones de cabecera del cliente (cuenta, buscar, bolsa), conservando logo centrado y menú a la izquierda. Resultados de agencias ocupan todas las columnas del formulario para igualar el ancho del buscador.

## Retorno y detalle cliente r29
La navegación auxiliar preserva el contexto del área administrativa montada. El cierre restaura scroll y foco. Detalle cliente titula Pedido más código; tarjetas blancas con borde neutro, radio18px, padding26px, iconos borgoña y campos etiquetados. Secciones en tres columnas o apiladas; historial desplegado con filas contenidas y descarga con acción independiente.

## Trabajos/footer r30
Footer con base negra, marca blanca, enlaces agrupados y banda superior neutra que explica recojo, revisión del pago y seguimiento. Información por páginas con titular editorial y secciones blancas contenidas; sin CTA Volver. Trabajos comparte tipografía, espacios, bordes y CTA de tienda; detalle y postulación en dos columnas o apiladas. La navegación interna Ver oportunidades permite cambiar de convocatoria.

## PDF de compra r33
A4 blanco, márgenes18mm, marca original, negro/grises neutros y borgoña. Bloques claros para destinatario y agencia; tabla con miniaturas, cantidad, precio unitario e importe. Total en bloque borgoña. Tipografía Helvetica legible y logo rasterizado desde SVG maestro. Cabecera y pie comunes en pedidos multipágina. Trabajos sin líneas estructurales duplicadas sobre las tarjetas.

## Tipografía PDF r35 — prioridad sobre r33
Sustituir Helvetica por Manrope incrustada (regular400 y semibold600); Instrument Serif en el título Pedido y cierre. Logo centrado como la cabecera del sitio, metadatos discretos, tarjetas blancas con bordes neutros y total borgoña. Recursos estáticos locales, sin dependencia de fuentes instaladas en el equipo receptor.

## Resumen de pago y Logística r36
- Un único importe de productos mientras se coordina el envío; desglose y total solo tras confirmar costo.
- Nuevo módulo Logística con destino, cliente e importe editable por pedido en etapa de pago/revisión; acceso al detalle.
- Misma lógica en seguimiento, administración y PDF, con registro de fecha e historial.
