# J04 Corrección y rechazo

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Pago con dato erróneo, imagen borrosa o abono no localizado.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Clasifica | Operador distingue corrección, pendiente de conciliación y rechazo. | Error de carga no se trata como fraude. |
| 2. Explica | Elige motivo y redacta instrucción concreta. | No modificar operación declarada por el cliente sin historial. |
| 3. Corrige | Cliente añade nueva versión con referencia y archivo. | Conservar historial privado; no sobrescribir pruebas. |
| 4. Revisa | Operador contrasta nuevamente. | Parcial/exceso pasa a resolución; no despachar incompleto. |
| 5. Resuelve | Aprueba o rechaza con motivo; comunica próximos pasos. | Si abono real existe, resolver devolución/conciliación antes del cierre; no perderlo por vencer reserva. |

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
Actor: Comprador / revisor. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Existe reporte propio y motivo específico; pagos reales conservan obligación de resolver.
Datos y permisos: Nuevas versiones privadas, historial de decisión y revisor; nunca sobrescribir evidencia.
Mensaje visible propuesto: «Necesitamos [dato concreto]. Puedes corregir sin perder el historial.».
Excepciones a probar: Ilegible y fallo técnico separados; no localizado no implica fraude; exceso/duplicado/tardío requieren conciliar.
Criterios: requisitos R08/R09/R11 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
