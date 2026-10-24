import { Truck, Check } from "@phosphor-icons/react";
import { Field } from "./Customer";
import { currency } from "./store";
export function OrderLogistics({ order, onQuote }) {
  const editable = ["Por pagar", "Pago observado", "En revisión"].includes(
    order.status,
  );
  return (
    <div className="order-logistics">
      <h3>
        <Truck size={21} />
        Logística del pedido
      </h3>
      {editable ? (
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            onQuote(
              order.id,
              Number(new FormData(e.currentTarget).get("shipping")),
            );
          }}
        >
          <div className="section-title">
            <p className="form-hint">
              Confirma el costo para la agencia de este pedido. Registra 0 si el
              envío no tiene costo.
            </p>
            <button className="button button-dark">
              <Check size={18} />
              Confirmar envío
            </button>
          </div>
          <Field
            key={order.shipping ?? "pending"}
            label="Costo de envío (S/)"
            name="shipping"
            type="number"
            min="0"
            step="0.01"
            defaultValue={order.shipping ?? ""}
            required
          />
          {order.shippingQuotedAt && (
            <p className="form-hint">
              Costo confirmado. Se incluye en el total del cliente y en el PDF.
            </p>
          )}
        </form>
      ) : (
        <p className="logistics-confirmed">
          Envío:{" "}
          <strong>
            {order.shipping != null
              ? currency(order.shipping)
              : "Sin importe registrado"}
          </strong>
        </p>
      )}
    </div>
  );
}
