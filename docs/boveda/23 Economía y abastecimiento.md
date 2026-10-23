# Economía y abastecimiento
Estado: modelo de planificación, sin cotizaciones, compras ni promociones aprobadas. Requisitos R02/R03/R04 y decisiones D11/D12.

## Hoja de cálculo conceptual por pedido
Usar PEN y unidades menores exactas; separar impuestos según revisión contable para comparar importes en la misma base. No introducir tasas supuestas. Costo de compra y transporte de entrada se prorratean con un criterio registrado por lote/unidades vendibles. Evitar contabilizar dos veces defectos ya incluidos en unidades vendibles.

| Variable | Entrada / cálculo |
|---|---|
| P | Precio unitario aprobado × cantidades |
| D / R | Descuentos / ingreso reembolsado de productos |
| V | Venta neta de productos = P − D − R |
| C | Costo de unidades vendidas puesto en almacén; retorno recuperable se ajusta tras inspección |
| E / G | Empaque / comisión de cobro real (base, porcentaje y fijo por proveedor) |
| A | Comisión afiliado por línea, base y porcentaje versionados; ajustes por devolución |
| EC / ER | Envío cobrado por la tienda / costo de envío asumido por la tienda |
| S | Subsidio = ER − EC; si negativo es ingreso logístico, mostrarlo separado |
| O | Otros variables: devolución logística, merma no duplicada y atención variable si se mide |
| MC | Margen de contribución = V − C − E − G − A + EC − ER − O |
| F | Fijos mensuales documentados: tecnología, administración, personal y otros aprobados |
| PE | Pedidos para equilibrio = redondear arriba(F / MC promedio ponderado), solo si MC > 0 |

Si pago en destino al transportista: registrar ese hecho; no sumar a EC ni a ER lo que no cobra/paga la tienda. Modelar cambios/reenvíos y costos de reembolso no recuperables. Margen porcentual = MC / ingreso de la tienda comparable; declarar denominador. Venta menos producto es margen parcial, nunca ganancia neta. ROAS = ingreso atribuido / anuncios y no prueba rentabilidad.

## Ejemplo sintético para probar fórmulas, NO precio de NOBRALTA
V=100, C=40, E=3, G=2, A=5, EC=8, ER=12, O=3 → MC=43. Con F=430 se requieren 10 pedidos homogéneos. Si MC≤0 no hay equilibrio con más volumen bajo esas condiciones. Este ejemplo no justifica una compra.

## Capital y caja
Capital disponible de mercadería/logística = 4000 − pagos ya realizados de ese fondo − compromisos pendientes de ese fondo + recuperaciones efectivas asignadas. No tratar inventario ni pago reportado como caja. Separar fondo de reembolsos y logística aún necesaria; monto por decidir. Registrar fecha de cobro verificado, compra a proveedor, vencimientos, devoluciones y conciliación de saldo. Presupuestos tecnológicos/publicitarios/laborales aparte, sin asumir financiación.

## Hipótesis históricas, no cotizaciones
| Producto futuro o inicial | Costo objetivo | Precio individual / Live |
|---|---:|---:|
| Polo | 30 | 59 / 49 |
| Jean | 65 | — / 109 |
| Botín | 100 | — / 169 |
| Chaqueta | 300 | — / 499 |
No usar estos importes para precios finales ni inventario. Obtener escenarios por talla, mezcla y canal, variando flete, devolución, comisión y descuento. Detener promoción si margen no cubre el umbral aprobado.

## Ficha de proveedor y aprobación de muestra
Registrar proveedor/contacto comercial, fecha/vigencia de cotización, comprobante, mínimo, talla/medidas, colores, costo, flete, plazo, defectos, cambios y reposición. Matriz por tela Pima, rib, hilo, etiquetas, estampados/acabados, bolsa, cinta, relleno y protección contra humedad: composición declarada, documento/lote, evidencia de ensayo cuando proceda, revisión y conclusión (verificado / insuficiente / incompatible). «100% algodón» solo de tela no aprueba la prenda completa. Si el transportista exige protección sintética, documentar incompatibilidad y buscar alternativa comprobada; no aceptar en silencio. Ninguna muestra ni lote está aprobado.

## Comparación importación vs fabricante local
Comparar costo por unidad vendible puesto en Perú: compra + flete + seguro aplicable + tributos según clasificación/régimen revisados + despacho + transporte interno + cargos financieros + defectos/reposición; registrar moneda y tipo de cambio de escenario. Tributos recuperables requieren criterio contable y flujo de caja separado. Incluir mínimos, tallas, plazos, control de calidad y posibilidad de reposición. No asumir ahorro ni dividir envíos para eludir obligaciones. Compra piloto bloqueada por muestra/costos/formalización, no por terminar documentos.
