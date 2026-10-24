# Cobertura funcional y límites

Actualización: instrucciones del propietario del 21/10/2026 prevalecen sobre el encargo documental inicial y los estados antiguos de la bóveda copiada.

| Área | Recorrido local disponible | Traslado a Laravel |
|---|---|---|
| Identidad | Registro, inicio, roles cliente/admin, sesión y edición correo/teléfono | Auth de servidor, hash de contraseña resistente, verificación, recuperación, 2FA admin y policies |
| Catálogo | Alta de mercancías con fotos por color y unidades por talla, edición, filtros, precios, agotado y catálogo PDF filtrado | Oferta aprobada, SKU/lotes, composición y medidas verificadas, URLs canónicas/schema/SEO |
| Compra | Bolsa, cantidades, pack configurable, cupón/vendedor, comprobación de disponibilidad | Precio canónico, transacciones, reservas atómicas, idempotencia y expiración |
| Pedido | Destinatario completo, DNI, teléfono, correo y agencia por departamento/ciudad | Consentimientos, retención mínima, autorización por recurso, direcciones/directorio vigente |
| Pago | Cotización previa, reporte con referencia textual, fecha declarada, hora recepción separada, constancia y verificación manual | Almacenamiento privado, antivirus/conversión, conciliación real, pago parcial/excesos/duplicados y auditoría inmutable |
| Logística | Guía/OS, prueba de despacho, estados preparación/envío/entrega y consulta del cliente | Tarifas reales, permisos, secretos de recojo y transportista; no existe API Shalom conectada |
| Comunicación | Teléfono/correo de destinatario, texto de compra/agradecimiento para copiar, PDF y descarga de prueba | Proveedor de mensajes/email, consentimiento y trazabilidad de envío; no se enviaron mensajes externos |
| Promociones | Crear/editar/pausar packs y códigos con vigencias; reflejo en tienda | Reglas aprobadas, límites/uso por cuenta, snapshots, revalidación en checkout |
| Afiliados | Crear/activar/pausar código, descuento, comisión snapshot en pedido total de entregados por liquidar y registro local de liquidación con referencia | Portal propio, ventanas de atribución, ajustes y liquidaciones/pagos versionados aprobados |
| Personal | Alta de persona y registro entrada/salida | Acceso personal, corrección/observación de marcaciones, reglas laborales y nómina validadas |
| Estadísticas | Pedidos/estados, ventas verificadas, ticket, periodo y ventas por prenda | Conciliación, márgenes/costos reales, indicadores y permisos sobre DB |
| Configuración | Datos propios, contacto, horario, plazo y medio de pago | Reautenticación en cambios sensibles, versionado de medios por pedido y notificaciones reales |
| Operación | Registro local de actividad y fixtures reproducibles | Outbox/jobs/reconexión, backups, logs, alertas, restauración y pruebas de concurrencia |

Esta tabla evita confundir la demostración de UX con mecanismos reales de producción. No se da por cumplida toda la matriz de aceptación de la bóveda por ver pantallas.

Las cuentas iniciales, las existencias, medidas, importes y códigos son fixtures, sin autorización para venderlos como datos comerciales reales. localStorage es manipulable y no compartido entre dispositivos. No hay prueba de seguridad de autenticación/aislamiento real; los guards solo organizan la simulación.

Agencias iniciales: nombres extraídos del PDF público de servicios Shalom, consultado el 21/10/2026. Solo un subconjunto; no se inventaron direcciones ni se afirmó sincronización. Fuente: https://newwebservices.shalomcontrol.com/api/v1/web/store/pdf/embalaje/servicios . Antes de envío real debe confirmarse vigencia, destino y servicio.

Política de no cambios/devoluciones: intención comercial confirmada; se conservó excepción de derechos por defectos/incumplimiento. Fuente normativa de referencia: Código de Protección y Defensa del Consumidor, Ley 29571, arts. 18, 19 y 97: https://www.gob.pe/institucion/indecopi/normas-legales/1244218-29571/ . No se afirmó revisión legal profesional ni se implementó una renuncia de derechos.


## Gestión y catálogo r37 — 23/10/2026
Alta y fotos se guardan en localStorage del navegador actual, sujetas a su capacidad; no hay carga de archivos a servidor ni sincronización entre dispositivos. Catálogo PDF A4 con fuentes incrustadas, fotos, precios y tallas disponibles; usa los filtros actuales. No incluye datos de clientes ni vouchers. Descarga manual para adjuntar por WhatsApp, sin envío de mensajes. Edición del costo de envío exclusivamente en Logística antes de la verificación; despacho conserva guía y constancia.
