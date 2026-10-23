# Pagos y medios administrables
## Configuración del administrador
Medio: nombre público, tipo (Yape/transferencia/otro), entidad, moneda, titular visible, número/cuenta/CCI según corresponda, QR, instrucciones, activo, vigencia, orden y auditoría. No guardar claves bancarias.
Validar campos por tipo; evitar publicar datos contradictorios. Mostrar titular para que el comprador contraste. Cambios de cuenta requieren reautenticación y aviso interno; el QR puede revelar datos, revisar antes de publicar.
Al crear el pedido guardar una versión de las instrucciones mostradas. Desactivar una cuenta no borra pedidos anteriores; si cambia antes del pago, informar y pedir reconfirmación.

## Reporte del comprador
- Pedido y total esperados, moneda.
- Medio receptor elegido entre los ofrecidos; si el banco/app de origen es distinto, campo separado.
- Número de operación como texto (conservar ceros iniciales), sin formato universal inventado.
- Importe declarado, fecha/hora de operación declaradas y nombre del pagador si difiere.
- Constancia de imagen; segundo archivo opcional según límites.
- Fecha/hora de recepción del servidor: automática e ineditable.

La hora de carga NO es la hora del pago. EXIF y hora del dispositivo no son prueba fiable. Almacenar UTC y mostrar America/Lima.

## Validación
El operador compara movimiento real del banco/Yape: importe, moneda, destino, referencia, pagador y fecha. Captura y OCR solo ayudan; no confirman dinero recibido.
Operaciones repetidas disparan alerta por combinación cuenta receptora, referencia y otros datos; no rechazar solo porque dos bancos repitan números.
Permitir pagos parciales/múltiples en modelo de datos; en MVP enviarlos a revisión. No despachar hasta total verificado. Exceso requiere resolución y devolución controlada, no descontar automáticamente de otro pedido.
Reintentos idempotentes no crean reportes ni cobros duplicados.
