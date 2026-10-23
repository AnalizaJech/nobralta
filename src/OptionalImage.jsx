import { useRef, useState } from "react";
import { UploadSimple, Trash, UserCircle, QrCode } from "@phosphor-icons/react";
import { assetUrl } from "./AssetImage";
export function OptionalImage({ value, onChange, label, avatar = false }) {
  const input = useRef(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const Icon = avatar ? UserCircle : QrCode;
  return (
    <div className={"optional-image " + (avatar ? "is-avatar" : "is-qr")}>
      <div className="optional-image-preview">
        {value ? (
          <img src={assetUrl(value)} alt={label} />
        ) : (
          <Icon size={48} weight="light" />
        )}
      </div>
      <div className="optional-image-info">
        <strong>{label}</strong>
        <p>
          {avatar
            ? "Opcional. Personaliza tu cuenta con una foto."
            : "Imagen que se mostrará al elegir este medio de pago."}
        </p>
        <span>JPG, PNG o WebP · máximo 500 KB</span>
        <input
          ref={input}
          type="file"
          className="image-file-input"
          aria-label={label}
          accept="image/jpeg,image/png,image/webp"
          onChange={async (e) => {
            const f = e.target.files[0];
            if (!f) return;
            setError("");
            if (
              !["image/jpeg", "image/png", "image/webp"].includes(f.type) ||
              f.size > 500000
            ) {
              setError("Elige una imagen JPG, PNG o WebP de hasta 500 KB.");
              e.target.value = "";
              return;
            }
            setBusy(true);
            try {
              const data = await new Promise((resolve, reject) => {
                const r = new FileReader();
                r.onload = () => resolve(r.result);
                r.onerror = () => reject(Error());
                r.readAsDataURL(f);
              });
              const img = new Image();
              img.src = data;
              await img.decode();
              onChange(data);
            } catch {
              setError("No pudimos leer la imagen. Prueba con otra.");
            } finally {
              setBusy(false);
              e.target.value = "";
            }
          }}
        />
        <div className="optional-image-actions">
          <button
            type="button"
            className="button button-outline"
            disabled={busy}
            onClick={() => input.current.click()}
          >
            <UploadSimple size={18} />
            {busy ? "Cargando…" : value ? "Cambiar imagen" : "Subir imagen"}
          </button>
          {value && (
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                onChange("");
                setError("");
              }}
            >
              <Trash size={18} />
              Eliminar imagen
            </button>
          )}
        </div>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
