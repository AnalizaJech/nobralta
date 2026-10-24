import { useEffect, useRef, useState } from "react";
import { Check, X } from "@phosphor-icons/react";
export function AvatarCrop({ image, onApply, onCancel, qr = false }) {
  const modal = useRef(null),
    canvas = useRef(null),
    drag = useRef(null);
  const [zoom, setZoom] = useState(1),
    [x, setX] = useState(50),
    [y, setY] = useState(50);
  useEffect(() => {
    modal.current.showModal();
  }, []);
  useEffect(() => {
    const side = Math.min(image.naturalWidth, image.naturalHeight) / zoom;
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, 400, 400);
    if (qr) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 400, 400);
      ctx.imageSmoothingEnabled = false;
    }
    ctx.drawImage(
      image,
      ((image.naturalWidth - side) * x) / 100,
      ((image.naturalHeight - side) * y) / 100,
      side,
      side,
      0,
      0,
      400,
      400,
    );
  }, [image, zoom, x, y, qr]);
  return (
    <dialog
      ref={modal}
      className="avatar-crop"
      aria-label={qr ? "Recortar QR" : "Recortar foto de perfil"}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      <div className="avatar-crop-heading">
        <h3>{qr ? "Recorta tu QR" : "Recorta tu foto"}</h3>
        <button
          type="button"
          className="icon-button"
          aria-label="Cancelar recorte"
          onClick={onCancel}
        >
          <X size={22} />
        </button>
      </div>
      <p>
        {qr
          ? "Mantén todo el código y su margen blanco dentro del cuadrado. Arrastra la imagen o utiliza los controles."
          : "Ajusta el encuadre cuadrado. Arrastra la imagen o utiliza los controles."}
      </p>
      <canvas
        ref={canvas}
        width="400"
        height="400"
        aria-label="Vista previa del recorte cuadrado"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, px: x, py: y };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const side = Math.min(image.naturalWidth, image.naturalHeight) / zoom,
            k = side / e.currentTarget.clientWidth;
          const dx = image.naturalWidth - side,
            dy = image.naturalHeight - side;
          setX(
            dx
              ? Math.max(
                  0,
                  Math.min(
                    100,
                    drag.current.px -
                      (((e.clientX - drag.current.x) * k) / dx) * 100,
                  ),
                )
              : 50,
          );
          setY(
            dy
              ? Math.max(
                  0,
                  Math.min(
                    100,
                    drag.current.py -
                      (((e.clientY - drag.current.y) * k) / dy) * 100,
                  ),
                )
              : 50,
          );
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
      <label>
        Acercar
        <input
          type="range"
          min="1"
          max="3"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
        />
      </label>
      <label>
        Posición horizontal
        <input
          type="range"
          min="0"
          max="100"
          value={x}
          onChange={(e) => setX(+e.target.value)}
        />
      </label>
      <label>
        Posición vertical
        <input
          type="range"
          min="0"
          max="100"
          value={y}
          onChange={(e) => setY(+e.target.value)}
        />
      </label>
      <div className="avatar-crop-actions">
        <button
          type="button"
          className="button button-dark"
          onClick={() =>
            onApply(
              qr
                ? canvas.current.toDataURL("image/png")
                : canvas.current.toDataURL("image/jpeg", 0.88),
            )
          }
        >
          <Check size={18} />
          Usar recorte
        </button>
        <button
          type="button"
          className="button button-outline"
          onClick={onCancel}
        >
          <X size={18} />
          Cancelar
        </button>
      </div>
    </dialog>
  );
}
