import { DateField } from "./DateField";
import { TrackingJourney } from "./Experiences";
import { Select } from "./Select";
import { AssetImage } from "./AssetImage";
import { useState } from "react";
import {
  ArrowRight,
  DownloadSimple,
  Check,
  Eye,
  EyeSlash,
  SignOut,
  MapPin,
} from "@phosphor-icons/react";
import { digest, currency, date, receipt, phases } from "./store";
export function Auth({ users, setUsers, onLogin }) {
  const [register, setRegister] = useState(false),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const email = f.email.trim().toLowerCase();
    try {
      if (register) {
        if (users.some((u) => u.email === email))
          throw Error("Este correo ya tiene una cuenta. Inicia sesión.");
        const salt = crypto.randomUUID();
        const u = {
          id: salt,
          salt,
          name: f.name.trim(),
          lastName: f.lastName.trim(),
          email,
          phone: f.phone,
          passwordHash: await digest(f.password, salt),
          role: "customer",
        };
        setUsers((a) => [...a, u]);
        onLogin(u);
      } else {
        const u = users.find((u) => u.email === email);
        if (!u || u.passwordHash !== (await digest(f.password, u.salt)))
          throw Error("Revisa tu correo y contraseña.");
        onLogin(u);
      }
    } catch (x) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="account-wrap">
      <div className="account-intro">
        <p>NOBRALTA / Mi cuenta</p>
        <h2>
          {register
            ? "Tu estilo empieza aquí."
            : "Qué bueno tenerte de vuelta."}
        </h2>
        <p>Tus pedidos, tus piezas y cada detalle en un solo lugar.</p>
      </div>
      <form className="form-grid" onSubmit={submit}>
        {register && (
          <>
            <Field
              label="Nombres"
              name="name"
              autoComplete="given-name"
              required
            />
            <Field
              label="Apellidos completos"
              name="lastName"
              autoComplete="family-name"
              required
            />
            <Field
              label="Teléfono"
              name="phone"
              type="tel"
              pattern="[0-9+ ]{9,15}"
              autoComplete="tel"
              required
            />
          </>
        )}
        <Field
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <label className="field">
          Contraseña
          <div className="password-field">
            <input
              name="password"
              aria-label="Contraseña"
              placeholder={
                register
                  ? "Crea una contraseña de 8 caracteres o más"
                  : "Escribe tu contraseña"
              }
              type={show ? "text" : "password"}
              minLength={8}
              required
              autoComplete={register ? "new-password" : "current-password"}
            />
            <button
              type="button"
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShow(!show)}
            >
              {show ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>
        {register && (
          <p className="form-hint">
            Usa al menos 8 caracteres. Elige una contraseña distinta a las de
            tus otras cuentas.
          </p>
        )}
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <div className="auth-actions">
          <button className="button button-dark full" disabled={busy}>
            {busy
              ? "Entrando…"
              : register
                ? "Crear mi cuenta"
                : "Iniciar sesión"}
            <ArrowRight size={20} />
          </button>
          <button
            className="button button-outline full"
            type="button"
            onClick={() => {
              setRegister(!register);
              setError("");
            }}
          >
            {register ? "Ya tengo una cuenta" : "Crear una cuenta"}
          </button>
        </div>
      </form>
    </div>
  );
}
export function Field({ label, type, ...props }) {
  const [error, setError] = useState("");
  if (type === "date" || type === "datetime-local")
    return <DateField label={label} type={type} {...props} />;
  return (
    <label className="field">
      {label}
      <input
        {...props}
        placeholder={
          props.placeholder ||
          {
            email: "tu@correo.com",
            name: "Escribe tus nombres",
            lastName: "Escribe tus apellidos",
            phone: "Ej. 987 654 321",
            dni: "Tu DNI de 8 dígitos",
          }[props.name] ||
          `Escribe ${label.toLowerCase()}`
        }
        type={type}
        aria-invalid={!!error}
        onInput={() => setError("")}
        onInvalid={(e) => {
          e.preventDefault();
          setError(
            e.target.validity.valueMissing
              ? "Completa este campo."
              : "Revisa el formato de este dato.",
          );
          e.target.focus();
        }}
      />
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
export function Profile({ user, setUsers, onLogout }) {
  const [message, setMessage] = useState("");
  async function save(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const email = f.email.trim().toLowerCase();
    const existing = JSON.parse(
      localStorage.getItem("nobralta.users.v2") || "[]",
    );
    if (existing.some((u) => u.id !== user.id && u.email === email)) {
      setMessage("Este correo ya pertenece a otra cuenta.");
      return;
    }
    setUsers((a) =>
      a.map((u) => (u.id === user.id ? { ...u, ...f, email } : u)),
    );
    setMessage("Tus datos se actualizaron.");
  }
  return (
    <section className="profile">
      <h2>Tu información.</h2>
      <form className="form-grid" onSubmit={save}>
        <Field
          label="Nombres"
          name="name"
          defaultValue={user.name}
          required
          autoComplete="given-name"
        />
        <Field
          label="Apellidos completos"
          name="lastName"
          defaultValue={user.lastName}
          required
          autoComplete="family-name"
        />
        <Field
          label="Correo electrónico"
          name="email"
          defaultValue={user.email}
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="Teléfono"
          name="phone"
          defaultValue={user.phone}
          type="tel"
          autoComplete="tel"
          pattern="[0-9+ ]{9,15}"
          required
        />
        <button className="button button-dark">
          Guardar cambios
          <Check size={18} />
        </button>
        <p role="status">{message}</p>
      </form>
      <button className="text-action" onClick={onLogout}>
        Cerrar sesión
        <SignOut size={18} />
      </button>
    </section>
  );
}
export function DeliveryForm({
  user,
  agencies,
  onSubmit,
  subtotal,
  discount,
  total,
}) {
  const [region, setRegion] = useState(""),
    [agency, setAgency] = useState(""),
    [agencyQuery, setAgencyQuery] = useState("");
  const cleanAgency = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const options = agencies.filter(
    (a) =>
      a.active &&
      a.region === region &&
      (a.id === agency ||
        cleanAgency([a.name, a.city, a.district, a.address].join(" ")).includes(
          cleanAgency(agencyQuery),
        )),
  );
  const selectedAgency = agencies.find((a) => a.id === agency);
  return (
    <form
      className="delivery-form"
      id="delivery-details"
      onSubmit={(e) => {
        e.preventDefault();
        const f = Object.fromEntries(new FormData(e.currentTarget));
        onSubmit(
          f,
          agencies.find((a) => a.id === f.agency),
        );
      }}
    >
      <h3>¿Quién recogerá tu pedido?</h3>
      <div className="form-grid two">
        <Field
          label="Nombres completos"
          name="name"
          defaultValue={user?.name}
          autoComplete="given-name"
          required
        />
        <Field
          label="Apellidos completos"
          name="lastName"
          defaultValue={user?.lastName}
          autoComplete="family-name"
          required
        />
        <Field
          label="DNI"
          name="dni"
          inputMode="numeric"
          pattern="[0-9]{8}"
          minLength={8}
          maxLength={8}
          required
        />
        <Field
          label="Número de contacto"
          name="phone"
          defaultValue={user?.phone}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+ ]{9,15}"
          required
        />
        <Field
          label="Correo electrónico"
          name="email"
          defaultValue={user?.email}
          type="email"
          autoComplete="email"
          required
        />
        <label className="field">
          Departamento
          <Select
            aria-label="Departamento"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setAgency("");
              setAgencyQuery("");
            }}
            required
          >
            <option value="">Elige tu departamento</option>
            {[...new Set(agencies.filter((a) => a.active).map((a) => a.region))]
              .sort((a, b) => a.localeCompare(b, "es"))
              .map((r) => (
                <option key={r}>{r}</option>
              ))}
          </Select>
        </label>
        {region && (
          <label className="field wide agency-search">
            Buscar agencia en {region}
            <input
              type="search"
              value={agencyQuery}
              onChange={(e) => setAgencyQuery(e.target.value)}
              placeholder="Distrito, agencia o dirección"
            />
            <span className="form-hint">
              {options.length} agencias coincidentes
            </span>
          </label>
        )}
        <label className="field wide">
          Agencia Shalom de recojo
          <Select
            name="agency"
            aria-label="Agencia Shalom de recojo"
            disabled={!region}
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            required
          >
            <option value="">
              {!region
                ? "Primero elige un departamento"
                : options.length
                  ? "Elige tu agencia"
                  : "No hay coincidencias"}
            </option>
            {options.map((a) => (
              <option key={a.id} value={a.id}>
                {a.district} — {a.name}
              </option>
            ))}
          </Select>
        </label>
      </div>
      {agency && (
        <div className="agency-summary" role="status">
          <MapPin size={22} />
          <div>
            <strong>
              Recojo en {agencies.find((a) => a.id === agency)?.name}
            </strong>
            <p>{selectedAgency?.address}</p>
            <p>Confirma que esta agencia corresponde a tu ubicación.</p>
          </div>
        </div>
      )}
      <p className="form-hint">
        Usaremos tu teléfono y correo para detalles de compra, pruebas de
        despacho y agradecimiento. Entrega estimada: 2–10 días desde la
        confirmación del pago y destino. El envío se cotiza antes de pagar.
      </p>
      <label className="checkbox">
        <input type="checkbox" required />
        Revisé mis datos, talla y agencia. Acepto las condiciones de compra y el
        uso de mis datos para atender el pedido.
      </label>
      <div className="checkout-total">
        <span>Precio total</span>
        <strong>{currency(total)}</strong>
      </div>
      <button className="button button-dark full">
        Confirmar mi pedido
        <ArrowRight size={20} />
      </button>
    </form>
  );
}
export function OrderDetail({ order, onReport, settings }) {
  const [message, setMessage] = useState(""),
    [file, setFile] = useState(null);
  async function report(e) {
    e.preventDefault();
    if (!file) {
      setMessage("Adjunta una constancia para que revisemos el pago.");
      return;
    }
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const reader = new FileReader();
    reader.onload = () => {
      onReport(order.id, {
        ...f,
        file: { name: file.name, type: file.type, data: reader.result },
        reported: new Date().toISOString(),
      });
      setMessage(
        "Recibimos tu reporte. Verificaremos el abono antes de preparar el pedido.",
      );
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="order-detail">
      <div className="order-detail-title">
        <div>
          <p>{date(order.created)}</p>
          <h2>{order.id}</h2>
        </div>
        <span className="status">{order.status}</span>
      </div>
      <TrackingJourney order={order} />
      <div className="order-lines">
        {order.lines.map((p) => (
          <div key={p.key}>
            <AssetImage src={p.image} alt="" />
            <span>
              {p.name}
              <small>
                {p.color} / {p.size} · {p.qty} unidades
              </small>
            </span>
            <strong>{currency(p.price * p.qty)}</strong>
          </div>
        ))}
      </div>
      <div className="order-facts">
        <p>
          <strong>Recojo Shalom</strong>
          <br />
          {order.agency.name}
          <br />
          {order.agency.region} / {order.agency.city}
        </p>
        <p>
          <strong>Destinatario</strong>
          <br />
          {order.customer.name} {order.customer.lastName}
          <br />
          DNI {order.customer.dni}
          <br />
          {order.customer.phone}
          <br />
          {order.customer.email}
        </p>
        <p>
          <strong>Productos</strong>
          <br />
          {currency(order.total)}
          <br />
          Entrega: 2–10 días
          <br />
          {order.guide
            ? "Guía / OS: " + order.guide
            : order.shipping != null
              ? "Envío: " + currency(order.shipping)
              : "Envío pendiente de cotizar"}
          <br />
          Total: {currency(order.total + (order.shipping || 0))}
        </p>
      </div>
      <button className="text-action" onClick={() => receipt(order)}>
        <DownloadSimple size={19} />
        Descargar detalle PDF
      </button>
      <p className="form-hint">
        El detalle de pedido no sustituye una boleta o factura electrónica.
      </p>
      {order.dispatchProof && (
        <a
          className="text-action"
          href={order.dispatchProof.data}
          download={order.dispatchProof.name}
        >
          <DownloadSimple size={18} />
          Ver prueba de despacho
        </a>
      )}
      {["Por pagar", "Pago observado"].includes(order.status) &&
        order.shipping == null && (
          <p className="form-hint">
            Estamos cotizando tu envío. Te avisaremos por tu número de contacto
            antes de solicitar el pago.
          </p>
        )}
      {["Por pagar", "Pago observado"].includes(order.status) &&
        order.shipping != null && (
          <form className="report-form form-grid" onSubmit={report}>
            <h3>Reportar mi pago</h3>
            {settings.paymentActive && settings.paymentAccount ? (
              <p>
                {settings.paymentName}
                <br />
                {settings.paymentOwner}
                <br />
                {settings.paymentAccount}
              </p>
            ) : (
              <p>
                Recibirás las instrucciones de pago después de confirmar el
                costo del envío. Reporta el abono solo cuando lo hayas
                realizado.
              </p>
            )}
            <Field
              label="Medio utilizado"
              name="method"
              required
              placeholder="Yape, transferencia…"
            />
            <Field
              label="Número de operación"
              name="reference"
              required
              spellCheck={false}
            />
            <Field
              label="Importe depositado (S/)"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
            />
            <Field
              label="Fecha y hora del pago"
              name="paidAt"
              type="datetime-local"
              required
            />
            <label className="field">
              Constancia
              <input
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (
                    f &&
                    (!["image/png", "image/jpeg", "application/pdf"].includes(
                      f.type,
                    ) ||
                      f.size > 750000)
                  ) {
                    setFile(null);
                    e.target.value = "";
                    setMessage("Adjunta JPG, PNG o PDF de hasta 750 KB.");
                  } else {
                    setFile(f);
                    setMessage("");
                  }
                }}
              />
            </label>
            <p className="form-hint">
              Hasta 750 KB. La constancia no confirma el dinero recibido.
            </p>
            <button className="button button-dark">
              Enviar a revisión
              <ArrowRight size={18} />
            </button>
            <p role="status">{message}</p>
          </form>
        )}
    </div>
  );
}
