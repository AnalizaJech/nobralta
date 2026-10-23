# Arquitectura ejecutable
Diseño para implementación futura F2; no código ni servicios creados. Laravel elegido; monolito modular propuesto. ADR técnico pendiente D15.

## Stack y compatibilidad
Consulta oficial 2026-10-20: Laravel 13 requiere PHP ≥8.3; PHP 8.4 y 8.5 constan soportados. Propuesta: evaluar Laravel 13 y PHP 8.5 con extensiones/controlador DB y procesador de imagen compatibles; no fijar versión de dependencia sin resolver compatibilidad. Blade con mejora progresiva favorece HTML rastreable; Livewire o alternativa para panel se decidirá tras revisar versión/licencia/soporte, sin asumir que está instalada. DB relacional transaccional (PostgreSQL como candidato), cola/almacenamiento según hosting presupuestado. Composer/Node/paquetes no se han instalado. F2 debe registrar versiones exactas y lockfiles. Fuentes en [[12 Fuentes y límites]].

## Límites modulares y contratos
| Módulo | Propiedad / entrada / salida |
|---|---|
| Identidad | Usuarios, sesiones, roles, policies; autoriza actor/recurso sin exponer PII al resto |
| Catálogo | Productos/variantes/componentes/medidas/media público; publica oferta solo aprobada |
| Pricing/Checkout | Snapshot de líneas, descuentos, impuestos revisados, envío y total PEN; crea pedido con clave |
| Inventario | Lotes, saldos y movimientos; comandos reservar/retener/comprometer/liberar/despachar/inspeccionar |
| Pagos | Medio versionado, reportes/evidencias/verificaciones/aplicaciones; nunca modifica saldo de stock fuera de servicio transaccional |
| Logística | Cotización y despacho manual/guía privada; consume autorización de preparación |
| Afiliados | Atribución y snapshots de comisión, ajustes y liquidaciones con acceso propio |
| Personal | Vínculo, asistencia y expedientes; cálculo laboral desactivado hasta revisión; no comparte reglas de afiliados |
| Operación | Auditoría, outbox, jobs, notificaciones, calendario, observabilidad y recuperación |

Controladores delgados → validación/autorización → comandos de dominio → transacción → eventos postcommit. Los módulos se llaman por servicios de aplicación con contratos; no microservicios, tenant_id ni infraestructura multitienda en MVP. Extensiones futuras por interfaces de transportista/proveedor de notificación/pagos; implementación manual inicial identificada, sin API falsa.

## Contratos de comando
CrearPedido(idempotency_key, variantes/cantidades, cotización vigente, código afiliado, calendario_version): valida precios canónicos y disponibilidad, registra snapshots y reserva. ReportarPago(key, pedido, version, medio_version, origen, referencia_texto, importe, moneda, fecha_declarada, evidencias): persiste recepción UTC y respuesta durable, sin aprobar. AprobarPago(key, version, movimiento_interno, importe_aplicado, motivo): RN04. Despachar(key, version, guía/OS, fecha, costo, fuente): RN06. Liquidar(key, corte, líneas/versiones): RN07. Clave única por actor/operación; hash del payload y respuesta guardada; mismos datos devuelve resultado; distintos datos con misma clave conflicto. Tiempo de conservación de claves mayor que ventana de reintentos, por definir con política; operaciones financieras conservan restricción durable de efecto único.

## Colas y tiempo real
Jobs: procesar evidencia, generar vistas, entregar notificación, outbox, expirar reserva y borrado autorizado. Configurar timeout/tries/backoff, límites y dead-letter/registro de fallidos, sin bucles infinitos. Reejecutar un job no repite movimiento financiero/stock. Canales privados por recurso/rol; payload mínimo id/versión/estado sin constancias/referencias ni claves; volver a consultar endpoint autorizado. Eventos fuera de orden se ignoran por versión. Reconectar → indicador sincronizando → snapshot/paginación canónicos → reanudar; polling de respaldo propuesto 30s visible sujeto a carga. Comando pendiente no se da por fallido o exitoso sin consultar por clave. Alertas en web abierta primero; push con app cerrada e integraciones externas dependen de factibilidad/costo/consentimiento.

## Despliegue futuro
Entornos local/staging/producción separados; secretos fuera de bóveda/Git; usuarios DB mínimos; storage privado sin symlink público; HTTPS y cabeceras pertinentes. Checklist: pruebas, migraciones expand/contract, backup verificable, pausa de jobs si procede, deploy, health checks, colas/eventos, conciliación y vigilancia. Reversión compatible de código; migración destructiva exige recuperación de datos específica y reconciliación posterior. No aplicar ni contratar ahora. Runbook y objetivos propuestos en [[25 Operación seguridad y privacidad]].
