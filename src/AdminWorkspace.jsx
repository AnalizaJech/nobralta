import { AdminEmpty, AdminNotice, AdminBadge } from "./AdminFeedback";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Plus,
  MagnifyingGlass,
  CaretLeft,
  CaretRight,
  Package,
  Receipt,
  Truck,
  WarningCircle,
  PencilSimple,
  CheckCircle,
  Clock,
  CreditCard,
  Users,
  Pause,
  Play,
  Globe,
  UserCircle,
  Headset,
} from "@phosphor-icons/react";
import { Select } from "./Select";
import { Field, Profile } from "./Customer";
import { AssetImage } from "./AssetImage";
import { socialChannels } from "./Merchandising";
import { currency, date, phases } from "./store";
const phaseIcons = {
  "Por pagar": CreditCard,
  "En revisión": Receipt,
  "Pago observado": WarningCircle,
  "Pago verificado": CheckCircle,
  "En preparación": Package,
  Enviado: Truck,
  Entregado: CheckCircle,
  Cancelado: Clock,
};
const normalize = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function AdminOverview({
  orders,
  catalog,
  inventory,
  scoped,
  scopedPaid,
  revenue,
  audit,
  onOrders,
  onOrder,
  onStock,
}) {
  const pending = orders.filter((o) => o.status === "En revisión"),
    low = catalog
      .map((p) => ({
        p,
        stock: Object.entries(inventory)
          .filter(([k]) => k.startsWith(p.id + "|"))
          .reduce((n, [, v]) => n + v, 0),
      }))
      .filter((x) => x.stock < 10)
      .sort((a, b) => a.stock - b.stock),
    best = catalog
      .map((p) => ({
        p,
        amount: scopedPaid
          .flatMap((o) => o.lines)
          .filter((l) => l.id === p.id)
          .reduce((n, l) => n + l.price * l.qty, 0),
      }))
      .filter((x) => x.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  return (
    <div className="admin-overview">
      <dl className="admin-facts">
        <div>
          <dt>
            <CreditCard size={19} />
            Ventas verificadas
          </dt>
          <dd>{currency(revenue)}</dd>
          <small>{scopedPaid.length} pedidos verificados</small>
        </div>
        <div>
          <dt>
            <Receipt size={19} />
            Vouchers por revisar
          </dt>
          <dd>{pending.length}</dd>
          <small>Todos los pedidos pendientes</small>
        </div>
        <div>
          <dt>
            <Package size={19} />
            Pedidos registrados
          </dt>
          <dd>{scoped.length}</dd>
          <small>En el periodo seleccionado</small>
        </div>
        <div>
          <dt>
            <CreditCard size={19} />
            Ticket promedio
          </dt>
          <dd>
            {currency(scopedPaid.length ? revenue / scopedPaid.length : 0)}
          </dd>
          <small>Solo ventas verificadas</small>
        </div>
      </dl>
      <div className="admin-home-grid">
        <section className="admin-section">
          <div className="section-title admin-attention-header">
            <h2>Atender ahora</h2>
            <button
              className="button admin-payments-link"
              onClick={() => onOrders("En revisión")}
            >
              Ver pagos
              <ArrowRight size={17} />
            </button>
          </div>
          {pending.length ? (
            pending.slice(0, 6).map((o) => (
              <button
                key={o.id}
                className="task-row"
                onClick={() => onOrder(o.id)}
              >
                <Receipt size={20} />
                <span>
                  <strong>{o.id}</strong>
                  <small>
                    {o.customer.name} {o.customer.lastName} · Voucher recibido
                  </small>
                </span>
                <b>{currency(o.total)}</b>
              </button>
            ))
          ) : (
            <div className="admin-empty">
              <Receipt size={28} />
              <h3>Los pagos están al día.</h3>
              <p>Aquí aparecerán las constancias que necesiten revisión.</p>
            </div>
          )}
          <div className="admin-task-links">
            <button onClick={() => onOrders("Pago verificado")}>
              <Package size={20} />
              <span>Preparar pedidos</span>
              <b>
                {orders.filter((o) => o.status === "Pago verificado").length}
              </b>
            </button>
            <button onClick={() => onOrders("En preparación")}>
              <Truck size={20} />
              <span>Organizar despachos</span>
              <b>
                {orders.filter((o) => o.status === "En preparación").length}
              </b>
            </button>
          </div>
        </section>
        <section className="admin-section">
          <h2>Revisar existencias</h2>
          <p className="admin-supporting">
            Prendas con menos de 10 unidades en total.
          </p>
          {low.length ? (
            <div className="admin-stock-cards">
              {low.slice(0, 6).map(({ p, stock }) => (
                <button
                  className="admin-stock-card"
                  key={p.id}
                  onClick={() => onStock(p)}
                >
                  <span className="admin-stock-image">
                    <AssetImage src={p.variants[0].image} alt="" />
                  </span>
                  <span className="admin-stock-copy">
                    <strong>{p.name}</strong>
                    <span
                      className={
                        "stock-indicator " + (stock === 0 ? "is-out" : "")
                      }
                    >
                      {stock === 0
                        ? "Agotado"
                        : stock + " unidades disponibles"}
                    </span>
                    <span className="stock-edit">
                      <PencilSimple size={17} />
                      Actualizar stock
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <AdminEmpty icon={CheckCircle} title="Existencias al día">
              No hay prendas con existencias bajas.
            </AdminEmpty>
          )}
        </section>
      </div>
      <div className="admin-home-grid">
        <section className="admin-section">
          <h2>Estado de los pedidos</h2>
          <div className="admin-state-list">
            {phases.map((s) => {
              const Icon = phaseIcons[s];
              return (
                <button key={s} onClick={() => onOrders(s)}>
                  <Icon size={20} />
                  <span>{s}</span>
                  <b>{scoped.filter((o) => o.status === s).length}</b>
                </button>
              );
            })}
          </div>
        </section>
        <section className="admin-section">
          <h2>Ventas por prenda</h2>
          {best.length ? (
            best.map(({ p, amount }) => (
              <div className="revenue-row" key={p.id}>
                <span>{p.name}</span>
                <strong>{currency(amount)}</strong>
              </div>
            ))
          ) : (
            <div className="admin-empty">
              <Package size={28} />
              <h3>Todavía no hay ventas verificadas.</h3>
              <p>
                Las prendas más vendidas aparecerán cuando se confirmen los
                pagos.
              </p>
            </div>
          )}
          <p className="form-hint">
            Importes de prendas antes de distribuir descuentos generales. Sin
            envío.
          </p>
        </section>
      </div>
      <details className="admin-section admin-activity">
        <summary>
          Actividad reciente <span>{audit.length} movimientos</span>
        </summary>
        {audit.slice(0, 12).map((a, i) => (
          <div className="audit-row" key={i}>
            <time>{date(a.at)}</time>
            <strong>{a.action}</strong>
            <span>{a.detail}</span>
          </div>
        ))}
        {!audit.length && (
          <AdminEmpty icon={Clock} title="Sin movimientos todavía">
            Los cambios que guardes en la tienda aparecerán aquí.
          </AdminEmpty>
        )}
      </details>
    </div>
  );
}
function Pagination({ page, pages, onChange, total, start, end }) {
  return (
    <div className="admin-pagination">
      <span>{total ? `${start}–${end} de ${total}` : "Sin resultados"}</span>
      <div>
        <button
          type="button"
          className="icon-button"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Página anterior"
        >
          <CaretLeft size={18} />
        </button>
        <span>
          {page} / {pages}
        </span>
        <button
          type="button"
          className="icon-button"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          aria-label="Página siguiente"
        >
          <CaretRight size={18} />
        </button>
      </div>
    </div>
  );
}
export function AgencyManager({ agencies, setAgencies, log }) {
  const [query, setQuery] = useState(""),
    [region, setRegion] = useState(""),
    [scope, setScope] = useState("all"),
    [page, setPage] = useState(1),
    [message, setMessage] = useState("");
  useEffect(() => setPage(1), [query, region, scope]);
  const visible = agencies.filter(
      (a) =>
        (!region || a.region === region) &&
        normalize(
          [a.name, a.region, a.city, a.district, a.address].join(" "),
        ).includes(normalize(query)) &&
        (scope === "all" ||
          (scope === "receives" && a.receives !== false && a.active) ||
          (scope === "paused" && !a.active) ||
          (scope === "internal" && a.public === false && !a.receives)),
    ),
    pages = Math.max(1, Math.ceil(visible.length / 20)),
    current = Math.min(page, pages),
    rows = visible.slice((current - 1) * 20, current * 20);
  return (
    <div className="agency-manager">
      <div className="admin-directory-summary">
        <p>
          <strong>{agencies.length}</strong> registros del directorio ·{" "}
          <strong>
            {agencies.filter((a) => a.public !== false || a.receives).length}
          </strong>{" "}
          ubicaciones para consulta del cliente ·{" "}
          <strong>
            {agencies.filter((a) => a.active && a.receives !== false).length}
          </strong>{" "}
          habilitadas para recojo.
        </p>
        <a
          href="https://shalom.com.pe/agencias"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar Shalom
          <ArrowRight size={16} />
        </a>
      </div>
      <div className="admin-filterbar">
        <label className="field">
          Buscar ubicación
          <input
            type="search"
            placeholder="Nombre, distrito, provincia o dirección"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="field">
          Departamento
          <Select
            aria-label="Departamento del directorio"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Todos</option>
            {[...new Set(agencies.map((a) => a.region))]
              .sort((a, b) => a.localeCompare(b, "es"))
              .map((r) => (
                <option key={r}>{r}</option>
              ))}
          </Select>
        </label>
        <label className="field">
          Servicio
          <Select
            aria-label="Servicio de agencia"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="all">Todo el directorio</option>
            <option value="receives">Habilitadas para recojo</option>
            <option value="paused">Sin recojo o pausadas</option>
            <option value="internal">Registros internos</option>
          </Select>
        </label>
      </div>
      <div
        className="table-scroll"
        tabIndex={0}
        aria-label="Tabla de registros"
      >
        <table className="admin-table agency-table">
          <thead>
            <tr>
              <th>Agencia / ubicación</th>
              <th>Departamento / distrito</th>
              <th>Servicio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.name}</strong>
                  <small>{a.address || "Sin dirección publicada"}</small>
                </td>
                <td>
                  {a.region}
                  <small>
                    {a.city} · {a.district || a.city}
                  </small>
                </td>
                <td>
                  <AdminBadge>
                    {a.public === false && !a.receives
                      ? "Registro interno"
                      : a.receives === false
                        ? "No recibe envíos"
                        : a.active
                          ? "Recojo habilitado"
                          : "Pausada"}
                  </AdminBadge>
                  {a.pointPro && <small>Punto PRO</small>}
                </td>
                <td>
                  {a.receives !== false ? (
                    <button
                      className={
                        a.active
                          ? "button button-warning"
                          : "button button-dark"
                      }
                      aria-label={
                        (a.active ? "Pausar agencia " : "Habilitar agencia ") +
                        a.name
                      }
                      onClick={() => {
                        setAgencies((ms) =>
                          ms.map((x) =>
                            x.id === a.id ? { ...x, active: !x.active } : x,
                          ),
                        );
                        log(
                          "Agencia Shalom",
                          a.name + (a.active ? " pausada" : " habilitada"),
                        );
                      }}
                    >
                      {a.active ? <Pause size={17} /> : <Play size={17} />}
                      {a.active ? "Pausar" : "Habilitar"}
                    </button>
                  ) : (
                    <small>No habilitada por Shalom</small>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <AdminEmpty
            icon={MagnifyingGlass}
            title="No encontramos esa ubicación"
          >
            Prueba otro nombre o limpia los filtros.
          </AdminEmpty>
        )}
      </div>
      <Pagination
        page={current}
        pages={pages}
        onChange={setPage}
        total={visible.length}
        start={(current - 1) * 20 + 1}
        end={Math.min(current * 20, visible.length)}
      />
      <details className="admin-section admin-add-agency">
        <summary>
          Agregar una agencia verificada
          <Plus size={18} />
        </summary>
        <form
          className="form-grid two"
          onSubmit={(e) => {
            e.preventDefault();
            const f = Object.fromEntries(new FormData(e.currentTarget));
            setAgencies((ms) => [
              ...ms,
              {
                ...f,
                id: crypto.randomUUID(),
                public: true,
                receives: true,
                active: true,
              },
            ]);
            log("Agencia Shalom", f.name);
            e.currentTarget.reset();
            setMessage("Agencia agregada al directorio.");
          }}
        >
          <Field label="Nombre exacto" name="name" required />
          <Field label="Departamento" name="region" required />
          <Field label="Provincia" name="city" required />
          <Field label="Distrito" name="district" required />
          <Field label="Dirección" name="address" required />
          <label className="checkbox">
            <input type="checkbox" required />
            Verifiqué que la agencia recibe envíos en Shalom.
          </label>
          <button className="button button-dark">
            Guardar agencia
            <Check size={18} />
          </button>
        </form>
      </details>
      <p className="form-hint">
        Directorio consultado el 23/10/2026. Los registros internos y los puntos
        sin recepción se muestran para consulta administrativa, sin habilitarlos
        para el recojo del comprador.
      </p>
      <AdminNotice>{message}</AdminNotice>
    </div>
  );
}
export function StockEditor({ product, inventory }) {
  return (
    <div className="stock-editor">
      {product.variants.map((v, i) => (
        <details key={v.color} open={i === 0}>
          <summary>
            <AssetImage src={v.image} alt="" />
            <strong>{v.color}</strong>
            <span>
              {product.sizes.reduce(
                (n, z) =>
                  n + (inventory[[product.id, v.color, z].join("|")] || 0),
                0,
              )}{" "}
              unidades
            </span>
            <Plus size={16} />
          </summary>
          <div className="stock-grid">
            {product.sizes.map((z) => (
              <Field
                key={z}
                label={"Talla " + z}
                name={"sku:" + [product.id, v.color, z].join("|")}
                type="number"
                min="0"
                step="1"
                required
                defaultValue={
                  inventory[[product.id, v.color, z].join("|")] ?? 0
                }
              />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
export function CustomerDirectory({ users, orders, onOrders }) {
  const [query, setQuery] = useState(""),
    [page, setPage] = useState(1);
  useEffect(() => setPage(1), [query]);
  const rows = users.filter(
      (u) =>
        u.role === "customer" &&
        normalize([u.name, u.lastName, u.email, u.phone].join(" ")).includes(
          normalize(query),
        ),
    ),
    pages = Math.max(1, Math.ceil(rows.length / 15));
  return (
    <section className="admin-section">
      <div className="admin-filterbar">
        <label className="field">
          Buscar cliente
          <input
            type="search"
            placeholder="Nombre, correo o teléfono"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <span>{rows.length} clientes</span>
      </div>
      <div
        className="table-scroll"
        tabIndex={0}
        aria-label="Tabla de registros"
      >
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contacto</th>
              <th>Pedidos</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice((page - 1) * 15, page * 15).map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>
                    {u.name} {u.lastName}
                  </strong>
                </td>
                <td>
                  {u.email}
                  <small>{u.phone || "Sin teléfono"}</small>
                </td>
                <td>{orders.filter((o) => o.userId === u.id).length}</td>
                <td>
                  <button
                    className="button button-outline"
                    onClick={() => onOrders(u.name)}
                  >
                    Ver pedidos
                    <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && (
        <AdminEmpty icon={Users} title="No encontramos clientes">
          Prueba otro nombre, correo o teléfono.
        </AdminEmpty>
      )}
      <Pagination
        page={page}
        pages={pages}
        onChange={setPage}
        total={rows.length}
        start={(page - 1) * 15 + 1}
        end={Math.min(page * 15, rows.length)}
      />
    </section>
  );
}
export function StoreSettings({
  settings,
  setSettings,
  user,
  setUsers,
  onLogout,
  log,
}) {
  const [section, setSection] = useState("Atención"),
    [message, setMessage] = useState("");
  return (
    <div className="store-settings">
      <div className="admin-subnav" aria-label="Secciones de configuración">
        {["Atención", "Redes sociales", "Mi cuenta"].map((t) => (
          <button
            key={t}
            className={section === t ? "current" : ""}
            aria-pressed={section === t}
            onClick={() => {
              setSection(t);
              setMessage("");
            }}
          >
            {t === "Atención" ? (
              <Headset size={18} />
            ) : t === "Redes sociales" ? (
              <Globe size={18} />
            ) : (
              <UserCircle size={18} />
            )}
            {t}
          </button>
        ))}
      </div>
      {section === "Mi cuenta" ? (
        <section className="admin-section settings-panel">
          <Profile user={user} setUsers={setUsers} onLogout={onLogout} />
        </section>
      ) : (
        <form
          key={section}
          className="admin-section form-grid settings-panel"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            setSettings((s) => ({ ...s, ...data }));
            log("Configuración", section + " actualizada");
            setMessage("Cambios guardados.");
          }}
        >
          <h2>
            {section === "Atención"
              ? "Contacto y entrega"
              : "Perfiles de la tienda"}
          </h2>
          {section === "Atención" ? (
            <>
              <Field
                label="Correo de atención"
                name="email"
                type="email"
                defaultValue={settings.email}
              />
              <Field
                label="Teléfono de atención"
                name="phone"
                type="tel"
                defaultValue={settings.phone}
              />
              <Field
                label="Horario de revisión"
                name="review"
                defaultValue={settings.review}
              />
              <Field
                label="Plazo de entrega"
                name="delivery"
                defaultValue={settings.delivery}
                required
              />
            </>
          ) : (
            <>
              <p className="form-hint">
                Los enlaces guardados se muestran en el footer de la tienda.
              </p>
              {socialChannels.map(([id, label, Icon, fallback]) => (
                <Field
                  key={id}
                  label={label}
                  name={"social_" + id}
                  type="url"
                  defaultValue={settings["social_" + id] || fallback}
                />
              ))}
            </>
          )}
          <button className="button button-dark">
            Guardar cambios
            <Check size={18} />
          </button>
        </form>
      )}
      <AdminNotice>{message}</AdminNotice>
    </div>
  );
}
