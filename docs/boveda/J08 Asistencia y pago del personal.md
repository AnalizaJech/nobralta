# J08 Asistencia y pago del personal

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Personal contratado revisa su remuneración.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Configura | Admin registra vínculo, jornada y remuneración vigentes. | Validación laboral antes de automatizar fórmulas. |
| 2. Marca | Persona registra trabajo, pausas y tareas previas/post Live. | Corrección disponible; sin vigilancia invasiva. |
| 3. Revisa | Visualiza horas, días y conceptos reconocidos. | Mensual no depende solo de marcaciones. |
| 4. Liquida | Admin calcula base, conceptos, comisiones y adelantos. | Sin multas automáticas; descuentos procedentes documentados. |
| 5. Paga | Registra pago y entrega documento aplicable. | Distinguir devengado, pagado y saldo. |
| 6. Cese | Cierra pendientes y beneficios correspondientes. | No anular comisiones ganadas por renuncia. |

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
Actor: Personal contratado / responsable autorizado. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Vínculo real revisado, conceptos y reglas vigentes; calendario D07 sin aprobación aún.
Datos y permisos: Cada persona ve su asistencia/recibo, responsable con permiso laboral; sin GPS/cámara continua.
Mensaje visible propuesto: «Revisa conceptos, adelantos y saldo. Puedes solicitar corrección; no se elimina lo devengado al cesar.».
Excepciones a probar: Mensual incompleto, pausa remunerable, corrección, adelanto o cese: revisar conceptos, no multiplicar horas sin criterio.
Criterios: requisitos R15 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
