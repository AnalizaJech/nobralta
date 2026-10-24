import { OptionalImage } from "./OptionalImage";
import { AssetImage } from "./AssetImage";
import { AdminNotice, AdminBadge, AdminEmpty } from "./AdminFeedback";
import { useState, useRef, useEffect } from "react";
import {
  CreditCard,
  PencilSimple,
  X,
  UserCircle,
  Bank,
  QrCode,
  UploadSimple,
  Trash,
  Plus,
  Check,
  FilePdf,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { Select } from "./Select";
import { currency } from "./store";
export function paymentMethods(settings) {
  return (
    settings.paymentMethods ||
    (settings.paymentActive && settings.paymentAccount
      ? [
          {
            id: "legacy",
            name: settings.paymentName,
            owner: settings.paymentOwner,
            account: settings.paymentAccount,
            active: true,
          },
        ]
      : [])
  );
}
export function DiscountNotice({ applied, discount = 0, onRemove }) {
  if (!applied) return null;
  return (
    <div className="discount-summary" role="status">
      <Check size={19} />
      <div>
        <strong>{applied.code} aplicado</strong>
        <p>
          {discount > 0
            ? `${applied.percent}% en prendas individuales`
            : "Los packs mantienen su precio especial."}
        </p>
      </div>
      {discount > 0 && <b>−{currency(discount)}</b>}
      {onRemove && (
        <button
          type="button"
          className="icon-button"
          aria-label="Quitar código"
          onClick={onRemove}
        >
          <Trash size={17} />
        </button>
      )}
    </div>
  );
}
export function VoucherUpload({ onFileChange }) {
  const input = useRef(null),
    [file, setFile] = useState(null),
    [url, setUrl] = useState(""),
    [error, setError] = useState("");
  useEffect(() => {
    if (!file) {
      setUrl("");
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  const clear = () => {
    if (input.current) input.current.value = "";
    setFile(null);
    onFileChange?.(null);
    setError("");
  };
  return (
    <div className="voucher-control">
      <input
        className="voucher-file"
        ref={input}
        name="voucher"
        aria-label="Voucher de pago"
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        required
        onInvalid={(e) => {
          e.preventDefault();
          setError("Adjunta tu voucher para continuar.");
        }}
        onChange={(e) => {
          const next = e.target.files[0];
          if (!next) return;
          if (
            !["image/jpeg", "image/png", "application/pdf"].includes(
              next.type,
            ) ||
            next.size > 750000
          ) {
            clear();
            setError("Usa JPG, PNG o PDF de hasta 750 KB.");
            return;
          }
          setFile(next);
          onFileChange?.(next);
          setError("");
        }}
      />
      {file ? (
        <>
          <div className="voucher-preview">
            {file.type.startsWith("image/") ? (
              <a
                href={url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir imagen del voucher"
              >
                <img
                  src={url || undefined}
                  alt="Vista previa del voucher adjunto"
                />
              </a>
            ) : (
              <a
                className="voucher-pdf"
                href={url || undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FilePdf size={36} />
                <span>Abrir voucher PDF</span>
                <ArrowSquareOut size={18} />
              </a>
            )}
          </div>
          <p className="voucher-filename">
            <strong>{file.name}</strong>
            <span>{Math.ceil(file.size / 1024)} KB · Archivo adjunto</span>
          </p>
          <div className="voucher-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={() => input.current?.click()}
            >
              <UploadSimple size={17} />
              Cambiar voucher
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={clear}
            >
              <Trash size={17} />
              Eliminar
            </button>
          </div>
          <p className="form-hint">
            Revisa que los datos de tu comprobante sean legibles.
          </p>
        </>
      ) : (
        <button
          type="button"
          className="voucher-upload voucher-upload-button"
          onClick={() => input.current?.click()}
        >
          <UploadSimple size={26} />
          <strong>Adjuntar voucher de pago</strong>
          <span>JPG, PNG o PDF · máximo 750 KB</span>
        </button>
      )}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
export function CheckoutPayment({
  settings,
  total,
  onBack,
  applied,
  discount,
}) {
  const methods = paymentMethods(settings).filter((x) => x.active && x.account),
    [method, setMethod] = useState("");
  const selected = methods.find((x) => x.name === method);
  return (
    <aside className="checkout-payment">
      <h3>
        <CreditCard size={24} />
        Pago y voucher
      </h3>
      <DiscountNotice applied={applied} discount={discount} />
      <div className="checkout-total">
        <span>Precio total</span>
        <strong>{currency(total)}</strong>
      </div>
      <p className="form-hint">
        El envío se cotiza por separado. Verifica el importe y el titular antes
        de pagar.
      </p>
      <label className="field">
        Plataforma o medio de pago
        <Select
          name="method"
          aria-label="Medio de pago"
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
          }}
          required
        >
          <option value="">Elige el medio de pago</option>
          {(methods.length
            ? methods
            : [
                { id: "yape", name: "Yape" },
                { id: "plin", name: "Plin" },
                { id: "bank", name: "Transferencia bancaria" },
              ]
          ).map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </Select>
      </label>
      {selected ? (
        <div className="payment-instructions">
          <strong>{selected.name}</strong>
          <p>Titular: {selected.owner}</p>
          <p>
            Cuenta / número: <strong>{selected.account}</strong>
          </p>
          {selected.qr && (
            <div className="checkout-payment-qr">
              <AssetImage src={selected.qr} alt={"QR de " + selected.name} />
              <span>QR de {selected.name}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="form-hint">
          {methods.length
            ? "Elige un medio para ver sus datos."
            : "Los datos de pago se confirmarán al revisar tu pedido."}
        </p>
      )}
      {method && (
        <div className="voucher-fields" key={method}>
          <label className="field">
            Número de operación
            <input name="reference" required placeholder="Ej. 123456789" />
          </label>
          <VoucherUpload />
          <p className="form-hint">
            Tu constancia se enviará a revisión. El pago se confirma cuando el
            administrador lo verifique.
          </p>
        </div>
      )}
      <button
        className="button button-dark full"
        type="submit"
        disabled={!method}
      >
        Confirmar y enviar voucher
        <Check size={19} />
      </button>
      <button
        type="button"
        className="button button-outline full checkout-back"
        onClick={onBack}
      >
        Volver al carrito
      </button>
    </aside>
  );
}
export function PaymentMethodsAdmin({ settings, setSettings, log }) {
  const [draft, setDraft] = useState(null),
    [message, setMessage] = useState("");
  const methods = paymentMethods(settings);
  const editor = useRef(null);
  useEffect(() => {
    if (draft)
      editor.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [draft?.id]);
  const change = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  return (
    <div className="payment-admin-workspace">
      <div className="section-title">
        <h2>
          <CreditCard size={22} />
          Plataformas y cuentas
        </h2>
        {!draft && (
          <button
            className="button button-dark"
            onClick={() => {
              setMessage("");
              setDraft({
                id: crypto.randomUUID(),
                name: "",
                owner: "",
                account: "",
                qr: "",
                active: true,
              });
            }}
          >
            <Plus size={18} />
            Añadir medio
          </button>
        )}
      </div>
      <AdminNotice>{message}</AdminNotice>
      {draft && (
        <form
          ref={editor}
          className="admin-section form-grid payment-method-editor"
          onSubmit={(e) => {
            e.preventDefault();
            const method = {
              ...draft,
              name: String(draft.name || " ").trim(),
              owner: String(draft.owner || "").trim(),
              account: String(draft.account || "").trim(),
            };
            if (
              !method.name ||
              (method.active && (!method.owner || !method.account))
            ) {
              setMessage(
                "Completa la plataforma, el titular y el número de cuenta.",
              );
              return;
            }
            setSettings((s) => {
              const list = paymentMethods(s);
              return {
                ...s,
                paymentMethods: list.some((m) => m.id === method.id)
                  ? list.map((m) => (m.id === method.id ? method : m))
                  : [...list, method],
              };
            });
            log("Medios de pago", method.name + " guardado");
            setDraft(null);
            setMessage("Medio de pago guardado.");
          }}
        >
          <div className="section-title">
            <h3>
              <PencilSimple size={21} />
              {methods.some((m) => m.id === draft.id)
                ? "Editar medio de pago"
                : "Nuevo medio de pago"}
            </h3>
            <div className="admin-heading-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={() => setDraft(null)}
              >
                <X size={18} />
                Cancelar
              </button>
              <button className="button button-dark">
                <Check size={18} />
                Guardar cambios
              </button>
            </div>
          </div>
          <div className="form-grid two">
            {[
              ["name", "Plataforma / banco", "Yape, Plin, BCP…"],
              ["owner", "Titular", "Nombre del titular"],
              [
                "account",
                "Número / cuenta / CCI",
                "Número visible al comprador",
              ],
            ].map(([key, label, placeholder]) => (
              <label className="field" key={key}>
                {label}
                <input
                  value={draft[key] || ""}
                  maxLength={key === "account" ? 60 : 100}
                  required={draft.active || key === "name"}
                  placeholder={placeholder}
                  onChange={(e) => change(key, e.target.value)}
                />
              </label>
            ))}
          </div>
          <OptionalImage
            label={"QR de " + (draft.name || "pago")}
            value={draft.qr || ""}
            onChange={(value) => change("qr", value)}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={!!draft.active}
              onChange={(e) => change("active", e.target.checked)}
            />
            Mostrar al comprador
          </label>
        </form>
      )}
      <div className="payment-method-list">
        {methods.length ? (
          methods.map((m) => (
            <article className="payment-method-card" key={m.id}>
              <div className="payment-method-summary">
                {m.qr ? (
                  <AssetImage src={m.qr} alt={"QR de " + m.name} />
                ) : (
                  <span className="payment-method-symbol">
                    <CreditCard size={26} />
                  </span>
                )}
                <div>
                  <h3>{m.name}</h3>
                  <AdminBadge>{m.active ? "Activa" : "Pausada"}</AdminBadge>
                </div>
              </div>
              <dl>
                <div>
                  <dt>
                    <UserCircle size={17} />
                    Titular
                  </dt>
                  <dd>{m.owner || "Sin registrar"}</dd>
                </div>
                <div>
                  <dt>
                    <Bank size={17} />
                    Número / cuenta
                  </dt>
                  <dd>{m.account || "Sin registrar"}</dd>
                </div>
                <div>
                  <dt>
                    <QrCode size={17} />
                    QR
                  </dt>
                  <dd>{m.qr ? "Configurado" : "Sin imagen"}</dd>
                </div>
              </dl>
              <div className="payment-method-actions">
                <button
                  className="button button-outline"
                  onClick={() => {
                    setMessage("");
                    setDraft({ ...m });
                  }}
                >
                  <PencilSimple size={18} />
                  Editar
                </button>
                <button
                  className="button button-danger"
                  onClick={() => {
                    setSettings((s) => ({
                      ...s,
                      paymentMethods: paymentMethods(s).filter(
                        (x) => x.id !== m.id,
                      ),
                    }));
                    if (draft?.id === m.id) setDraft(null);
                    log("Medios de pago", m.name + " eliminado");
                    setMessage("Medio de pago eliminado.");
                  }}
                >
                  <Trash size={18} />
                  Eliminar
                </button>
              </div>
            </article>
          ))
        ) : (
          <AdminEmpty icon={CreditCard} title="Sin medios de pago">
            Añade una plataforma o banco para mostrar sus datos en la compra.
          </AdminEmpty>
        )}
      </div>
    </div>
  );
}
