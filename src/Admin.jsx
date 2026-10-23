import "./admin.css";
import {
  AdminOverview,
  AgencyManager,
  StockEditor,
  CustomerDirectory,
  StoreSettings,
} from "./AdminWorkspace";
import { PaymentMethodsAdmin } from "./Payments";
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
import { Field } from "./Customer";
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
const navGroups = [
  {
    title: "Operación diaria",
    items: ["Resumen", "Pedidos", "Envíos", "Medios de pago"],
  },
  { title: "Tienda", items: ["Catálogo", "Promociones"] },
  {
    title: "Clientes y equipo",
    items: ["Clientes", "Afiliados", "Personal", "Trabajos"],
  },
  { title: "Preferencias", items: ["Configuración"] },
];
const descriptions = {
  Resumen:
    "Pagos pendientes, próximos despachos y existencias que requieren atención.",
  Pedidos:
    "Consulta pedidos, revisa vouchers y actualiza cada etapa de la entrega.",
  Envíos:
    "Busca ubicaciones de Shalom y administra las agencias disponibles para recojo.",
  "Medios de pago":
    "Configura plataformas, titulares y cuentas visibles al comprar.",
  Catálogo: "Actualiza nombres, precios y unidades por color y talla.",
  Promociones:
    "Administra conjuntos, packs y códigos de descuento de la tienda.",
  Clientes: "Encuentra los datos de contacto y las compras de cada cliente.",
  Afiliados: "Gestiona vendedores, códigos, comisiones y liquidaciones.",
  Personal: "Organiza el equipo, los turnos y los pagos registrados.",
  Trabajos: "Publica convocatorias y revisa las postulaciones recibidas.",
  Configuración:
    "Actualiza atención al cliente, redes sociales y los datos de tu cuenta.",
};
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
  const [catalogQuery, setCatalogQuery] = useState(""),
    [catalogCategory, setCatalogCategory] = useState("Todas"),
    [promoComposer, setPromoComposer] = useState(false),
    [promoType, setPromoType] = useState("pack");
  const filteredCatalog = catalog.filter(
    (p) =>
      (catalogCategory === "Todas" || p.category === catalogCategory) &&
      (p.name + " " + p.category)
        .toLowerCase()
        .includes(catalogQuery.toLowerCase()),
  );
  useEffect(() => setPackLength(editing?.qty || 2), [editing]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [tab, selected, editing?.id]);
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
    setQuery("");
    setStatus("Todos");
    setPromoComposer(false);
    setPromoType("pack");
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
      price: f.type === "pack" ? Number(f.price) : 0,
      qty: f.type === "pack" ? Number(f.qty) : 0,
      discount: f.type === "code" ? Number(f.discount) : 0,
    };
    setPromos((a) =>
      editing ? a.map((v) => (v.id === editing.id ? p : v)) : [...a, p],
    );
    log("Promoción", p.title);
    setEditing(null);
    e.currentTarget.reset();
    setPromoComposer(false);
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
          aria-expanded={mobileNav}
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
          {navGroups.map((group) => (
            <div className="admin-nav-group" key={group.title}>
              <p>{group.title}</p>
              {group.items.map((name) => {
                const Icon = modules.find((m) => m[0] === name)[1];
                return (
                  <button
                    key={name}
                    className={tab === name ? "current" : ""}
                    onClick={() => choose(name)}
                    aria-current={tab === name ? "page" : undefined}
                  >
                    <Icon size={19} />
                    <span className="admin-nav-label">{name}</span>
                    {name === "Pedidos" && pending.length > 0 && (
                      <span className="admin-nav-count">{pending.length}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <main className="admin-main" id="contenido">
          <div className="admin-title">
            <div>
              <h1>{tab}</h1>
              <p className="admin-page-description">{descriptions[tab]}</p>
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
            <AdminOverview
              orders={orders}
              catalog={catalog}
              inventory={inventory}
              scoped={scoped}
              scopedPaid={scopedPaid}
              revenue={revenue}
              audit={audit}
              onOrders={(state) => {
                choose("Pedidos");
                setStatus(state);
              }}
              onOrder={(id) => {
                choose("Pedidos");
                setSelected(id);
              }}
              onStock={(p) => {
                choose("Catálogo");
                setEditing(p);
              }}
            />
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
              <div
                className="table-scroll"
                tabIndex={0}
                aria-label={"Tabla de " + tab}
              >
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
                    Precio total: <strong>{currency(order.total)}</strong>
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
              {!editing && (
                <div className="admin-filterbar">
                  <label className="field">
                    Buscar prenda
                    <input
                      type="search"
                      value={catalogQuery}
                      onChange={(e) => setCatalogQuery(e.target.value)}
                      placeholder="Nombre o categoría"
                    />
                  </label>
                  <label className="field">
                    Categoría
                    <Select
                      aria-label="Categoría del catálogo"
                      value={catalogCategory}
                      onChange={(e) => setCatalogCategory(e.target.value)}
                    >
                      <option>Todas</option>
                      {[...new Set(catalog.map((p) => p.category))].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Select>
                  </label>
                  <span>{filteredCatalog.length} productos</span>
                </div>
              )}
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
                  <StockEditor product={editing} inventory={inventory} />
                  <button className="button button-dark">
                    Guardar producto
                    <Check size={18} />
                  </button>
                </form>
              ) : (
                <div
                  className="table-scroll"
                  tabIndex={0}
                  aria-label={"Tabla de " + tab}
                >
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
                      {filteredCatalog.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="admin-product-cell">
                              <AssetImage src={p.variants[0].image} alt="" />
                              <div>
                                <strong>{p.name}</strong>
                                <small>{p.category}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{p.variants.length} colores</strong>
                            <small>
                              {p.variants
                                .slice(0, 3)
                                .map((v) => v.color)
                                .join(", ")}
                              {p.variants.length > 3 ? "…" : ""}
                            </small>
                          </td>
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
              <div
                className={
                  "promo-workspace" +
                  (editing || promoComposer ? " is-editing" : "")
                }
              >
                <section className="admin-section">
                  <div className="section-title">
                    <h2>Campañas de la tienda</h2>
                    <button
                      className="button button-dark"
                      onClick={() => {
                        setEditing(null);
                        setPromoComposer(true);
                        setPromoType("pack");
                      }}
                    >
                      Nueva campaña
                      <Plus size={18} />
                    </button>
                  </div>
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
                          onClick={() => {
                            setEditing(p);
                            setPromoType(p.type);
                            setPromoComposer(true);
                          }}
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
                {(editing || promoComposer) && (
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
                      <Select
                        name="type"
                        value={promoType}
                        onChange={(e) => setPromoType(e.target.value)}
                      >
                        <option value="pack">Pack de prendas</option>
                        <option value="code">Código de descuento</option>
                      </Select>
                    </label>
                    {promoType === "pack" && (
                      <>
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
                          placeholder="Blanco, Negro, Carbón"
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
                        </div>
                      </>
                    )}
                    <div className="form-grid two">
                      {promoType === "code" && (
                        <>
                          <Field
                            label="Código de descuento"
                            name="code"
                            defaultValue={editing?.code}
                            pattern="[A-Za-z0-9_\-]{3,24}"
                          />
                          <Field
                            label="Descuento (%)"
                            name="discount"
                            type="number"
                            min="1"
                            max="50"
                            defaultValue={editing?.discount || 10}
                          />
                        </>
                      )}
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
                      Los packs permiten elegir color y talla de cada unidad.
                      Los códigos no se acumulan con packs. Revisa la vigencia
                      antes de publicar.
                    </p>
                    <button className="button button-dark">
                      Guardar campaña
                      <Check size={18} />
                    </button>
                    {(editing || promoComposer) && (
                      <button
                        type="button"
                        className="text-action"
                        onClick={() => {
                          setEditing(null);
                          setPromoComposer(false);
                        }}
                      >
                        Cancelar edición
                      </button>
                    )}
                  </form>
                )}
              </div>
            </>
          )}
          {tab === "Clientes" && (
            <CustomerDirectory
              users={users}
              orders={orders}
              onOrders={(name) => {
                choose("Pedidos");
                setQuery(name);
              }}
            />
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
                  pattern="[A-Za-z0-9_\-]{3,24}"
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
            <AgencyManager
              agencies={agencies}
              setAgencies={setAgencies}
              log={log}
            />
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
            <StoreSettings
              settings={settings}
              setSettings={setSettings}
              user={user}
              setUsers={setUsers}
              onLogout={onLogout}
              log={log}
            />
          )}
        </main>
      </div>
      <footer className="admin-footer">
        NOBRALTA / Operación en Perú · PEN · America/Lima
      </footer>
    </div>
  );
}
