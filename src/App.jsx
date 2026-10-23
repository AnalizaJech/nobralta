import { DiscountNotice } from "./Payments";
import { nameProduct } from "./catalog-names";
import { ProductCard } from "./ProductCard";
import { Navigation } from "./Navigation";
import { additionalTones, newJackets, updateCollection } from "./collection-v4";
import { SocialLinks, PackArtwork, packUnits } from "./Merchandising";
import {
  SearchExperience,
  AccountDashboard,
  PackItem,
  recommendations,
} from "./Experiences";
import { JobsPage, initialJobs } from "./Jobs";
import { Select } from "./Select";
import { AssetImage, assetUrl } from "./AssetImage";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Trash,
  ArrowRight,
  ArrowUpRight,
  Handbag,
  List,
  MagnifyingGlass,
  Minus,
  Plus,
  Ruler,
  X,
  SlidersHorizontal,
  Check,
  Equals,
  UserCircle,
  Gear,
  SignOut,
  DownloadSimple,
} from "@phosphor-icons/react";
import {
  useSaved,
  sku,
  bootstrapUsers,
  agencies as seedAgencies,
  initialPromos,
  initialAffiliates,
  defaultSettings,
  demoPaymentMethods,
  isActive,
  now,
  currency,
} from "./store";
import { Auth, Profile, DeliveryForm, OrderDetail } from "./Customer";
import { Admin } from "./Admin";
const tones = {
  Negro: "#252522",
  Marfil: "#e4dfd1",
  Vino: "#692438",
  Índigo: "#293d57",
  Café: "#64402c",
  Arena: "#b5a38c",
  Carbón: "#44413d",
};
Object.assign(tones, additionalTones);
const variant = (color, file) => ({
  color,
  image: "/assets/" + file + ".webp",
});
const apparel = ["S", "M", "L", "XL"];
const initialProducts = [
  {
    id: "pima",
    name: "Pima esencial",
    category: "Polos",
    price: 59,
    sizes: apparel,
    variants: [
      variant("Negro", "polo-negro"),
      variant("Marfil", "polo-marfil"),
      variant("Vino", "polo-vino"),
    ],
    description:
      "Cuello redondo, corte slim y una línea limpia. El punto de partida para vestir con intención.",
    stage: "Esencial",
  },
  {
    id: "cuero",
    name: "Chaqueta de carácter",
    category: "Chaquetas",
    price: 289,
    sizes: apparel,
    variants: [
      variant("Negro", "chaqueta-negra"),
      variant("Café", "chaqueta-cafe"),
    ],
    description:
      "Solapas definidas, silueta corta y herrajes discretos. La pieza que cambia el conjunto.",
    stage: "Nueva silueta",
  },
  {
    id: "denim",
    name: "Denim Route 01",
    category: "Jeans",
    price: 109,
    sizes: ["28", "30", "32", "34"],
    variants: [
      variant("Índigo", "denim-route-indigo"),
      variant("Carbón", "denim-route-carbon"),
    ],
    description:
      "Tiro medio, muslo recto y apertura sutil sobre la bota. Denim masculino de inspiración vintage.",
    stage: "Nueva silueta",
  },
  {
    id: "cafarena",
    name: "Cafarena nocturna",
    category: "Cafarenas",
    price: 89,
    sizes: apparel,
    variants: [variant("Negro", "cafarena-negra")],
    description:
      "Cuello alto y silueta precisa. Una capa sobria para llevar sola o bajo una chaqueta.",
    stage: "Nueva silueta",
  },
  {
    id: "camisa",
    name: "Camisa de autor",
    category: "Camisas",
    price: 99,
    originalPrice: 119,
    sizes: apparel,
    variants: [variant("Marfil", "camisa-marfil")],
    description:
      "Caída relajada y detalles contenidos. Abierta sobre un polo o como pieza principal.",
    stage: "Nueva silueta",
  },
  {
    id: "harness",
    name: "Bota harness",
    category: "Botas",
    price: 169,
    sizes: ["38", "39", "40", "41", "42"],
    variants: [variant("Negro", "bota-harness")],
    description:
      "Perfil firme y arnés metálico. La base de una silueta con carácter.",
    stage: "Nueva silueta",
  },
  {
    id: "pantalon",
    name: "Pantalón de línea",
    category: "Pantalones de vestir",
    price: 129,
    sizes: ["28", "30", "32", "34"],
    variants: [variant("Negro", "pantalon-negro")],
    description:
      "Corte recto, raya frontal y bolsillos laterales. Una base versátil para conjuntos de sastrería.",
    stage: "Sastrería",
  },
  {
    id: "blazer",
    name: "Blazer de noche",
    category: "Blazers",
    price: 249,
    sizes: apparel,
    variants: [variant("Negro", "blazer-negro")],
    description:
      "Hombros definidos y solapa precisa. Una silueta que acompaña tanto al denim como al pantalón de vestir.",
    stage: "Sastrería",
  },
  {
    id: "gabardina",
    name: "Gabardina de ciudad",
    category: "Gabardinas",
    price: 279,
    sizes: apparel,
    variants: [variant("Arena", "gabardina-arena")],
    description:
      "Línea larga y cintura ajustable. Una capa ligera de carácter para llevar sobre tu conjunto.",
    stage: "Nueva silueta",
  },
];
initialProducts.push({
  id: "racer",
  name: "Racer Medianoche",
  category: "Chaquetas",
  price: 299,
  sizes: apparel,
  variants: [variant("Negro", "racer-medianoche")],
  description:
    "Cuello de banda, cierre frontal y bolsillos de pecho. Cuero de aspecto envejecido, una silueta de los años 2000 para llevar sobre tu polo.",
  stage: "Nueva silueta",
});
initialProducts.push({
  id: "heritage",
  name: "Cuero Heritage",
  category: "Chaquetas",
  price: 289,
  sizes: apparel,
  variants: [variant("Café", "cuero-heritage")],
  description:
    "Cuello camisero, bolsillos de tapa y cierre frontal. Una silueta recta de cuero cognac con espíritu de archivo.",
  stage: "Archivo 02",
});
initialProducts.push(...newJackets);
initialProducts.forEach((p, i) => {
  initialProducts[i] = updateCollection(p);
});
const categories = [
  "Todas",
  ...new Set(initialProducts.map((p) => p.category)),
];
const money = (n) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(n);
const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const policy =
  "No ofrecemos cambios por talla, color o preferencia ni devoluciones voluntarias. Esto no limita tus derechos ante defectos o incumplimiento del pedido.";
function Quantity({ value, onChange }) {
  return (
    <div className="quantity" role="group" aria-label="Cantidad">
      <button
        aria-label="Reducir cantidad"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={16} />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        aria-label="Aumentar cantidad"
        disabled={value >= 10}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
function Swatches({ variants, value, onChange, label, compact = false }) {
  const [expanded, setExpanded] = useState(false);
  const visible = compact && !expanded ? variants.slice(0, 4) : variants;
  return (
    <div className="swatches" role="group" aria-label={label}>
      {visible.map((a, i) => (
        <button
          key={a.color}
          style={{ "--swatch": tones[a.color] }}
          className={value === i ? "selected" : ""}
          aria-label={a.color}
          aria-pressed={value === i}
          title={a.color}
          onClick={() => onChange(i)}
        >
          <span />
        </button>
      ))}
      {compact && variants.length > 4 && (
        <button
          className="more-colors"
          aria-label={
            expanded
              ? "Mostrar menos colores"
              : "Ver los " + variants.length + " colores"
          }
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "−" : "+" + (variants.length - 4)}
        </button>
      )}
    </div>
  );
}
export function App() {
  const [jobs, setJobs] = useSaved("jobs.v1", initialJobs),
    [applications, setApplications] = useSaved("applications.v1", []);
  const [products, setProducts] = useSaved("catalog.v2", initialProducts),
    [inventory, setInventory] = useSaved(
      "inventory.v2",
      Object.fromEntries(
        initialProducts.flatMap((p) =>
          p.variants.flatMap((v) =>
            p.sizes.map((z) => [
              sku(p.id, v.color, z),
              p.id === "cafarena" ? 0 : p.id === "cuero" ? 2 : 8,
            ]),
          ),
        ),
      ),
    ),
    [users, setUsers] = useSaved("users.v2", []),
    [session, setSession] = useSaved("session.v2", null),
    [orders, setOrders] = useSaved("orders.v2", []),
    [promos, setPromos] = useSaved("promos.v2", initialPromos),
    [affiliates, setAffiliates] = useSaved("affiliates.v2", initialAffiliates),
    [agencies, setAgencies] = useSaved("agencies.v2", seedAgencies),
    [settings, setSettings] = useSaved("settings.v2", defaultSettings),
    [staff, setStaff] = useSaved("staff.v2", []),
    [audit, setAudit] = useSaved("audit.v2", []),
    [admin, setAdmin] = useState(false),
    [code, setCode] = useState(""),
    [applied, setApplied] = useState(null),
    [codeMessage, setCodeMessage] = useState(""),
    [selectedOrder, setSelectedOrder] = useState(null),
    [pack, setPack] = useState(null),
    [storageError, setStorageError] = useState(""),
    [cartNotice, setCartNotice] = useState("");
  const user = users.find((u) => u.id === session),
    myOrders = orders.filter((o) => o.userId === session && session);
  const activePromos = promos.filter(isActive);
  useEffect(() => {
    if (!users.length) bootstrapUsers().then(setUsers);
    if (!localStorage.getItem("nobralta.collection-r4")) {
      setProducts((a) => a.map(updateCollection));
      setInventory((a) => {
        const next = { ...a };
        initialProducts.forEach((p) =>
          p.variants.forEach((v) =>
            p.sizes.forEach((z) => {
              const k = sku(p.id, v.color, z);
              if (next[k] == null) next[k] = p.id === "cafarena" ? 0 : 8;
            }),
          ),
        );
        return next;
      });
      localStorage.setItem("nobralta.collection-r4", "1");
    }

    if (!localStorage.getItem("nobralta.merch-r3")) {
      setProducts((items) =>
        items.map((p) =>
          p.id === "denim"
            ? {
                ...p,
                name: p.name === "Denim bootcut" ? "Denim Route 01" : p.name,
                description: initialProducts.find((v) => v.id === "denim")
                  .description,
                variants: initialProducts.find((v) => v.id === "denim")
                  .variants,
              }
            : p,
        ),
      );
      setInventory((items) => {
        const next = { ...items };
        initialProducts.forEach((p) =>
          p.variants.forEach((v) =>
            p.sizes.forEach((z) => {
              const k = sku(p.id, v.color, z);
              if (next[k] == null) next[k] = p.id === "cafarena" ? 0 : 8;
            }),
          ),
        );
        return next;
      });
      setPromos((items) => [
        ...items.map((p) =>
          p.id === "duo"
            ? {
                ...p,
                title: "Tres tonos. Un mismo pulso.",
                subtitle:
                  "Negro, marfil y vino. Tres polos Pima que combinan con tu semana.",
                qty: 3,
                price: 149,
              }
            : p,
        ),
        ...(!items.some((p) => p.id === "racer-pack")
          ? [
              {
                id: "racer-pack",
                type: "pack",
                title: "Después del anochecer.",
                subtitle:
                  "Polo Pima + Racer Medianoche. Dos capas, una misma actitud.",
                productId: "pima",
                secondaryProductId: "racer",
                qty: 2,
                price: 329,
                active: true,
                start: "2026-01-01",
                end: "2027-12-31",
              },
            ]
          : []),
      ]);
      localStorage.setItem("nobralta.merch-r3", "1");
    }

    if (!localStorage.getItem("nobralta.looks-r4")) {
      setPromos((items) =>
        items.map((p) =>
          p.id === "racer-pack"
            ? {
                ...p,
                title: "El look de medianoche.",
                subtitle:
                  "Polo marfil, chaqueta negra y denim índigo. Tres piezas que ya combinan.",
                qty: 3,
                productIds: ["pima", "racer", "denim"],
                colors: ["Marfil", "Negro", "Índigo"],
                secondaryProductId: "",
                price: 429,
              }
            : p.id === "duo" &&
                [
                  "Tres tonos. Un mismo pulso.",
                  "Dos esenciales. Un mismo carácter.",
                ].includes(p.title)
              ? {
                  ...p,
                  title: "Tus tres de confianza.",
                  subtitle:
                    "Negro, marfil y vino. Un pack para resolver tu semana.",
                }
              : p,
        ),
      );
      localStorage.setItem("nobralta.looks-r4", "1");
    }
    if (!localStorage.getItem("nobralta.packs-r6")) {
      setProducts((items) =>
        items.map((p) =>
          p.id === "pima"
            ? { ...p, variants: p.variants.filter((v) => v.color !== "Marfil") }
            : p,
        ),
      );
      setPromos((items) => [
        ...items.map((p) =>
          p.id === "racer-pack"
            ? {
                ...p,
                subtitle:
                  "Polo blanco, chaqueta negra y denim carbón. Tres piezas para salir con carácter.",
                colors: ["Blanco", "Negro", "Carbón"],
              }
            : p.id === "duo"
              ? {
                  ...p,
                  subtitle:
                    "Negro, blanco y vino. Tus básicos para resolver la semana.",
                  colors: ["Negro", "Blanco", "Vino"],
                }
              : p,
        ),
        ...[
          {
            id: "indigo-pack",
            title: "Tu combinación de siempre.",
            subtitle:
              "Polo blanco y denim índigo. Dos esenciales que funcionan juntos.",
            productIds: ["pima", "denim"],
            colors: ["Blanco", "Índigo"],
            price: 159,
          },
          {
            id: "leather-pack",
            title: "El cuero lleva la voz.",
            subtitle:
              "Biker negra, polo blanco y denim carbón. Un conjunto con presencia propia.",
            productIds: ["cuero", "pima", "denim"],
            colors: ["Negro", "Blanco", "Carbón"],
            price: 439,
          },
        ]
          .filter((p) => !items.some((x) => x.id === p.id))
          .map((p) => ({
            ...p,
            type: "pack",
            productId: p.productIds[0],
            qty: p.productIds.length,
            active: true,
            start: "2026-01-01",
            end: "2027-12-31",
          })),
      ]);
      localStorage.setItem("nobralta.packs-r6", "1");
    }
    if (!localStorage.getItem("nobralta.leather-pair-r9")) {
      setPromos((items) =>
        items.map((p) =>
          p.id === "leather-pack"
            ? {
                ...p,
                title: "Cuero de pies a cabeza.",
                subtitle:
                  "Biker negra y botas harness. Dos piezas con el mismo carácter.",
                productIds: ["cuero", "harness"],
                colors: ["Negro", "Negro"],
                qty: 2,
                price: 429,
              }
            : p,
        ),
      );
      localStorage.setItem("nobralta.leather-pair-r9", "1");
    }
    if (!localStorage.getItem("nobralta.harness-tobillo-r5")) {
      setProducts((items) =>
        items.map((p) => (p.id === "harness" ? updateCollection(p) : p)),
      );
      localStorage.setItem("nobralta.harness-tobillo-r5", "1");
    }
    if (!localStorage.getItem("nobralta.shalom-leather-r14")) {
      setAgencies(seedAgencies);
      setProducts((items) => items.map(updateCollection));
      setPromos((items) =>
        items.map((p) =>
          p.id === "racer-pack"
            ? { ...p, price: 599 }
            : p.id === "leather-pack"
              ? { ...p, price: 579 }
              : p,
        ),
      );
      setBag((items) => {
        const assigned = {};
        return items.map((p) => {
          const image =
            p.id === "archivo" ? "/assets/racer-archivo-v2.webp" : p.image;
          if (!["racer-pack", "leather-pack"].includes(p.packId))
            return {
              ...p,
              image,
              price: [
                "cuero",
                "archivo",
                "racer",
                "heritage",
                "camisero",
                "abrigo-cuero",
              ].includes(p.id)
                ? initialProducts.find((x) => x.id === p.id).price
                : p.price,
            };
          const key = p.bundleId || p.packId,
            group = items.filter((x) => (x.bundleId || x.packId) === key),
            target = p.packId === "racer-pack" ? 599 : 579;
          const regular = group.reduce(
            (n, x) =>
              n +
              (initialProducts.find((y) => y.id === x.id)?.price || x.price),
            0,
          );
          const isLast = group[group.length - 1] === p;
          const price = isLast
            ? Math.round((target - (assigned[key] || 0)) * 100) / 100
            : Math.round(
                ((target *
                  (initialProducts.find((x) => x.id === p.id)?.price ||
                    p.price)) /
                  regular) *
                  100,
              ) / 100;
          assigned[key] = (assigned[key] || 0) + price;
          return { ...p, image, price };
        });
      });
      localStorage.setItem("nobralta.shalom-leather-r14", "1");
    }
    if (!localStorage.getItem("nobralta.catalog-names-r15")) {
      setProducts((items) => items.map(nameProduct));
      setBag((items) => items.map(nameProduct));
      localStorage.setItem("nobralta.catalog-names-r15", "1");
    }
    if (!localStorage.getItem("nobralta.demo-payments-r26")) {
      setSettings((s) => {
        const existing =
          s.paymentMethods ||
          (s.paymentActive && s.paymentAccount
            ? [
                {
                  id: "legacy",
                  name: s.paymentName,
                  owner: s.paymentOwner,
                  account: s.paymentAccount,
                  active: true,
                },
              ]
            : []);
        return {
          ...s,
          paymentMethods: [
            ...existing,
            ...demoPaymentMethods.filter(
              (d) => !existing.some((m) => m.id === d.id),
            ),
          ],
        };
      });
      localStorage.setItem("nobralta.demo-payments-r26", "1");
    }
    if (!localStorage.getItem("nobralta.payment-labels-r28")) {
      setSettings((s) => ({
        ...s,
        paymentMethods: (s.paymentMethods || demoPaymentMethods).map(
          ({ demo, ...m }) => ({
            ...m,
            name: m.name.replace(/ · Prueba/g, ""),
            owner: m.owner?.replace(/ · Cuenta de prueba/g, ""),
            qr: m.qr === "/assets/yape-demo-qr.png" ? "" : m.qr,
          }),
        ),
      }));
      localStorage.setItem("nobralta.payment-labels-r28", "1");
    }
    if (!localStorage.getItem("nobralta.shalom-full-r21")) {
      setAgencies((items) => [
        ...seedAgencies.map((a) => ({
          ...a,
          active:
            a.receives && (items.find((x) => x.id === a.id)?.active ?? true),
        })),
        ...items.filter(
          (a) =>
            !a.officialId &&
            ![
              "canete-sv",
              "canete-im",
              "lima-brena",
              "ica-jj",
              "cusco-pi",
              "trujillo-lp",
            ].includes(a.id),
        ),
      ]);
      localStorage.setItem("nobralta.shalom-full-r21", "1");
    }
    const missing = initialProducts.filter(
      (p) => !products.some((a) => a.id === p.id),
    );
    if (missing.length) {
      setProducts((a) => [
        ...a,
        ...missing.filter((p) => !a.some((z) => z.id === p.id)),
      ]);
      setInventory((a) => {
        const b = { ...a };
        missing.forEach((p) =>
          p.variants.forEach((v) =>
            p.sizes.forEach((z) => {
              const key = sku(p.id, v.color, z);
              if (b[key] == null) b[key] = 4;
            }),
          ),
        );
        return b;
      });
    }
  }, []);
  useEffect(() => {
    const f = () =>
      setStorageError(
        "No se pudieron guardar los cambios. Libera espacio en el navegador y vuelve a intentarlo.",
      );
    window.addEventListener("storage-full", f);
    return () => window.removeEventListener("storage-full", f);
  }, []);
  function log(action, detail) {
    setAudit((a) => [{ at: now(), action, detail }, ...a].slice(0, 100));
  }

  const [menu, setMenu] = useState(false),
    [search, setSearch] = useState(false),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("Todas"),
    [color, setColor] = useState(""),
    [filterSize, setFilterSize] = useState(""),
    [sort, setSort] = useState("editorial"),
    [filters, setFilters] = useState(false),
    [availability, setAvailability] = useState("all"),
    [screen, setScreenState] = useState(null),
    [product, setProduct] = useState(products[0]),
    [selectedVariant, setSelectedVariant] = useState(0),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(1),
    [error, setError] = useState(""),
    [bag, setBag] = useSaved("bag.v2", []),
    [checkout, setCheckout] = useState(false),
    [info, setInfo] = useState(""),
    [measures, setMeasures] = useState(false);
  const dialog = useRef(null),
    header = useRef(null);
  const count = bag.reduce((n, p) => n + p.qty, 0),
    total = bag.reduce((n, p) => n + p.price * p.qty, 0);
  const discountTotal =
    Math.round(
      bag.filter((p) => !p.packId).reduce((n, p) => n + p.price * p.qty, 0) *
        (applied?.percent || 0),
    ) / 100;
  useEffect(() => {
    if (screen === "checkout") setCartNotice("");
  }, [screen]);
  const returnScroll = useRef(0),
    returnFocus = useRef(null),
    previousScreen = useRef(null);
  function setScreen(next) {
    if (next && !screen) {
      returnScroll.current = window.scrollY;
      returnFocus.current = document.activeElement;
    }
    setScreenState(next);
  }
  const adminOverlayPosition = useRef(0),
    adminOverlayFocus = useRef(null),
    wasAdminOverlay = useRef(false),
    capturedAdminPosition = useRef(false);
  function openAdminOverlay(next) {
    if (!screen && !search) {
      if (!capturedAdminPosition.current)
        adminOverlayPosition.current = window.scrollY;
      capturedAdminPosition.current = false;
      adminOverlayFocus.current = document.activeElement;
    }
    setMenu(false);
    if (next === "search") {
      setScreen(null);
      setSearch(true);
    } else {
      setScreen(next);
      setSearch(false);
      if (next === "bag") setCheckout(false);
    }
  }
  useLayoutEffect(() => {
    if (admin && (screen || search || menu)) wasAdminOverlay.current = true;
    else if (admin && wasAdminOverlay.current) {
      window.scrollTo({
        top: adminOverlayPosition.current,
        behavior: "instant",
      });
      adminOverlayFocus.current?.focus({ preventScroll: true });
      wasAdminOverlay.current = false;
    } else if (!admin) wasAdminOverlay.current = false;
  }, [admin, screen, search, menu]);
  useLayoutEffect(() => {
    if (screen) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setMenu(false);
      setSearch(false);
    } else if (previousScreen.current) {
      window.scrollTo({
        top: admin ? adminOverlayPosition.current : returnScroll.current,
        behavior: "instant",
      });
      if (returnFocus.current?.isConnected)
        returnFocus.current.focus({ preventScroll: true });
    }
    previousScreen.current = screen;
  }, [screen]);
  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, search]);
  useEffect(() => {
    function dismiss(e) {
      if (
        e.key === "Escape" ||
        (e.type === "pointerdown" && !header.current?.contains(e.target))
      ) {
        setMenu(false);
        setSearch(false);
      }
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, []);
  function browse(cat = "Todas") {
    setCategory(cat);
    setMenu(false);
    setScreen(null);
    setCheckout(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.getElementById("catalogo").scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        }),
      ),
    );
  }
  function openProduct(p, i = 0) {
    setProduct(p);
    setSelectedVariant(i);
    setSize("");
    setQuantity(1);
    setError("");
    setMeasures(false);
    setMenu(false);
    setSearch(false);
    setScreen("product");
  }
  function add(buy = false) {
    if (!size) {
      setError("Elige tu talla antes de continuar.");
      document.querySelector(".sizes button:not(:disabled)")?.focus();
      return;
    }
    const a = product.variants[selectedVariant];
    const stock = inventory[sku(product.id, a.color, size)] ?? 0;
    const inBag = bag
      .filter(
        (b) => b.id === product.id && b.color === a.color && b.size === size,
      )
      .reduce((n, b) => n + b.qty, 0);
    if (stock < quantity + inBag) {
      setError(
        "Quedan " +
          stock +
          " unidades de esta variante. Revisa también tu bolsa.",
      );
      return;
    }
    const key = [product.id, a.color, size].join("-");
    setBag((b) =>
      b.some((p) => p.key === key)
        ? b.map((p) =>
            p.key === key ? { ...p, qty: Math.min(10, p.qty + quantity) } : p,
          )
        : [...b, { ...product, ...a, key, size, qty: quantity }],
    );
    setCheckout(buy);
    setScreen(buy ? (user ? "checkout" : "account") : "bag");
  }
  function quickAdd(p, v, z) {
    const count = bag
      .filter((b) => b.id === p.id && b.color === v.color && b.size === z)
      .reduce((n, b) => n + b.qty, 0);
    const stock = inventory[sku(p.id, v.color, z)] ?? 0;
    if (count >= stock) return "No quedan más unidades de esta talla.";
    if (count >= 10) return "Puedes añadir hasta 10 unidades de esta variante.";
    const key = [p.id, v.color, z].join("-");
    setBag((b) =>
      b.some((a) => a.key === key)
        ? b.map((a) => (a.key === key ? { ...a, qty: a.qty + 1 } : a))
        : [...b, { ...p, ...v, size: z, qty: 1, key }],
    );
    setCartNotice(p.name + " · " + v.color + " · " + z);
    return "";
  }
  useEffect(() => {
    if (!cartNotice) return;
    const timer = setTimeout(() => setCartNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [cartNotice]);
  function applyCode() {
    const value = code.trim().toUpperCase();
    const affiliate = affiliates.find(
      (a) => a.active && a.code.toUpperCase() === value,
    );
    const promo = activePromos.find(
      (p) => p.type === "code" && p.code?.toUpperCase() === value,
    );
    if (!affiliate && !promo) {
      setApplied(null);
      setCodeMessage("El código no existe o ya no está activo.");
      return;
    }
    setApplied({
      code: value,
      percent: affiliate?.discount ?? promo.discount,
      affiliateId: affiliate?.id,
      commission: affiliate?.commission || 0,
    });
    setCodeMessage(
      (bag.every((p) => p.packId)
        ? "El pack ya tiene precio especial. Código guardado para prendas individuales: "
        : "Código aplicado: ") +
        (affiliate?.discount ?? promo.discount) +
        "% en prendas individuales.",
    );
  }
  function createOrder(customer, agency, report) {
    if (!report?.file?.data) {
      setCodeMessage("Adjunta tu voucher para confirmar el pedido.");
      return;
    }
    if (
      applied &&
      !affiliates.some(
        (a) => a.active && a.code.toUpperCase() === applied.code,
      ) &&
      !activePromos.some(
        (p) => p.type === "code" && p.code?.toUpperCase() === applied.code,
      )
    ) {
      setApplied(null);
      setCodeMessage(
        "El código dejó de estar activo. Revisa el total y vuelve a confirmar.",
      );
      return;
    }

    const needed = {};
    bag.forEach((p) => {
      const key = sku(p.id, p.color, p.size);
      needed[key] = (needed[key] || 0) + p.qty;
    });
    if (Object.entries(needed).some(([k, n]) => n > (inventory[k] ?? 0))) {
      setCodeMessage(
        "Cambió la disponibilidad. Revisa las unidades de tu bolsa antes de continuar.",
      );
      return;
    }
    if (!agency) return;
    const subtotal = bag.reduce((n, p) => n + p.price * p.qty, 0),
      eligible = bag
        .filter((p) => !p.packId)
        .reduce((n, p) => n + p.price * p.qty, 0),
      discount = Math.round(eligible * (applied?.percent || 0)) / 100;
    const order = {
      id: "NB-" + Date.now().toString().slice(-8),
      created: now(),
      status: report ? "En revisión" : "Por pagar",
      report,
      userId: user.id,
      customer,
      agency,
      lines: bag,
      subtotal,
      discount,
      total: subtotal - discount,
      code: applied?.code || "",
      affiliateId: applied?.affiliateId,
      commissionAmount:
        Math.round((subtotal - discount) * (applied?.commission || 0)) / 100,
      history: [
        { at: now(), status: "Por pagar" },
        ...(report ? [{ at: now(), status: "En revisión" }] : []),
      ],
    };
    setOrders((a) => [order, ...a]);
    setInventory((a) => {
      const b = { ...a };
      Object.entries(needed).forEach(([k, n]) => (b[k] -= n));
      return b;
    });
    setBag([]);
    setApplied(null);
    setSelectedOrder(order.id);
    setScreen("order");
    log("Pedido creado", order.id);
  }
  function cancelOrder(id) {
    const order = orders.find((o) => o.id === id);
    if (!order || !["Por pagar", "Pago observado"].includes(order.status))
      return;
    setInventory((a) => {
      const b = { ...a };
      order.lines.forEach((p) => {
        const k = sku(p.id, p.color, p.size);
        b[k] = (b[k] || 0) + p.qty;
      });
      return b;
    });
    setOrders((a) =>
      a.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "Cancelado",
              history: [...o.history, { at: now(), status: "Cancelado" }],
            }
          : o,
      ),
    );
    log("Pedido cancelado", id);
  }
  function reportOrder(id, report) {
    setOrders((a) =>
      a.map((o) =>
        o.id === id && o.userId === session
          ? {
              ...o,
              status: "En revisión",
              report,
              history: [...o.history, { at: now(), status: "En revisión" }],
            }
          : o,
      ),
    );
    log("Reporte de pago", id);
  }
  function information(s) {
    if (s === "Mi pedido") {
      setScreen("account");
    } else {
      setInfo(s);
      setScreen("info");
    }
    setMenu(false);
  }
  const results = products
    .filter((p) => {
      if (category !== "Todas" && p.category !== category) return false;
      const variants = p.variants.filter((v) => !color || v.color === color),
        sizes = p.sizes
          .map(String)
          .filter((z) => !filterSize || z === String(filterSize));
      if (!variants.length || !sizes.length) return false;
      const stocked = variants.some((v) =>
        sizes.some((z) => (inventory[sku(p.id, v.color, z)] ?? 0) > 0),
      );
      if (availability === "sold" && stocked) return false;
      if (
        (availability === "available" || filterSize) &&
        availability !== "sold" &&
        !stocked
      )
        return false;
      return !query || recommendations([p], query).length > 0;
    })
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : [
              "pima",
              "archivo",
              "racer",
              "denim",
              "heritage",
              "cuero",
              "camisero",
              "camisa",
              "abrigo-cuero",
              "cafarena",
              "harness",
              "pantalon",
              "blazer",
              "gabardina",
            ].indexOf(a.id) -
            [
              "pima",
              "archivo",
              "racer",
              "denim",
              "heritage",
              "cuero",
              "camisero",
              "camisa",
              "abrigo-cuero",
              "cafarena",
              "harness",
              "pantalon",
              "blazer",
              "gabardina",
            ].indexOf(b.id),
    );
  const adminView =
    admin && user?.role === "admin" ? (
      <Admin
        user={user}
        users={users}
        setUsers={setUsers}
        orders={orders}
        setOrders={setOrders}
        catalog={products}
        setCatalog={setProducts}
        promos={promos}
        setPromos={setPromos}
        affiliates={affiliates}
        setAffiliates={setAffiliates}
        agencies={agencies}
        setAgencies={setAgencies}
        settings={settings}
        setSettings={setSettings}
        inventory={inventory}
        setInventory={setInventory}
        staff={staff}
        setStaff={setStaff}
        audit={audit}
        log={log}
        onExit={() => {
          setAdmin(false);
          setScreen(null);
        }}
        onBeforeOverlay={() => {
          adminOverlayPosition.current = window.scrollY;
          capturedAdminPosition.current = true;
        }}
        onAccount={() => openAdminOverlay("account")}
        onSearch={() => openAdminOverlay("search")}
        onBag={() => openAdminOverlay("bag")}
        bagCount={count}
        onLogout={() => {
          setSession(null);
          setAdmin(false);
        }}
        onCancel={cancelOrder}
        jobs={jobs}
        setJobs={setJobs}
        applications={applications}
        setApplications={setApplications}
      />
    ) : null;
  return (
    <>
      {adminView && <div hidden={!!screen || search || menu}>{adminView}</div>}
      <div
        className="storefront-surface"
        hidden={!!adminView && !screen && !search && !menu}
      >
        <a className="skip-link" href="#contenido">
          Ir al contenido
        </a>
        <header className="header" ref={header}>
          <div className="header-main">
            <button
              className="nav-control"
              aria-label={
                menu
                  ? "Cerrar menú"
                  : search
                    ? "Cerrar búsqueda"
                    : screen
                      ? "Volver a tienda"
                      : "Abrir menú"
              }
              aria-expanded={menu}
              aria-controls="navigation"
              onClick={() => {
                if (menu || search || screen) {
                  setMenu(false);
                  setSearch(false);
                  setScreen(null);
                } else setMenu(true);
              }}
            >
              {menu || search || screen ? (
                <X size={22} />
              ) : (
                <img
                  className="menu-glyph"
                  src={assetUrl("/icons/menu-two.svg")}
                  alt=""
                  width="25"
                  height="25"
                />
              )}
            </button>
            <a
              className="brand-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setAdmin(false);
                setScreen(null);
                setQuery("");
                setColor("");
                setCategory("Todas");
                setFilterSize("");
                setAvailability("all");
                setMenu(false);
                setSearch(false);
                returnScroll.current = 0;
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="NOBRALTA, inicio"
            >
              <AssetImage
                className="wordmark"
                src="/assets/brand-wordmark.svg"
                alt="NOBRALTA"
              />
            </a>
            <div className="header-actions">
              <button
                className="nav-control"
                aria-label="Mi cuenta"
                onClick={() => setScreen("account")}
              >
                <UserCircle size={23} />
              </button>
              <button
                className="nav-control search-toggle"
                aria-label="Buscar prendas"
                aria-expanded={search}
                onClick={() => {
                  setSearch(!search);
                  setMenu(false);
                }}
              >
                <MagnifyingGlass size={22} />
              </button>
              <button
                className="nav-control"
                aria-label={`Abrir bolsa, ${count} prendas`}
                onClick={() => {
                  setScreen("bag");
                  setCheckout(false);
                  setMenu(false);
                  setSearch(false);
                }}
              >
                <Handbag size={23} />
                {count > 0 && <span className="bag-count">{count}</span>}
              </button>
            </div>
          </div>
          {menu && (
            <Navigation
              products={products}
              onCategory={(c) => {
                setQuery("");
                setColor("");
                setFilterSize("");
                setAvailability("all");
                browse(c);
              }}
              onAccount={() => setScreen("account")}
              onOrder={() => information("Mi pedido")}
              onHelp={() => information("Ayuda")}
              onJobs={() => setScreen("jobs")}
              onPacks={() => {
                setMenu(false);
                setSearch(false);
                setScreen(null);
                requestAnimationFrame(() =>
                  requestAnimationFrame(() =>
                    document
                      .getElementById("promociones")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  ),
                );
              }}
            />
          )}
          {search && (
            <SearchExperience
              products={products}
              query={query}
              setQuery={setQuery}
              onProduct={(p, i) => {
                setCategory("Todas");
                setFilterSize("");
                setAvailability("all");
                const tone = Object.keys(tones).find(
                  (t) =>
                    query.trim().length > 1 && norm(query).includes(norm(t)),
                );
                setColor(tone || "");
                openProduct(p, i);
              }}
              onCategory={(c) => {
                const tone = Object.keys(tones).find(
                  (t) =>
                    query.trim().length > 1 && norm(query).includes(norm(t)),
                );
                setColor(tone || "");
                setQuery("");
                setSearch(false);
                browse(c);
              }}
              onClose={() => setSearch(false)}
            />
          )}
        </header>
        {storageError && (
          <p className="storage-error" role="alert">
            {storageError}
          </p>
        )}
        {cartNotice && (
          <div className="cart-feedback" role="status">
            <Check size={20} />
            <span>
              Añadido al carrito<small>{cartNotice}</small>
            </span>
            <button
              className="button button-dark"
              onClick={() => {
                setScreen("bag");
                setCartNotice("");
              }}
            >
              Ver carrito
              <ArrowRight size={17} />
            </button>
          </div>
        )}
        <main id="contenido" hidden={!!screen || menu || search}>
          <section className="hero">
            <picture>
              <source
                media="(max-width:640px)"
                srcSet={assetUrl("/assets/hero-vintage.webp")}
              />
              <AssetImage
                className="hero-image"
                src="/assets/hero-vintage.webp"
                alt="Modelo adulto con chaqueta racer, polo marfil y denim en un patio de piedra"
                fetchPriority="high"
              />
            </picture>
            <div className="hero-content">
              <span className="eyebrow">HOMBRE · ESENCIA NOBRALTA</span>
              <h1>
                Presencia.
                <br />
                <em>Sin permiso.</em>
              </h1>
              <p>
                Una forma propia de llevar
                <br />
                lo esencial.
              </p>
              <button className="button button-light" onClick={() => browse()}>
                Encuentra tu pieza
                <ArrowRight size={21} />
              </button>
            </div>
            <div className="hero-footer">
              <span>CUERPO, TEXTURA Y ACTITUD</span>
              <span>LIMA, PERÚ</span>
            </div>
          </section>
          <section
            className="catalog section-pad"
            id="catalogo"
            aria-labelledby="catalog-title"
          >
            <div className="catalog-heading">
              <div>
                <h2 id="catalog-title">
                  Piezas con <em>presencia.</em>
                </h2>
              </div>
              <p>
                Polos, cuero y denim.
                <br />
                Tu próxima forma de vestir.
              </p>
            </div>
            <div className="catalog-tools">
              <span className="result-count" aria-live="polite">
                {results.length} {results.length === 1 ? "pieza" : "piezas"}
              </span>
              <button
                className="filter-toggle"
                aria-expanded={filters}
                onClick={() => setFilters(!filters)}
              >
                <SlidersHorizontal size={19} />
                Filtros
                {(color || filterSize || category !== "Todas") && (
                  <span className="filter-dot" />
                )}
              </button>
              <label className="sort-label">
                Ordenar
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Ordenar productos"
                >
                  <option value="editorial">Selección editorial</option>
                  <option value="low">Menor precio</option>
                  <option value="high">Mayor precio</option>
                </Select>
              </label>
            </div>
            {filters && (
              <div className="filter-bar">
                <label>
                  Prenda
                  <Select
                    aria-label="Filtrar por prenda"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </label>
                <label>
                  Color
                  <Select
                    aria-label="Filtrar por color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">Todos los colores</option>
                    {Object.keys(tones).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </label>
                <label>
                  Talla
                  <Select
                    aria-label="Filtrar por talla"
                    value={filterSize}
                    onChange={(e) => setFilterSize(e.target.value)}
                  >
                    <option value="">Todas las tallas</option>
                    {[...new Set(products.flatMap((p) => p.sizes))].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                </label>
                <label>
                  Disponibilidad
                  <Select
                    aria-label="Filtrar por disponibilidad"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="all">Todas las prendas</option>
                    <option value="available">Disponibles</option>
                    <option value="sold">Agotadas</option>
                  </Select>
                </label>
                <button
                  className="button button-outline clear-filters"
                  onClick={() => {
                    setAvailability("all");
                    setCategory("Todas");
                    setColor("");
                    setFilterSize("");
                    setQuery("");
                  }}
                >
                  Limpiar filtros
                  <X size={15} />
                </button>
              </div>
            )}
            {(category !== "Todas" || query) && (
              <div className="active-filter">
                <span>{category !== "Todas" ? category : query}</span>
                <button
                  className="icon-button"
                  aria-label="Quitar filtro"
                  onClick={() => {
                    setCategory("Todas");
                    setQuery("");
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="product-grid">
              {results.map((p) => (
                <ProductCard
                  tones={tones}
                  onQuickAdd={quickAdd}
                  key={p.id}
                  p={p}
                  requestedSize={filterSize}
                  onOpen={openProduct}
                  color={color}
                  inventory={inventory}
                  onAvailable={() => {
                    setAvailability("available");
                    setCategory("Todas");
                    setColor("");
                    setFilterSize("");
                    setQuery("");
                  }}
                />
              ))}
            </div>
            {!results.length && (
              <div className="empty">
                <h3>Tu próxima pieza sigue aquí.</h3>
                <p>No hay coincidencias con estos filtros.</p>
                <button
                  className="button button-dark"
                  onClick={() => {
                    setCategory("Todas");
                    setColor("");
                    setFilterSize("");
                    setQuery("");
                  }}
                >
                  Mostrar todas las prendas
                </button>
              </div>
            )}
          </section>
          {activePromos.length > 0 && (
            <section className="promotions section-pad" id="promociones">
              <div className="promo-heading">
                <h2>Combina. Y hazlo tuyo.</h2>
                <p>Looks completos y packs para tu semana.</p>
              </div>
              <div className="promo-grid">
                {activePromos.map((p) => (
                  <article className={"promo promo--" + p.type} key={p.id}>
                    <div>
                      <span className="promo-kind">
                        {p.type === "pack"
                          ? new Set(
                              p.productIds ||
                                [p.productId, p.secondaryProductId].filter(
                                  Boolean,
                                ),
                            ).size > 1
                            ? "CONJUNTO"
                            : "PACK DE BÁSICOS"
                          : "TU PRIMERA COMPRA"}
                      </span>
                      <h3>{p.title}</h3>
                      <p>{p.subtitle}</p>
                      {p.type === "pack" ? (
                        <>
                          <strong>
                            {money(p.price)} <small>/ {p.qty} prendas</small>
                          </strong>
                          <button
                            className="button button-light"
                            onClick={() => {
                              setPack(p);
                              setScreen("pack");
                            }}
                          >
                            Armar mi pack
                            <ArrowRight size={19} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="button button-outline"
                          onClick={() => {
                            setCode(p.code);
                            setCodeMessage(
                              "Código " +
                                p.code +
                                " listo para aplicar en la bolsa.",
                            );
                            setScreen("bag");
                          }}
                        >
                          Usar {p.code}
                          <ArrowRight size={19} />
                        </button>
                      )}
                    </div>
                    {p.type === "pack" && (
                      <PackArtwork pack={p} products={products} />
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
          <section className="brand-story section-pad">
            <h2>
              La elegancia también
              <br />
              tiene un lado <em>rebelde.</em>
            </h2>
            <p>
              Una mirada masculina entre el esencial preciso y el cuero, el
              denim y la sastrería. Menos ruido. Más identidad.
            </p>
          </section>
          <section className="care section-pad">
            <div>
              <h2>
                Claro desde
                <br />
                <em>el principio.</em>
              </h2>
            </div>
            <div>
              <details>
                <summary>
                  ¿Cómo elegir mi talla?
                  <Plus size={19} />
                </summary>
                <p>
                  Consulta las medidas de cada pieza antes de comprar. Compara
                  el ancho y largo con una prenda que te quede bien.
                </p>
              </details>
              <details>
                <summary>
                  Envíos y revisión del pago
                  <Plus size={19} />
                </summary>
                <p>
                  Recoge en la agencia Shalom que elijas. Entrega estimada de
                  2–10 días desde la confirmación del pago y destino. Cotizamos
                  el envío antes del pago y verificamos el abono manualmente.
                </p>
              </details>
              <details>
                <summary>
                  Condiciones de compra
                  <Plus size={19} />
                </summary>
                <p>{policy}</p>
              </details>
            </div>
          </section>
        </main>
        <footer
          className="footer section-pad"
          hidden={!!screen || menu || search}
        >
          <AssetImage
            className="footer-wordmark"
            src="/assets/brand-wordmark.svg"
            alt="NOBRALTA"
          />
          <SocialLinks settings={settings} />
          <div>
            <button onClick={() => information("Mi pedido")}>Mi pedido</button>
            <button onClick={() => information("Ayuda")}>Ayuda</button>
            <button onClick={() => information("Privacidad")}>
              Privacidad
            </button>
            <button onClick={() => information("Condiciones")}>
              Condiciones
            </button>
          </div>
          <p>
            PERÚ · PRECIOS EN PEN
            <br />
            ENTREGA 2–10 DÍAS
          </p>
        </footer>
        {screen && (
          <section
            className={"page-surface page-surface--" + screen}
            aria-label={
              screen === "product"
                ? product.name
                : screen === "account"
                  ? "Mi cuenta"
                  : screen === "checkout"
                    ? "Completar compra"
                    : screen === "bag"
                      ? "Tu bolsa"
                      : screen === "pack"
                        ? "Tu pack"
                        : screen === "order"
                          ? "Mi pedido"
                          : info
            }
          >
            <div className="dialog-content">
              {screen === "product" && (
                <div className="product-detail">
                  <div className={"detail-visual detail-visual--" + product.id}>
                    <AssetImage
                      src={product.variants[selectedVariant].image}
                      alt={
                        product.name +
                        " " +
                        product.variants[selectedVariant].color
                      }
                    />
                    <span>{product.stage} / Hombre</span>
                  </div>
                  <div className="detail-info">
                    <span className="eyebrow">
                      {product.category} / NOBRALTA
                    </span>
                    <h2>{product.name}</h2>
                    <p className="detail-price">
                      {product.originalPrice > product.price && (
                        <del>{money(product.originalPrice)}</del>
                      )}
                      {money(product.price)}
                    </p>
                    <p className="description">{product.description}</p>
                    <div className="selection-label">
                      Color{" "}
                      <strong>{product.variants[selectedVariant].color}</strong>
                    </div>
                    <Swatches
                      variants={product.variants}
                      value={selectedVariant}
                      onChange={(i) => {
                        setSelectedVariant(i);
                        setSize("");
                        setError("");
                      }}
                      label="Color de la prenda"
                    />
                    <div className="size-heading">
                      <span id="size-label">
                        Talla {size && <strong>{size}</strong>}
                      </span>
                      <button
                        className="text-action"
                        onClick={() => setMeasures(!measures)}
                        aria-expanded={measures}
                      >
                        <Ruler size={17} />
                        Medidas
                      </button>
                    </div>
                    <div
                      className="sizes"
                      role="group"
                      aria-labelledby="size-label"
                    >
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          disabled={
                            (inventory[
                              sku(
                                product.id,
                                product.variants[selectedVariant].color,
                                s,
                              )
                            ] ?? 0) === 0
                          }
                          aria-pressed={size === s}
                          className={size === s ? "selected" : ""}
                          onClick={() => {
                            setSize(s);
                            setError("");
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {error && (
                      <p className="field-error" role="alert">
                        {error}
                      </p>
                    )}
                    {measures && (
                      <section
                        className="measure-info"
                        aria-label="Guía de medidas"
                      >
                        <div className="measure-heading">
                          <Ruler size={22} />
                          <h3>Encuentra tu talla</h3>
                          <span>cm</span>
                        </div>
                        <p>
                          {product.id === "harness"
                            ? "Compara la longitud de tu pie con la tabla."
                            : "Mide una prenda que te quede bien, sin estirarla, y compara su ancho con la tabla."}
                        </p>
                        <table>
                          <caption>{product.name} — cm</caption>
                          <thead>
                            <tr>
                              <th>Talla</th>
                              <th>
                                {product.id === "harness"
                                  ? "Pie"
                                  : "Ancho plano"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.sizes.map((s, i) => (
                              <tr key={s}>
                                <th>{s}</th>
                                <td>
                                  {product.id === "harness"
                                    ? 24 + i
                                    : product.id === "denim"
                                      ? 36 + i * 2
                                      : 48 + i * 2}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>
                    )}
                    <div className="purchase-row">
                      <label>Cantidad</label>
                      <Quantity value={quantity} onChange={setQuantity} />
                      <span>{money(product.price * quantity)}</span>
                    </div>
                    <button
                      disabled={product.sizes.every(
                        (s) =>
                          (inventory[
                            sku(
                              product.id,
                              product.variants[selectedVariant].color,
                              s,
                            )
                          ] ?? 0) === 0,
                      )}
                      className="button button-wine full"
                      onClick={() => add(true)}
                    >
                      {product.sizes.every(
                        (s) =>
                          (inventory[
                            sku(
                              product.id,
                              product.variants[selectedVariant].color,
                              s,
                            )
                          ] ?? 0) === 0,
                      )
                        ? "Agotado"
                        : "Comprar ahora"}
                      <ArrowRight size={21} />
                    </button>
                    <button
                      disabled={product.sizes.every(
                        (s) =>
                          (inventory[
                            sku(
                              product.id,
                              product.variants[selectedVariant].color,
                              s,
                            )
                          ] ?? 0) === 0,
                      )}
                      className="button button-outline full"
                      onClick={() => add(false)}
                    >
                      Añadir a la bolsa
                      <Handbag size={20} />
                    </button>
                    <p className="availability">
                      {size
                        ? (inventory[
                            sku(
                              product.id,
                              product.variants[selectedVariant].color,
                              size,
                            )
                          ] ?? 0) <= 3
                          ? "Últimas " +
                            inventory[
                              sku(
                                product.id,
                                product.variants[selectedVariant].color,
                                size,
                              )
                            ] +
                            " unidades de esta talla"
                          : "Disponible en tu talla"
                        : "Selecciona una talla para ver disponibilidad"}
                    </p>
                    <p className="delivery-line">
                      Recojo Shalom · Entrega 2–10 días.
                      <br />
                      Envío cotizado antes de pagar.
                    </p>
                    <details>
                      <summary>
                        Composición y cuidados
                        <Plus size={17} />
                      </summary>
                      <p>
                        Revisa la etiqueta de la prenda. Lava los esenciales con
                        colores similares, evita lejía y seca a la sombra. El
                        cuero requiere cuidado especializado.
                      </p>
                    </details>
                    <details>
                      <summary>
                        Condiciones de compra
                        <Plus size={17} />
                      </summary>
                      <p>{policy}</p>
                    </details>
                  </div>
                </div>
              )}
              {screen === "bag" && (
                <div className="bag-content">
                  {!bag.length ? (
                    <div className="empty">
                      <Handbag size={40} />
                      <h2>
                        Tu próxima
                        <br />
                        <em>buena elección.</em>
                      </h2>
                      <p>La bolsa está vacía.</p>
                      <button
                        className="button button-dark"
                        onClick={() => browse()}
                      >
                        Explorar prendas
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2>Buenas elecciones.</h2>
                      <div className="bag-layout">
                        <div>
                          {bag.map((p) => (
                            <article className="bag-item" key={p.key}>
                              <AssetImage
                                src={p.image}
                                alt={p.name + " " + p.color}
                              />
                              <div>
                                <h3>{p.name}</h3>
                                <p>
                                  {p.color} / Talla {p.size}
                                </p>
                                <span>{money(p.price)}</span>
                                {p.bundleId && (
                                  <small className="bag-pack-note">
                                    {p.packTitle} · Cantidad vinculada al pack
                                  </small>
                                )}
                                <Quantity
                                  value={p.qty}
                                  onChange={(n) =>
                                    setBag((b) =>
                                      b.map((a) =>
                                        (
                                          p.bundleId
                                            ? a.bundleId === p.bundleId
                                            : a.key === p.key
                                        )
                                          ? { ...a, qty: n }
                                          : a,
                                      ),
                                    )
                                  }
                                />
                              </div>
                              <button
                                className="icon-button"
                                aria-label={
                                  p.bundleId
                                    ? "Eliminar pack " + p.packTitle
                                    : "Quitar " + p.name
                                }
                                onClick={() =>
                                  setBag((b) =>
                                    b.filter((a) =>
                                      p.bundleId
                                        ? a.bundleId !== p.bundleId
                                        : a.key !== p.key,
                                    ),
                                  )
                                }
                              >
                                <Trash size={20} />
                              </button>
                            </article>
                          ))}
                        </div>
                        <div className="order-summary">
                          <div>
                            <span>Subtotal</span>
                            <strong>{money(total)}</strong>
                          </div>
                          <p>
                            Envío: se cotizará según destino antes del pago.
                          </p>
                          <div className="code-entry">
                            <label className="field" htmlFor="affiliate">
                              Código de descuento o vendedor
                            </label>
                            <div>
                              <input
                                id="affiliate"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Tu código…"
                                autoComplete="off"
                                spellCheck={false}
                              />
                              <button
                                className="button button-dark apply-code"
                                onClick={applyCode}
                              >
                                Aplicar
                              </button>
                            </div>
                            {!applied && codeMessage && (
                              <p className="code-feedback" role="status">
                                {codeMessage}
                              </p>
                            )}
                            <DiscountNotice
                              applied={applied}
                              discount={discountTotal}
                              onRemove={() => {
                                setApplied(null);
                                setCodeMessage("");
                              }}
                            />
                          </div>
                          <div className="cart-total">
                            <span>Precio total</span>
                            <strong>
                              {money(
                                total -
                                  Math.round(
                                    bag
                                      .filter((p) => !p.packId)
                                      .reduce(
                                        (n, p) => n + p.price * p.qty,
                                        0,
                                      ) * (applied?.percent || 0),
                                  ) /
                                    100,
                              )}
                            </strong>
                          </div>
                          {
                            <button
                              className="button button-wine full"
                              onClick={() => {
                                setCheckout(true);
                                if (!user) setScreen("account");
                                else setScreen("checkout");
                              }}
                              aria-expanded={checkout && !!user}
                            >
                              Continuar mi compra
                              <ArrowRight size={20} />
                            </button>
                          }
                          <button
                            className="button button-outline full"
                            onClick={() => browse()}
                          >
                            Seguir explorando
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {screen === "checkout" && user && (
                <div className="checkout-page">
                  <div className="checkout-page-heading">
                    <h2>Completa tu compra.</h2>
                  </div>
                  {bag.length ? (
                    <DeliveryForm
                      onBack={() => {
                        setCheckout(false);
                        setScreen("bag");
                      }}
                      applied={applied}
                      discount={discountTotal}
                      user={user}
                      settings={settings}
                      agencies={agencies}
                      total={
                        total -
                        Math.round(
                          bag
                            .filter((p) => !p.packId)
                            .reduce((n, p) => n + p.price * p.qty, 0) *
                            (applied?.percent || 0),
                        ) /
                          100
                      }
                      onSubmit={createOrder}
                    />
                  ) : (
                    <p>Tu carrito está vacío.</p>
                  )}
                  {codeMessage &&
                    !codeMessage.startsWith("Código aplicado:") &&
                    !codeMessage.startsWith("El pack ya") && (
                      <p className="code-feedback" role="status">
                        {codeMessage}
                      </p>
                    )}
                </div>
              )}
              {screen === "account" &&
                (!user ? (
                  <Auth
                    users={users}
                    setUsers={setUsers}
                    onLogin={(u) => {
                      setSession(u.id);
                      log("Inicio de sesión", u.role);
                      if (u.role === "admin") {
                        setScreen(null);
                        setAdmin(true);
                      } else if (bag.length && checkout) {
                        setScreen("checkout");
                      } else setScreen("account");
                    }}
                  />
                ) : (
                  <AccountDashboard
                    user={user}
                    orders={myOrders}
                    setUsers={setUsers}
                    onOrder={(id) => {
                      setSelectedOrder(id);
                      setScreen("order");
                    }}
                    onAdmin={() => {
                      setScreen(null);
                      setAdmin(true);
                    }}
                    onLogout={() => {
                      setSession(null);
                      setScreen(null);
                    }}
                    onBrowse={() => browse()}
                  />
                ))}
              {screen === "order" &&
                orders.find(
                  (o) => o.id === selectedOrder && o.userId === session,
                ) && (
                  <div className="order-wrap">
                    <OrderDetail
                      order={orders.find((o) => o.id === selectedOrder)}
                      onReport={reportOrder}
                      settings={settings}
                    />
                    <button
                      className="text-action"
                      onClick={() => setScreen("account")}
                    >
                      Volver a mi cuenta
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              {screen === "pack" && pack && (
                <form
                  className="pack-builder"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = Object.fromEntries(new FormData(e.currentTarget));
                    const units = packUnits(pack, products),
                      regular = units.reduce((n, p) => n + p.price, 0);
                    const bundleId = crypto.randomUUID();
                    let assigned = 0;
                    const lines = units.map((p, i) => {
                      const a = p.variants.find(
                        (v) => v.color === f["color" + i],
                      );
                      const linePrice =
                        i === units.length - 1
                          ? Math.round((pack.price - assigned) * 100) / 100
                          : Math.round(
                              ((pack.price * p.price) / regular) * 100,
                            ) / 100;
                      assigned += linePrice;
                      return {
                        ...p,
                        ...a,
                        price: linePrice,
                        size: f["size" + i],
                        qty: 1,
                        packId: pack.id,
                        packTitle: pack.title,
                        bundleId,
                        key: pack.id + "-" + i + "-" + crypto.randomUUID(),
                      };
                    });
                    const needed = {};
                    [...bag, ...lines].forEach((l) => {
                      const k = sku(l.id, l.color, l.size);
                      needed[k] = (needed[k] || 0) + l.qty;
                    });
                    if (
                      Object.entries(needed).some(
                        ([k, n]) => n > (inventory[k] ?? 0),
                      )
                    ) {
                      setError(
                        "No hay suficientes unidades para esta combinación. Prueba otro color o talla.",
                      );
                      return;
                    }
                    setBag((b) => [...b, ...lines]);
                    setError("");
                    setCheckout(false);
                    setScreen("bag");
                  }}
                >
                  <h2>{pack.title}</h2>
                  <p>{pack.subtitle}</p>
                  {packUnits(pack, products).map((p, i) => {
                    return (
                      <PackItem
                        key={i}
                        product={p}
                        index={i}
                        initialColor={pack.colors?.[i]}
                        inventory={inventory}
                      />
                    );
                  })}
                  {error && (
                    <p className="field-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button className="button button-dark full">
                    Añadir pack · {money(pack.price)}
                    <Handbag size={20} />
                  </button>
                </form>
              )}
              {screen === "jobs" && (
                <JobsPage
                  jobs={jobs}
                  onApply={(a) => setApplications((v) => [a, ...v])}
                />
              )}
              {screen === "info" && (
                <div className="info-content">
                  <h2>{info}</h2>
                  {info === "Condiciones" ? (
                    <p>{policy}</p>
                  ) : info === "Mi pedido" ? (
                    <>
                      <p>
                        El seguimiento privado mostrará la revisión del pago, la
                        preparación y el despacho por separado. Una constancia
                        no confirma el abono.
                      </p>
                      <p>
                        Consulta el historial y los detalles de tu compra desde
                        Mi cuenta.
                      </p>
                    </>
                  ) : info === "Privacidad" ? (
                    <p>
                      Tus datos se usan para gestionar tu cuenta, atender
                      pedidos, coordinar el recojo y comunicar detalles de
                      compra. No se publican constancias ni datos de
                      destinatarios en el catálogo.
                    </p>
                  ) : (
                    <>
                      <p>
                        Compra online para Perú. Recoge en tu agencia Shalom.
                        Entrega estimada de 2–10 días tras confirmar el pago y
                        el destino. El costo de envío se informa antes de
                        transferir.
                      </p>
                      <p>
                        Atención online. Consulta el estado de tu compra desde
                        Mi cuenta. No contamos con tienda física para atención
                        pública.
                      </p>
                    </>
                  )}
                  <button
                    className="button button-dark"
                    onClick={() => setScreen(null)}
                  >
                    Volver
                    <ArrowRight size={19} />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
