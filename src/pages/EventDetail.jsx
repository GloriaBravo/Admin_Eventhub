import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const EventDetail = () => {
  const { id } = useParams(); // ID desde la URL
  const navigate = useNavigate();
  const { events, updateEvent } = useContext(AdminContext);

  // Buscar evento por ID
  const isNew = id === "nuevo";

  const selected = isNew
    ? {
        id: Date.now(),
        title: "",
        date: "",
        type: "",
        status: "Draft",
        registrants: 0,
        rating: 0,
      }
    : events.find((e) => e.id.toString() === id);

  // Estado local editable
  const [event, setEvent] = useState({ ...selected });

  useEffect(() => {
    if (!selected) navigate("/panel");
  }, [selected]);

  if (!event) return <p>Cargando evento...</p>;

  // Guardar cambios
  const handleSave = () => {
    updateEvent(event);
    alert("Evento actualizado");
    navigate("/panel");
  };

  // Cambiar estado entre bloqueado/publicado
  const toggleBlock = () => {
    const newStatus = event.status === "Blocked" ? "Published" : "Blocked";
    setEvent({ ...event, status: newStatus });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Detalles del Evento</h2>

      <label>Título:</label>
      <input
        type="text"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />

      <label style={{ marginTop: "1rem" }}>Fecha:</label>
      <input
        type="date"
        value={event.date}
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
      />

      <label style={{ marginTop: "1rem" }}>Tipo de evento:</label>
      <input
        type="text"
        value={event.type || ""}
        onChange={(e) => setEvent({ ...event, type: e.target.value })}
      />

      <label style={{ marginTop: "1rem" }}>Estado:</label>
      <select
        value={event.status}
        onChange={(e) => setEvent({ ...event, status: e.target.value })}
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
        <option value="Blocked">Blocked</option>
      </select>

      <p style={{ marginTop: "1rem" }}>
        <strong>Inscritos:</strong> {event.registrants}
      </p>
      <p>
        <strong>Rating promedio:</strong> {event.rating}
      </p>

      {/* Botones de acción */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleSave}>💾 Guardar</button>
        <button onClick={toggleBlock}>
          {event.status === "Blocked" ? "🔓 Desbloquear" : "🔒 Bloquear"}
        </button>
        <button onClick={() => navigate("/panel")}>⬅️ Volver</button>
      </div>
    </div>
  );
};

export default EventDetail;
