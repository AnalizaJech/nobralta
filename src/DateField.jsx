import { useState, useRef, useEffect, useId } from "react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
export function DateField({
  label,
  name,
  type,
  defaultValue = "",
  required,
  ...props
}) {
  const [value, setValue] = useState(defaultValue),
    [open, setOpen] = useState(false),
    [month, setMonth] = useState(
      () =>
        new Date(
          defaultValue
            ? defaultValue.includes("T")
              ? defaultValue
              : defaultValue + "T12:00:00"
            : Date.now(),
        ),
    ),
    [error, setError] = useState("");
  const root = useRef(null),
    input = useRef(null),
    id = useId();
  const year = month.getFullYear(),
    m = month.getMonth(),
    first = (new Date(year, m, 1).getDay() + 6) % 7,
    days = new Date(year, m + 1, 0).getDate();
  useEffect(() => {
    const close = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  function pick(day) {
    const d =
      year +
      "-" +
      String(m + 1).padStart(2, "0") +
      "-" +
      String(day).padStart(2, "0");
    setValue(
      type === "datetime-local"
        ? d + "T" + (value.split("T")[1] || "09:00")
        : d,
    );
    setOpen(false);
    setError("");
  }
  return (
    <label className="field date-field" ref={root} htmlFor={id}>
      {label}
      <span className="date-control">
        <input
          {...props}
          ref={input}
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder={
            type === "datetime-local" ? "AAAA-MM-DDT09:00" : "AAAA-MM-DD"
          }
          pattern={
            type === "datetime-local"
              ? "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              : "[0-9]{4}-[0-9]{2}-[0-9]{2}"
          }
          required={required}
          onInvalid={(e) => {
            e.preventDefault();
            setError("Completa una fecha válida.");
            input.current?.focus();
          }}
        />
        <button
          className="icon-button"
          type="button"
          aria-label={"Elegir fecha de " + label}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <CalendarBlank size={20} />
        </button>
      </span>
      {open && (
        <span className="calendar-popover">
          <span className="calendar-heading">
            <button
              type="button"
              className="icon-button"
              aria-label="Mes anterior"
              onClick={() => setMonth(new Date(year, m - 1, 1))}
            >
              <CaretLeft size={17} />
            </button>
            <strong>
              {new Intl.DateTimeFormat("es-PE", {
                month: "long",
                year: "numeric",
              }).format(month)}
            </strong>
            <button
              type="button"
              className="icon-button"
              aria-label="Mes siguiente"
              onClick={() => setMonth(new Date(year, m + 1, 1))}
            >
              <CaretRight size={17} />
            </button>
          </span>
          <span className="calendar-grid">
            {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
              <span key={"d" + i}>{d}</span>
            ))}
            {Array.from({ length: first }, (_, i) => (
              <span key={"e" + i} />
            ))}
            {Array.from({ length: days }, (_, i) => (
              <button type="button" key={i} onClick={() => pick(i + 1)}>
                {i + 1}
              </button>
            ))}
          </span>
        </span>
      )}
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
