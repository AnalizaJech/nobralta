export const additionalTones = {
  Crema: "#e9d6ad",
  Marrón: "#513326",
  Celeste: "#a8d6eb",
  "Gris claro": "#bfc1c1",
  Blanco: "#f5f4ef",
  Camello: "#b88b58",
  Rojo: "#b71923",
  "Azul acero": "#177f9f",
  "Gris oscuro": "#484848",
  Beige: "#d9b58a",
  "Azul eléctrico": "#0963c6",
  Guinda: "#59152a",
  Verde: "#3c4324",
  "Palo rosa": "#cf817e",
  Cemento: "#9fbeae",
};
const files = [
  "crema",
  "marron",
  "celeste",
  "gris-claro",
  "blanco",
  "camello",
  "rojo",
  "azul-acero",
  "gris-oscuro",
  "beige",
  "azul-electrico",
  "guinda",
  "verde",
  "palo-rosa",
  "cemento",
];
export const additionalPolos = Object.keys(additionalTones).map((color, i) => ({
  color,
  image: "/assets/polo-" + files[i] + ".webp",
}));
export const newJackets = [
  {
    id: "archivo",
    name: "Racer Archivo",
    category: "Chaquetas",
    price: 289,
    sizes: ["S", "M", "L", "XL"],
    variants: [{ color: "Negro", image: "/assets/racer-archivo.webp" }],
    description:
      "Cuello de broche, un bolsillo de pecho y cuero de aspecto vivido. La pieza que funciona con tu polo y un denim recto.",
    stage: "De archivo",
  },
  {
    id: "camisero",
    name: "Cuero Club",
    category: "Chaquetas",
    price: 289,
    sizes: ["S", "M", "L", "XL"],
    variants: [{ color: "Negro", image: "/assets/cuero-camisero.webp" }],
    description:
      "Cuello camisero y frente limpio. Una chaqueta de corte recto para pasar del día a la noche.",
    stage: "De archivo",
  },
  {
    id: "abrigo-cuero",
    name: "Abrigo Distrito",
    category: "Gabardinas",
    price: 349,
    sizes: ["S", "M", "L", "XL"],
    variants: [{ color: "Negro", image: "/assets/abrigo-cuero-negro.webp" }],
    description:
      "Largo a la rodilla, botones frontales y bolsillos amplios. Una capa de cuero con presencia y caída natural.",
    stage: "Nueva pieza",
  },
];
export function updateCollection(product) {
  if (product.id === "pima") {
    const variants = product.variants.filter((v) => v.color !== "Marfil");
    for (const v of additionalPolos) {
      const i = variants.findIndex((x) => x.color === v.color);
      if (i >= 0) variants[i] = v;
      else variants.push(v);
    }
    return { ...product, variants };
  }
  if (product.id === "cuero")
    return {
      ...product,
      variants: product.variants.map((v) => ({
        ...v,
        image:
          v.color === "Negro"
            ? "/assets/biker-real-negro.webp"
            : v.color === "Café"
              ? "/assets/biker-real-cafe.webp"
              : v.image,
      })),
    };
  if (product.id === "harness")
    return {
      ...product,
      description:
        "Caña al tobillo, punta alargada cuadrada y tacón bajo. Elástico lateral, correa y herrajes para un perfil definido.",
      variants: product.variants.map((v) =>
        v.color === "Negro"
          ? { ...v, image: "/assets/harness-tobillo.webp" }
          : v,
      ),
    };
  return product;
}
