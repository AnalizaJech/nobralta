# J03 Verificación del pago

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Propietario revisa desde el celular.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Recibe aviso | Panel actualiza pedidos sin recargar. | Si desconectado, mostrar aviso y sincronizar al volver. |
| 2. Inspecciona | Ve total esperado, medio, operación, fecha de carga y evidencia ampliable. | No confundir fecha declarada del pago con carga. |
| 3. Contrasta | Abre banco/Yape y verifica abono real. | OCR o captura no aprueban dinero. |
| 4. Decide | Aprueba con confirmación de importe y movimiento. | Acción atómica: no permitir doble validación. |
| 5. Continúa | Pedido pasa a preparación, reserva se convierte una sola vez. | Cliente y panel reciben estado correcto; auditar revisor y hora. |

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
Actor: Operador autorizado de pagos. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Reporte recibido, acceso reautenticado según acción y movimiento real consultable manualmente.
Datos y permisos: Evidencia privada, receptor, origen, operación texto y ambas horas; no acceso por afiliado/TV.
Mensaje visible propuesto: «Verificación registrada. [Saldo pendiente / listo para preparar / conciliación de stock].».
Excepciones a probar: Dos aprobadores; parcial/exceso, referencia repetida en otra entidad, pagador distinto, tardío sin stock; RN04.
Criterios: requisitos R08/R09/R10 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
