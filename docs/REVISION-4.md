# Revisión 4 — 22/10/2026

## Cambios pedidos por el propietario
Las referencias Instagram se usaron para claridad de compra y jerarquía; no se clonaron sus marcas ni se añadieron reseñas, beneficios o login social ficticios.

- Fondo blanco comprobado rgb255/255/255, superficies grises y contraste oscuro. Selectores y opciones neutrales redondeadas, sin verde/crema.
- Menú: Comprar por prenda, Tu compra y entradas visuales. Cuenta/búsqueda/menú/páginas usan un cierre contextual en navbar; no bandas redundantes con X ni líneas de menú.
- Cards con copy breve, color, talla y Añadir al carrito directo. Error si falta talla, validación de existencias, confirmación sin abandonar catálogo. Imagen y nombre permiten detalle.
- Polos18 tonos. Los15 nuevos completan el muestrario: Crema, Marrón, Celeste, Gris claro, Blanco, Camello, Rojo, Azul acero, Gris oscuro, Beige, Azul eléctrico, Guinda, Verde, Palo rosa y Cemento. Negro, Marfil y Vino se conservan para respetar datos previos.
- Biker negra/café renovada; Racer Archivo, Cuero Club, Abrigo Distrito. Harness masculino de punta amplia y tacón bajo. Fotografías generadas originales con alfa y WebP locales.
- Pack de básicos y conjunto identificados por separado. Look completo: polo marfil + racer negra + denim índigo, S/429. Admin configura de2 a5 productos por posición y colores sugeridos. Precio proporcional con ajuste de céntimos; cantidades y eliminación vinculadas.

## Verificación de navegador
Playwright CLI, perfil r4-qa aislado. Capturas output/playwright/r4-*.png inspeccionadas en desktop y390px.
- Card sin talla muestra error; Celeste/M añade polo S/59 y conserva catálogo. Carrito refleja variante correcta.
- Conjunto preview/constructor usa Marfil/Negro/Índigo. Tallas S/M/32 →4 líneas contando polo previo; total S/488 =59+429.
- Contenedores de packs:565px y565px a1440.
- Admin abre tres productos, guarda campaña sin perder variantes sugeridas.
-18 colores de polo seleccionados y decodificados correctamente; imágenes distintas verificadas.
- Búsqueda «polo celeste» muestra imagen celeste y abre ficha con ese color seleccionado.
- Sin desbordamiento horizontal a320/390/768/1440. Cero select/dialog nativos. Cuenta tiene un único cierre en navbar.
- Recursos82 en manifiesto; alfa de prendas verificada.

Frontend estático local con localStorage; no se publicaron cambios ni se enviaron comunicaciones. La aprobación creativa continúa pendiente del propietario.

## Cierre de verificación
Build final correcto; test:sites4/4. Detector Impeccable:[] sobre componentes cambiados. Consola tras recarga limpia:0 errores,0 advertencias. Búsqueda → ficha → regreso conserva polo celeste; menú Chaquetas limpia filtros anteriores y muestra5 chaquetas; inicio restablece catálogo14 productos. No se realizó auditoría de producción ni se obtuvo aún aprobación creativa del propietario.

## Ajustes de interacción — 22 octubre
- Cerrar el detalle conserva el scroll previo del catálogo y devuelve el foco sin desplazar la página.
- El filtro de talla cruza talla, color y stock; la talla filtrada queda seleccionada para compra directa.
- Los botones principales centran texto e icono como grupo.
- Correo y contraseña comparten altura, radio, borde y fondo.
- Verificación: build correcto, 4 pruebas Sites correctas; navegador: scroll móvil 3109 → 3109, talla 32 muestra denim/pantalón, talla 42 muestra harness, grupo del botón centrado con diferencia 0 px. Campos de acceso con idénticas medidas y estilos.
