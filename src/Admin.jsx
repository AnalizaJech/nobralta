import { PaymentMethodsAdmin } from "./Payments";
import { socialChannels } from "./Merchandising";
import { JobsManager } from "./Jobs";
import { Select } from "./Select";
import { AssetImage, assetUrl } from "./AssetImage";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  DownloadSimple,
  Plus,
  SignOut,
  X,
  Package,
  ChartBar,
  Receipt,
  Tag,
  Users,
  Gear,
  Truck,
  CreditCard,
  Clock,
} from "@phosphor-icons/react";
import { currency, date, phases, receipt, now } from "./store";
import { Field, Profile } from "./Customer";
const modules = [
  ["Resumen", ChartBar],
  ["Pedidos", Receipt],
  ["Catálogo", Package],
  ["Promociones", Tag],
  ["Clientes", Users],
  ["Afiliados", Users],
  ["Envíos", Truck],
  ["Medios de pago", CreditCard],
  ["Personal", Clock],
  ["Trabajos", Users],
  ["Configuración", Gear],
];
export function Admin({
  user,
  users,
  setUsers,
  orders,
  setOrders,
  catalog,
  setCatalog,
  promos,
  setPromos,
  affiliates,
  setAffiliates,
  agencies,
  setAgencies,
  settings,
  setSettings,
  inventory,
  setInventory,
  staff,
  setStaff,
  audit,
  log,
  onExit,
  onLogout,
  onCancel,
  jobs,
  setJobs,
  applications,
  setApplications,
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const [tab, setTab] = useState("Resumen"),
    [selected, setSelected] = useState(null),
    [query, setQuery] = useState(""),
    [status, setStatus] = useState("Todos"),
    [message, setMessage] = useState(""),
    [editing, setEditing] = useState(null),
    [notice, setNotice] = useState(""),
    [observing, setObserving] = useState(false),
    [cancelConfirm, setCancelConfirm] = useState(false),
    [period, setPeriod] = useState("all");
  const [packLength, setPackLength] = useState(2);
  useEffect(() => setPackLength(editing?.qty || 2), [editing]);
  const order = orders.find((o) => o.id === selected);
  const paid = orders.filter((o) =>
    ["Pago verificado", "En preparación", "Enviado", "Entregado"].includes(
      o.status,
    ),
  );
  const scoped = orders.filter(
    (o) =>
      period === "all" ||
      Date.now() - new Date(o.created).getTime() <= Number(period) * 86400000,
  );
  const scopedPaid = paid.filter((o) => scoped.some((a) => a.id === o.id));
  const revenue = scopedPaid.reduce((n, o) => n + o.total, 0);
  const pending = orders.filter((o) => o.status === "En revisión");
  function choose(t) {
    setTab(t);
    setMobileNav(false);
    setSelected(null);
    setEditing(null);
    setMessage("");
    setNotice("");
  }
  function updateOrder(id, patch, note = "") {
    setOrders((a) =>
      a.map((o) =>
        o.id === id
          ? {
              ...o,
              ...patch,
              history: [
                ...o.history,
                { status: patch.status || o.status, at: now(), note },
              ],
            }
          : o,
      ),
    );
    log("Pedido " + id, patch.status || "Actualizado");
  }
  function savePromo(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    if (f.end < f.start) {
      setMessage("La fecha final debe ser igual o posterior al inicio.");
      return;
    }
    if (
      f.type === "code" &&
      (!f.code?.trim() || Number(f.discount) <= 0 || Number(f.discount) > 50)
    ) {
      setMessage("Añade un código y un descuento entre 1% y 50%.");
      return;
    }
    const productIds = Array.from(
      { length: Number(f.qty) || 2 },
      (_, i) => f["productSlot" + i],
    );
    const colors = (f.colors || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    if (
      f.type === "pack" &&
      (productIds.some((id) => !catalog.some((p) => p.id === id)) ||
        !Number.isInteger(Number(f.qty)) ||
        Number(f.qty) < 2 ||
        Number(f.qty) > 5 ||
        Number(f.price) <= 0 ||
        colors.some(
          (color, i) =>
            !catalog
              .find((p) => p.id === productIds[i])
              ?.variants.some((v) => v.color === color),
        ))
    ) {
      setMessage("Revisa la prenda, cantidad y precio del pack.");
      return;
    }
    const p = {
      ...editing,
      ...f,
      productId: productIds[0],
      productIds,
      secondaryProductId: "",
      colors,
      id: editing?.id || crypto.randomUUID(),
      active: f.active === "on",
      price: Number(f.price),
      qty: Number(f.qty),
      discount: Number(f.discount),
    };
    setPromos((a) =>
      editing ? a.map((v) => (v.id === editing.id ? p : v)) : [...a, p],
    );
    log("Promoción", p.title);
    setEditing(null);
    e.currentTarget.reset();
    setMessage("Promoción guardada. La tienda refleja los cambios.");
  }
  const visibleOrders = orders.filter(
    (o) =>
      (status === "Todos" || o.status === status) &&
      (
        o.id +
        " " +
        o.customer.name +
        " " +
        o.customer.lastName +
        " " +
        o.customer.dni
      )
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="admin-app" data-ui>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <header className="admin-header">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onExit();
          }}
        >
          <AssetImage src="/assets/brand-wordmark.svg" alt="NOBRALTA" />
        </a>
        <span>Centro de operación</span>
        <button
          className="icon-button admin-menu-toggle"
          aria-label="Navegación administrativa"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <img
            src={assetUrl("/icons/menu-two.svg")}
            width="24"
            height="24"
            alt=""
          />
        </button>
        <div>
          <button className="text-action" onClick={onExit}>
            <ArrowLeft size={17} />
            Ver tienda
          </button>
          <button
            className="icon-button"
            onClick={onLogout}
            aria-label="Cerrar sesión"
          >
            <SignOut size={20} />
          </button>
        </div>
      </header>
      <div className="admin-workspace">
        <nav
          className={"admin-nav " + (mobileNav ? "is-expanded" : "")}
          aria-label="Administración"
        >
          {modules.map(([name, Icon]) => (
            <button
              key={name}
              className={tab === name ? "current" : ""}
              onClick={() => choose(name)}
              aria-current={tab === name ? "page" : undefined}
            >
              <Icon size={18} />
              {name}
              {name === "Pedidos" && pending.length > 0 && (
                <span>{pending.length}</span>
              )}
            </button>
          ))}
        </nav>
        <main className="admin-main" id="contenido">
          <form
            className="admin-global-search"
            onSubmit={(e) => {
              e.preventDefault();
              setTab("Pedidos");
              setSelected(null);
            }}
          >
            <label className="sr-only" htmlFor="admin-find">
              Buscar pedido o cliente
            </label>
            <input
              id="admin-find"
              placeholder="Buscar pedido, cliente o DNI…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="button button-dark">
              Buscar
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="admin-title">
            <div>
              <p>Operación / {user.name}</p>
              <h1>{tab}</h1>
            </div>
            {tab === "Resumen" && (
              <label>
                Periodo
                <Select
                  aria-label="Periodo estadístico"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="all">Todo el registro</option>
                  <option value="7">Últimos 7 días</option>
                  <option value="30">Últimos 30 días</option>
                </Select>
              </label>
            )}
          </div>
          {message && (
            <p className="save-message" role="status">
              <Check size={18} />
              {message}
            </p>
          )}
          {tab === "Resumen" && (
            <>
              <div className="metric-strip">
                <div>
                  <span>Ventas verificadas</span>
                  <strong>{currency(revenue)}</strong>
                  <small>
                    {scopedPaid.length} pedidos con abono confirmado
                  </small>
                </div>
                <div>
                  <span>Por revisar</span>
                  <strong>{pending.length}</strong>
                  <small>Reportes de pago recibidos</small>
                </div>
                <div>
                  <span>Ticket promedio</span>
                  <strong>
                    {currency(
                      scopedPaid.length ? revenue / scopedPaid.length : 0,
                    )}
                  </strong>
                  <small>Solo pedidos verificados</small>
                </div>
                <div>
                  <span>Pedidos registrados</span>
                  <strong>{scoped.length}</strong>
                  <small>En el periodo seleccionado</small>
                </div>
              </div>
              <div className="admin-columns">
                <section className="admin-section">
                  <div className="section-title">
                    <h2>Atender primero</h2>
                    <button
                      className="text-action"
                      onClick={() => choose("Pedidos")}
                    >
                      Ver pedidos
                      <ArrowRight size={17} />
                    </button>
                  </div>
                  {pending.length ? (
                    pending.slice(0, 5).map((o) => (
                      <button
                        className="queue-row"
                        key={o.id}
                        onClick={() => {
                          setTab("Pedidos");
                          setSelected(o.id);
                        }}
                      >
                        <span>
                          <strong>{o.id}</strong>
                          <small>
                            {o.customer.name} {o.customer.lastName}
                          </small>
                        </span>
                        <span>{currency(o.total)}</span>
                        <ArrowRight size={18} />
                      </button>
                    ))
                  ) : (
                    <div className="quiet-empty">
                      <h3>No hay pagos pendientes de revisión.</h3>
                      <p>Los reportes de tus clientes aparecerán aquí.</p>
                    </div>
                  )}
                  <h3 className="subheading">Prendas con existencias bajas</h3>
                  {catalog
                    .filter(
                      (p) =>
                        Object.entries(inventory)
                          .filter(([key]) => key.startsWith(p.id + "|"))
                          .reduce((n, [, v]) => n + v, 0) < 10,
                    )
                    .map((p) => (
                      <button
                        className="queue-row"
                        key={p.id}
                        onClick={() => {
                          setTab("Catálogo");
                          setEditing(p);
                        }}
                      >
                        <span>{p.name}</span>
                        <span>
                          {Object.entries(inventory)
                            .filter(([key]) => key.startsWith(p.id + "|"))
                            .reduce((n, [, v]) => n + v, 0)}{" "}
                          unidades
                        </span>
                      </button>
                    ))}
                </section>
                <section className="admin-section">
                  <h2>Pedidos por estado</h2>
                  <div className="state-distribution">
                    {phases.map((s) => {
                      const n = scoped.filter((o) => o.status === s).length;
                      return (
                        <div key={s}>
                          <span>{s}</span>
                          <meter
                            value={n}
                            max={Math.max(1, scoped.length)}
                            aria-label={s}
                          />
                          <strong>{n}</strong>
                        </div>
                      );
                    })}
                  </div>
                  <h3 className="subheading">Ventas por prenda</h3>
                  {catalog.map((p) => (
                    <div className="revenue-row" key={p.id}>
                      <span>{p.name}</span>
                      <strong>
                        {currency(
                          scopedPaid
                            .flatMap((o) => o.lines)
                            .filter((l) => l.id === p.id)
                            .reduce((n, l) => n + l.price * l.qty, 0),
                        )}
                      </strong>
                    </div>
                  ))}
                  <p className="form-hint">
                    Importes de productos antes de distribución de descuentos
                    generales. No incluye envío ni margen de mercadería.
                  </p>
                </section>
              </div>
              <section className="admin-section">
                <h2>Actividad reciente</h2>
                {audit.slice(0, 8).map((a, i) => (
                  <div className="audit-row" key={i}>
                    <time>{date(a.at)}</time>
                    <span>{a.action}</span>
                    <span>{a.detail}</span>
                  </div>
                ))}
                {!audit.length && (
                  <p className="quiet-empty">
                    Aún no hay movimientos registrados.
                  </p>
                )}
              </section>
            </>
          )}
          {tab === "Pedidos" && !order && (
            <>
              <div className="admin-toolbar">
                <label className="field">
                  Buscar pedido
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pedido, nombre o DNI…"
                  />
                </label>
                <label className="field">
                  Estado
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Todos</option>
                    {phases.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                </label>
              </div>
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Cliente / destino</th>
                      <th>Estado</th>
                      <th className="numeric">Productos</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.map((o) => (
                      <tr key={o.id}>
                        <td>
                          <strong>{o.id}</strong>
                          <small>{date(o.created)}</small>
                        </td>
                        <td>
                          {o.customer.name} {o.customer.lastName}
                          <small>{o.agency.name}</small>
                        </td>
                        <td>
                          <span className="status">{o.status}</span>
                        </td>
                        <td className="numeric">{currency(o.total)}</td>
                        <td>
                          <button
                            className="text-action"
                            onClick={() => {
                              setSelected(o.id);
                              setNotice("");
                            }}
                          >
                            Gestionar
                            <ArrowRight size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!visibleOrders.length && (
                  <p className="quiet-empty">
                    No hay pedidos con estos criterios.
                  </p>
                )}
              </div>
            </>
          )}
          {tab === "Pedidos" && order && (
            <>
              <button className="text-action" onClick={() => setSelected(null)}>
                <ArrowLeft size={17} />
                Todos los pedidos
              </button>
              <div className="section-title">
                <h2>{order.id}</h2>
                <span className="status">{order.status}</span>
              </div>
              <div className="admin-columns">
                <section className="admin-section">
                  <h2>Compra y destinatario</h2>
                  <p className="prose">
                    {order.customer.name} {order.customer.lastName}
                    <br />
                    DNI: {order.customer.dni}
                    <br />
                    {order.customer.phone}
                    <br />
                    {order.customer.email}
                    <br />
                    Shalom: {order.agency.name}
                    <br />
                    {order.agency.region} / {order.agency.city}
                  </p>
                  <div className="order-lines">
                    {order.lines.map((l) => (
                      <div key={l.key}>
                        <AssetImage src={l.image} alt="" />
                        <span>
                          {l.name}
                          <small>
                            {l.color} / {l.size} · {l.qty} unidades
                          </small>
                        </span>
                        <strong>{currency(l.qty * l.price)}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="prose">
                    Descuento: {currency(order.discount)}
                    {order.code ? " / " + order.code : ""}
                    <br />
                    Total productos: <strong>{currency(order.total)}</strong>
                  </p>
                  <button
                    className="text-action"
                    onClick={() => receipt(order)}
                  >
                    <DownloadSimple size={18} />
                    Detalle PDF
                  </button>
                  <h3 className="subheading">Historial</h3>
                  {order.history.map((h, i) => (
                    <p className="history" key={i}>
                      {date(h.at)} · {h.status}
                      {h.note ? " — " + h.note : ""}
                    </p>
                  ))}
                </section>
                <section className="admin-section">
                  <h2>Pago y despacho</h2>
                  {["Por pagar", "Pago observado"].includes(order.status) && (
                    <form
                      className="form-grid shipping-quote"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const f = Object.fromEntries(
                          new FormData(e.currentTarget),
                        );
                        updateOrder(
                          order.id,
                          { shipping: Number(f.shipping) },
                          "Envío cotizado: " + currency(Number(f.shipping)),
                        );
                        setMessage(
                          "Cotización de envío actualizada en el pedido del cliente.",
                        );
                      }}
                    >
                      <Field
                        label="Cotización de envío (S/)"
                        name="shipping"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={order.shipping ?? ""}
                        required
                      />
                      <button className="button button-dark">
                        Confirmar cotización
                        <Check size={18} />
                      </button>
                    </form>
                  )}
                  <p className="prose">
                    Envío:{" "}
                    {order.shipping != null
                      ? currency(order.shipping)
                      : "Por cotizar"}
                    <br />
                    Total a verificar:{" "}
                    {currency(order.total + (order.shipping || 0))}
                  </p>
                  {order.report ? (
                    <>
                      <p className="prose">
                        Medio: {order.report.method}
                        <br />
                        Operación: {order.report.reference}
                        <br />
                        {order.report.amountSource === "order-total"
                          ? "Importe del pedido"
                          : "Importe declarado"}
                        : {currency(Number(order.report.amount))}
                        <br />
                        {order.report.paidAt && (
                          <>
                            Pago declarado: {order.report.paidAt}
                            <br />
                          </>
                        )}
                        Reporte recibido: {date(order.report.reported)}
                      </p>
                      <a
                        className="text-action"
                        href={order.report.file.data}
                        download={order.report.file.name}
                      >
                        <DownloadSimple size={17} />
                        Constancia: {order.report.file.name}
                      </a>
                    </>
                  ) : (
                    <p className="prose">
                      El cliente todavía no reportó su pago.
                    </p>
                  )}
                  {order.status === "En revisión" && (
                    <form
                      className="form-grid"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const f = Object.fromEntries(
                          new FormData(e.currentTarget),
                        );
                        if (
                          Math.abs(
                            Number(f.verifiedAmount) -
                              (order.total + (order.shipping || 0)),
                          ) > 0.01
                        ) {
                          setNotice(
                            "El abono debe cubrir productos y envío cotizado. Registra diferencias en observaciones antes de continuar.",
                          );
                          return;
                        }
                        updateOrder(
                          order.id,
                          {
                            status: "Pago verificado",
                            verifiedAmount: Number(f.verifiedAmount),
                          },
                          f.note || "Abono contrastado por administrador",
                        );
                        setNotice("Pago verificado.");
                      }}
                    >
                      <Field
                        label="Importe de productos verificado (S/)"
                        name="verifiedAmount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                      />
                      <Field label="Nota de verificación" name="note" />
                      <label className="checkbox">
                        <input type="checkbox" required />
                        Contrasté el abono en el movimiento real de la cuenta.
                        La constancia por sí sola no acredita pago.
                      </label>
                      <button className="button button-dark">
                        Confirmar abono
                        <Check size={18} />
                      </button>
                      <button
                        type="button"
                        className="text-action"
                        onClick={() => {
                          setObserving(true);
                        }}
                      >
                        Observar el reporte
                      </button>
                    </form>
                  )}
                  {observing && order.status === "En revisión" && (
                    <form
                      className="form-grid"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const f = Object.fromEntries(
                          new FormData(e.currentTarget),
                        );
                        updateOrder(
                          order.id,
                          { status: "Pago observado" },
                          f.reason,
                        );
                        setObserving(false);
                      }}
                    >
                      <Field
                        label="Qué debe corregir el cliente"
                        name="reason"
                        required
                      />
                      <button className="button button-dark">
                        Enviar observación
                        <ArrowRight size={18} />
                      </button>
                      <button
                        type="button"
                        className="text-action"
                        onClick={() => setObserving(false)}
                      >
                        Volver
                      </button>
                    </form>
                  )}
                  {order.status === "Pago verificado" && (
                    <button
                      className="button button-dark"
                      onClick={() =>
                        updateOrder(order.id, { status: "En preparación" })
                      }
                    >
                      Iniciar preparación
                      <Package size={18} />
                    </button>
                  )}
                  {order.status === "En preparación" && (
                    <form
                      className="form-grid"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.currentTarget,
                          f = Object.fromEntries(new FormData(form));
                        const file = form.elements.proof.files[0];
                        if (file && file.size > 750000) {
                          setNotice(
                            "La prueba de despacho debe pesar hasta 750 KB.",
                          );
                          return;
                        }
                        const finish = (proof) =>
                          updateOrder(
                            order.id,
                            {
                              status: "Enviado",
                              guide: f.guide,
                              shipping: Number(f.shipping),
                              dispatchProof: proof,
                            },
                            "Despachado por Shalom",
                          );
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () =>
                            finish({
                              name: file.name,
                              type: file.type,
                              data: reader.result,
                            });
                          reader.readAsDataURL(file);
                        } else finish(null);
                      }}
                    >
                      <Field label="Guía / OS Shalom" name="guide" required />
                      <Field
                        label="Costo de envío (S/)"
                        name="shipping"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={order.shipping ?? 0}
                        required
                      />
                      <label className="field">
                        Prueba de despacho (JPG, PNG o PDF)
                        <input
                          name="proof"
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                        />
                      </label>
                      <button className="button button-dark">
                        Confirmar despacho
                        <Truck size={18} />
                      </button>
                    </form>
                  )}
                  {order.status === "Enviado" && (
                    <button
                      className="button button-dark"
                      onClick={() =>
                        updateOrder(order.id, { status: "Entregado" })
                      }
                    >
                      Marcar entregado
                      <Check size={18} />
                    </button>
                  )}
                  {["Por pagar", "Pago observado"].includes(order.status) && (
                    <button
                      className="text-action"
                      onClick={() => {
                        setCancelConfirm(true);
                      }}
                    >
                      Cancelar y liberar existencias
                    </button>
                  )}
                  {cancelConfirm &&
                    ["Por pagar", "Pago observado"].includes(order.status) && (
                      <div className="inline-confirm">
                        <p>
                          Se cancelará el pedido y sus prendas volverán a estar
                          disponibles.
                        </p>
                        <button
                          className="button button-dark"
                          onClick={() => {
                            onCancel(order.id);
                            setCancelConfirm(false);
                          }}
                        >
                          Confirmar cancelación
                        </button>
                        <button
                          className="text-action"
                          onClick={() => setCancelConfirm(false)}
                        >
                          Conservar pedido
                        </button>
                      </div>
                    )}
                  <h3 className="subheading">Comunicación con el cliente</h3>
                  <p className="prose">
                    WhatsApp: {order.customer.phone}
                    <br />
                    Correo: {order.customer.email}
                    <br />
                    Asunto: Tu compra NOBRALTA · {order.id}
                  </p>
                  <label className="field">
                    Mensaje de compra
                    <textarea
                      key={order.status}
                      rows="5"
                      defaultValue={`Hola ${order.customer.name}, gracias por elegir NOBRALTA. Tu pedido ${order.id} está: ${order.status}. Total de productos: ${currency(order.total)}. Recojo en Shalom ${order.agency.name}. Entrega estimada: 2–10 días.${order.guide ? " Guía: " + order.guide : ""}`}
                      onChange={(e) => setNotice(e.target.value)}
                    />
                  </label>
                  <button
                    className="text-action"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        notice ||
                          `Hola ${order.customer.name}, gracias por elegir NOBRALTA. Tu pedido ${order.id} está: ${order.status}. Total ${currency(order.total)}. Shalom ${order.agency.name}. Entrega: 2–10 días.`,
                      );
                      setMessage(
                        "Mensaje copiado. Puedes revisarlo y adjuntar el detalle PDF antes de enviarlo.",
                      );
                    }}
                  >
                    Copiar mensaje
                    <ArrowRight size={17} />
                  </button>
                  <p className="form-hint">
                    Prepara el detalle PDF y las pruebas de despacho para
                    adjuntarlos en tu canal de atención. El envío del mensaje se
                    realiza fuera de esta pantalla.
                  </p>
                  {notice && (
                    <p role="status" className="form-hint">
                      {notice}
                    </p>
                  )}
                </section>
              </div>
            </>
          )}
          {tab === "Catálogo" && (
            <>
              <div className="section-title">
                <h2>Prendas y variantes</h2>
                <span>{catalog.length} productos</span>
              </div>
              {editing ? (
                <form
                  className="admin-section form-grid"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = Object.fromEntries(new FormData(e.currentTarget));
                    setCatalog((a) =>
                      a.map((p) =>
                        p.id === editing.id
                          ? {
                              ...p,
                              name: f.name,
                              price: Number(f.price),
                              originalPrice: Number(f.originalPrice) || null,
                            }
                          : p,
                      ),
                    );
                    setInventory((a) => ({
                      ...a,
                      ...Object.fromEntries(
                        Object.entries(f)
                          .filter(([k]) => k.startsWith("sku:"))
                          .map(([k, v]) => [k.slice(4), Number(v)]),
                      ),
                    }));
                    log("Catálogo", f.name + " actualizado");
                    setEditing(null);
                    setMessage("Producto y existencias actualizados.");
                  }}
                >
                  <div className="section-title">
                    <h2>{editing.name}</h2>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label="Cerrar edición"
                      onClick={() => setEditing(null)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="form-grid three">
                    <Field
                      label="Nombre"
                      name="name"
                      defaultValue={editing.name}
                      required
                    />
                    <Field
                      label="Precio actual (S/)"
                      name="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      defaultValue={editing.price}
                      required
                    />
                    <Field
                      label="Precio anterior (opcional)"
                      name="originalPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={editing.originalPrice || ""}
                    />
                  </div>
                  <h3>Unidades por color y talla</h3>
                  <div className="stock-grid">
                    {editing.variants.flatMap((v) =>
                      editing.sizes.map((s) => {
                        const key = [editing.id, v.color, s].join("|");
                        return (
                          <Field
                            key={key}
                            label={v.color + " / " + s}
                            name={"sku:" + key}
                            type="number"
                            min="0"
                            step="1"
                            required
                            defaultValue={inventory[key] ?? 0}
                          />
                        );
                      }),
                    )}
                  </div>
                  <button className="button button-dark">
                    Guardar producto
                    <Check size={18} />
                  </button>
                </form>
              ) : (
                <div className="table-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Prenda</th>
                        <th>Colores</th>
                        <th className="numeric">Precio</th>
                        <th className="numeric">Existencias</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {catalog.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.variants.map((v) => v.color).join(", ")}</td>
                          <td className="numeric">{currency(p.price)}</td>
                          <td className="numeric">
                            {Object.entries(inventory)
                              .filter(([k]) => k.startsWith(p.id + "|"))
                              .reduce((n, [, v]) => n + v, 0)}
                          </td>
                          <td>
                            <button
                              className="text-action"
                              onClick={() => setEditing(p)}
                            >
                              Editar
                              <ArrowRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {tab === "Promociones" && (
            <>
              <div className="admin-columns">
                <section className="admin-section">
                  <h2>Campañas de la tienda</h2>
                  {promos.map((p) => (
                    <div className="management-row" key={p.id}>
                      <div>
                        <h3>{p.title}</h3>
                        <p>
                          {p.type === "pack"
                            ? `${p.qty} prendas / ${currency(p.price)}`
                            : `${p.code} / ${p.discount}%`}
                        </p>
                        <small>
                          {p.start} — {p.end}
                        </small>
                      </div>
                      <div>
                        <button
                          className="text-action"
                          onClick={() => setEditing(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-action"
                          onClick={() => {
                            setPromos((a) =>
                              a.map((v) =>
                                v.id === p.id ? { ...v, active: !v.active } : v,
                              ),
                            );
                            log("Promoción", p.active ? "Pausada" : "Activada");
                          }}
                        >
                          {p.active ? "Pausar" : "Activar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
                <form
                  className="admin-section form-grid"
                  key={editing?.id || "new"}
                  onSubmit={savePromo}
                >
                  <h2>{editing ? "Editar campaña" : "Nueva campaña"}</h2>
                  <Field
                    label="Título de la promoción"
                    name="title"
                    defaultValue={editing?.title}
                    required
                  />
                  <Field
                    label="Descripción breve"
                    name="subtitle"
                    defaultValue={editing?.subtitle}
                    required
                  />
                  <label className="field">
                    Tipo
                    <Select name="type" defaultValue={editing?.type || "pack"}>
                      <option value="pack">Pack de prendas</option>
                      <option value="code">Código de descuento</option>
                    </Select>
                  </label>
                  <div className="form-grid two">
                    {Array.from(
                      {
                        length: Math.max(
                          2,
                          Math.min(5, Number(packLength) || 2),
                        ),
                      },
                      (_, i) => (
                        <label className="field" key={i}>
                          Prenda {i + 1} del pack
                          <Select
                            name={"productSlot" + i}
                            defaultValue={
                              editing?.productIds?.[i] ||
                              (editing?.secondaryProductId &&
                              i === Number(editing?.qty) - 1
                                ? editing.secondaryProductId
                                : editing?.productId) ||
                              "pima"
                            }
                          >
                            {catalog.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </Select>
                        </label>
                      ),
                    )}
                  </div>
                  <Field
                    label="Colores sugeridos, en orden"
                    name="colors"
                    defaultValue={editing?.colors?.join(", ") || ""}
                    placeholder="Marfil, Negro, Índigo"
                  />
                  <div className="form-grid two">
                    <Field
                      label="Cantidad en pack"
                      name="qty"
                      type="number"
                      min="2"
                      max="5"
                      value={packLength}
                      onChange={(e) => setPackLength(e.target.value)}
                    />
                    <Field
                      label="Precio del pack (S/)"
                      name="price"
                      type="number"
                      min="1"
                      step="0.01"
                      defaultValue={editing?.price || 99}
                    />
                    <Field
                      label="Código (solo descuento)"
                      name="code"
                      defaultValue={editing?.code}
                      pattern="[A-Za-z0-9_-]{3,24}"
                    />
                    <Field
                      label="Descuento (%)"
                      name="discount"
                      type="number"
                      min="1"
                      max="50"
                      defaultValue={editing?.discount || 10}
                    />
                    <Field
                      label="Inicio"
                      name="start"
                      type="date"
                      defaultValue={editing?.start || "2026-10-21"}
                      required
                    />
                    <Field
                      label="Fin"
                      name="end"
                      type="date"
                      defaultValue={editing?.end || "2026-12-31"}
                      required
                    />
                  </div>
                  <label className="checkbox">
                    <input
                      name="active"
                      type="checkbox"
                      defaultChecked={editing?.active ?? true}
                    />
                    Publicar en la tienda
                  </label>
                  <p className="form-hint">
                    Los packs permiten elegir color y talla de cada unidad. Los
                    códigos no se acumulan con packs. Revisa la vigencia antes
                    de publicar.
                  </p>
                  <button className="button button-dark">
                    Guardar campaña
                    <Check size={18} />
                  </button>
                  {editing && (
                    <button
                      type="button"
                      className="text-action"
                      onClick={() => setEditing(null)}
                    >
                      Cancelar edición
                    </button>
                  )}
                </form>
              </div>
            </>
          )}
          {tab === "Clientes" && (
            <section className="admin-section">
              <h2>Cuentas de clientes</h2>
              {users
                .filter((u) => u.role === "customer")
                .map((u) => (
                  <div className="management-row" key={u.id}>
                    <div>
                      <h3>
                        {u.name} {u.lastName}
                      </h3>
                      <p>
                        {u.email}
                        <br />
                        {u.phone}
                      </p>
                      <small>
                        {orders.filter((o) => o.userId === u.id).length} pedidos
                        registrados
                      </small>
                    </div>
                    <button
                      className="text-action"
                      onClick={() => {
                        setTab("Pedidos");
                        setQuery(u.name);
                      }}
                    >
                      Ver pedidos
                      <ArrowRight size={17} />
                    </button>
                  </div>
                ))}
            </section>
          )}
          {tab === "Afiliados" && (
            <div className="admin-columns">
              <section className="admin-section">
                <h2>Vendedores y códigos</h2>
                {affiliates.map((a) => {
                  const related = paid.filter((o) => o.affiliateId === a.id);
                  return (
                    <div className="management-row" key={a.id}>
                      <div>
                        <h3>{a.name}</h3>
                        <p>
                          {a.code} · Descuento {a.discount}% · Comisión{" "}
                          {a.commission}%
                        </p>
                        <small>
                          {related.length} pedidos verificados ·{" "}
                          {currency(
                            related
                              .filter(
                                (o) =>
                                  o.status === "Entregado" && !o.commissionPaid,
                              )
                              .reduce(
                                (n, o) => n + (o.commissionAmount || 0),
                                0,
                              ),
                          )}{" "}
                          por liquidar
                        </small>
                        <details className="affiliate-ledger">
                          <summary>
                            Liquidaciones
                            <ArrowRight size={16} />
                          </summary>
                          {related
                            .filter((o) => o.commissionPaid)
                            .map((o) => (
                              <p key={o.id}>
                                {o.id} · {currency(o.commissionAmount || 0)} ·{" "}
                                {date(o.commissionPaid)} ·{" "}
                                {o.commissionReference}
                              </p>
                            ))}
                          {related.some(
                            (o) =>
                              o.status === "Entregado" && !o.commissionPaid,
                          ) ? (
                            <form
                              className="form-grid"
                              onSubmit={(e) => {
                                e.preventDefault();
                                const f = Object.fromEntries(
                                  new FormData(e.currentTarget),
                                );
                                setOrders((b) =>
                                  b.map((o) =>
                                    o.affiliateId === a.id &&
                                    o.status === "Entregado" &&
                                    !o.commissionPaid
                                      ? {
                                          ...o,
                                          commissionPaid: now(),
                                          commissionReference: f.reference,
                                        }
                                      : o,
                                  ),
                                );
                                log(
                                  "Liquidación afiliado",
                                  a.code + " / " + f.reference,
                                );
                                setMessage("Liquidación registrada.");
                              }}
                            >
                              <Field
                                label="Referencia de liquidación"
                                name="reference"
                                required
                              />
                              <label className="checkbox">
                                <input type="checkbox" required />
                                Verifiqué la liquidación y su pago.
                              </label>
                              <button className="button button-dark">
                                Registrar liquidación
                                <Check size={17} />
                              </button>
                            </form>
                          ) : (
                            <p>
                              No hay comisiones entregadas pendientes de
                              liquidar.
                            </p>
                          )}
                        </details>
                      </div>
                      <button
                        className="text-action"
                        onClick={() => {
                          setAffiliates((b) =>
                            b.map((v) =>
                              v.id === a.id ? { ...v, active: !v.active } : v,
                            ),
                          );
                          log(
                            "Afiliado",
                            a.code + " " + (a.active ? "pausado" : "activado"),
                          );
                        }}
                      >
                        {a.active ? "Pausar" : "Activar"}
                      </button>
                    </div>
                  );
                })}
              </section>
              <form
                className="admin-section form-grid"
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = Object.fromEntries(new FormData(e.currentTarget));
                  if (
                    affiliates.some(
                      (a) => a.code.toUpperCase() === f.code.toUpperCase(),
                    )
                  ) {
                    setMessage("Ese código ya está registrado.");
                    return;
                  }
                  setAffiliates((a) => [
                    ...a,
                    {
                      ...f,
                      id: crypto.randomUUID(),
                      code: f.code.toUpperCase(),
                      discount: Number(f.discount),
                      commission: Number(f.commission),
                      active: true,
                    },
                  ]);
                  log("Afiliado", f.name + " creado");
                  e.currentTarget.reset();
                  setMessage(
                    "Afiliado creado. Su código ya puede usarse en la bolsa.",
                  );
                }}
              >
                <h2>Nuevo vendedor</h2>
                <Field label="Nombre completo" name="name" required />
                <Field
                  label="Código único"
                  name="code"
                  pattern="[A-Za-z0-9_-]{3,24}"
                  required
                />
                <Field
                  label="Descuento al comprador (%)"
                  name="discount"
                  type="number"
                  min="0"
                  max="50"
                  required
                />
                <Field
                  label="Comisión del vendedor (%)"
                  name="commission"
                  type="number"
                  min="0"
                  max="50"
                  required
                />
                <button className="button button-dark">
                  Crear vendedor
                  <Plus size={18} />
                </button>
              </form>
            </div>
          )}
          {tab === "Envíos" && (
            <div className="admin-columns">
              <section className="admin-section">
                <h2>Agencias de recojo</h2>
                <p className="prose">
                  Entrega comunicada: {settings.delivery}. La selección del
                  cliente conserva departamento, ciudad y agencia.
                </p>
                {agencies.map((a) => (
                  <div className="management-row" key={a.id}>
                    <div>
                      <h3>{a.name}</h3>
                      <p>
                        {a.region} / {a.city}
                      </p>
                    </div>
                    <button
                      className="text-action"
                      onClick={() =>
                        setAgencies((b) =>
                          b.map((v) =>
                            v.id === a.id ? { ...v, active: !v.active } : v,
                          ),
                        )
                      }
                    >
                      {a.active ? "Desactivar" : "Activar"}
                    </button>
                  </div>
                ))}
              </section>
              <form
                className="admin-section form-grid"
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = Object.fromEntries(new FormData(e.currentTarget));
                  setAgencies((a) => [
                    ...a,
                    { ...f, id: crypto.randomUUID(), active: true },
                  ]);
                  log("Agencia Shalom", f.name);
                  e.currentTarget.reset();
                  setMessage("Agencia agregada al selector de recojo.");
                }}
              >
                <h2>Agregar agencia</h2>
                <Field label="Nombre exacto en Shalom" name="name" required />
                <Field label="Departamento" name="region" required />
                <Field label="Ciudad / provincia" name="city" required />
                <label className="checkbox">
                  <input type="checkbox" required />
                  Verifiqué la agencia en el directorio oficial de Shalom.
                </label>
                <button className="button button-dark">
                  Guardar agencia
                  <Plus size={18} />
                </button>
                <p className="form-hint">
                  La lista inicial es un extracto del directorio público.
                  Confirma vigencia y servicio antes de cotizar.
                </p>
              </form>
            </div>
          )}
          {tab === "Medios de pago" && (
            <PaymentMethodsAdmin
              settings={settings}
              setSettings={setSettings}
              log={log}
            />
          )}
          {tab === "Personal" && (
            <div className="admin-columns">
              <section className="admin-section">
                <h2>Equipo y asistencia</h2>
                {staff.map((p) => (
                  <div className="management-row" key={p.id}>
                    <div>
                      <h3>{p.name}</h3>
                      <p>
                        {p.job} · {p.active ? "En turno" : "Fuera de turno"}
                      </p>
                      <small>
                        {p.records?.length || 0} marcaciones registradas
                      </small>
                      <details>
                        <summary>
                          Ver marcaciones
                          <ArrowRight size={16} />
                        </summary>
                        {(p.records || []).map((r, i) => (
                          <p key={i}>
                            {date(r.at)} · {r.type}
                          </p>
                        ))}
                      </details>
                    </div>
                    <button
                      className="text-action"
                      onClick={() => {
                        setStaff((a) =>
                          a.map((v) =>
                            v.id === p.id
                              ? {
                                  ...v,
                                  active: !v.active,
                                  records: [
                                    ...(v.records || []),
                                    {
                                      at: now(),
                                      type: v.active ? "Salida" : "Entrada",
                                    },
                                  ],
                                }
                              : v,
                          ),
                        );
                        log(
                          "Asistencia",
                          p.name + " " + (p.active ? "salida" : "entrada"),
                        );
                      }}
                    >
                      {p.active ? "Marcar salida" : "Marcar entrada"}
                    </button>
                  </div>
                ))}
                <p className="form-hint">
                  La asistencia no calcula salarios, multas ni beneficios. Los
                  acuerdos laborales y las liquidaciones requieren reglas
                  aprobadas.
                </p>
              </section>
              <form
                className="admin-section form-grid"
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = Object.fromEntries(new FormData(e.currentTarget));
                  setStaff((a) => [
                    ...a,
                    {
                      ...f,
                      id: crypto.randomUUID(),
                      active: false,
                      records: [],
                    },
                  ]);
                  e.currentTarget.reset();
                  log("Personal", f.name + " agregado");
                }}
              >
                <h2>Agregar al equipo</h2>
                <Field label="Nombre completo" name="name" required />
                <Field label="Función" name="job" required />
                <button className="button button-dark">
                  Registrar persona
                  <Plus size={18} />
                </button>
              </form>
            </div>
          )}
          {tab === "Trabajos" && (
            <JobsManager
              jobs={jobs}
              setJobs={setJobs}
              applications={applications}
              setApplications={setApplications}
              log={log}
            />
          )}
          {tab === "Configuración" && (
            <div className="admin-columns">
              <section className="admin-section">
                <Profile user={user} setUsers={setUsers} onLogout={onLogout} />
              </section>
              <form
                className="admin-section form-grid"
                onSubmit={(e) => {
                  e.preventDefault();
                  const f = Object.fromEntries(new FormData(e.currentTarget));
                  setSettings((s) => ({ ...s, ...f }));
                  log("Configuración", "Atención actualizada");
                  setMessage("Configuración guardada.");
                }}
              >
                <h2>Contacto y atención</h2>
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
                <h3>Redes sociales</h3>
                <p className="form-hint">
                  Enlaces provisionales. Sustitúyelos por los perfiles oficiales
                  antes de publicar.
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
                <button className="button button-dark">
                  Guardar configuración
                  <Check size={18} />
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
      <footer className="admin-footer">
        NOBRALTA / Operación en Perú · PEN · America/Lima
      </footer>
    </div>
  );
}
