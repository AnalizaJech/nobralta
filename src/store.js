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
export const demoPaymentMethods = [
  {
    id: "demo-yape",
    name: "Yape",
    owner: "NOBRALTA",
    account: "900 000 000",
    qr: "",
    active: true,
  },
  {
    id: "demo-bcp",
    name: "BCP · Transferencia",
    owner: "NOBRALTA",
    account: "191-0000000-0-00",
    active: true,
  },
  {
    id: "demo-plin",
    name: "Plin",
    owner: "NOBRALTA",
    account: "900 000 000",
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
  paymentMethods: demoPaymentMethods,
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
  const { buildReceipt } = await import("./receipt");
  const pdf = await buildReceipt(order);
  pdf.save("NOBRALTA-" + order.id + ".pdf");
}
