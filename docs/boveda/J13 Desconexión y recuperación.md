# J13 Desconexión y recuperación
Estado: propuesta pendiente de revisión; no implementado.
Actor: Comprador / operador.
Objetivo: Retomar sin operaciones repetidas ni estados inventados.
Precondiciones: Estado canónico y endpoints autorizados; comandos con clave persistente.

| Paso | Respuesta del sistema / procedimiento | Mensaje visible propuesto |
|---|---|---|
| 1. Pierde red | Muestra indicador y hora del último dato; preserva formulario mínimo sin evidencia en caché pública | Sin conexión; datos pueden estar desactualizados |
| 2. Envía sin respuesta | Consulta resultado por clave al reconectar, no asume fallo | Comprobando si se registró |
| 3. Reconecta | Recupera snapshot y versiones canónicas; deduplica eventos | Datos actualizados |
| 4. Retoma | Revalida stock/tarifa/sesión antes de acción | Revisa estos cambios antes de continuar |

Excepciones: Commit seguido de caída de red, eventos duplicados/fuera de orden, sesión vencida y job retrasado; sin prometer recepción de archivo no confirmada.
Datos y permisos: Permisos revalidados; no almacenar constancias ni claves bancarias en almacenamiento local.
Criterios de aceptación: R09/R10/R16/R17 en [[21 Requisitos y trazabilidad]]; ejecutar cada paso y excepción comprobando resultado, recuperación y autorización; registrar evidencia real antes de marcar conforme. Reglas en [[22 Reglas y estados]].

## Tu revisión
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:

Ver [[10 Registro de decisiones]].
