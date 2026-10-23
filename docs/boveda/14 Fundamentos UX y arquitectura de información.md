# Fundamentos UX y arquitectura de información
Aplicar principios como hipótesis de diseño, no como garantía de conversión.

| Principio | Aplicación | Cómo comprobar |
|---|---|---|
| Hick-Hyman | Reducir decisiones simultáneas; opciones relevantes por talla/color | Tiempo y errores de selección |
| Fitts | Acciones principales grandes y alcanzables; separar borrar/comprar | Errores táctiles y alcance |
| Gestalt: proximidad y similitud | Agrupar precio, variante y compra; pagos separados de envío | Usuario identifica total y siguiente paso |
| Reconocimiento sobre recuerdo | Mostrar variante elegida y resumen persistente | No depender de recordar códigos del Live |
| Divulgación progresiva | Datos esenciales visibles; cuidados y detalle en acordeones | Tarea se completa sin buscar información crítica |
| Visibilidad del estado | Subiendo/procesando/pendiente/verificado distintos | Usuario explica estado sin ayuda |
| Prevención/recuperación | Confirmar acciones delicadas, mantener formulario y carrito | Recuperación sin repetir todo |
| Consistencia | Vocabulario y componentes iguales en tienda/panel | No confundir constancia con pago |

No ocultar costo, composición, demoras o condiciones críticas en acordeones. Nada de escasez falsa, contadores inventados, reseñas ficticias o casillas de publicidad premarcadas.

## Navegación inicial
Tienda: Inicio, Polos, guía de tallas, envíos/cambios, seguimiento, carrito y ayuda. No publicar categorías vacías de futura expansión. Panel: Pedidos, Pagos, Inventario, Envíos, Afiliados, Personal (cuando corresponda), Reportes y Configuración con permisos.
Checkout sin cuenta obligatoria como propuesta; identificar acceso a pedido por mecanismo seguro, no solo número correlativo. Autocompletar apropiado sin guardar información sensible en dispositivo compartido.

## Prueba moderada
Probar con 5 personas representativas como exploración cualitativa, no evidencia estadística universal. Tareas: encontrar talla, conocer total, reportar pago nocturno, corregir constancia y seguir envío. Registrar éxito, ayuda requerida, errores y comentarios; corregir y volver a probar. No preguntar solo «¿te gusta?».

## Reducción de redundancia — instrucción del propietario 2026-10-21
El navbar concentra navegación global (colección/categorías según arquitectura elegida, búsqueda, cuenta si corresponde y bolsa). Evitar clonar inmediatamente esas opciones en otro menú o fila de categorías del body. Cada sección del cuerpo debe cumplir una tarea distinta: presentar un look comprable, descubrir una selección con sentido, examinar una prenda o resolver una duda necesaria. No añadir secciones para repetir etiquetas del navbar ni rellenar longitud.

Inventariar por pantalla cada destino y acción visible, su ubicación, propósito y siguiente paso. Si dos elementos cumplen el mismo propósito sin aportar contexto útil, consolidarlos. Un acceso contextual a una prenda dentro de un look puede justificarse aunque esa prenda también sea alcanzable desde catálogo; no convertir la regla en una prohibición de todo enlace interno repetido. Breadcrumb, navegación y pie mantienen funciones propias de orientación/acceso legal. Conservar enlaces rastreables y nombres de categorías descriptivos para SEO, sin rellenar el cuerpo con menús duplicados.

Prueba de revisión: usuario identifica dónde buscar una prenda, qué acción sigue y cómo volver sin ayuda; registrar decisiones simultáneas y repeticiones. Probar móvil y escritorio: el menú móvil reemplaza la navegación de escritorio en su breakpoint, no mostrar ambas juntas. La simplificación no oculta precio, composición, condiciones de entrega ni errores importantes.
