# NOBRALTA — sitio y administración local

Carpeta canónica: `C:\Users\JORGE\Desktop\Proyecto`.

## Abrir el sitio

Doble clic en **INICIAR-SITIO.cmd** dentro de esta carpeta. Abre automáticamente http://127.0.0.1:4173 en tu navegador. Deja la ventana del servidor abierta; Ctrl+C lo detiene. Si el sitio ya está encendido, el script abre esa instancia sin crear otro servidor.

Desde PowerShell también puedes ejecutarlo así, sin cambiar la política de scripts:

```powershell
& 'C:\Users\JORGE\Desktop\Proyecto\INICIAR-SITIO.cmd'
```

Para arrancar manualmente:

```powershell
cd 'C:\Users\JORGE\Desktop\Proyecto'
npm.cmd run dev
```

El iniciador instala dependencias únicamente si faltan. `TERMINAL-LARAVEL.cmd` abre herramientas de Laravel; el sitio actual se inicia con `INICIAR-SITIO.cmd`.

## Cuentas para recorrer el sistema

| Perfil | Correo | Contraseña local |
|---|---|---|
| Administrador | admin@nobralta.pe | Nobralta2026! |
| Cliente | cliente@nobralta.pe | Cliente2026! |

También puedes registrarte con datos de prueba desde el icono de cuenta. El administrador entra directamente a Administración; «Ver tienda» vuelve al catálogo. Desde su cuenta puede regresar al panel. El cliente ve únicamente sus pedidos y su perfil.

## Recorrido completo

1. Filtra prendas, elige color, talla y cantidad. Cafarena inicia agotada; camisa inicia en oferta. La administración modifica precio y existencias por variante.
2. Compra una pieza o arma un pack eligiendo sus tallas/colores. Aplica `PRESENCIA10` o el código del vendedor `DIEGO10` en la bolsa. Un código por pedido; no se acumula descuento sobre packs.
3. Entra o regístrate; completa DNI, nombres, apellidos, teléfono, correo, departamento y agencia Shalom.
4. Confirma el pedido. Se reservan sus unidades. El administrador cotiza el envío antes de solicitar pago.
5. El cliente abre su pedido y reporta operación, importe, fecha/hora y constancia. Solo archivos PNG/JPG/PDF hasta 750 KB en esta base local.
6. El administrador contrasta el abono, confirma u observa el reporte, prepara, registra guía/OS y prueba de despacho, y marca entrega. Los pedidos sin abono confirmado no pueden despacharse.
7. Cliente y administrador descargan detalle PDF. No es boleta/factura electrónica. El administrador prepara el texto para WhatsApp/correo y copia el mensaje; no hay envíos externos automáticos.
8. Crea/pausa packs, códigos, afiliados y agencias. El catálogo y las promociones reflejan esos datos. Estadísticas calculadas desde los pedidos, no cifras prefabricadas.

Entrega comunicada: **2–10 días desde la confirmación del pago y destino**. Condición comercial: sin cambios por talla/color/preferencia ni devoluciones voluntarias; sin excluir derechos legales ante defectos/incumplimiento.

## Dónde está cada cosa

- `src/App.jsx`: escaparate, navegación, catálogo, ficha, bolsa y packs.
- `src/Customer.jsx`: acceso/registro, cuenta, datos de recojo, seguimiento y constancia.
- `src/Admin.jsx`: pedidos, estadísticas, catálogo/stock, clientes, campañas, afiliados, agencias, medios de pago, personal y configuración.
- `src/store.js`: persistencia local, datos de partida y PDF descargable.
- `src/styles.css`: estilos compartidos y responsive.
- `public/assets`: fotografía y ropa PNG original + WebP, marca SVG.
- `public/fonts`: fuentes y licencias locales.
- `docs/boveda`: copia contextual de las notas de negocio; la bóveda original permanece en Escritorio/emprendimiento.
- `docs/ENTORNO-LARAVEL.md`: versiones, parches y preparación para Laravel.
- `docs/COBERTURA.md`: qué simula cada módulo y qué se implementará en servidor.
- `output/playwright`: capturas y recorridos de QA.

## Compilar para alojamiento estático

```powershell
npm ci
npm run build
npm run test:sites
```

Publicar **solo `dist/client`** en un hosting estático. No subir `docs`, `node_modules`, archivos de pruebas, instaladores ni herramientas de entorno. El paquete conserva también `dist/server` y `.openai/hosting.json` para el adaptador de Sites. No se ha publicado ningún sitio.

## Límite técnico de esta fase

Esta es una simulación frontend autorizada con localStorage. La UI evita rótulos de prototipo por petición del propietario; la documentación conserva esta distinción. No uses datos personales, contraseñas reutilizadas, cuentas bancarias reales ni constancias reales. Los datos se guardan únicamente en ese navegador/origen; las cuentas y permisos del cliente no constituyen seguridad de servidor y pueden alterarse desde DevTools. No hay pagos, correos, WhatsApp, Shalom, autenticación de servidor ni facturación integrados. Los registros no se comparten entre dispositivos.

Precios, medidas, stock, descuentos y comisiones iniciales son fixtures para recorrer la experiencia. Materiales y oferta reales requieren muestras/evidencia antes de ventas. La copia antigua en Documents/ChatGPT/Emprendimiento/nobralta-frontend se conserva como respaldo previo y ya no es la base activa.

Para restablecer los fixtures, borra únicamente las claves que empiezan por `nobralta.` en el almacenamiento local de este origen y recarga. Esto elimina cuentas/pedidos locales; exporta lo que quieras conservar antes.



## Revisión 2 · navegación y operación
Cuenta/carrito/pack/seguimiento en páginas completas; menú y búsqueda a pantalla completa bajo navbar. Controles propios, mensajes de altura fija con scroll, marca Michroma coherente con N, botones y transiciones. Trabajos permite publicar/pausar puestos y revisar postulaciones desde admin; su persistencia sigue siendo localStorage, sin envío externo.
Evidencia y verificaciones actuales: `docs/REVISION-2.md`. El servidor local de esta sesión está en http://127.0.0.1:4173.


## Revisión3 · vintage y catálogo
Hero, marca y cards renovados; denim índigo/carbón, Racer Medianoche y Cuero Heritage. Packs de tres polos y polo+chaqueta con imágenes coherentes, cantidades vinculadas y papelera. Filtros cálidos alineados y disponibilidad. Footer con Instagram/TikTok/Facebook/WhatsApp/YouTube/LinkedIn provisionales autorizados, editables en Configuración. Ver docs/REVISION-3.md.


## Revisión4 · compra directa y UI neutral
Fondo blanco, menú jerárquico, selectores neutros y cierre en navbar. Cards con talla y compra directa,18 colores de polos, nuevas chaquetas/harness masculino y conjunto coordinado de3 prendas. Admin configura cada producto/colores del pack. Evidencia vigente: docs/REVISION-4.md.

## GitHub Pages
En el repositorio AnalizaJech/nobralta, abrir Settings → Pages → Build and deployment → Source: GitHub Actions. El flujo Publicar prototipo en GitHub Pages construye y publica dist/client en cada push a main. Si el primer despliegue se ejecutó antes de habilitar Pages, usar Actions → Publicar prototipo en GitHub Pages → Run workflow.
URL prevista: https://analizajech.github.io/nobralta/
La compilación con GITHUB_PAGES=true usa /nobralta/ para scripts, estilos e imágenes. El servidor local conserva /. Cuentas, pedidos y administración siguen siendo simulaciones locales del navegador, sin backend ni pagos reales.
