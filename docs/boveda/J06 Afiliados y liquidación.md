# J06 Afiliados y liquidación

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Afiliado consulta lo que ha ganado.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Alta | Admin crea código y acuerdo vigente. | No compartir credenciales ni permisos administrativos. |
| 2. Atribución | Pedido guarda afiliado y regla aplicada. | Cambios posteriores auditados; no comisión duplicada. |
| 3. Seguimiento | Afiliado ve ventas y comisiones propias. | No necesita DNI ni comprobante del comprador. |
| 4. Corte | Admin revisa ventas elegibles y devoluciones. | Reglas de devengo dependen de vínculo y acuerdo válido. |
| 5. Pago | Genera liquidación y registra transferencia. | Idempotencia evita pagar dos veces. |
| 6. Observación | Afiliado pregunta por una línea y recibe respuesta. | Ajustar con asiento trazable sin borrar período cerrado. |

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
Actor: Afiliado / administrador. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Acuerdo, código y regla de atribución vigentes aprobados D04/D10.
Datos y permisos: Afiliado ve solo sus líneas/importes/saldo; no DNI, teléfono, banco o constancia del cliente.
Mensaje visible propuesto: «Liquidación [corte]: aprobado, pagado y saldo separados. Puedes observar esta línea.».
Excepciones a probar: Devolución parcial, doble liquidación, salida del afiliado y línea observada: ajustes con historial.
Criterios: requisitos R14 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
