import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Check,
  X,
  PencilSimple,
  Trash,
  MagnifyingGlass,
  Globe,
} from "@phosphor-icons/react";
import { getSocialLinks, socialIcons } from "./Merchandising";
import { AdminNotice, AdminEmpty } from "./AdminFeedback";
export function SocialMediaManager({ settings, setSettings, log }) {
  const [draft, setDraft] = useState(null),
    [query, setQuery] = useState(""),
    [message, setMessage] = useState("");
  const editor = useRef(null),
    links = getSocialLinks(settings);
  useEffect(() => {
    if (draft)
      editor.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [draft?.id]);
  const change = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  return (
    <div className="social-manager">
      <div className="section-title">
        <h2>
          <Globe size={22} />
          Redes de la tienda
        </h2>
        {!draft && (
          <button
            className="button button-dark"
            onClick={() => {
              setQuery("");
              setMessage("");
              setDraft({
                id: crypto.randomUUID(),
                name: "",
                url: "",
                icon: "web",
              });
            }}
          >
            <Plus size={18} />
            Nueva red social
          </button>
        )}
      </div>
      <AdminNotice>{message}</AdminNotice>
      {draft && (
        <form
          ref={editor}
          className="admin-section form-grid social-editor"
          onSubmit={(e) => {
            e.preventDefault();
            let url;
            try {
              url = new URL(draft.url);
              if (!["http:", "https:"].includes(url.protocol)) throw Error();
            } catch {
              setMessage("Escribe un enlace válido que empiece con https://.");
              return;
            }
            if (!draft.name.trim()) {
              setMessage("Indica el nombre de la red social.");
              return;
            }
            const data = { ...draft, name: draft.name.trim(), url: url.href };
            setSettings((s) => {
              const old = getSocialLinks(s);
              return {
                ...s,
                socialLinks: old.some((x) => x.id === data.id)
                  ? old.map((x) => (x.id === data.id ? data : x))
                  : [...old, data],
              };
            });
            log("Redes sociales", data.name + " guardada");
            setDraft(null);
            setMessage("Red social guardada. Se muestra en el footer.");
          }}
        >
          <div className="section-title">
            <h3>
              <PencilSimple size={21} />
              {links.some((x) => x.id === draft.id)
                ? "Editar red social"
                : "Añadir red social"}
            </h3>
            <div className="admin-heading-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={() => setDraft(null)}
              >
                <X size={18} />
                Cancelar
              </button>
              <button className="button button-dark">
                <Check size={18} />
                Guardar red social
              </button>
            </div>
          </div>
          <div className="form-grid two">
            <label className="field">
              Nombre de la red
              <input
                value={draft.name}
                maxLength={60}
                required
                placeholder="Instagram"
                onChange={(e) => change("name", e.target.value)}
              />
            </label>
            <label className="field">
              Enlace del perfil
              <input
                type="url"
                value={draft.url}
                maxLength={500}
                required
                placeholder="https://…"
                onChange={(e) => change("url", e.target.value)}
              />
            </label>
          </div>
          <label className="field">
            <span className="field-with-icon">
              <MagnifyingGlass size={18} />
              Buscar icono de red social
            </span>
            <input
              type="search"
              value={query}
              placeholder="Instagram, Telegram, X…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div
            className="social-icon-picker"
            role="group"
            aria-label="Iconos de redes sociales"
          >
            {Object.entries(socialIcons)
              .filter(([id, x]) =>
                (id + " " + x.name).toLowerCase().includes(query.toLowerCase()),
              )
              .map(([id, { name, Icon }]) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={draft.icon === id}
                  onClick={() => change("icon", id)}
                >
                  <Icon size={24} />
                  {name}
                </button>
              ))}
          </div>
          <p className="form-hint">
            Elige el icono que corresponde a tu perfil. Para otra plataforma
            puedes usar el icono de sitio web.
          </p>
        </form>
      )}
      <div className="social-admin-list">
        {links.map((m) => {
          const Icon = (socialIcons[m.icon] || socialIcons.web).Icon;
          return (
            <article className="social-admin-row" key={m.id}>
              <span className="social-admin-symbol">
                <Icon size={26} />
              </span>
              <div>
                <h3>{m.name}</h3>
                <a href={m.url} target="_blank" rel="noopener noreferrer">
                  {m.url}
                </a>
              </div>
              <div className="social-admin-actions">
                <button
                  className="button button-outline"
                  onClick={() => {
                    setMessage("");
                    setQuery("");
                    setDraft({ ...m });
                  }}
                >
                  <PencilSimple size={18} />
                  Editar
                </button>
                <button
                  className="button button-danger"
                  onClick={() => {
                    setSettings((s) => ({
                      ...s,
                      socialLinks: getSocialLinks(s).filter(
                        (x) => x.id !== m.id,
                      ),
                    }));
                    if (draft?.id === m.id) setDraft(null);
                    log("Redes sociales", m.name + " eliminada");
                    setMessage("Red social eliminada.");
                  }}
                >
                  <Trash size={18} />
                  Eliminar
                </button>
              </div>
            </article>
          );
        })}
        {!links.length && (
          <AdminEmpty icon={Globe} title="Aún no hay redes">
            Añade un perfil para mostrarlo en el footer.
          </AdminEmpty>
        )}
      </div>
    </div>
  );
}
