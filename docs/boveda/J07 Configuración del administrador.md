# J07 Configuración del administrador

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Admin cambia una cuenta de cobro.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Accede | 2FA y permiso para configuración financiera. | Reautenticación para cambiar destinatario. |
| 2. Edita | Carga titular, cuenta, moneda, QR e instrucciones. | Validaciones específicas y vista previa. |
| 3. Prueba | Revisa cómo lo verá un cliente móvil. | Confirmar QR coherente con cuenta y titular. |
| 4. Publica | Nueva versión activa desde fecha indicada. | Mantener versión anterior en pedidos ya creados. |
| 5. Controla | Auditoría y alerta por cambio. | No borrar historial; revocar acceso si hay actividad sospechosa. |

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
Actor: Administrador con permiso financiero. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Reautenticación, versión vigente y datos del receptor comprobados.
Datos y permisos: Cambios de cuenta/QR auditados; claves bancarias nunca; pedido conserva instrucciones vistas.
Mensaje visible propuesto: «Nueva versión activa desde [fecha]; los pedidos previos conservan su versión.».
Excepciones a probar: QR incoherente, fecha futura, desactivación o pedidos pendientes: no reemplazar silenciosamente instrucciones.
Criterios: requisitos R08/R17 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
