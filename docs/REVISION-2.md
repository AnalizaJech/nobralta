# Revisión 2 — 21/10/2026 America/Lima

Referencia: cinco capturas adjuntadas por el propietario, especialmente carrito Samsung. No se afirma clonación ni auditoría completa de Temu. Reemplaza las conclusiones visuales de la revisión anterior; la aprobación creativa corresponde al propietario.

## Cambios
- Páginas completas para cuenta, bolsa, pack, ficha y seguimiento conservando navbar; búsqueda/menú ocupan el resto del viewport.
- Combobox y calendario propios; cero select y dialog en DOM inspeccionado. Campos con dimensiones definidas; textarea sin redimensionado y scroll interno.
- Búsqueda con sinónimos (casaca → chaqueta), aproximación y categorías/productos relacionados. Botones Explorar/Aplicar visibles.
- Marca Michroma: nombre e icono usan mismos contornos; menú de dos líneas, inferior mitad. Fuentes locales OFL.
- Carrito con productos/destinatario amplios y resumen separado; cuenta con navegación por tareas; seguimiento con estado, siguiente paso, agencia y etapas.
- Admin con espacio operativo, navegación responsive y gestión de oportunidades/postulaciones.

## Verificación en Chrome mediante Playwright CLI
Sesión aislada r2-qa, sin modificar el navegador que usa el propietario.
- Pack vino M + marfil L → bolsa S/99 → acceso cliente → DNI/agencia Shalom → pedido y seguimiento: completado.
- Código sobre pack informa que ya tiene precio especial; descuento solo para prendas individuales.
- Puesto creado/publicado desde admin → visible en Trabajos → postulación registrada → admin cambia estado a En revisión: completado.
- Mensaje largo: altura visible138px más borde2px, scrollHeight920px, resize:none.
- Anchos320/390/768/1440: sin desbordamiento horizontal en Trabajos, admin y carrito (scrollWidth305/375/753/1425, espacio de scrollbar15px).
- Capturas inspeccionadas: r2-cart, r2-account, r2-tracking, r2-admin, r2-admin-jobs, r2-menu-mobile, r2-cart-mobile, r2-pack-mobile, r2-account-mobile. Ubicación output/playwright/.

Frontend estático con persistencia local. No se conectó correo, pagos, contratación ni Shalom en tiempo real.
