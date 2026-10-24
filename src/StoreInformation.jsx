import { AssetImage } from "./AssetImage";
import { SocialLinks } from "./Merchandising";
import { paymentMethods } from "./Payments";
import {
  Package,
  Receipt,
  MapPin,
  UserCircle,
  Ruler,
  Envelope,
  Clock,
  CheckCircle,
  ShieldCheck,
} from "@phosphor-icons/react";
const pages = {
  Ayuda: {
    title: "Te acompañamos en tu compra.",
    intro:
      "Encuentra lo que necesitas para elegir tu prenda, completar el pedido y seguir su recorrido.",
    sections: [
      [
        Ruler,
        "Elige con confianza",
        "Revisa las imágenes, los colores disponibles y las medidas de cada prenda. Compara la tabla de tallas con una pieza que ya te quede bien antes de añadirla a tu bolsa.",
      ],
      [
        Receipt,
        "Completa tu compra",
        "Comprueba las prendas, cantidades y tallas. Inicia sesión, completa los datos de quien recogerá el pedido y selecciona la agencia de destino. Elige el medio de pago y adjunta tu voucher para enviarlo a revisión.",
      ],
      [
        UserCircle,
        "Consulta el avance",
        "En Mi cuenta encontrarás Mis pedidos para seguir el pago, la preparación y el despacho. El historial de compras conserva el detalle de tus pedidos.",
      ],
      [
        Envelope,
        "Si necesitas ayuda",
        "Conserva el código de tu pedido. Indica la prenda o la etapa de compra sobre la que consultas para que podamos identificar la información que necesitas.",
      ],
    ],
  },
  "Envíos y recojo": {
    title: "Tu pedido, hasta tu agencia.",
    intro:
      "Compra online para Perú y elige una agencia Shalom de recojo al completar tu pedido.",
    sections: [
      [
        MapPin,
        "Elige la ubicación correcta",
        "Busca por nombre de agencia, distrito o dirección. Selecciona una agencia habilitada y revisa la dirección antes de confirmar; algunas ubicaciones no reciben envíos.",
      ],
      [
        UserCircle,
        "Datos para el recojo",
        "Registra nombres y apellidos completos, DNI, teléfono y correo de la persona que recogerá el pedido. Verifica que los datos coincidan con su documento.",
      ],
      [
        Receipt,
        "Costo del envío",
        "El envío se cotiza por separado según el destino. Confirma el costo y el total de tu compra antes de transferir. La cotización aparecerá en el detalle del pedido cuando se registre.",
      ],
      [
        Clock,
        "Plazo y seguimiento",
        "La entrega estimada es de 2–10 días desde la confirmación del pago y el destino. Consulta las actualizaciones y la guía de despacho disponible en Mis pedidos.",
      ],
    ],
  },
  "Medios de pago": {
    title: "Los datos claros, antes de pagar.",
    intro:
      "Elige el medio disponible al completar tu compra y revisa el titular, la cuenta y el importe.",
    sections: [
      [
        Receipt,
        "Dónde encontrar los datos",
        "Al seleccionar la plataforma verás el número de teléfono o cuenta correspondiente. Si el medio tiene un QR configurado, aparecerá en ese mismo apartado.",
      ],
      [
        Package,
        "Qué importe revisar",
        "El precio de las prendas y el costo de envío se muestran por separado. Confirma la cotización del envío y el total de tu pedido antes de realizar el pago.",
      ],
      [
        CheckCircle,
        "Adjunta tu constancia",
        "Registra el número de operación y carga tu voucher en JPG, PNG o PDF de hasta 750 KB. Comprueba que la información se pueda leer antes de confirmar.",
      ],
      [
        Clock,
        "Revisión del abono",
        "Recibir el voucher no confirma automáticamente el pago. El estado de tu pedido se actualizará cuando se contraste el abono; si hace falta una corrección, la verás en el seguimiento.",
      ],
    ],
  },
  "Guía de tallas": {
    title: "Encuentra tu medida.",
    intro: "La mejor referencia es una prenda que ya te quede como te gusta.",
    sections: [
      [
        Ruler,
        "Consulta la ficha de cada pieza",
        "Abre el producto y entra en Medidas. Las tablas dependen del modelo; no todas las prendas comparten el mismo ajuste.",
      ],
      [
        Package,
        "Compara sobre una superficie plana",
        "Coloca tu prenda sin estirarla y compara las medidas indicadas en la ficha. Revisa las unidades y distingue las medidas en plano de los contornos.",
      ],
      [
        CheckCircle,
        "Revisa antes de confirmar",
        "Comprueba la talla y el color de cada pieza de tu bolsa. En los packs, revisa la selección de todas las prendas incluidas.",
      ],
    ],
  },
  Privacidad: {
    title: "Tu información, con un propósito.",
    intro:
      "La información de tu cuenta acompaña la atención de tu pedido y el proceso de recojo.",
    sections: [
      [
        UserCircle,
        "Información de la cuenta",
        "Nombre, correo y teléfono permiten identificar tu cuenta y mantener tus datos de contacto. La foto de perfil es opcional y puedes cambiarla o quitarla desde Mis datos.",
      ],
      [
        MapPin,
        "Datos del destinatario",
        "Los nombres, DNI y la agencia se utilizan para organizar el recojo. Revisa esta información al confirmar cada pedido, incluso si compras para otra persona.",
      ],
      [
        Receipt,
        "Constancias y seguimiento",
        "El voucher y el número de operación se revisan dentro de la gestión del pedido. Los datos de destinatarios y las constancias no forman parte del catálogo público.",
      ],
      [
        Envelope,
        "Actualización de información",
        "Puedes modificar tus datos de cuenta desde Mis datos. Para una consulta sobre un pedido ya registrado, conserva su código y comunícate por los canales de atención publicados.",
      ],
    ],
  },
  Condiciones: {
    title: "Compra con toda la información.",
    intro:
      "Revisa la selección, las medidas y el destino antes de confirmar tu pedido.",
    sections: [
      [
        Package,
        "Prendas y disponibilidad",
        "La selección depende del modelo, el color y la talla. Confirma las cantidades de la bolsa y revisa cada pieza de un pack antes de continuar.",
      ],
      [
        Receipt,
        "Precios y pago",
        "Los precios se expresan en soles peruanos. El envío se cotiza por separado. Adjuntar una constancia inicia la revisión; el pago se confirma tras contrastar el abono.",
      ],
      [
        MapPin,
        "Destino y entrega",
        "El recojo se coordina en la agencia elegida con los datos del destinatario. La entrega estimada es de 2–10 días desde confirmar pago y destino.",
      ],
      [
        ShieldCheck,
        "Cambios e incidencias",
        "No ofrecemos cambios por talla, color o preferencia ni devoluciones voluntarias. Esto no limita tus derechos ante defectos o incumplimiento del pedido. Para comunicar una incidencia, indica el código de pedido y describe lo ocurrido con imágenes cuando corresponda.",
      ],
    ],
  },
  "Sobre NOBRALTA": {
    title: "Silueta. Actitud. NOBRALTA.",
    intro:
      "Prendas para construir una forma propia de vestir: básicos, denim y piezas de carácter.",
    sections: [
      [
        Package,
        "Una selección para combinar",
        "Explora polos, camisas, pantalones, chaquetas y botas. Las fichas reúnen las imágenes, opciones y medidas disponibles para elegir cada pieza.",
      ],
      [
        Receipt,
        "De la elección al pedido",
        "Compra prendas individuales o revisa nuestros conjuntos. Antes de confirmar podrás comprobar tallas, colores, cantidades y el precio de tu selección.",
      ],
      [
        MapPin,
        "Atención online en Perú",
        "La compra se realiza online y el recojo se coordina mediante agencias Shalom. No contamos con una tienda física abierta al público.",
      ],
    ],
  },
};
export function StoreInformation({ page, settings }) {
  const data = pages[page] || pages.Ayuda;
  return (
    <article className="store-information">
      <header>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
      </header>
      <div className="store-information-grid">
        {data.sections.map(([Icon, title, body]) => (
          <section key={title}>
            <h2>
              <Icon size={24} />
              {title}
            </h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
      {page === "Medios de pago" && (
        <section className="information-contact">
          <h2>Medios disponibles</h2>
          <div className="information-methods">
            {paymentMethods(settings)
              .filter((m) => m.active)
              .map((m) => (
                <span key={m.id}>{m.name}</span>
              ))}
          </div>
        </section>
      )}
      <section className="information-contact">
        <h2>
          <Envelope size={22} />
          Atención NOBRALTA
        </h2>
        <p>Para consultar una compra, ten a mano tu código de pedido.</p>
        {settings.email && (
          <a href={"mailto:" + settings.email}>{settings.email}</a>
        )}
        {settings.phone && (
          <a href={"tel:" + settings.phone.replace(/\s/g, "")}>
            {settings.phone}
          </a>
        )}
        <p>{settings.review || "Consulta nuestros canales de atención."}</p>
      </section>
    </article>
  );
}
export function StoreFooter({ settings, onInfo, onAccount, onJobs }) {
  return (
    <footer className="store-footer">
      <div className="footer-assurance">
        <div>
          <MapPin size={23} />
          <span>
            <strong>Recojo en agencia</strong>Elige tu destino Shalom
          </span>
        </div>
        <div>
          <Receipt size={23} />
          <span>
            <strong>Pago revisado</strong>Seguimiento de tu constancia
          </span>
        </div>
        <div>
          <Package size={23} />
          <span>
            <strong>Tu pedido a la vista</strong>Consulta cada etapa en tu
            cuenta
          </span>
        </div>
      </div>
      <div className="store-footer-main">
        <div className="store-footer-brand">
          <AssetImage src="/assets/brand-wordmark.svg" alt="NOBRALTA" />
          <p>
            Prendas con carácter. Elige tu pieza, encuentra tu talla y construye
            tu próximo conjunto.
          </p>
          <SocialLinks settings={settings} />
        </div>
        <nav aria-label="Ayuda para comprar">
          <h2>Ayuda para comprar</h2>
          <button onClick={() => onInfo("Ayuda")}>Cómo comprar</button>
          <button onClick={() => onInfo("Envíos y recojo")}>
            Envíos y recojo
          </button>
          <button onClick={() => onInfo("Medios de pago")}>
            Medios de pago
          </button>
          <button onClick={() => onInfo("Guía de tallas")}>
            Guía de tallas
          </button>
          <button onClick={onAccount}>Seguir mi pedido</button>
        </nav>
        <nav aria-label="Acerca de NOBRALTA">
          <h2>NOBRALTA</h2>
          <button onClick={() => onInfo("Sobre NOBRALTA")}>
            Sobre nosotros
          </button>
          <button onClick={onJobs}>Trabaja con nosotros</button>
          <button onClick={() => onInfo("Privacidad")}>Privacidad</button>
          <button onClick={() => onInfo("Condiciones")}>
            Condiciones de compra
          </button>
        </nav>
        <div className="store-footer-contact">
          <h2>Atención online</h2>
          <button className="footer-help" onClick={() => onInfo("Ayuda")}>
            <Envelope size={18} />
            Centro de ayuda
          </button>
          <p>{settings.review}</p>
          {settings.email && (
            <a href={"mailto:" + settings.email}>{settings.email}</a>
          )}
          {settings.phone && (
            <a href={"tel:" + settings.phone.replace(/\s/g, "")}>
              {settings.phone}
            </a>
          )}
          <p>
            ¿Ya compraste? Conserva el código de tu pedido para cualquier
            consulta.
          </p>
        </div>
      </div>
      <div className="store-footer-bottom">
        <p>© {new Date().getFullYear()} NOBRALTA</p>
        <p>Perú · Precios en soles (PEN)</p>
      </div>
    </footer>
  );
}
