# J01 Compra desde TikTok

Estado: propuesto, pendiente de revisión del propietario.

## Objetivo
Cliente compra un polo desde su celular.

| Paso | Acción y respuesta del sistema | Excepción / control |
|---|---|---|
| 1. Descubre | Identifica producto por código de catálogo y accede por canal permitido. | No usar códigos para evadir restricciones de TikTok. |
| 2. Elige | Ve fotos reales, composición, medidas, talla/color y stock. | Agotado ofrece aviso; no simula disponibilidad. |
| 3. Carrito | Revisa cantidades, descuento y código de afiliado. | Si código inválido, explica sin borrar carrito. |
| 4. Entrega | Selecciona agencia y completa datos mínimos. | Sin tarifa válida se cotiza antes de pagar. |
| 5. Confirma | Ve total, próxima atención y política de reserva. | Reserva atómica: si otra persona compró, ofrecer alternativa. |
| 6. Paga | Ve medios activos, titular y cuenta/QR. | Se guardan las instrucciones mostradas. |
| 7. Reporta | Elige medio, operación, importe y adjunta prueba. | Progreso de carga y validaciones legibles. |
| 8. Espera | Recibe número de pedido y seguimiento protegido. | Estado pendiente de verificación; no confirmación automática. |

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
Actor: Cliente desde Live. Objetivo: completar los pasos anteriores con estado y saldo verdaderos.
Precondiciones: Producto, stock y canal permitidos verificados; no inventar TikTok Shop.
Datos y permisos: Cliente solo maneja su pedido; código de catálogo identifica producto y afiliado atribuye venta sin compartir PII.
Mensaje visible propuesto: «Puedes revisar talla, total y próxima atención antes de pagar.».
Excepciones a probar: No sé mi talla → ver J09; falla tarifa → cotización previa; última unidad agotada → alternativa sin cobro.
Criterios: requisitos R05/R06/R08/R10 en [[21 Requisitos y trazabilidad]] y guardas [[22 Reglas y estados]]; además, ejecutar cada excepción y comprobar recuperación sin duplicar acciones y sin acceso cruzado. Las casillas existentes siguen vacías y no significan aprobación.

## Registro de revisión solicitado
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:
