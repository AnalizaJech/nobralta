import shalomAgencies from "./shalom-agencies.json";
import { useState, useEffect } from "react";
export const currency = (n) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    n,
  );
export const phases = [
  "Por pagar",
  "En revisión",
  "Pago observado",
  "Pago verificado",
  "En preparación",
  "Enviado",
  "Entregado",
  "Cancelado",
];
export const sku = (id, color, size) => [id, color, size].join("|");
export function useSaved(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nobralta." + key)) ?? initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("nobralta." + key, JSON.stringify(value));
    } catch {
      window.dispatchEvent(new CustomEvent("storage-full"));
    }
  }, [key, value]);
  useEffect(() => {
    const sync = (e) => {
      if (e.key === "nobralta." + key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [key]);
  return [value, setValue];
}
export const agencies = shalomAgencies;
export const initialPromos = [
  {
    id: "duo",
    title: "Tres tonos. Un mismo pulso.",
    subtitle: "Negro, marfil y vino. Tres polos Pima para tu semana.",
    type: "pack",
    productId: "pima",
    qty: 3,
    price: 149,
    active: true,
    start: "2026-01-01",
    end: "2027-12-31",
  },
  {
    id: "bienvenida",
    title: "Tu primera elección tiene un detalle.",
    subtitle: "10% con el código PRESENCIA10 en prendas individuales.",
    type: "code",
    code: "PRESENCIA10",
    discount: 10,
    active: true,
    start: "2026-01-01",
    end: "2027-12-31",
  },
];
export const initialAffiliates = [
  {
    id: "af-1",
    name: "Diego Rivas",
    code: "DIEGO10",
    discount: 10,
    commission: 8,
    active: true,
  },
];
export const defaultSettings = {
  brand: "NOBRALTA",
  email: "",
  phone: "",
  delivery: "2–10 días",
  review: "Lunes a sábado, 9:00–18:00",
  paymentName: "Transferencia / Yape",
  paymentOwner: "",
  paymentAccount: "",
  paymentActive: false,
};
export async function digest(password, salt) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(salt + password),
  );
  return [...new Uint8Array(hash)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
export async function bootstrapUsers() {
  return Promise.all(
    [
      {
        id: "admin",
        name: "Jorge",
        lastName: "Administrador",
        email: "admin@nobralta.pe",
        phone: "",
        role: "admin",
        password: "Nobralta2026!",
      },
      {
        id: "client",
        name: "Mateo",
        lastName: "Salazar",
        email: "cliente@nobralta.pe",
        phone: "999000111",
        role: "customer",
        password: "Cliente2026!",
      },
    ].map(async ({ password, ...u }) => ({
      ...u,
      salt: u.id,
      passwordHash: await digest(password, u.id),
    })),
  );
}
export const now = () => new Date().toISOString();
export const date = (x) =>
  new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date(x));
export const isActive = (p) => {
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return p.active && (!p.start || p.start <= day) && (!p.end || p.end >= day);
};
export async function receipt(order) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF();
  const paper = [247, 245, 240],
    ink = [36, 36, 32];
  pdf.setFillColor(...paper);
  pdf.rect(0, 0, 210, 48, "F");
  pdf.setTextColor(...ink);
  try {
    const svg = await (await fetch("/assets/brand-wordmark.svg")).text();
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = "data:image/svg+xml;base64," + btoa(svg);
    });
    const canvas = document.createElement("canvas");
    canvas.width = 1124;
    canvas.height = 150;
    canvas.getContext("2d").drawImage(img, 0, 0, 1124, 150);
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 20, 17, 65, 8.7);
  } catch {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(23);
    pdf.text("NOBRALTA", 20, 26);
  }
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text("Detalle de compra", 190, 19, { align: "right" });
  pdf.setFontSize(12);
  pdf.text(order.id, 190, 27, { align: "right" });
  pdf.setFontSize(9);
  pdf.text(date(order.created), 20, 39);
  pdf.text(order.status, 190, 39, { align: "right" });
  let y = 61;
  const text = (value, x = 20, width = 170, size = 10) => {
    pdf.setFontSize(size);
    for (const row of pdf.splitTextToSize(String(value), width)) {
      if (y > 272) {
        pdf.addPage();
        y = 25;
      }
      pdf.text(row, x, y);
      y += 5.5;
    }
  };
  pdf.setFont("helvetica", "bold");
  text("Destinatario");
  pdf.setFont("helvetica", "normal");
  text(order.customer.name + " " + order.customer.lastName);
  text("DNI " + order.customer.dni + " | " + order.customer.phone);
  text(order.customer.email);
  y += 4;
  pdf.setFont("helvetica", "bold");
  text("Recojo en agencia Shalom");
  pdf.setFont("helvetica", "normal");
  text(
    order.agency.name + " / " + order.agency.city + " / " + order.agency.region,
  );
  if (order.guide) text("Guia / OS: " + order.guide);
  y += 8;
  const heading = () => {
    pdf.setFontSize(9);
    pdf.setTextColor(105, 103, 96);
    pdf.text("Prenda / variante", 20, y);
    pdf.text("Cantidad", 137, y, { align: "right" });
    pdf.text("Importe", 190, y, { align: "right" });
    pdf.setTextColor(...ink);
    y += 5;
    pdf.setDrawColor(220, 216, 205);
    pdf.line(20, y, 190, y);
    y += 10;
  };
  heading();
  order.lines.forEach((p) => {
    if (y > 247) {
      pdf.addPage();
      y = 25;
      heading();
    }
    pdf.setFontSize(10);
    pdf.text(p.name, 20, y);
    pdf.text(String(p.qty), 137, y, { align: "right" });
    pdf.text(currency(p.price * p.qty), 190, y, { align: "right" });
    y += 6;
    pdf.setFontSize(9);
    pdf.setTextColor(105, 103, 96);
    pdf.text(
      p.color + " / Talla " + p.size + (p.packId ? " / Pack" : ""),
      20,
      y,
    );
    pdf.setTextColor(...ink);
    y += 12;
  });
  if (y > 220) {
    pdf.addPage();
    y = 25;
  }
  pdf.setDrawColor(220, 216, 205);
  pdf.line(20, y, 190, y);
  y += 12;
  const sum = (label, amount, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(bold ? 12 : 10);
    pdf.text(label, 100, y);
    pdf.text(amount, 190, y, { align: "right" });
    y += 8;
  };
  sum("Productos", currency(order.subtotal));
  sum("Descuento", currency(order.discount));
  sum(
    "Envio",
    order.shipping != null ? currency(order.shipping) : "Por cotizar",
  );
  sum("Total", currency(order.total + (order.shipping || 0)), true);
  y += 8;
  pdf.setFont("helvetica", "normal");
  text(
    "Entrega estimada: 2-10 dias desde la confirmacion del pago y destino.",
    20,
    170,
    9,
  );
  text("Gracias por elegir NOBRALTA.", 20, 170, 9);
  text(
    "Resumen de pedido. No sustituye una boleta o factura electronica.",
    20,
    170,
    8,
  );
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(105, 103, 96);
    pdf.text("NOBRALTA / " + order.id, 20, 286);
    pdf.text(i + " / " + pages, 190, 286, { align: "right" });
  }
  pdf.save("NOBRALTA-" + order.id + ".pdf");
}
