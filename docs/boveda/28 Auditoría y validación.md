# Auditoría y validación — 2026-10-20
## Inspección y preservación
Carpeta activa: `C:\Users\JORGE\Desktop\emprendimiento`. Se leyeron 28 notas Markdown originales y 4 JSON de Obsidian. El primer volcado se truncó en salida; se releyeron notas 10–19 por separado para completar su inspección. No había AGENTS.md ni skills locales. No se encontraron AGENTS.md en los ancestros comprobados: Escritorio, usuario JORGE, Users y raíz C:. Git devolvió «not a git repository»; no se descartaron cambios ni se hizo push.

Respaldo previo: `C:\Users\JORGE\Desktop\NOBRALTA-respaldo-2026-10-20-antes-auditoria`, 32 archivos originales más manifiesto SHA-256, cotejados por hash. No se identificaron credenciales en los archivos inspeccionados; no hubo exclusiones ni se movieron/eliminaron notas originales. Las notas y casillas previas permanecen, salvo correcciones puntuales y sustitución del índice obsoleto. No se cambiaron plugins, sincronización ni preferencias. Al final, workspace.json mostró cambios externos en lastOpenFiles mientras la bóveda estaba activa; se conservaron. Los otros 3 JSON permanecían idénticos al respaldo. El agente no escribió configuración Obsidian.

## Hallazgos corregidos
- Marca todavía pendiente en varias notas: NOBRALTA elegida, disponibilidad legal/digital sin confirmar. Candidatos viejos en 02 y 12 solo como antecedentes.
- Inicio pedía extraer ZIP y no indexaba todo: reemplazado por índice local completo.
- 18 afirmaba skills creadas sin archivos presentes: aclarado antecedente y creadas 8 skills locales, sin instalación global/push remoto.
- Journeys 01–08 con criterios genéricos y sin contratos completos: ampliados preservando texto/casillas, más J09–J17 y formulario de revisión.
- Atribución/corte/horarios/reservas con redacción ambigua: aclarados como propuestas; D02–D17 guardan las decisiones pendientes.
- Matriz sin IDs/trazabilidad: 25 requisitos con regla, journey, fase y aceptación en 21; 19 es tablero ejecutivo. Mapa del encargo en 29.
- Faltaban detalle económico, composición/empaque, formalización, estados/transacciones, modelo relacional, privacidad/operación y prompts: añadidos 20–27 y ampliaciones de originales.

## Validaciones realizadas
1. Lectura/inventario, consulta de Git y cotejo del respaldo por SHA-256. No restauración de producción.
2. Las 8 skills pasaron `quick_validate.py` de skill-creator con Python ya disponible y PyYAML6.0.3; no se instalaron paquetes.
3. Validador reproducible `python herramientas/validar_boveda.py`: wikilinks, enlaces locales Markdown, YAML existente, nombres de skills, estructura journeys/prompts y IDs/trazabilidad. Salida en `validaciones/resultado.json`; no prueba destinos web ni semántica legal. Primer pase detectó referencias al acta28 no escrita todavía; se creó y se repitió.
4. Búsqueda de nombres antiguos: 02/12 tienen contexto histórico; no se eliminaron antecedentes. Contexto20, decisiones10 y requisitos21 son fuentes canónicas; reglas22 desarrolla mecanismos y notas de dominio amplían detalles. Encargo íntegro archivado solo para trazabilidad.
5. Dos ejercicios con datos sintéticos usando skills pagos/inventario: [[validaciones/E01 Skill pagos]] y [[validaciones/E02 Skill inventario]]. Realizados por el mismo agente autor sin evaluación independiente. No hubo app/DB/banco ni concurrencia ejecutada; se evaluó coherencia de procedimientos.
6. Fuentes oficiales/reintentos web en [[12 Fuentes y límites]] y [[15 Ficha de producto y referencias]]; sin capturas ni auditoría visual completa.

## Límites de la entrega
No aplicación, pruebas Laravel, transacciones concurrentes reales, procesamiento de imágenes, APIs, compra real, notificación externa, usuarios reales, conformidad WCAG, dictamen legal/tributario/laboral ni ensayo de restauración DB. No se contrataron servicios, registraron dominios ni publicó nada. Validación documental no demuestra corrección de implementación futura. Guardar prompts no autoriza ejecutarlos.

## Decisiones priorizadas y vacíos
1. D11/D12: muestra/composición por componente y empaque, cotizaciones completas, margen/caja antes de comprar o fijar precios.
2. D02/D03/D08/D09/D14: compra nocturna, atención/excepciones, reserva y recepción/revisión, acceso/recuperación del comprador antes de checkout definitivo.
3. D05/D06/D13/D16: rutas/tarifas, límites/retención, identidad/comprobantes/consumidor/privacidad antes de cobro y lanzamiento reales.
4. D04/D10: porcentaje/base/devengo/atribución/cortes antes de afiliados; D07 y revisión laboral solo al incorporar personal.
5. D15/D17: presupuesto/stack/proveedores, público/diseño/licencias, prueba cualitativa y comparación visual pendientes.

Después de revisión: F0 negocio/requisitos → F1 journeys/diseño → nueva autorización para F2 base → F3 catálogo/carrito/reservas → F4 pagos/evidencias → F5 despacho/postventa → F6 afiliados → F7 SEO/medición/pruebas/ensayo/lanzamiento autorizado → F8 mantenimiento. Personal F6-P solo cuando corresponda; QA/seguridad atraviesan todas las fases. Empezar con [[prompts/P01 Auditoría y cierre]]; índice de prompts [[27 Prompts por fase]]. No afirmar que no falta nada: los vacíos anteriores siguen abiertos.

## Autoprueba del validador
En copia temporal aislada se verificó primero cero errores y luego se introdujeron un wikilink inexistente y YAML malformado; el validador detectó ambos. La copia temporal fue descartada. También se comprobó lectura UTF-8 sin caracteres de reemplazo y ausencia de casillas de aprobación marcadas por el agente. Estas comprobaciones no son pruebas de la aplicación.
