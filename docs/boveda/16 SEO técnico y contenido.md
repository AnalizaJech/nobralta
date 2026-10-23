# SEO técnico y contenido
SEO pendiente de implementación y medición; no garantizar posiciones. No elegir nombre solo por ausencia de resultados: estrategia de marca y protección legal separadas.

## Catálogo rastreable
- Renderizar contenido público útil en HTML de servidor; navegación mediante enlaces reales y jerarquía Inicio > categoría > producto.
- Un H1 descriptivo por ficha, título y meta descripción propios; no depender de textos incrustados en imágenes.
- Slugs estables legibles; 301 para cambios reales. Canonical coherente. Variantes con URLs identificables; decidir estrategia única o multipágina y alinear canonical, ProductGroup y contenido.
- Evitar indexación explosiva de filtros/orden/UTM; definir páginas de categoría útiles y reglas por URL. No canonicalizar todas las páginas paginadas a la primera automáticamente.
- Sitemap solo URLs canónicas indexables con fechas honestas; robots sin bloquear CSS/JS necesarios.
- Carrito, checkout, pagos, documentos, panel y búsquedas internas no deben aparecer en índices. Noindex no protege privacidad: autorización obligatoria. Robots no es control de acceso y puede impedir que se lea noindex.
- Agotado temporal conserva ficha y estado real si sigue siendo útil; retirado permanente requiere decisión 404/410 o redirección solo a sustituto pertinente.

## Datos y descubrimiento
Product/Offer, ProductGroup cuando corresponda, BreadcrumbList y Organization con datos reales coherentes. No inventar GTIN, reseñas, valoraciones, descuentos o disponibilidad. Verificar documentación actual y Rich Results Test; elegibilidad no garantiza resultados enriquecidos.
Metadatos Open Graph y tarjeta social con imagen propia/autorizada. Search Console, sitemap y monitoreo de cobertura/canónicos. Merchant Center/feed solo al contar con datos y políticas compatibles; mantener precio/stock actualizados.

## Contenido
Mapear intención por categoría: polos Pima, corte slim, medidas, cuidados y combinaciones. No crear cientos de páginas finas por color/ciudad. Beneficios sustentados, títulos que describen y respuestas breves a dudas reales. No afirmar contenido «ecológico» por ser natural.

## Rendimiento
Objetivos de campo orientativos al percentil 75: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1; verificar definiciones actuales al implementar. Imágenes responsivas con width/height, lazy load bajo el primer pliegue; no retrasar imagen principal LCP. Comprimir sin destruir textura ni fidelidad. Evitar fuentes/píxeles/scripts innecesarios.

- [ ] Revisar URL canónica, schema y contenido de una ficha con variantes.
- [ ] Verificar que ninguna constancia ni pedido sea público.
- [ ] Probar sitemap, errores 404, redirecciones y desindexación.
