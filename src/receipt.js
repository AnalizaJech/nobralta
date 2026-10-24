import { assetUrl } from "./AssetImage";
const ink = [25, 25, 27],
  muted = [82, 82, 91],
  wine = [98, 41, 56],
  pale = [246, 246, 248],
  line = [222, 222, 226];
const clean = (s) =>
  String(s ?? "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00a0/g, " ");
const money = (n) =>
  clean(
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(n) || 0),
  );
const stamp = (s) =>
  new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date(s));
async function raster(src, logo = false) {
  try {
    const image = new Image();
    image.src = assetUrl(src);
    await image.decode();
    const c = document.createElement("canvas");
    c.width = logo ? 1400 : 220;
    c.height = logo
      ? Math.round((1400 * image.naturalHeight) / image.naturalWidth)
      : 280;
    const ctx = c.getContext("2d");
    if (!logo) {
      const scale = Math.min(
        200 / image.naturalWidth,
        260 / image.naturalHeight,
      );
      ctx.drawImage(
        image,
        (220 - image.naturalWidth * scale) / 2,
        (280 - image.naturalHeight * scale) / 2,
        image.naturalWidth * scale,
        image.naturalHeight * scale,
      );
    } else ctx.drawImage(image, 0, 0, c.width, c.height);
    return { data: c.toDataURL("image/png"), ratio: c.height / c.width };
  } catch {
    return null;
  }
}
export async function buildReceipt(order) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pdf.setProperties({
    title: `Detalle de compra ${order.id}`,
    subject: "Resumen de pedido NOBRALTA",
    author: "NOBRALTA",
  });
  const logo = await raster("/assets/brand-wordmark.svg", true),
    thumbnails = new Map();
  await Promise.all(
    [...new Set(order.lines.map((p) => p.image).filter(Boolean))].map(
      async (src) => thumbnails.set(src, await raster(src)),
    ),
  );
  const txt = (s, x, y, size = 10, bold = false, color = ink, opts = {}) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    pdf.text(clean(s), x, y, opts);
  };
  const wrap = (s, w, size = 10) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(size);
    return pdf.splitTextToSize(clean(s), w);
  };
  const box = (x, y, w, h, color = pale) => {
    pdf.setFillColor(...color);
    pdf.roundedRect(x, y, w, h, 3, 3, "F");
  };
  const header = (first = false) => {
    if (logo) pdf.addImage(logo.data, "PNG", 18, 17, 58, 58 * logo.ratio);
    else txt("NOBRALTA", 18, 26, 23, true);
    txt("DETALLE DE COMPRA", 192, 19, 8, true, muted, { align: "right" });
    txt(`Pedido ${order.id}`, 192, 27, 13, true, ink, { align: "right" });
    txt(stamp(order.created), 192, 34, 8, false, muted, { align: "right" });
    pdf.setDrawColor(...wine);
    pdf.setLineWidth(0.65);
    pdf.line(18, 43, 192, 43);
  };
  header(true);
  let y = 54;
  txt("Resumen del pedido", 18, y, 17, true);
  txt(order.status, 192, y, 10, true, wine, { align: "right" });
  y += 9;
  const recipient = [
    `${order.customer.name} ${order.customer.lastName}`,
    `DNI: ${order.customer.dni}`,
    `Teléfono: ${order.customer.phone}`,
    order.customer.email,
  ];
  const destination = [
    order.agency.name,
    `${order.agency.city} / ${order.agency.region}`,
    order.agency.address,
    ...(order.guide ? [`Guía / OS: ${order.guide}`] : []),
  ].filter(Boolean);
  const blocks = [
    { title: "DESTINATARIO", rows: recipient, x: 18 },
    { title: "RECOJO EN SHALOM", rows: destination, x: 108 },
  ];
  const blockHeight = Math.max(
    43,
    ...blocks.map(
      (b) =>
        18 + b.rows.reduce((n, r) => n + wrap(r, 72, 9).length * 4.4 + 2, 0),
    ),
  );
  for (const b of blocks) {
    box(b.x, y, 84, blockHeight);
    txt(b.title, b.x + 6, y + 9, 8, true, wine);
    let py = y + 17;
    for (const [i, r] of b.rows.entries()) {
      const rows = wrap(r, 72, 9);
      for (const row of rows) {
        txt(row, b.x + 6, py, 9, i === 0);
        py += 4.4;
      }
      py += 2;
    }
  }
  y += blockHeight + 12;
  const tableHead = () => {
    box(18, y, 174, 10, ink);
    txt("PRENDA / VARIANTE", 24, y + 6.6, 8, true, [255, 255, 255]);
    txt("CANT.", 139, y + 6.6, 8, true, [255, 255, 255], { align: "center" });
    txt("P. UNIT.", 164, y + 6.6, 8, true, [255, 255, 255], { align: "right" });
    txt("IMPORTE", 186, y + 6.6, 8, true, [255, 255, 255], { align: "right" });
    y += 12;
  };
  const next = () => {
    pdf.addPage();
    header();
    y = 53;
  };
  if (y > 230) next();
  tableHead();
  for (const [i, p] of order.lines.entries()) {
    const names = wrap(p.name, 84, 10),
      variants = wrap(
        `${p.color} / Talla ${p.size}${p.packId ? " / Pack" : ""}`,
        84,
        8.5,
      );
    const h = Math.max(29, 9 + names.length * 4.5 + variants.length * 4);
    if (y + h > 265) {
      next();
      tableHead();
    }
    if (i % 2 === 0) box(18, y, 174, h);
    const img = thumbnails.get(p.image);
    if (img) pdf.addImage(img.data, "PNG", 21, y + 3, 17, 22);
    let py = y + 8;
    for (const n of names) {
      txt(n, 41, py, 10, true);
      py += 4.5;
    }
    for (const v of variants) {
      txt(v, 41, py + 1, 8.5, false, muted);
      py += 4;
    }
    txt(p.qty, 139, y + 10, 10, false, ink, { align: "center" });
    txt(money(p.price), 164, y + 10, 9, false, muted, { align: "right" });
    txt(money(p.price * p.qty), 186, y + 10, 10, true, ink, { align: "right" });
    y += h + 2;
  }
  y += 10;
  if (y + 64 > 266) next();
  const subtotal = Number(
    order.subtotal ?? order.lines.reduce((n, p) => n + p.price * p.qty, 0),
  );
  const total =
    Number(order.total ?? subtotal - Number(order.discount || 0)) +
    Number(order.shipping || 0);
  const summaryY = y;
  box(103, y, 89, 61);
  txt("RESUMEN DE IMPORTES", 109, y + 9, 8, true, muted);
  const sums = [
    ["Prendas", money(subtotal)],
    ["Descuento", money(order.discount || 0)],
    ["Envío", order.shipping != null ? money(order.shipping) : "Por cotizar"],
  ];
  for (const [i, [label, value]] of sums.entries()) {
    txt(label, 109, y + 19 + i * 7, 9, false, muted);
    txt(value, 186, y + 19 + i * 7, 9, false, ink, { align: "right" });
  }
  box(103, y + 43, 89, 18, wine);
  txt("Precio total", 109, y + 54, 10, true, [255, 255, 255]);
  txt(money(total), 186, y + 54, 15, true, [255, 255, 255], { align: "right" });
  txt("INFORMACIÓN DE ENTREGA", 18, y + 5, 8, true, wine);
  let ny = y + 13;
  const notes = [
    "Entrega estimada: 2-10 días desde confirmar el pago y el destino.",
    order.shipping == null
      ? "El envío se cotiza por separado antes de pagar."
      : "El costo de envío figura en el resumen.",
    ...(order.report?.method
      ? [`Medio registrado: ${order.report.method}.`]
      : []),
    ...(order.code ? [`Código aplicado: ${order.code}.`] : []),
  ];
  for (const note of notes) {
    for (const row of wrap(note, 75, 9)) {
      txt(row, 18, ny, 9, false, muted);
      ny += 4.5;
    }
    ny += 3;
  }
  y = Math.max(summaryY + 70, ny + 6);
  if (y + 15 > 270) next();
  txt("Gracias por elegir NOBRALTA.", 18, y, 11, true);
  txt(
    "Conserva el código de tu pedido para consultar su seguimiento.",
    18,
    y + 7,
    9,
    false,
    muted,
  );
  const pages = pdf.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    pdf.setPage(p);
    pdf.setDrawColor(...line);
    pdf.setLineWidth(0.2);
    pdf.line(18, 279, 192, 279);
    txt(
      "Resumen de pedido. No sustituye una boleta o factura electrónica.",
      18,
      285,
      7.5,
      false,
      muted,
    );
    txt(`${p} / ${pages}`, 192, 285, 8, false, muted, { align: "right" });
    txt(`NOBRALTA / ${order.id}`, 18, 291, 7, false, muted);
  }
  return pdf;
}
