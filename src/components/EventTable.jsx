import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventTable.css";
import { AdminContext } from "../context/AdminContext";

const EventTable = ({ searchTerm }) => {
  const { events, updateEvent } = useContext(AdminContext);
  const navigate = useNavigate();

  // 🔍 Filtro por búsqueda (título, tipo o estado)
  const filteredEvents = events.filter((event) => {
    const text = `${event.title ?? ""} ${event.type ?? ""} ${event.status ?? ""}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  // ✅ Navegar al detalle del evento
  const handleView = (id) => {
    navigate(`/eventos/${id}`);
  };

  // 🔁 Cambiar estado entre bloqueado/publicado
  const handleToggleBlock = (event) => {
    const updatedEvent = {
      ...event,
      status: event.status === "Blocked" ? "Published" : "Blocked",
    };
    updateEvent(updatedEvent);
  };

  return (
    <div className="event-section">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Registrados</th>
            <th>Rating</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>
                  <span className={`status ${event.status?.toLowerCase() || "unknown"}`}>
                    {event.status}
                  </span>
                </td>
                <td>{event.registrants}</td>
                <td>{event.rating}</td>
                <td className="actions">
                  <button onClick={() => handleView(event.id)}>Ver</button>
                  <button
                    className={event.status === "Blocked" ? "unblock" : "block"}
                    onClick={() => handleToggleBlock(event)}
                  >
                    {event.status === "Blocked" ? "Desbloquear" : "Bloquear"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No hay eventos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="summary">
        <div>Total de eventos: <strong>{events.length}</strong></div>
        <div>Total registrados: <strong>{events.reduce((acc, e) => acc + (e.registrants || 0), 0)}</strong></div>
        <div>Mayor rating: <strong>{Math.max(...events.map(e => e.rating || 0))}</strong></div>
      </div>
    </div>
  );
};

export default EventTable;
// Este componente muestra una tabla de eventos con la opción de buscar por título, tipo o estado.
// Permite ver detalles del evento y cambiar su estado entre bloqueado y publicado.