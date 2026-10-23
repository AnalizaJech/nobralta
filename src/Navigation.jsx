import { AssetImage } from "./AssetImage";
import {
  ArrowUpRight,
  ArrowRight,
  Receipt,
  Truck,
  UserCircle,
  Briefcase,
} from "@phosphor-icons/react";
export function Navigation({
  products,
  onCategory,
  onAccount,
  onOrder,
  onHelp,
  onJobs,
  onPacks,
}) {
  const pima = products.find((p) => p.id === "pima"),
    jacket =
      products.find((p) => p.id === "archivo") ||
      products.find((p) => p.id === "racer");
  return (
    <nav
      id="navigation"
      className="navigation-v4"
      aria-label="Navegación principal"
    >
      <div className="navigation-title">
        <p>ENCUENTRA LO TUYO</p>
        <h2>¿Qué te vas a poner?</h2>
      </div>
      <div className="navigation-columns">
        <section>
          <h3>Comprar por prenda</h3>
          <div className="nav-primary">
            {["Todas", "Polos", "Chaquetas", "Jeans"].map((c) => (
              <button key={c} onClick={() => onCategory(c)}>
                {c === "Todas" ? "Ver todas las prendas" : c}
                <ArrowUpRight size={19} />
              </button>
            ))}
          </div>
          <div className="nav-secondary">
            {[
              "Camisas",
              "Cafarenas",
              "Botas",
              "Pantalones de vestir",
              "Blazers",
              "Gabardinas",
            ].map((c) => (
              <button key={c} onClick={() => onCategory(c)}>
                {c}
              </button>
            ))}
          </div>
          <button
            className="button button-dark nav-pack-link"
            onClick={onPacks}
          >
            Packs y conjuntos
            <ArrowRight size={18} />
          </button>
        </section>
        <section className="nav-assistance">
          <h3>Tu compra, sin vueltas</h3>
          {[
            [onAccount, UserCircle, "Mi cuenta", "Tus datos y pedidos"],
            [
              onOrder,
              Receipt,
              "Seguir mi pedido",
              "Consulta el estado de tu compra",
            ],
            [onHelp, Truck, "Envíos y ayuda", "Recojo Shalom y atención"],
            [
              onJobs,
              Briefcase,
              "Trabaja con nosotros",
              "Oportunidades en NOBRALTA",
            ],
          ].map(([action, Icon, title, copy]) => (
            <button key={title} onClick={action}>
              <Icon size={21} />
              <span>
                <strong>{title}</strong>
                <small>{copy}</small>
              </span>
              <ArrowRight size={17} />
            </button>
          ))}
        </section>
        <section className="nav-discover">
          <h3>Empieza por aquí</h3>
          {[
            [pima, "Polos", "Tu básico. Tu color."],
            [jacket, "Chaquetas", "Una capa con carácter."],
          ].map(
            ([p, cat, title]) =>
              p && (
                <button
                  className="nav-feature"
                  key={cat}
                  onClick={() => onCategory(cat)}
                >
                  <span>
                    <small>{cat}</small>
                    <strong>{title}</strong>
                    <ArrowUpRight size={22} />
                  </span>
                  <AssetImage src={p.variants[0].image} alt="" />
                </button>
              ),
          )}
        </section>
      </div>
    </nav>
  );
}
