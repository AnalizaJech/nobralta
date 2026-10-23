# Plan de ejecución
## 1 — Validación comercial
- [ ] Completar verificaciones de NOBRALTA, nombre ya elegido.
- [ ] Conseguir muestras y composición completa sin sintéticos.
- [ ] Registrar cotizaciones, mínimos, colores, tallas, reposición y comprobantes.
- [ ] Presupuestar compra piloto y reserva logística dentro de S/4,000; no comprometer todo sin muestras.
- [ ] Calcular margen por pedido y costo del afiliado; precios anteriores son hipótesis.

## 2 — Validación de experiencia
- [ ] Revisar J01–J08 con el propietario.
- [ ] Fijar horarios, reservas, incidencias, comisiones y envíos.
- [ ] Prototipar y probar compra móvil con personas reales antes de desarrollar todo.

## 3 — Construcción del MVP
Catálogo, checkout, medios administrables, reporte de pago, cola de imágenes, aprobación humana, stock, despacho manual, seguimiento protegido, afiliados y auditoría.
Módulo laboral se habilita con reglas revisadas al incorporar personal. Integración bancaria/Shalom y SaaS multitienda fuera del MVP hasta confirmar factibilidad.

## 4 — Ensayo y lanzamiento
- [ ] Compra de prueba completa, fuera de horario y con pago inválido.
- [ ] Revisar seguridad, privacidad, obligaciones tributarias y de consumidor.
- [ ] Probar respaldo/restauración y carga concurrente de última unidad.
- [ ] Lanzamiento pequeño; medir margen/hora y tiempos de atención.

## Expansión
Jeans, cuero, botas harness, cafarenas y colección elegante tras pruebas de demanda. Clima y ventas por región guían compras; no esperar que termine el calentamiento global. No usar fotos de terceros como stock propio ni prometer durabilidad no probada.

## Fases operativas vigentes
Este mapa refina las etapas anteriores; una fase no autoriza ejecutarla. Todos los entregables de app están pendientes.

| Fase | Entrada y salida / puerta de avance |
|---|---|
| F0 Requisitos y negocio | Contexto, trazabilidad y revisión journeys; cotizaciones/muestra/margen/formalización antes de comprometer compra o cobro |
| F1 UX y visual | Decisiones de atención/reserva/acceso; jornadas y componentes revisados, pruebas de tarea con evidencia; no casillas implícitas |
| F2 Base técnica | Nueva autorización de construir, presupuesto y ADR de stack; repositorio/base modular/policies/storage/colas/staging con pruebas |
| F3 Catálogo/carrito/reservas | Producto y precios reales o fixtures claramente separados; concurrencia de última unidad, checkout/envío válido y carreras definidas |
| F4 Pagos/evidencias/tiempo real | RN04/05, archivos legibles privados, doble revisión/reintento y recuperación probados |
| F5 Despachos/postventa | Cotización y OS manuales, seguimiento seguro, cancelación/cambio/devolución conciliados |
| F6 Afiliados | Acuerdos y reglas aprobados, snapshots, ajustes, liquidación y observación probados |
| F6-P Personal condicional | Solo al incorporar personal, con revisión laboral y reglas vigentes; no bloquea tienda operada solo por dueño |
| F7 SEO/medición/ensayo/lanzamiento | Datos reales, privacidad/consumidor, pruebas completas/restore/soporte; publicar solo con autorización expresa posterior |
| F8 Mantenimiento | Operación lanzada, calendario de parches, observabilidad, backups y ejercicios de recuperación |

QA/seguridad/SEO se diseñan desde F1/F2 y se verifican en cada corte, no se posponen todos a F7. Orden de prompts y prerrequisitos en [[27 Prompts por fase]].
