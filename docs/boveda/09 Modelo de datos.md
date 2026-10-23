# Modelo de datos
| Entidad | Datos principales |
|---|---|
| Usuarios y roles | Admin, operación, afiliado, cliente; permisos específicos |
| Productos y variantes | Composición por componente, talla, color, SKU, fotos autorizadas |
| Lotes y movimientos | Proveedor, costo, entradas/salidas, evidencia de calidad |
| Pedidos y líneas | Precios/descuentos versionados, afiliado, total, moneda |
| Reservas | Cantidad, vencimiento, estado y liberación idempotente |
| Medios de pago y versiones | Cuenta receptora, titular, QR e instrucciones vigentes |
| Reportes de pago | Medio receptor, origen, referencia, importe y fecha declarados, recibido_en |
| Evidencias | Original privado, hash, copias optimizadas, estado y versión |
| Verificaciones | Revisor, movimiento contrastado, decisión, fecha y motivo |
| Envíos | Agencia, costo/cobro, guía, estados y claves protegidas |
| Comisiones | Línea, porcentaje/base guardados, estados y ajustes |
| Liquidaciones | Corte, líneas, adelantos, pagos, saldo y constancias |
| Personal y asistencia | Contrato/configuración, jornada, marcaciones, incidencias |
| Auditoría | Actor, acción, antes/después apropiados, fecha, motivo |

Dinero con decimales exactos o unidades menores, no float. Eventos de tiempo en UTC; presentación en America/Lima. Estados de pedido, pago y envío separados. Referencias bancarias son texto.

## Diseño relacional para F2
Borrador técnico, no esquema migrado. PK internas y referencias públicas aleatorias distintas. Todas las FK y borrados se diseñan explícitamente: restringir borrar historia financiera, no cascada destructiva. created_at/updated_at UTC; audit actor y motivo en cambios sensibles. `version` para concurrencia optimista y bloqueos transaccionales para saldos.

| Tablas / relaciones | Restricciones e índices relevantes |
|---|---|
| products → variants → lot_stocks | SKU único; variante única producto/color/talla; lote/proveedor; CHECK cantidades ≥0; composición por componente y evidencia asociada |
| inventory_movements | Variante/lote, tipo, cantidad firmada, origen, clave única de efecto; conciliación saldo=movimientos; defecto separado de vendible |
| orders → order_lines | Moneda PEN, importes exactos, snapshots SKU/talla/color/precio/descuentos; total coherente con suma; afiliado único nullable |
| reservations → reservation_lines | Pedido/variante/lote/cantidad, estado/expires_at/received_at; índice estado+expires_at; una asignación efectiva por efecto de negocio |
| payment_methods → payment_method_versions | Versiones inmutables; vigencia, entidad/destino/QR privado cuando corresponda; pedidos referencian versión mostrada |
| payment_reports → payment_report_versions → evidence_files | origen separado de receptor; operación TEXT, importe declarado, declared_paid_at/received_at distintos; archivos hash/ruta privada/tamaño/píxeles/estado |
| bank_movements → payment_allocations → verifications | Movimiento interno conciliado identificado por operador; asignaciones exactas a pedidos; restricción de efecto único, saldo aplicable protegido; referencia externa indexada contextual, NO unique global |
| shipments / shipping_quotes | Pedido, ruta/agencia identificada, dimensiones/peso, vigencia, cobro/costo/pago_destino; clave de recojo cifrada/segregada; guía manual |
| return_cases / return_lines / refunds | Motivo, cantidad y condición inspeccionada, líneas/aplicaciones afectadas, importes exactos, estado y desembolso identificado; evitar reembolso excesivo |
| affiliates / attribution_rules / order_attributions | Código normalizado unique, vigencias, snapshot de regla/origen sin PII; un registro efectivo de afiliado por pedido |
| commission_entries / settlement_lines / payouts | Base/tasa/importe snapshot, línea origen y ajuste enlazado; unique entrada en liquidación; payout con clave/conciliación |
| employment_terms / attendance_events / corrections / payroll_periods | Vínculo y vigencia, eventos de asistencia sin sobreescritura, conceptos y adelantos separados; cálculo real bloqueado hasta aprobación laboral |
| audit_entries / idempotency_keys / outbox_events | Actor/acción/recurso/versiones/motivo; unique scope+key y hash/resultado; outbox con event_id único, commit y entrega reintentable |
| opening_windows / calendar_exceptions / retention_rules | Zona Lima, prioridad de excepción, compra abierta separada de atención, vigencias; retención por categoría aprobada |

No almacenar credenciales bancarias; configuración receptora no equivale a acceso al banco. Auditar sin volcar documentos/secretos en JSON indiscriminado. Diseñar cifrado/rotación de campos sensibles y búsqueda con datos mínimos. Índices compuestos para pendientes por estado/fecha, usuario+pedido y lote+variante; validar planes con carga representativa al implementar, sin inventar resultados. Pruebas de FK, checks, reparto de céntimos y concurrencia en el mismo motor que producción.
