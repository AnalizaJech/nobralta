# NOBRALTA — instrucciones para agentes
Trabaja desde esta bóveda. Lee `00 Inicio.md`, `20 Contexto confirmado.md`, `10 Registro de decisiones.md` y `21 Requisitos y trazabilidad.md` antes de actuar. No dependas del historial del chat. Las notas existentes y revisiones del propietario se preservan; no descartes cambios ni sobrescribas aprobaciones.

Alcance actual: documentación local. NO construir aplicación, instalar dependencias del proyecto, contratar servicios, registrar dominios, publicar ni enviar mensajes. Un prompt futuro no autoriza su ejecución por estar guardado. Antes de implementar debe existir una nueva instrucción explícita del propietario.

## Selección de skills
Leer el SKILL.md correspondiente en `.agents/skills/` (ruta relativa a esta raíz). Si el cliente no descubre skills, leerlas explícitamente; no requieren servicios privados ni instalación global.

| Trabajo | Skill |
|---|---|
| Requisitos y alcance | nobralta-planificar |
| Journeys, visual y accesibilidad | nobralta-diseno |
| Límites, modelo y desarrollo Laravel autorizado | nobralta-laravel |
| Pagos y archivos privados | nobralta-pagos |
| Stock, reservas y despacho | nobralta-inventario |
| Atribución, comisiones o personal | nobralta-personas |
| Rastreo, contenido y medición | nobralta-crecimiento |
| Validación, seguridad, recuperación e incidentes | nobralta-calidad |

Combina solo skills necesarias (pagos+inventario para aprobar un abono). Lee sus referencias, no todas por defecto. No delegues por defecto. Prioridad: instrucción expresa vigente del propietario > contexto confirmado > decisiones aprobadas con fecha > requisitos > mecanismos propuestos. Si hay conflicto, registra sin inventar aprobación y continúa tareas independientes.

## Invariantes
NOBRALTA elegida, disponibilidad no confirmada. No sintéticos sin cambiar la restricción; no publicar alegaciones sin prueba. Captura/OCR no confirman ingreso. Separar estados pago/pedido/reserva/evidencia/envío. Dinero exacto, referencia texto, UTC y presentación Lima. Transacciones, autorización por recurso e idempotencia; eventos no aseguran consistencia. Conservar historial y remuneraciones/comisiones ganadas. No exponer datos privados en web pública, TV, Live, logs o analítica.

## Entrega y comprobación
Cada cambio indica IDs R, journeys, reglas y fase; pruebas ejecutadas y pendientes; decisiones bloqueantes, archivos y riesgos concretos. Ejecuta `python herramientas/validar_boveda.py` si hay Python; sin él revisa enlaces, YAML, IDs y referencias manualmente y declara ese límite. No presentar validación documental como prueba Laravel, legal, WCAG o restauración. Consultar fuentes oficiales actuales para versiones, normas y APIs. No modificar `.obsidian` por comodidad del agente. Respaldar fuera de la bóveda antes de reorganizar; excluir secretos si aparecen y registrar exclusiones sin valores sensibles.
