# J10 Compra normal y carrito
Estado: propuesta pendiente de revisión; no implementado.
Actor: Cliente.
Objetivo: Confirmar total y condiciones antes de pagar.
Precondiciones: Precios/stock/tarifa, calendario y acceso D14 aprobados; D03/D09 reserva definidos.

| Paso | Respuesta del sistema / procedimiento | Mensaje visible propuesto |
|---|---|---|
| 1. Revisa carrito | Recalcula servidor, código afiliado separado de UTM | Este es el total actualizado |
| 2. Selecciona entrega | Agencia y datos mínimos; sin tarifa válida cotizar antes de pago | Necesitamos cotizar esta ruta |
| 3. Confirma | Snapshot de precios/receptor, reserva atómica y clave de reintento | Pedido creado; pago pendiente |
| 4. Paga y reporta | Accede a J03/J04 sin confirmar por captura | Pendiente de verificar |

Excepciones: Doble clic, cambio de precio/tarifa, última unidad concurrente y pérdida de respuesta; no cobrar dos veces por flete en destino.
Datos y permisos: Solo carrito/pedido propio; permisos en servidor.
Criterios de aceptación: R03/R08/R10/R12 en [[21 Requisitos y trazabilidad]]; ejecutar cada paso y excepción comprobando resultado, recuperación y autorización; registrar evidencia real antes de marcar conforme. Reglas en [[22 Reglas y estados]].

## Tu revisión
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:

Ver [[10 Registro de decisiones]].
