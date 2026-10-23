# J02 Compra fuera de horario

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Cliente compra a las 02:00.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Consulta | Catálogo conserva sus colores y disponibilidad. | Banner muestra la fecha/hora de próxima atención. |
| 2. Confirma | Conoce la demora antes de enviar dinero. | Si hay cierre excepcional, carrito se conserva y se explica reapertura. |
| 3. Reporta | Envía constancia y operación. | Registro horario del servidor automático. |
| 4. Reserva | Reporte válido pasa a revisión y conserva unidades según política. | Abuso limitado; pago reportado no se cancela silenciosamente. |
| 5. Retoma | Al abrir, el operador ve pendientes por antigüedad. | Avisos al cliente si revisión supera plazo publicado. |

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
Actor: Cliente nocturno / operador al abrir. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: D02, D08 y D09 aprobados antes de activar compra nocturna.
Datos y permisos: Calendario público; carrito privado, reportes solo propios; servidor calcula Lima.
Mensaje visible propuesto: «Revisaremos tu pago a partir de [fecha/hora confirmada]. La constancia no confirma el abono.».
Excepciones a probar: Feriado/vacación prevalece; cierre sin fecha no inventa reapertura; recepción/expiración compiten según RN03.
Criterios: requisitos R07/R10 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
