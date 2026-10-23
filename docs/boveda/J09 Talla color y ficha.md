# J09 Talla color y ficha
Estado: propuesta pendiente de revisión; no implementado.
Actor: Cliente.
Objetivo: Elegir variante adecuada sin recordar códigos del Live.
Precondiciones: Muestra, tabla de medidas y fotos autorizadas; no hay datos reales aprobados todavía.

| Paso | Respuesta del sistema / procedimiento | Mensaje visible propuesto |
|---|---|---|
| 1. Abre ficha | Sistema muestra fotos/nombre/precio/composición/entrega/atención esenciales | Elige talla y color |
| 2. Consulta medidas | Tabla explica prenda vs cuerpo y unidad cm; no inventa equivalencias | Compara con una prenda tuya |
| 3. Selecciona combinación | Actualiza nombre de color, disponibilidad, galería/precio y resumen accesible | Seleccionado: [color], [talla] |
| 4. Añade | Servidor revalida variante/cantidad; conserva selección ante error | Añadido / ya no está disponible |

Excepciones: Sin talla elegida, color agotado, zoom, teclado y lector; swatch con nombre sin depender del color; ningún componente sintético omitido.
Datos y permisos: Lectura pública; carrito propio sin datos de otros.
Criterios de aceptación: R02/R06 en [[21 Requisitos y trazabilidad]]; ejecutar cada paso y excepción comprobando resultado, recuperación y autorización; registrar evidencia real antes de marcar conforme. Reglas en [[22 Reglas y estados]].

## Tu revisión
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:

Ver [[10 Registro de decisiones]].
