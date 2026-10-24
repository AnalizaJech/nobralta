import { useState, useEffect, useRef } from "react";
import {
  UserCircle,
  MapPin,
  Phone,
  Envelope,
  IdentificationCard,
  DownloadSimple,
  Copy,
  Receipt,
  Clock,
  CreditCard,
  ArrowsOut,
  X,
} from "@phosphor-icons/react";
import { currency, date } from "./store";
import { AdminBadge, AdminEmpty } from "./AdminFeedback";

export function OrderRecipient({ order }) {
  return (
    <div className="admin-recipient">
      <div className="order-person">
        <UserCircle size={32} weight="light" />
        <div>
          <h3>
            {order.customer.name} {order.customer.lastName}
          </h3>
          <span>Persona que recogerá el pedido</span>
        </div>
      </div>
      <dl className="order-info-grid">
        <div>
          <dt>
            <IdentificationCard size={17} />
            DNI
          </dt>
          <dd>{order.customer.dni}</dd>
        </div>
        <div>
          <dt>
            <Phone size={17} />
            Teléfono
          </dt>
          <dd>{order.customer.phone}</dd>
        </div>
        <div className="wide">
          <dt>
            <Envelope size={17} />
            Correo electrónico
          </dt>
          <dd>{order.customer.email}</dd>
        </div>
      </dl>
      <div className="order-destination">
        <MapPin size={22} />
        <div>
          <span>Agencia Shalom de recojo</span>
          <strong>{order.agency.name}</strong>
          <p>
            {order.agency.region} · {order.agency.city}
          </p>
          {order.agency.address && <p>{order.agency.address}</p>}
        </div>
      </div>
    </div>
  );
}
export function OrderTotals({ order }) {
  return (
    <dl className="order-totals">
      <div>
        <dt>
          Descuento{" "}
          {order.code && <span className="order-coupon">{order.code}</span>}
        </dt>
        <dd>− {currency(order.discount || 0)}</dd>
      </div>
      <div className="order-total">
        <dt>Precio total</dt>
        <dd>{currency(order.total)}</dd>
      </div>
    </dl>
  );
}
export function OrderHistory({ history }) {
  return (
    <div className="admin-order-history">
      <h3>
        <Clock size={20} />
        Historial del pedido
      </h3>
      <ol>
        {history.map((h, i) => (
          <li key={i}>
            <AdminBadge>{h.status}</AdminBadge>
            <time>{date(h.at)}</time>
            {h.note && <p>{h.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
export function OrderPayment({ order }) {
  return (
    <div className="admin-payment-info">
      <dl className="order-totals">
        {order.shipping != null && (
          <div>
            <dt>Envío confirmado</dt>
            <dd>{currency(order.shipping)}</dd>
          </div>
        )}
        <div className="order-total">
          <dt>
            {order.shipping == null
              ? "Importe de productos"
              : "Total a verificar"}
          </dt>
          <dd>{currency(order.total + (order.shipping || 0))}</dd>
        </div>
      </dl>
      {order.shipping == null && (
        <p className="form-hint">
          Confirma el costo del envío desde Logística para completar el total.
        </p>
      )}
      {order.report && (
        <dl className="order-info-grid">
          <div>
            <dt>
              <CreditCard size={17} />
              Medio de pago
            </dt>
            <dd>{order.report.method}</dd>
          </div>
          <div>
            <dt>
              <Receipt size={17} />
              Número de operación
            </dt>
            <dd>{order.report.reference}</dd>
          </div>
          <div>
            <dt>
              Importe{" "}
              {order.report.amountSource === "order-total"
                ? "del pedido"
                : "declarado"}
            </dt>
            <dd>{currency(Number(order.report.amount))}</dd>
          </div>
          <div>
            <dt>Reporte recibido</dt>
            <dd>{date(order.report.reported)}</dd>
          </div>
          {order.report.paidAt && (
            <div className="wide">
              <dt>Pago declarado</dt>
              <dd>{order.report.paidAt}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
export function AdminVoucher({ file }) {
  const viewer = useRef(null);
  if (!file?.data)
    return (
      <AdminEmpty icon={Receipt} title="Sin voucher adjunto">
        El cliente todavía no reportó su pago.
      </AdminEmpty>
    );
  const image =
    file.type?.startsWith("image/") || file.data.startsWith("data:image/");
  const pdf =
    file.type === "application/pdf" ||
    file.data.startsWith("data:application/pdf");
  return (
    <section className="admin-voucher" aria-label="Voucher recibido">
      <div className="voucher-title">
        <h3>
          <Receipt size={20} />
          Voucher recibido
        </h3>
        <span>{image ? "Imagen" : pdf ? "PDF" : "Archivo"}</span>
      </div>
      {image ? (
        <div className="admin-voucher-image">
          <img src={file.data} alt={"Voucher de pago: " + file.name} />
        </div>
      ) : pdf ? (
        <iframe
          className="admin-voucher-pdf"
          title={"Vista previa del voucher PDF: " + file.name}
          src={file.data}
        />
      ) : (
        <p>Descarga el archivo para revisarlo.</p>
      )}
      <div className="admin-voucher-footer">
        <p>{file.name}</p>
        {image && (
          <button
            type="button"
            className="button button-outline"
            onClick={() => viewer.current.showModal()}
          >
            <ArrowsOut size={18} />
            Ampliar voucher
          </button>
        )}
        <a
          className="button button-outline"
          href={file.data}
          download={file.name}
        >
          <DownloadSimple size={18} />
          Descargar voucher
        </a>
      </div>
      {image && (
        <dialog
          ref={viewer}
          className="admin-voucher-viewer"
          aria-label="Voucher ampliado"
          onClick={(e) => {
            if (e.target === e.currentTarget) viewer.current.close();
          }}
        >
          <div className="voucher-viewer-heading">
            <h3>Voucher de pago</h3>
            <button
              type="button"
              className="icon-button"
              aria-label="Cerrar vista previa"
              onClick={() => viewer.current.close()}
            >
              <X size={23} />
            </button>
          </div>
          <img src={file.data} alt={"Voucher ampliado: " + file.name} />
        </dialog>
      )}
    </section>
  );
}
export function OrderCommunication({ order, onCopied }) {
  const template = `Hola ${order.customer.name}, gracias por elegir NOBRALTA. Tu pedido ${order.id} está: ${order.status}. Precio total: ${currency(order.total)}. Recojo en Shalom ${order.agency.name}. Entrega estimada: 2–10 días.${order.guide ? " Guía: " + order.guide : ""}`;
  const [message, setMessage] = useState(template),
    [error, setError] = useState("");
  useEffect(() => {
    setMessage(template);
    setError("");
  }, [order.id, order.status]);
  return (
    <section className="order-communication">
      <h3>
        <Envelope size={20} />
        Comunicación con el cliente
      </h3>
      <dl className="order-info-grid">
        <div>
          <dt>WhatsApp</dt>
          <dd>{order.customer.phone}</dd>
        </div>
        <div>
          <dt>Correo</dt>
          <dd>{order.customer.email}</dd>
        </div>
        <div className="wide">
          <dt>Asunto</dt>
          <dd>Tu compra NOBRALTA · {order.id}</dd>
        </div>
      </dl>
      <label className="field">
        Mensaje de compra
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="button button-outline"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(message);
            setError("");
            onCopied(
              "Mensaje copiado. Puedes revisarlo y adjuntar el detalle PDF antes de enviarlo.",
            );
          } catch {
            setError(
              "No pudimos copiar el mensaje. Selecciona el texto y cópialo manualmente.",
            );
          }
        }}
      >
        <Copy size={18} />
        Copiar mensaje
      </button>
      {error && <p role="alert">{error}</p>}
      <p className="form-hint">
        Prepara el detalle PDF y las pruebas de despacho para adjuntarlos en tu
        canal de atención. El envío del mensaje se realiza fuera de esta
        pantalla.
      </p>
    </section>
  );
}
