import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Check,
  MapPin,
  Briefcase,
} from "@phosphor-icons/react";
import { Field } from "./Customer";
import { Select } from "./Select";
export const initialJobs = [
  {
    id: "style",
    title: "Asesor de estilo digital",
    area: "Ventas y afiliación",
    location: "Remoto · Perú",
    type: "Afiliación independiente",
    description:
      "Comparte el universo NOBRALTA, acompaña a clientes a elegir sus prendas y participa en campañas con tu código de vendedor. Buscamos criterio visual, claridad al comunicar y atención al detalle.",
    active: true,
  },
  {
    id: "operations",
    title: "Asistente de pedidos",
    area: "Operaciones",
    location: "San Vicente de Cañete",
    type: "Por definir",
    description:
      "Apoya la revisión de prendas, preparación de paquetes y coordinación de recojos. Buscamos orden, cuidado con cada pieza y comunicación clara. Condiciones y disponibilidad se conversarán en el proceso.",
    active: false,
  },
];
export function JobsPage({ jobs, onApply }) {
  const [selected, setSelected] = useState(null),
    [done, setDone] = useState(false);
  const job = jobs.find((j) => j.id === selected && j.active);
  return (
    <div className="jobs-page">
      <div className="jobs-intro">
        <p>NOBRALTA / Trabajos</p>
        <h1>
          El carácter de una marca
          <br />
          también está en su gente.
        </h1>
        <p>Encuentra tu lugar en ventas, estilo y operación.</p>
      </div>
      {job ? (
        <div className="job-detail">
          <button
            className="button button-outline"
            onClick={() => {
              setSelected(null);
              setDone(false);
            }}
          >
            <ArrowLeft size={18} />
            Ver oportunidades
          </button>
          <div className="jobs-detail-grid">
            <section>
              <span className="status">{job.area}</span>
              <h2>{job.title}</h2>
              <p>
                <MapPin size={18} />
                {job.location}
              </p>
              <p>
                <Briefcase size={18} />
                {job.type}
              </p>
              <div className="job-description">{job.description}</div>
            </section>
            {done ? (
              <div className="application-success" role="status">
                <Check size={28} />
                <h3>Tu interés quedó registrado.</h3>
                <p>Gracias por querer formar parte de NOBRALTA.</p>
              </div>
            ) : (
              <form
                className="form-grid application-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onApply({
                    ...Object.fromEntries(new FormData(e.currentTarget)),
                    jobId: job.id,
                    id: crypto.randomUUID(),
                    at: new Date().toISOString(),
                    status: "Recibida",
                  });
                  setDone(true);
                }}
              >
                <h3>Cuéntanos de ti.</h3>
                <Field
                  name="name"
                  label="Nombre y apellidos"
                  required
                  autoComplete="name"
                />
                <Field
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  name="phone"
                  label="Número de contacto"
                  type="tel"
                  required
                  autoComplete="tel"
                />
                <label className="field">
                  ¿Qué te gustaría aportar?
                  <textarea name="message" maxLength={2000} rows={4} required />
                </label>
                <label className="checkbox">
                  <input type="checkbox" required />
                  Acepto el uso de mis datos para atender esta postulación.
                </label>
                <button className="button button-dark">
                  Enviar postulación
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="job-list">
          {jobs
            .filter((j) => j.active)
            .map((j) => (
              <button
                className="job-row"
                key={j.id}
                onClick={() => {
                  setSelected(j.id);
                  setDone(false);
                }}
              >
                <span>{j.area}</span>
                <strong>{j.title}</strong>
                <small>{j.location}</small>
                <span className="job-row-action">
                  Ver oportunidad
                  <ArrowRight size={21} />
                </span>
              </button>
            ))}
          {!jobs.some((j) => j.active) && (
            <p className="quiet-empty">
              En este momento no hay oportunidades abiertas. Gracias por tu
              interés en NOBRALTA.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
export function JobsManager({
  jobs,
  setJobs,
  applications,
  setApplications,
  log,
}) {
  const [edit, setEdit] = useState(null),
    [message, setMessage] = useState("");
  return (
    <div className="jobs-admin">
      <div className="admin-columns">
        <section className="admin-section">
          <div className="section-title">
            <h2>Oportunidades de trabajo</h2>
            <button
              className="button button-outline"
              onClick={() => setEdit({})}
            >
              <Plus size={18} />
              Nueva
            </button>
          </div>
          {jobs.map((j) => (
            <div className="management-row" key={j.id}>
              <div>
                <h3>{j.title}</h3>
                <p>
                  {j.area} · {j.location}
                </p>
                <span className="status">
                  {j.active ? "Publicada" : "Pausada"}
                </span>
              </div>
              <div>
                <button
                  className="button button-outline"
                  onClick={() => setEdit(j)}
                >
                  Editar
                </button>
                <button
                  className="text-action"
                  onClick={() => {
                    setJobs((a) =>
                      a.map((v) =>
                        v.id === j.id ? { ...v, active: !v.active } : v,
                      ),
                    );
                    log(
                      "Trabajo",
                      j.title + " " + (j.active ? "pausado" : "publicado"),
                    );
                  }}
                >
                  {j.active ? "Pausar" : "Publicar"}
                </button>
              </div>
            </div>
          ))}
        </section>
        <form
          key={edit?.id || "new"}
          className="admin-section form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            const f = Object.fromEntries(new FormData(e.currentTarget)),
              job = {
                ...f,
                id: edit?.id || crypto.randomUUID(),
                active: f.active === "on",
              };
            setJobs((a) =>
              edit?.id
                ? a.map((j) => (j.id === edit.id ? job : j))
                : [...a, job],
            );
            setEdit(null);
            e.currentTarget.reset();
            log("Trabajo", job.title + " guardado");
            setMessage(
              "Oportunidad guardada. La página Trabajos refleja la publicación.",
            );
          }}
        >
          <h2>{edit?.id ? "Editar oportunidad" : "Nueva oportunidad"}</h2>
          <Field
            label="Título del puesto"
            name="title"
            defaultValue={edit?.title}
            required
          />
          <Field label="Área" name="area" defaultValue={edit?.area} required />
          <Field
            label="Ubicación / modalidad"
            name="location"
            defaultValue={edit?.location}
            required
          />
          <Field
            label="Tipo de vínculo"
            name="type"
            defaultValue={edit?.type}
            required
          />
          <label className="field">
            Descripción
            <textarea
              name="description"
              defaultValue={edit?.description}
              maxLength={5000}
              required
              rows={5}
            />
          </label>
          <label className="checkbox">
            <input
              name="active"
              type="checkbox"
              defaultChecked={edit?.active ?? false}
            />
            Publicar en Trabajos
          </label>
          <button className="button button-dark">
            Guardar oportunidad
            <Check size={18} />
          </button>
          <p role="status">{message}</p>
        </form>
      </div>
      <section className="admin-section">
        <h2>Postulaciones</h2>
        {applications.length ? (
          applications.map((a) => (
            <div className="application-row" key={a.id}>
              <div>
                <h3>{a.name}</h3>
                <p>
                  {jobs.find((j) => j.id === a.jobId)?.title} · {a.email} ·{" "}
                  {a.phone}
                </p>
                <div className="scroll-message">{a.message}</div>
              </div>
              <Select
                aria-label={"Estado de postulación de " + a.name}
                value={a.status}
                onChange={(e) =>
                  setApplications((v) =>
                    v.map((x) =>
                      x.id === a.id ? { ...x, status: e.target.value } : x,
                    ),
                  )
                }
              >
                <option>Recibida</option>
                <option>En revisión</option>
                <option>Contactada</option>
                <option>Cerrada</option>
              </Select>
            </div>
          ))
        ) : (
          <p className="quiet-empty">
            Las postulaciones de Trabajos aparecerán aquí.
          </p>
        )}
      </section>
    </div>
  );
}
