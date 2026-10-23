import { Select } from "./Select";
import { sku } from "./store";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MagnifyingGlass,
  X,
  Package,
  UserCircle,
  Receipt,
  ClockCounterClockwise,
  ShieldCheck,
  SignOut,
  Truck,
  Check,
  MapPin,
  Clock,
} from "@phosphor-icons/react";
import { AssetImage } from "./AssetImage";
import { Profile } from "./Customer";
import { currency, date } from "./store";
const clean = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const aliases = {
  casaca: "chaqueta",
  camiseta: "pima",
  remera: "pima",
  tshirt: "pima",
  abrigo: "gabardina",
  zapatos: "botas",
  vaquero: "jeans",
  chompa: "cafarena",
};
function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = old;
    }
  }
  return row[b.length];
}
export function recommendations(products, query) {
  let q = clean(query.trim());
  q = aliases[q] || q;
  if (!q) return products.slice(0, 4);
  return products
    .map((p) => {
      const text = clean(
        p.name +
          " " +
          p.category +
          " " +
          p.variants.map((v) => v.color).join(" "),
      );
      const words = text.split(/\s+/);
      const tokens = q
        .split(/\s+/)
        .map((t) => aliases[t] || { negra: "negro", blanca: "blanco" }[t] || t);
      const score = text.includes(q)
        ? text.startsWith(q)
          ? 100
          : 70
        : tokens.every((t) => text.includes(t))
          ? 60
          : q.length >= 4 &&
              words.some(
                (w) => distance(w, q) <= Math.min(2, Math.floor(q.length / 3)),
              )
            ? 40
            : 0;
      return { p, score };
    })
    .filter((x) => x.score)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
export function SearchExperience({
  products,
  query,
  setQuery,
  onProduct,
  onCategory,
  onClose,
}) {
  const results = recommendations(products, query),
    cats = [...new Set((query ? results : products).map((p) => p.category))];
  return (
    <section className="search-experience" aria-label="Explorar prendas">
      <div className="overlay-heading">
        <span>Encuentra tu próxima pieza.</span>
      </div>
      <form
        className="intelligent-search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results.length) onCategory(results[0].category);
        }}
      >
        <MagnifyingGlass size={27} />
        <label className="sr-only" htmlFor="smart-search">
          Buscar prendas
        </label>
        <input
          id="smart-search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Prenda, color o estilo…"
          autoComplete="off"
          autoFocus
        />
        {query && (
          <button
            type="button"
            className="icon-button"
            aria-label="Limpiar búsqueda"
            onClick={() => setQuery("")}
          >
            <X size={20} />
          </button>
        )}
        <button className="button button-dark" type="submit">
          Explorar
          <ArrowRight size={20} />
        </button>
      </form>
      <div className="search-layout">
        <div className="search-categories">
          <h2>
            {query ? "Categorías relacionadas" : "Empieza por una categoría"}
          </h2>
          {(cats.length
            ? cats
            : [...new Set(products.map((p) => p.category))]
          ).map((c) => (
            <button key={c} onClick={() => onCategory(c)}>
              {c}
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <div className="search-product-area">
          <div className="section-title">
            <h2>{query ? "Coincidencias para ti" : "Piezas para descubrir"}</h2>
            <span aria-live="polite">
              {results.length}{" "}
              {results.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>
          {results.length ? (
            <div className="search-products">
              {results.slice(0, 6).map((p) => {
                const index = Math.max(
                  0,
                  p.variants.findIndex(
                    (v) =>
                      query.trim().length > 1 &&
                      clean(query).includes(clean(v.color)),
                  ),
                );
                const variant = p.variants[index];
                return (
                  <button
                    key={p.id}
                    className="search-product"
                    onClick={() => onProduct(p, index)}
                  >
                    <AssetImage
                      src={variant.image}
                      alt={p.name + " " + variant.color}
                    />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {p.category} · {variant.color}
                      </small>
                      <b>{currency(p.price)}</b>
                    </span>
                    <ArrowUpRight size={20} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="search-empty">
              <h3>Probemos con otra pieza.</h3>
              <p>
                Busca «polo», «casaca», «denim» o un color. También puedes
                explorar una categoría.
              </p>
              <button
                className="button button-outline"
                onClick={() => setQuery("")}
              >
                Descubrir prendas
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export function AccountDashboard({
  user,
  orders,
  setUsers,
  onOrder,
  onAdmin,
  onLogout,
  onBrowse,
}) {
  const [tab, setTab] = useState("orders");
  return (
    <div className="account-dashboard">
      <div className="account-heading">
        <div>
          <p>Tu espacio NOBRALTA</p>
          <h1>Hola, {user.name}.</h1>
        </div>
        <button className="button button-outline" onClick={onBrowse}>
          Explorar prendas
          <ArrowUpRight size={19} />
        </button>
      </div>
      <div className="account-shell">
        <nav aria-label="Secciones de mi cuenta">
          <button
            className={tab === "orders" ? "current" : ""}
            onClick={() => setTab("orders")}
          >
            <Receipt size={20} />
            Mis pedidos
            <ArrowRight size={16} />
          </button>
          <button
            className={tab === "history" ? "current" : ""}
            onClick={() => setTab("history")}
          >
            <ClockCounterClockwise size={20} />
            Historial de compras
            <ArrowRight size={16} />
          </button>
          <button
            className={tab === "profile" ? "current" : ""}
            onClick={() => setTab("profile")}
          >
            <UserCircle size={20} />
            Mis datos
            <ArrowRight size={16} />
          </button>
          {user.role === "admin" && (
            <button onClick={onAdmin}>
              <ShieldCheck size={20} />
              Administrar tienda
              <ArrowRight size={16} />
            </button>
          )}
          <button
            className="account-signout button button-outline"
            onClick={onLogout}
          >
            <SignOut size={20} />
            Cerrar sesión
          </button>
        </nav>
        <section className="account-panel" key={tab}>
          {tab === "profile" ? (
            <Profile user={user} setUsers={setUsers} onLogout={onLogout} />
          ) : tab === "history" ? (
            <PurchaseHistory
              orders={orders}
              onOrder={onOrder}
              onBrowse={onBrowse}
            />
          ) : (
            <>
              <div className="section-title">
                <h2>Mis pedidos</h2>
                <span>
                  {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
                </span>
              </div>
              {orders.length ? (
                orders.map((o) => (
                  <article className="account-order" key={o.id}>
                    <div className="account-order-top">
                      <strong>{o.id}</strong>
                      <time>{date(o.created)}</time>
                      <span className="status">{o.status}</span>
                    </div>
                    <div className="account-order-body">
                      <div className="order-thumbnails">
                        {o.lines.slice(0, 3).map((p) => (
                          <AssetImage key={p.key} src={p.image} alt={p.name} />
                        ))}
                      </div>
                      <div>
                        <p>
                          {o.lines.reduce((n, p) => n + p.qty, 0)} prendas ·{" "}
                          {currency(o.total)}
                        </p>
                        <small>Recojo Shalom / {o.agency.name}</small>
                      </div>
                      <button
                        className="button button-dark"
                        onClick={() => onOrder(o.id)}
                      >
                        Ver seguimiento
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="account-empty">
                  <Package size={42} weight="light" />
                  <h3>
                    Tu primera buena elección
                    <br />
                    está por llegar.
                  </h3>
                  <p>Cuando compres, aquí verás cada etapa de tu pedido.</p>
                  <button className="button button-dark" onClick={onBrowse}>
                    Encontrar mi pieza
                    <ArrowRight size={19} />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
function PurchaseHistory({ orders, onOrder, onBrowse }) {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );
  return (
    <div className="purchase-history">
      <div className="section-title">
        <h2>Historial de compras</h2>
        <span>
          {orders.length} {orders.length === 1 ? "compra" : "compras"}
        </span>
      </div>
      <p className="history-intro">
        Consulta las prendas, importes y datos de recojo de cada compra. El
        estado indica si el pago o la entrega siguen pendientes.
      </p>
      {!sorted.length ? (
        <div className="account-empty">
          <ClockCounterClockwise size={40} />
          <h3>Aquí empieza tu historia.</h3>
          <p>
            Cuando realices una compra, podrás consultar todos sus detalles
            aquí.
          </p>
          <button className="button button-dark" onClick={onBrowse}>
            Explorar prendas
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        sorted.map((o) => (
          <article className="history-order" key={o.id}>
            <header>
              <div>
                <h3>{o.id}</h3>
                <time>{date(o.created)}</time>
              </div>
              <span className="status">{o.status}</span>
            </header>
            <div className="history-lines">
              {o.lines.map((p, i) => (
                <div className="history-line" key={p.key || i}>
                  <AssetImage src={p.image} alt={p.name} />
                  <div>
                    <strong>{p.name}</strong>
                    <p>
                      {p.color} · Talla {p.size} · Cantidad {p.qty}
                    </p>
                    <small>{currency(p.price)} por unidad</small>
                  </div>
                  <strong>{currency(p.price * p.qty)}</strong>
                </div>
              ))}
            </div>
            <dl className="history-totals">
              <div>
                <dt>Subtotal</dt>
                <dd>
                  {currency(
                    o.subtotal ??
                      o.lines.reduce((n, p) => n + p.price * p.qty, 0),
                  )}
                </dd>
              </div>
              {!!o.discount && (
                <div>
                  <dt>Descuento{o.code ? ` · ${o.code}` : ""}</dt>
                  <dd>−{currency(o.discount)}</dd>
                </div>
              )}
              <div>
                <dt>Precio total</dt>
                <dd>{currency(o.total)}</dd>
              </div>
            </dl>
            <details>
              <summary>
                Datos de recojo
                <ArrowRight size={17} />
              </summary>
              <p>
                {[o.customer?.name, o.customer?.lastName]
                  .filter(Boolean)
                  .join(" ")}
              </p>
              <p>
                {o.agency?.name} · {o.agency?.city}
              </p>
              <p>
                Envío:{" "}
                {o.shipping != null
                  ? currency(o.shipping)
                  : "se cotiza por separado"}
              </p>
            </details>
            <button
              className="button button-outline"
              onClick={() => onOrder(o.id)}
            >
              Ver seguimiento
              <ArrowRight size={18} />
            </button>
          </article>
        ))
      )}
    </div>
  );
}
export function TrackingJourney({ order }) {
  const steps = [
    "Por pagar",
    "Pago verificado",
    "En preparación",
    "Enviado",
    "Entregado",
  ];
  const i =
    order.status === "En revisión" || order.status === "Pago observado"
      ? 0
      : Math.max(0, steps.indexOf(order.status));
  const descriptions = {
    "Por pagar": "Confirmaremos el envío antes de solicitar el pago.",
    "En revisión": "Recibimos tu constancia. Estamos contrastando el abono.",
    "Pago observado": "Hay un detalle por corregir en tu reporte de pago.",
    "Pago verificado": "Abono confirmado. Tu pedido pasa a preparación.",
    "En preparación": "Estamos revisando y preparando tus prendas.",
    Enviado: "Tu pedido está en camino a la agencia que elegiste.",
    Entregado: "Pedido entregado. Gracias por elegir NOBRALTA.",
    Cancelado: "Este pedido fue cancelado.",
  };
  return (
    <section className="tracking-journey">
      <div className="tracking-current">
        <span className="tracking-icon">
          <Truck size={30} />
        </span>
        <div>
          <h3>{order.status}</h3>
          <p>{descriptions[order.status]}</p>
        </div>
        <div className="tracking-estimate">
          <Clock size={18} />
          <span>
            Entrega estimada<strong>2–10 días</strong>
          </span>
        </div>
      </div>
      <ol className="tracking-steps">
        {steps.map((s, n) => (
          <li
            key={s}
            className={n <= i && order.status !== "Cancelado" ? "done" : ""}
          >
            <span>{n < i ? <Check size={16} /> : n + 1}</span>
            <strong>{s}</strong>
          </li>
        ))}
      </ol>
      <div className="tracking-destination">
        <MapPin size={20} />
        <p>
          Recojo en <strong>{order.agency.name}</strong> · {order.agency.city}
          {order.guide && <small>Guía / OS: {order.guide}</small>}
        </p>
      </div>
      <details className="tracking-events">
        <summary>
          Ver todos los movimientos
          <ArrowRight size={18} />
        </summary>
        <ol>
          {[...(order.history || [])].reverse().map((h, n) => (
            <li key={n}>
              <time>{date(h.at)}</time>
              <div>
                <strong>{h.status}</strong>
                {h.note && <p>{h.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}

export function PackItem({ product, index, inventory, initialColor }) {
  const [color, setColor] = useState(
    product.variants.some((v) => v.color === initialColor)
      ? initialColor
      : product.variants[index % product.variants.length].color,
  );
  return (
    <div className="pack-item">
      <AssetImage
        src={product.variants.find((v) => v.color === color).image}
        alt={product.name + " " + color}
      />
      <div>
        <h3>
          Prenda {index + 1} / {product.name}
        </h3>
        <div className="form-grid two">
          <label className="field">
            Color
            <Select
              name={"color" + index}
              aria-label={"Color de prenda " + (index + 1)}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            >
              {product.variants.map((v) => (
                <option key={v.color} value={v.color}>
                  {v.color}
                </option>
              ))}
            </Select>
          </label>
          <label className="field">
            Talla
            <Select
              name={"size" + index}
              aria-label={"Talla de prenda " + (index + 1)}
              defaultValue=""
              required
            >
              <option value="">Elige tu talla</option>
              {product.sizes.map((z) => (
                <option
                  key={z}
                  value={z}
                  disabled={(inventory[sku(product.id, color, z)] ?? 0) === 0}
                >
                  {z}
                </option>
              ))}
            </Select>
          </label>
        </div>
      </div>
    </div>
  );
}
