import { Package, CheckCircle } from "@phosphor-icons/react";

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
