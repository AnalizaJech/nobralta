import {
  Package,
  CheckCircle,
  Pause,
  Clock,
  WarningCircle,
  MinusCircle,
  Truck,
} from "@phosphor-icons/react";

export function AdminEmpty({
  icon: Icon = Package,
  title,
  children,
  action,
  onAction,
}) {
  return (
    <div className="admin-feedback admin-feedback--empty">
      <Icon size={32} weight="light" aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        {children && <p>{children}</p>}
      </div>
      {action && (
        <button
          type="button"
          className="button button-outline"
          onClick={onAction}
        >
          <Icon size={18} />
          {action}
        </button>
      )}
    </div>
  );
}

export function AdminNotice({ children }) {
  if (!children) return null;
  return (
    <div className="admin-feedback admin-feedback--notice" role="status">
      <CheckCircle size={24} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

const badgeStates = {
  Publicada: ["success", CheckCircle],
  Activa: ["success", CheckCircle],
  "Recojo habilitado": ["success", CheckCircle],
  "Pago verificado": ["success", CheckCircle],
  Entregado: ["success", CheckCircle],
  Pausada: ["warning", Pause],
  "Por pagar": ["warning", Clock],
  "En revisión": ["info", Clock],
  "En preparación": ["info", Package],
  Enviado: ["info", Truck],
  "Pago observado": ["danger", WarningCircle],
  "No recibe envíos": ["neutral", MinusCircle],
  Cancelado: ["danger", MinusCircle],
};
export function AdminBadge({ children }) {
  const [tone, Icon] = badgeStates[children] || ["neutral", MinusCircle];
  return (
    <span className="status admin-badge" data-tone={tone}>
      <Icon size={14} aria-hidden="true" />
      {children}
    </span>
  );
}
