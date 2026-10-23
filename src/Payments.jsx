import { useState } from "react";
import {
  CreditCard,
  UploadSimple,
  Trash,
  Plus,
  Check,
} from "@phosphor-icons/react";
import { Select } from "./Select";
import { DateField } from "./DateField";
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
export function CheckoutPayment({ settings, total }) {
  const methods = paymentMethods(settings).filter((x) => x.active && x.account),
    [method, setMethod] = useState(""),
    [report, setReport] = useState(false),
    [filename, setFilename] = useState("");
  const selected = methods.find((x) => x.name === method);
  return (
    <aside className="checkout-payment">
      <h3>
        <CreditCard size={24} />
        Pago y voucher
      </h3>
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
          onChange={(e) => setMethod(e.target.value)}
          required={report}
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
      <label className="checkbox">
        <input
          name="reportPayment"
          type="checkbox"
          checked={report}
          onChange={(e) => setReport(e.target.checked)}
        />
        Ya realicé un pago y quiero adjuntar mi voucher
      </label>
      {report && (
        <div className="voucher-fields">
          <label className="field">
            Número de operación
            <input name="reference" required placeholder="Ej. 123456789" />
          </label>
          <label className="field">
            Importe pagado (S/)
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              placeholder="0.00"
            />
          </label>
          <DateField
            label="Fecha y hora del pago"
            name="paidAt"
            type="datetime-local"
            required
          />
          <label className="voucher-upload">
            <UploadSimple size={26} />
            <strong>{filename || "Adjuntar voucher de pago"}</strong>
            <span>JPG, PNG o PDF · máximo 750 KB</span>
            <input
              name="voucher"
              aria-label="Voucher de pago"
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              required
              onChange={(e) => setFilename(e.target.files[0]?.name || "")}
            />
          </label>
          <p className="form-hint">
            Tu constancia se enviará a revisión. El pago se confirma cuando el
            administrador lo verifique.
          </p>
        </div>
      )}
      <button className="button button-dark full" type="submit">
        {report ? "Confirmar y enviar voucher" : "Confirmar mi pedido"}
        <Check size={19} />
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
