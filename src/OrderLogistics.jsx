import { Truck, Check, ArrowRight } from "@phosphor-icons/react";
import { Field } from "./Customer";
import { AdminBadge, AdminEmpty } from "./AdminFeedback";
import { currency } from "./store";
export function OrderLogistics({ orders, onQuote, onOrder }) {
  const queue = orders.filter((o) => o.status !== "Cancelado");
  return (
    <div className="logistics-orders">
      {queue.length ? (
        queue.map((o) => {
          const editable = [
            "Por pagar",
            "Pago observado",
            "En revisión",
          ].includes(o.status);
          return (
            <section className="admin-section" key={o.id}>
              <div className="section-title">
                <h2>Pedido {o.id}</h2>
                <AdminBadge>{o.status}</AdminBadge>
              </div>
              <div className="logistics-order-grid">
                <div>
                  <h3>
                    <Truck size={20} />
                    Destino de recojo
                  </h3>
                  <strong>{o.agency.name}</strong>
                  <p>
                    {o.agency.region} · {o.agency.city}
                  </p>
                  <p>
                    {o.customer.name} {o.customer.lastName}
                  </p>
                  <span className="form-hint">
                    Productos: {currency(o.total)}
                  </span>
                </div>
                {editable ? (
                  <form
                    className="form-grid"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onQuote(
                        o.id,
                        Number(new FormData(e.currentTarget).get("shipping")),
                      );
                    }}
                  >
                    <Field
                      key={o.shipping ?? "pending"}
                      label="Costo de envío (S/)"
                      name="shipping"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={o.shipping ?? ""}
                      required
                    />
                    <p className="form-hint">
                      Registra el importe acordado para este destino. El cliente
                      verá el costo y el total actualizado; 0 indica envío sin
                      costo.
                    </p>
                    <button className="button button-dark">
                      <Check size={18} />
                      Confirmar envío
                    </button>
                  </form>
                ) : (
                  <div>
                    <h3>Costo de envío</h3>
                    <strong>
                      {o.shipping != null
                        ? currency(o.shipping)
                        : "Sin importe registrado"}
                    </strong>
                    <p className="form-hint">
                      El pedido ya pasó a preparación, despacho o entrega.
                      Consulta sus datos desde el detalle.
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="button button-outline"
                onClick={() => onOrder(o.id)}
              >
                Ver pedido
                <ArrowRight size={18} />
              </button>
            </section>
          );
        })
      ) : (
        <AdminEmpty icon={Truck} title="No hay pedidos para coordinar">
          Los pedidos registrados aparecerán aquí para gestionar su envío.
        </AdminEmpty>
      )}
    </div>
  );
}
