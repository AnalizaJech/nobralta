# J11 Seguimiento privado
Estado: propuesta pendiente de revisión; no implementado.
Actor: Comprador.
Objetivo: Conocer situación real del pedido/envío.
Precondiciones: Acceso seguro aprobado D14; guía registrada manualmente cuando haya despacho.

| Paso | Respuesta del sistema / procedimiento | Mensaje visible propuesto |
|---|---|---|
| 1. Accede | Verifica sesión o enlace secreto sin usar ID correlativo como credencial | Acceso a tu pedido |
| 2. Consulta | Timeline separa reporte/verificación/preparación/envío y última actualización | Última actualización manual [hora] |
| 3. Recoge | Clave de recojo solo al destinatario autorizado por canal protegido | Tu clave es privada |
| 4. Reclama | Abre incidencia con referencia sin exponer documentos | Incidencia registrada |

Excepciones: Enlace expirado/revocado, pedido ajeno, estado desactualizado y transportista sin actualización; recuperación segura sin filtrar existencia.
Datos y permisos: Documento y teléfono mínimos; afiliado/TV no reciben guía secreta ni destinatario.
Criterios de aceptación: R12/R17 en [[21 Requisitos y trazabilidad]]; ejecutar cada paso y excepción comprobando resultado, recuperación y autorización; registrar evidencia real antes de marcar conforme. Reglas en [[22 Reglas y estados]].

## Tu revisión
- [ ] Aprobar
- [ ] Modificar
Paso:
Cambio solicitado:
Motivo:
Decisión y fecha:

Ver [[10 Registro de decisiones]].
