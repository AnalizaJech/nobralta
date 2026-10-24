import { useState } from "react";
import { Plus, Trash, Check, X, UploadSimple } from "@phosphor-icons/react";
import { Field } from "./Customer";
import { Select } from "./Select";
import { AssetImage } from "./AssetImage";
const blank = () => ({ key: crypto.randomUUID(), color: "", image: "" });
export function NewMerchandise({ categories, onSave, onCancel }) {
  const [variants, setVariants] = useState([blank()]),
    [sizes, setSizes] = useState("S, M, L, XL"),
    [error, setError] = useState("");
  const change = (key, patch) =>
    setVariants((a) => a.map((v) => (v.key === key ? { ...v, ...patch } : v)));
  return (
    <form
      className="admin-section form-grid merchandise-editor"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const f = Object.fromEntries(new FormData(e.currentTarget));
        if (!f.name.trim() || !f.description.trim()) {
          setError("Completa el nombre y la descripción del producto.");
          return;
        }
        const ss = [
          ...new Set(
            sizes
              .split(",")
              .map((s) => s.trim().toUpperCase())
              .filter(Boolean),
          ),
        ];
        if (!ss.length || ss.length > 20) {
          setError("Indica entre 1 y 20 tallas separadas por comas.");
          return;
        }
        if (
          variants.some((v) => !v.image || !v.color.trim()) ||
          new Set(variants.map((v) => v.color.trim().toLowerCase())).size !==
            variants.length
        ) {
          setError("Cada color necesita un nombre único y una imagen.");
          return;
        }
        const product = {
          id: "mercancia-" + crypto.randomUUID(),
          name: f.name.trim(),
          category: f.category,
          description: f.description.trim(),
          price: Number(f.price),
          originalPrice: Number(f.originalPrice) || null,
          stage: "Nueva pieza",
          sizes: ss,
          variants: variants.map((v) => ({
            color: v.color.trim(),
            image: v.image,
          })),
        };
        const stock = Object.fromEntries(
          product.variants.flatMap((v, i) =>
            ss.map((s) => [
              [product.id, v.color, s].join("|"),
              Number(f["stock:" + variants[i].key + ":" + s]) || 0,
            ]),
          ),
        );
        onSave(product, stock);
      }}
    >
      <div className="section-title">
        <h2>Nueva mercancía</h2>
        <div className="admin-heading-actions">
          <button
            type="button"
            className="button button-outline"
            onClick={onCancel}
          >
            <X size={18} />
            Cancelar
          </button>
          <button className="button button-dark">
            <Check size={18} />
            Guardar mercancía
          </button>
        </div>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-grid two">
        <Field
          label="Nombre del producto"
          name="name"
          placeholder="Ej. Chaqueta de cuero biker"
          maxLength={100}
          required
        />
        <label className="field">
          Categoría
          <Select name="category" defaultValue={categories[0]}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </label>
        <Field
          label="Precio de venta (S/)"
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          required
        />
        <Field
          label="Precio anterior (opcional)"
          name="originalPrice"
          type="number"
          min="0"
          step="0.01"
        />
      </div>
      <label className="field">
        Descripción
        <textarea
          name="description"
          maxLength={1000}
          placeholder="Describe el corte, los detalles y cómo combinarlo."
          required
        />
      </label>
      <label className="field">
        Tallas disponibles
        <input
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          placeholder="S, M, L, XL"
          required
        />
      </label>
      <p className="form-hint">
        Separa las tallas por comas. Registra las unidades de cada color y talla
        antes de guardar.
      </p>
      <div className="section-title">
        <h3>Colores, fotos y existencias</h3>
        <button
          type="button"
          className="button button-outline"
          onClick={() => setVariants((a) => [...a, blank()])}
        >
          <Plus size={18} />
          Añadir color
        </button>
      </div>
      {variants.map((v, i) => (
        <fieldset className="merchandise-variant" key={v.key}>
          <legend>Color {i + 1}</legend>
          <div className="merchandise-variant-layout">
            <div>
              {v.image && (
                <AssetImage
                  src={v.image}
                  alt={v.color || "Foto del producto"}
                />
              )}
              <label className="button button-outline merchandise-upload">
                <UploadSimple size={18} />
                {v.image ? "Cambiar foto" : "Subir foto"}
                <input
                  type="file"
                  aria-label={"Foto del color " + (i + 1)}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (
                      !["image/jpeg", "image/png", "image/webp"].includes(
                        file.type,
                      ) ||
                      file.size > 500000
                    ) {
                      setError("Elige JPG, PNG o WebP de hasta 500 KB.");
                      e.target.value = "";
                      return;
                    }
                    try {
                      const data = await new Promise((resolve, reject) => {
                        const r = new FileReader();
                        r.onload = () => resolve(r.result);
                        r.onerror = reject;
                        r.readAsDataURL(file);
                      });
                      const img = new Image();
                      img.src = data;
                      await img.decode();
                      change(v.key, { image: data });
                      setError("");
                    } catch {
                      setError("No pudimos leer la foto. Elige otra imagen.");
                    }
                  }}
                />
              </label>
            </div>
            <div className="form-grid">
              <Field
                maxLength={30}
                label="Nombre del color"
                name={"color:" + v.key}
                value={v.color}
                onChange={(e) => change(v.key, { color: e.target.value })}
                placeholder="Negro"
                required
              />
              <div className="stock-grid">
                {[
                  ...new Set(
                    sizes
                      .split(",")
                      .map((s) => s.trim().toUpperCase())
                      .filter(Boolean),
                  ),
                ].map((s) => (
                  <Field
                    key={s}
                    label={"Talla " + s}
                    name={"stock:" + v.key + ":" + s}
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="0"
                    required
                  />
                ))}
              </div>
              {variants.length > 1 && (
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() =>
                    setVariants((a) => a.filter((x) => x.key !== v.key))
                  }
                >
                  <Trash size={18} />
                  Quitar color
                </button>
              )}
            </div>
          </div>
        </fieldset>
      ))}
    </form>
  );
}
