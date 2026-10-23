# Evidencias y archivos
## Propuesta de carga
Hasta 2 imágenes de 10 MiB cada una por reporte, ajustable tras pruebas. Admitir JPEG/PNG/WebP. HEIC/HEIF solo cuando el conversor esté instalado y probado; si falla, explicar cómo exportar JPG sin perder el formulario. PDF fuera del MVP, con mensaje claro antes de cargar.

## Procesamiento
1. Validar autorización, extensión permitida, firma real, tamaño y límite de píxeles (propuesta 25 MP); no confiar en MIME enviado.
2. Guardar original privado en cuarentena con nombre aleatorio y hash SHA-256.
3. Procesar en cola aislada con límites de CPU/memoria/tiempo y librerías actualizadas; aplicar análisis de archivos. Reescribir imagen no elimina todos los riesgos.
4. Corregir orientación y generar copia de visualización sin metadatos EXIF/GPS.
5. Miniatura ~480 px; vista hasta 2000 px de lado mayor sin ampliar. WebP de calidad alta, objetivo orientativo 200–600 KB, nunca un límite que vuelva ilegibles cifras. Permitir ampliar.
6. Si los detalles quedan borrosos, conservar versión de mayor calidad y solicitar evidencia adicional si hace falta. No alterar contenido con IA.
7. Mostrar «Procesando», «Lista» o «No pudimos procesar; reintentar». Un fallo técnico no equivale a pago rechazado.

## Privacidad y escalabilidad
Originales y vistas de constancias privados; acceso autorizado mediante enlaces temporales, sin indexación pública ni caché compartida pública. Catálogo público usa canal separado y caché.
Guardar hash, tamaño, dimensiones, estado, intentos y relación con reporte. Reemplazar evidencia crea versión, no sobrescribe la anterior.
El original permanece intacto para auditoría durante plazo de conservación definido; no guardar para siempre. Política de retención y borrado, respaldos incluidos, pendiente de revisión legal. Compresión de copia no demuestra autenticidad.
Limitar cargas/reintentos y bloquear scripts/SVG/ejecutables. No pedir foto del DNI para una compra ordinaria.

## Aceptación
- [ ] Número de operación legible al ampliar.
- [ ] Funciona con foto de celular y conexión lenta.
- [ ] Un usuario no accede a archivos de otro.
- [ ] No se pierde el pedido al fallar una conversión.
