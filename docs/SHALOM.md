# Agencias Shalom verificadas

Fuente: https://shalom.com.pe/agencias, consulta 23/10/2026 (America/Bogota).

El directorio oficial contiene 565 registros. El snapshot `src/shalom-agencies.json` conserva todos para consulta administrativa: 509 ubicaciones públicas, de las cuales 500 reciben envíos. Las otras nueve ubicaciones públicas se muestran sin habilitar el recojo. Los 56 registros restantes son internos, de prueba o terminales sin recepción pública; no se ofrecen como destino de compra.

Se incluyen los cinco Puntos PRO que Shalom marca como destino: Larcomar, Megaplaza Chorrillos, Megaplaza Independencia, Parque La Molina y Real Plaza Salaverry. El filtro anterior excluía estos puntos por su categoría, pese a que reciben envíos.

Campos copiados: identificador, departamento, provincia, distrito, nombre, dirección y banderas oficiales de publicación, recepción, origen y Punto PRO. Los nombres geográficos se normalizan para lectura. El comprador puede buscar por nombre, distrito, provincia o dirección en todos los departamentos y acotar después; al seleccionar una agencia se completa su departamento. Las agencias pausadas o sin recepción no son seleccionables.

En administración, el directorio tiene búsqueda, filtros por departamento y servicio, paginación y pausa de destinos habilitados. Una agencia manual exige confirmar su verificación en Shalom. Las pausas existentes y las agencias manuales se conservan al migrar el snapshot; los pedidos mantienen su agencia histórica.

Este snapshot no consulta disponibilidad en tiempo real ni contrata envíos. Debe actualizarse desde la fuente oficial cuando cambie.
