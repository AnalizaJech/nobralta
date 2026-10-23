import { useState, useRef, useEffect } from "react";
import {
  CreditCard,
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
          <p>Cuenta / número: {selected.account}</p>
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
  const [methods, setMethods] = useState(() => paymentMethods(settings)),
    [message, setMessage] = useState("");
  const change = (id, key, value) =>
    setMethods((ms) =>
      ms.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    );
  return (
    <form
      className="admin-section payment-admin"
      onSubmit={(e) => {
        e.preventDefault();
        setSettings((s) => ({ ...s, paymentMethods: methods }));
        log("Medios de pago", "Configuración actualizada");
        setMessage("Medios de pago guardados.");
      }}
    >
      <h2>Medios de pago</h2>
      <p>
        Configura los datos que verá el comprador. Las constancias se revisan
        desde Pedidos.
      </p>
      {methods.map((m) => (
        <fieldset key={m.id}>
          <legend>{m.name || "Nuevo medio"}</legend>
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
                  value={m[key] || ""}
                  required={m.active || key === "name"}
                  placeholder={placeholder}
                  onChange={(e) => change(m.id, key, e.target.value)}
                />
              </label>
            ))}
          </div>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={!!m.active}
              onChange={(e) => change(m.id, "active", e.target.checked)}
            />
            Mostrar al comprador
          </label>
          <button
            type="button"
            className="button button-outline"
            onClick={() => setMethods((ms) => ms.filter((x) => x.id !== m.id))}
          >
            <Trash size={18} />
            Eliminar medio
          </button>
        </fieldset>
      ))}
      <div className="payment-admin-actions">
        <button
          type="button"
          className="button button-outline"
          onClick={() =>
            setMethods((ms) => [
              ...ms,
              {
                id: crypto.randomUUID(),
                name: "",
                owner: "",
                account: "",
                active: false,
              },
            ])
          }
        >
          <Plus size={18} />
          Añadir medio
        </button>
        <button className="button button-dark">
          <Check size={18} />
          Guardar medios
        </button>
      </div>
      <p role="status">{message}</p>
    </form>
  );
}
