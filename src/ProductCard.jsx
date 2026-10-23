import { useState, useRef, useEffect } from "react";
import { ArrowRight, Handbag, Check } from "@phosphor-icons/react";
import { AssetImage } from "./AssetImage";
import { sku, currency } from "./store";
const hooks = {
  pima: "El básico que hace más por tu look.",
  cuero: "Cuero con textura. Actitud sin esfuerzo.",
  racer: "La capa que cambia todo.",
  denim: "Corte recto. Una buena caída sobre tus botas.",
  harness: "La base firme de tu próximo look.",
  archivo: "Espíritu de archivo, listo para hoy.",
  camisero: "Frente limpio. Carácter propio.",
  "abrigo-cuero": "Una silueta larga que se hace notar.",
};
export function ProductCard({
  p,
  color,
  tones,
  inventory,
  onOpen,
  onQuickAdd,
  onAvailable,
  requestedSize = "",
}) {
  const [selected, setSelected] = useState(0),
    [size, setSize] = useState(""),
    [expanded, setExpanded] = useState(false),
    [message, setMessage] = useState(""),
    [added, setAdded] = useState(false);
  const group = useRef(null);
  const chosenIndex = color
      ? Math.max(
          0,
          p.variants.findIndex((v) => v.color === color),
        )
      : Math.min(selected, p.variants.length - 1),
    index =
      requestedSize &&
      !color &&
      (inventory[sku(p.id, p.variants[chosenIndex].color, requestedSize)] ??
        0) === 0
        ? Math.max(
            0,
            p.variants.findIndex(
              (v) => (inventory[sku(p.id, v.color, requestedSize)] ?? 0) > 0,
            ),
          )
        : chosenIndex,
    variant = p.variants[index],
    available = p.sizes.filter(
      (z) => (inventory[sku(p.id, variant.color, z)] ?? 0) > 0,
    ),
    stock = p.sizes.reduce(
      (n, z) => n + (inventory[sku(p.id, variant.color, z)] ?? 0),
      0,
    ),
    sold = !stock,
    sale = p.originalPrice > p.price,
    low = stock > 0 && stock <= 8,
    state = sold ? "sold" : sale ? "sale" : low ? "low" : "new",
    visible = expanded ? p.variants : p.variants.slice(0, 4);
  useEffect(() => {
    setSize(
      requestedSize &&
        (inventory[sku(p.id, variant.color, requestedSize)] ?? 0) > 0
        ? String(requestedSize)
        : "",
    );
    setMessage("");
    setAdded(false);
  }, [requestedSize, variant.color]);
  function change(n) {
    setSelected(n);
    setSize("");
    setMessage("");
    setAdded(false);
  }
  function add() {
    if (!size) {
      setMessage("Elige tu talla para añadir.");
      group.current?.querySelector("button:not(:disabled)")?.focus();
      return;
    }
    const error = onQuickAdd(p, variant, size);
    if (error) {
      setMessage(error);
      return;
    }
    setMessage("Añadido. Puedes seguir eligiendo.");
    setAdded(true);
  }
  return (
    <article
      className={
        "product-card commerce-card state--" + state + " product-card--" + p.id
      }
    >
      <button
        className="product-image"
        onClick={() => onOpen(p, index)}
        aria-label={"Ver " + p.name + " " + variant.color}
      >
        <span className={"product-tag badge--" + state}>
          {sold
            ? "Agotado"
            : sale
              ? "−" + Math.round((1 - p.price / p.originalPrice) * 100) + "%"
              : low
                ? "Últimas unidades"
                : p.stage}
        </span>
        <AssetImage
          src={variant.image}
          alt={p.name + " de hombre, " + variant.color}
          loading="lazy"
        />
        {sold && (
          <span className="sold-seal">
            Se agotó.
            <br />
            <em>Por ahora.</em>
          </span>
        )}
      </button>
      <div className="product-meta">
        <div>
          <p>{p.category} / Hombre</p>
          <h3>
            <button onClick={() => onOpen(p, index)}>{p.name}</button>
          </h3>
        </div>
        <span>
          {sale && <del>{currency(p.originalPrice)}</del>}
          {currency(p.price)}
        </span>
      </div>
      <p className="card-copy">
        {hooks[p.id] || p.description.split(". ")[0] + "."}
      </p>
      <div className="card-colors">
        <div
          className="swatches"
          role="group"
          aria-label={"Colores de " + p.name}
        >
          {visible.map((v, i) => (
            <button
              key={v.color}
              className={index === i ? "selected" : ""}
              aria-label={v.color}
              aria-pressed={index === i}
              title={v.color}
              onClick={() => change(i)}
              disabled={
                !!requestedSize &&
                (inventory[sku(p.id, v.color, requestedSize)] ?? 0) === 0
              }
              style={{ "--swatch": tones[v.color] || "#888" }}
            >
              <span />
            </button>
          ))}
          {p.variants.length > 4 && (
            <button
              className="more-colors"
              aria-label={
                expanded
                  ? "Mostrar menos colores"
                  : "Ver los " + p.variants.length + " colores"
              }
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "−" : "+" + (p.variants.length - 4)}
            </button>
          )}
        </div>
        <small>{variant.color}</small>
      </div>
      {!sold && (
        <div className="card-size-row">
          <span id={"card-size-" + p.id}>Talla</span>
          <div
            ref={group}
            className="card-sizes"
            role="group"
            aria-labelledby={"card-size-" + p.id}
          >
            {p.sizes.map((z) => (
              <button
                key={z}
                aria-label={"Talla " + z + " de " + p.name}
                aria-pressed={size === z}
                disabled={!available.includes(z)}
                className={size === z ? "selected" : ""}
                onClick={() => {
                  setSize(z);
                  setMessage("");
                  setAdded(false);
                }}
              >
                {z}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="card-purchase">
        <button
          className={"button " + (sold ? "button-outline" : "button-dark")}
          onClick={sold ? onAvailable : add}
        >
          {sold
            ? "Descubrir disponibles"
            : added
              ? "Añadido"
              : "Añadir al carrito"}
          {sold ? (
            <ArrowRight size={18} />
          ) : added ? (
            <Check size={18} />
          ) : (
            <Handbag size={18} />
          )}
        </button>
        <p
          className={"card-response " + (message ? "has-message" : "")}
          aria-live="polite"
        >
          {message ||
            (!sold
              ? "Recojo Shalom · 2–10 días"
              : "Encuentra otra pieza que vaya contigo.")}
        </p>
      </div>
    </article>
  );
}
