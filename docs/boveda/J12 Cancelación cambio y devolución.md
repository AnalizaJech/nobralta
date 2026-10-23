# J12 Cancelación cambio y devolución
Estado: propuesta pendiente de revisión; no implementado.
Actor: Cliente / operador.
Objetivo: Resolver solicitud sin perder dinero ni historial.
Precondiciones: Pedido propio y política legalmente revisada visible antes de compra; devolución no aprobada automáticamente.

| Paso | Respuesta del sistema / procedimiento | Mensaje visible propuesto |
|---|---|---|
| 1. Solicita | Registra motivo/líneas/cantidades y estado actual | Solicitud recibida para revisión |
| 2. Revisa | Distingue sin abono, abono real, ya despachado y cambio de variante | Te indicaremos el siguiente paso |
| 3. Inspecciona | Retorno físico queda no vendible hasta revisión del lote | Prenda recibida; inspección pendiente |
| 4. Resuelve | Reembolso conciliado o cambio con diferencia consentida; ajusta comisión por línea una vez | Resolución y saldo [importe] |

Excepciones: Parcial/exceso, reserva vencida con abono real, devolución parcial, defecto y reintento de reembolso; no cancelar dinero real por estado del pedido.
Datos y permisos: Acceso propio y operadores de devolución/finanzas; documentos restringidos.
Criterios de aceptación: R11/R13/R14 en [[21 Requisitos y trazabilidad]]; ejecutar cada paso y excepción comprobando resultado, recuperación y autorización; registrar evidencia real antes de marcar conforme. Reglas en [[22 Reglas y estados]].

## Tu revisión
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:

Ver [[10 Registro de decisiones]].
