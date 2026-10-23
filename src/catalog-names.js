export const catalogNames = {
  pima: {
    name: "Polo Pima de cuello redondo",
    searchTerms: "Pima esencial camiseta remera t-shirt crew neck slim fit",
  },
  archivo: {
    name: "Chaqueta de cuero café racer",
    searchTerms: "Racer Archivo casaca cafe racer single chest pocket",
  },
  racer: {
    name: "Chaqueta café racer de doble bolsillo",
    searchTerms:
      "Racer Medianoche chaqueta cuero casaca doble bolsillo cafe racer",
  },
  cuero: {
    name: "Chaqueta biker de cuero",
    searchTerms:
      "Chaqueta de carácter casaca motociclista cierre asimétrico biker motorcycle jacket",
  },
  heritage: {
    name: "Chaqueta de cuero con bolsillos de solapa",
    searchTerms:
      "Cuero Heritage casaca cognac chaqueta cuello camisero bolsillos frontales",
  },
  camisero: {
    name: "Chaqueta de cuero de cuello camisero",
    searchTerms: "Cuero Club casaca leather shirt collar jacket",
  },
  "abrigo-cuero": {
    name: "Abrigo de cuero con solapas",
    searchTerms: "Abrigo Distrito leather coat botones abrigo largo",
  },
  denim: {
    name: "Jean bootcut de tiro medio",
    searchTerms: "Denim Route 01 vaquero jeans bootcut bota sutil",
  },
  cafarena: {
    name: "Cafarena de cuello alto",
    searchTerms: "Cafarena nocturna cuello tortuga turtleneck cuello cisne",
  },
  camisa: {
    name: "Camisa de manga larga",
    searchTerms: "Camisa de autor long sleeve shirt cuello clásico",
  },
  harness: {
    name: "Botín Chelsea con arnés y punta cuadrada",
    searchTerms: "Bota harness botines chelsea boots arnes harness square toe",
  },
  pantalon: {
    name: "Pantalón de vestir recto",
    searchTerms: "Pantalón de línea pantalon sastrería straight leg trousers",
  },
  blazer: {
    name: "Blazer de dos botones",
    searchTerms: "Blazer de noche saco blazer single breasted two button",
  },
  gabardina: {
    name: "Gabardina cruzada con cinturón",
    searchTerms: "Gabardina de ciudad trench coat doble botonadura",
  },
};
export function nameProduct(product) {
  return catalogNames[product.id]
    ? { ...product, ...catalogNames[product.id] }
    : product;
}
