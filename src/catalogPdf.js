import { loadFonts, raster } from "./receipt";
export async function buildCatalog(products, inventory, settings = {}) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    compress: true,
    putOnlyUsedFonts: true,
  });
  await loadFonts(pdf);
  pdf.setProperties({
    title: "Catálogo NOBRALTA",
    author: "NOBRALTA",
    subject: "Prendas y precios",
  });
  const logo = await raster("/assets/brand-wordmark.svg", true);
  const photos = await Promise.all(
    products.map((p) => raster(p.variants[0]?.image)),
  );
  const pages = Math.max(1, Math.ceil(products.length / 4));
  const txt = (text, x, y, size = 10, bold = false) => {
    pdf.setFont("Manrope", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(25, 25, 27);
    pdf.text(String(text), x, y);
  };
  const money = (n) => "S/ " + Number(n).toFixed(2);
  for (let pg = 0; pg < pages; pg++) {
    if (pg) pdf.addPage();
    if (logo) pdf.addImage(logo.data, "PNG", 76, 13, 58, 58 * logo.ratio);
    pdf.setFont("Instrument", "normal");
    pdf.setFontSize(25);
    pdf.text("Elige tu próxima pieza.", 18, 43);
    txt("Catálogo · " + new Date().toLocaleDateString("es-PE"), 18, 51, 9);
    for (let j = 0; j < 4; j++) {
      const idx = pg * 4 + j,
        p = products[idx];
      if (!p) continue;
      const x = 18 + (j % 2) * 90,
        y = 60 + Math.floor(j / 2) * 101,
        w = 84;
      pdf.setDrawColor(222, 222, 226);
      pdf.roundedRect(x, y, w, 95, 3, 3);
      pdf.setFillColor(246, 246, 248);
      pdf.roundedRect(x + 3, y + 3, w - 6, 43, 2, 2, "F");
      if (photos[idx])
        pdf.addImage(photos[idx].data, "PNG", x + 26, y + 4, 32, 40);
      txt(p.category.toUpperCase(), x + 5, y + 52, 7);
      pdf.setFont("Manrope", "bold");
      pdf.setFontSize(10);
      let titleSize = 10,
        title = pdf.splitTextToSize(p.name, 74);
      while (title.length > 3 && titleSize > 6) {
        pdf.setFontSize(--titleSize);
        title = pdf.splitTextToSize(p.name, 74);
      }
      pdf.text(title, x + 5, y + 58, { lineHeightFactor: 1.1 });
      let yy = y + 58 + title.length * titleSize * 0.39;
      pdf.setTextColor(98, 41, 56);
      pdf.setFontSize(12);
      pdf.text(money(p.price), x + 5, yy + 3);
      yy += 9;
      const availableSizes = p.sizes.filter((s) =>
        p.variants.some(
          (v) => (inventory[[p.id, v.color, s].join("|")] || 0) > 0,
        ),
      );
      txt(
        availableSizes.length
          ? "Tallas: " +
              availableSizes.slice(0, 8).join(" · ") +
              (availableSizes.length > 8
                ? " +" + (availableSizes.length - 8)
                : "")
          : "Agotado",
        x + 5,
        yy,
        8,
      );
      pdf.setFont("Manrope", "normal");
      pdf.setFontSize(8);
      const colors = pdf.splitTextToSize(
        "Colores: " +
          p.variants
            .slice(0, 4)
            .map((v) => v.color)
            .join(", ") +
          (p.variants.length > 4
            ? " · +" + (p.variants.length - 4) + " colores"
            : ""),
        74,
      );
      pdf.text(colors.slice(0, 2), x + 5, yy + 5);
    }
    pdf.setDrawColor(222, 222, 226);
    pdf.line(18, 269, 192, 269);
    const contact = [settings.phone, settings.email]
      .filter(Boolean)
      .join(" · ");
    txt(contact || "NOBRALTA · Moda masculina", 18, 276, 8);
    txt(
      "Consulta disponibilidad y costo de envío antes de comprar.",
      18,
      282,
      8,
    );
    txt(`${pg + 1} / ${pages}`, 181, 282, 8);
  }
  return pdf;
}
