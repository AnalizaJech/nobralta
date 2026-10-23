import {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
  useId,
} from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
export function Select({
  children,
  value,
  defaultValue,
  onChange,
  name,
  required,
  disabled,
  ...rest
}) {
  const options = Children.toArray(children)
    .filter(isValidElement)
    .map((o) => ({
      value: String(o.props.value ?? o.props.children ?? ""),
      label: o.props.children,
      disabled: o.props.disabled,
    }));
  const [local, setLocal] = useState(
      String(defaultValue ?? options[0]?.value ?? ""),
    ),
    [open, setOpen] = useState(false),
    [active, setActive] = useState(0),
    [error, setError] = useState(false);
  const chosen = String(value ?? local),
    root = useRef(null),
    trigger = useRef(null),
    id = useId();
  const selected = options.find((o) => o.value === chosen);
  useEffect(() => {
    const out = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", out);
    return () => document.removeEventListener("pointerdown", out);
  }, []);
  useEffect(() => {
    const form = root.current?.closest("form");
    const validate = (e) => {
      if (required && !chosen) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setError(true);
        trigger.current?.focus();
      }
    };
    form?.addEventListener("submit", validate, true);
    return () => form?.removeEventListener("submit", validate, true);
  }, [chosen, required]);
  function choose(i) {
    if (options[i]?.disabled) return;
    const next = options[i].value;
    setLocal(next);
    onChange?.({ target: { value: next }, currentTarget: { value: next } });
    setOpen(false);
    setError(false);
    trigger.current?.focus();
  }
  return (
    <span
      ref={root}
      className={
        "custom-select " +
        (open ? "is-open " : "") +
        (error ? "is-invalid" : "")
      }
    >
      <input type="hidden" name={name} value={chosen} />
      <button
        {...rest}
        ref={trigger}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={id}
        aria-haspopup="listbox"
        aria-required={required}
        disabled={disabled}
        onClick={() => {
          setOpen(!open);
          setActive(
            Math.max(
              0,
              options.findIndex((o) => o.value === chosen),
            ),
          );
        }}
        onKeyDown={(e) => {
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
            e.preventDefault();
            setOpen(true);
            setActive((a) =>
              e.key === "Home"
                ? 0
                : e.key === "End"
                  ? options.length - 1
                  : Math.max(
                      0,
                      Math.min(
                        options.length - 1,
                        a + (e.key === "ArrowDown" ? 1 : -1),
                      ),
                    ),
            );
          }
          if (e.key === "Enter" && open) {
            e.preventDefault();
            choose(active);
          }
          if (e.key === "Escape") {
            e.stopPropagation();
            setOpen(false);
          }
        }}
      >
        <span>{selected?.label || "Seleccionar"}</span>
        <CaretDown size={17} />
      </button>
      {open && (
        <span
          id={id}
          role="listbox"
          className="select-options"
          aria-label={rest["aria-label"] || name || "Opciones"}
        >
          {options.map((o, i) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={chosen === o.value}
              disabled={o.disabled}
              className={active === i ? "active" : ""}
              onPointerMove={() => setActive(i)}
              onClick={() => choose(i)}
            >
              <span>{o.label}</span>
              {chosen === o.value && <Check size={17} />}
            </button>
          ))}
        </span>
      )}
      {error && (
        <span className="select-error" role="alert">
          Elige una opción para continuar.
        </span>
      )}
    </span>
  );
}
