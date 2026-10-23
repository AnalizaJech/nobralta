# Contrato de trabajo para agentes IA
Estas instrucciones son para Codex y trasladables a otros agentes con acceso a archivos. Skills son carpetas con SKILL.md (YAML name/description + procedimiento), referencias relativas y metadata opcional agents/openai.yaml. Otros agentes deben recibir explícitamente la skill si no soportan descubrimiento automático; no se garantiza idéntico comportamiento.

## Uso en Codex
Mantener skills en .agents/skills/<nombre>/ o en directorio de skills del usuario según entorno y documentación vigente. No asumir que un archivo en la bóveda queda instalado automáticamente. Invocar con $nombre cuando el cliente lo soporte; si no, pedir leer SKILL.md y referencias. agents/openai.yaml es metadata de interfaz, no dependencia para ejecutar procedimiento.

## Protocolo
Leer AGENTS.md y decisiones actuales. No convertir propuestas en aprobaciones. Inspeccionar repo y stack antes de cambiar. Planificar entrega vertical y criterios; implementar estados de error y autorización, probar y reportar límites. Consultar fuentes oficiales para versiones, APIs y normativa cambiantes. No exigir herramientas privadas ni modelos específicos, ni depender de esta conversación.
Usar NOBRALTA como marca elegida sin afirmar disponibilidad legal/digital. No publicar datos simulados como integración real. Conservar HTML semántico y estilizar todos los controles con sistema de componentes; no aceptar interfaz de navegador sin acabado visual.

## Skills
- planificar-tienda-laravel
- disenar-ux-tienda
- implementar-pagos-evidencias
- implementar-stock-envios
- gestionar-afiliados-personal
- verificar-operar-laravel
- implementar-seo-marketing (nueva)

Ejemplo: «Lee la skill disenar-ux-tienda y las notas 13–15. Implementa la ficha de un polo con datos de prueba claramente identificados. Comprueba estados, accesibilidad y adaptación; no publiques todavía».

La afirmación histórica de skills creadas no estaba respaldada por archivos en esta carpeta al inspeccionarla. Esta auditoría crea skills locales en .agents/skills; ver [[28 Auditoría y validación]] para comprobaciones. El fallo remoto HTTP 422 es un antecedente aportado, no reproducido. No hace falta push para leer skills locales; el descubrimiento automático depende del cliente. No mezclar desarrollo con nómina real antes de revisión correspondiente.

## Enrutamiento vigente
La lista anterior conserva nombres de borradores históricos; no son skills instaladas aquí. Los ocho nombres locales válidos y su selección están en [[AGENTS]]. Invocar por nombre `nobralta-*` o leer su SKILL.md; no se efectuó push ni instalación global. Prompts completos en [[27 Prompts por fase]].
