import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventTable.css";
import { AdminContext } from "../context/AdminContext";

const EventTable = ({ searchTerm }) => {
  const { events } = useContext(AdminContext);
  const navigate = useNavigate();

  // ✅ Filtra los eventos en base a la búsqueda por título, tipo o estado
  const filteredEvents = events.filter((event) => {
    const text = `${event.title ?? ""} ${event.type ?? ""} ${
      event.status ?? ""
    }`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  // ✅ Función para navegar a la vista de detalle de un evento
  const handleView = (id) => {
    navigate(`/eventos/${id}`);
  };

  return (
    <div className="event-section">
      {/* === TABLA PRINCIPAL DE EVENTOS === */}
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Registrados</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* ✅ Si hay eventos filtrados, los renderiza */}
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>
                  <span
                    className={`status ${
                      event.status?.toLowerCase() || "unknown"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td>{event.registrants}</td>
                <td>{event.rating}</td>
                <td className="actions">
                  <button onClick={() => handleView(event.id)}>Ver</button>
                </td>
              </tr>
            ))
          ) : (
            // ✅ Si no hay resultados, muestra mensaje
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No hay eventos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === RESUMEN DE ESTADÍSTICAS === */}
      <div className="summary">
        <div>
          Total Events: <strong>{events.length}</strong>
        </div>
        <div>
          Total Registrants:{" "}
          <strong>
            {events.reduce((acc, e) => acc + (e.registrants || 0), 0)}
          </strong>
        </div>
        <div>
          Highest Rating:{" "}
          <strong>{Math.max(...events.map((e) => e.rating || 0))}</strong>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
