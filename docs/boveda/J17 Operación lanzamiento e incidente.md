# J17 Operación lanzamiento e incidente
Estado: propuesta pendiente de revisión; no implementado.
Actor: Propietario / operador técnico.
Objetivo: Preparar salida y recuperación con evidencia revisable.
Precondiciones: Aplicación futura autorizada y staging; hoy solo simulación documental.

| Paso | Respuesta del sistema / procedimiento | Mensaje visible propuesto |
|---|---|---|
| 1. Verifica | Pruebas/privacidad/formalización/integraciones y soporte documentados | No listo hasta cerrar bloqueos |
| 2. Respalda y restaura | Ensayo aislado mide RPO/RTO y conciliación | Resultado real y limitaciones |
| 3. Lanza | Autorización explícita, health checks/colas/stock/finanzas | Estado de operación verificable |
| 4. Responde incidente | Contiene, conserva evidencia, restaura/concatena cambios, revisa obligaciones de comunicación | Incidente en revisión, sin conclusiones ficticias |

Excepciones: Cola caída, archivo malicioso, acceso cruzado, backup inválido, migración destructiva y parche urgente; no comunicar externamente sin autorización.
Datos y permisos: Acceso mínimo, secretos externos a bóveda, auditoría redactada y TV sin finanzas privadas.
Criterios de aceptación: R21/R22/R23/R24 en [[21 Requisitos y trazabilidad]]; ejecutar cada paso y excepción comprobando resultado, recuperación y autorización; registrar evidencia real antes de marcar conforme. Reglas en [[22 Reglas y estados]].

## Tu revisión
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:

Ver [[10 Registro de decisiones]].
