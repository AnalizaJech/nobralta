# Operación, seguridad y privacidad
Especificación propuesta para F0–F7; no procedimientos ya ensayados. Invariantes R05/R17/R20/R22.

## Rutina del propietario
Antes del Live: revisar stock real y códigos de catálogo/afiliado distintos, precios aprobados, horarios publicados y políticas de la cuenta. Retirar etiquetas, DNI, direcciones, pantalla bancaria y reflejos; no transmitir ubicación/almacén en tiempo real. No publicar domicilio como atención; resolver datos comerciales exigibles con revisión legal. No calificar distrito como seguro por ausencia de noticias ni imponer traslados continuos sin presupuesto.
Inicio de atención: cola por recepción del servidor, incidencias y pagos tardíos; contrastar movimientos reales. No pedir contraseñas ni compartir sesión bancaria con agentes. Fin de jornada: conciliar verificado/pedidos/saldo, revisar pendientes y próxima atención, registrar paquetes/guías sin exponer claves. Despacho: picking y doble cotejo SKU/talla/color, lista de empaque, agencia/documento mínimo, costo y guía; seguimiento manual protegido. No prometer rastreo en vivo.

## Acceso mínimo
| Recurso | Cliente | Operador | Admin financiero | Afiliado | TV |
|---|---|---|---|---|---|
| Pedido/seguimiento | Solo propio autenticado | Asignados según permiso | Según función | Resumen de comisión propia sin PII | Agregados permitidos |
| Evidencia/referencia | Solo propia | Revisores autorizados | Revisores autorizados | Nunca | Nunca |
| Destinatario de cobro | Lectura pública de versión vigente | Lectura | Edición con permiso + reautenticación | Lectura pública | Nunca |
| Guía/clave de recojo | Propia, clave con acceso reforzado | Despacho autorizado | Según función | Nunca | Nunca |
| Nómina/liquidación | No | No por defecto | Permiso separado | Solo propia | Nunca |

Cuenta cliente/enlace secreto recuperable D14 pendiente. No permitir acceso solo con ID de pedido. TV usa endpoint y sesión de permiso limitado que nunca reciben campos privados, ni ocultos en DOM. Revocar sesión al salir; 2FA admin, sesiones con caducidad y protección CSRF. Auditoría de permisos y cambios, sin volcar secretos en logs.

## Clasificación y retención
Catálogo autorizado: público; pedidos/destinatarios: privados; evidencias/datos bancarios: privados restringidos; claves de recojo/secretos técnicos: acceso mínimo. Registro de tratamiento por categoría: finalidad, base revisada, campos, responsable, encargados, acceso, plazo, evento inicial del plazo, eliminación de originales/derivados/índices y expiración de copias de respaldo. Todos los plazos están pendientes D06/D16: no activar borrado destructivo ni retención eterna como política aprobada. Suspensión documentada por reclamación/obligación y liberación revisada. En restauración, reaplicar lista de borrados autorizados antes de abrir servicio. No enviar PII ni evidencias a publicidad, OCR externo o IA sin base, autorización e integración revisadas; no alterar contenido con IA.

## Recuperación e incidentes
Propuesta a presupuestar: backup cifrado diario y antes de cambios de riesgo, ubicación separada, mínimo acceso; objetivos RPO 24h/RTO 8h sujetos a aprobación y prueba. Restaurar en entorno aislado, verificar integridad, permisos y conciliación, documentar duración/pérdida y recién habilitar servicio. No hay backup de producción ni ensayo real realizado.
Ante incidente: contener (revocar enlaces/sesiones/credencial afectada), conservar evidencia privada, evaluar datos/stock/dinero afectados, conciliar estado canónico, recuperar y comunicar por canal autorizado según revisión de obligaciones/plazos vigentes. Registrar cronología UTC, responsable, causa, corrección y seguimiento. No afirmar fraude ante fallo de archivo. No reenviar evidencia sensible al chat ni divulgar públicamente.

## Observabilidad y mantenimiento
Logs por correlation_id y actores autorizados, sin DNI/teléfono/operaciones/constancias/secretos; redactar errores. Métricas de retraso de cola, fallos de archivo, confirmación, desconexión y divergencias de stock; alertas y umbrales por aprobar tras piloto. Staging privado con datos sintéticos, dependencias fijadas/lockfiles, parches y migraciones compatibles. Detener despliegue si falla autorización, conciliación o restauración. Rollback de código no revierte DB; recuperación debe considerar pedidos recibidos desde el backup. Notificaciones abiertas en web no equivalen a push con app cerrada; correo/WhatsApp/push requieren proveedor, costos y permisos reales.
