# J05 Preparación y entrega

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Propietario despacha por Shalom.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Selecciona | Filtra pagados y listos para preparar. | No incluir pendientes por tener una captura. |
| 2. Empaca | Verifica SKU/color/talla y datos destinatario. | No mostrar documentos en TV ni Live. |
| 3. Registra | Usa ficha para agencia; registra OS/guía y costo real. | Sin API confirmada, proceso manual asistido. |
| 4. Notifica | Cliente recibe referencia y acceso protegido. | Clave de recojo solo por canal autorizado. |
| 5. Entrega | Confirma entrega por evidencia disponible. | Incidencias/devoluciones no se marcan entregadas automáticamente. |
| 6. Cierra | Actualiza costos y estado elegible de comisión. | Devoluciones inspeccionadas antes de reponer stock. |

## Tu revisión
- [ ] Apruebo el recorrido completo.
- [ ] Solicito cambios (completar abajo).

Paso a modificar:

Comportamiento esperado:

Dudas:

## Criterio de aceptación
El recorrido debe poder completarse en celular, conservar datos ante errores y mostrar un estado verdadero. Revisar casos normales, sin conexión, reintentos y permisos antes del lanzamiento.

Ver [[10 Registro de decisiones]].

## Contrato específico del journey
Actor: Despachador / comprador. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Saldo exigible cubierto, stock comprometido y cotización vigente; agencia identificada.
Datos y permisos: Documento mínimo del transportista, guía y clave restringidos al destinatario/operador.
Mensaje visible propuesto: «Despachado: guía registrada manualmente el [fecha]. Última actualización [hora].».
Excepciones a probar: No tarifa válida no solicitar pago; daño/pérdida abre incidencia; devolución física exige inspección.
Criterios: requisitos R12/R13 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
