
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventTable.css";
import { AdminContext } from "../context/AdminContext";

const EventTable = ({ searchTerm }) => {
  const { events, loading, fetchEvents, changeEventStatus } = useContext(AdminContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (events.length === 0 && !loading) {
      fetchEvents();
    }
    console.log("Eventos en EventTable:", events);
  }, [events, loading, fetchEvents]);

  const filteredEvents = events.filter((event) => {
    if (!event) return false;
    const text = `${event.title || ""} ${event.type || ""} ${event.status?.nameState || ""}`.toLowerCase();
    return text.includes((searchTerm || "").toLowerCase());
  });

  const handleView = (id) => {
    navigate(`/eventos/${id}`);
  };

  const handleToggleBlock = async (event) => {
    try {
      const newStatus = event.status?.nameState === "Blocked" ? "Active" : "Blocked";
      await changeEventStatus(event.id, newStatus);
      console.log(`Estado del evento ${event.id} cambiado a ${newStatus}`);
    } catch (error) {
      console.error("Error al cambiar el estado del evento:", error);
      alert(`Error al cambiar el estado: ${error.message}`);
    }
  };

  const formatCategories = (categories) => {
    if (!categories || categories.length === 0) return "Sin categorías";
    return categories.join(", ");
  };

  const formatTicketType = (ticketType, price) => {
    if (ticketType === "free") return "Gratis";
    if (price && price.amount) return `$${price.amount} ${price.currency || ""}`;
    return price ? `$${price}` : "De pago";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No definida";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading-message">Cargando eventos...</div>;
  }

  return (
    <div className="event-section">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Fechas</th>
            <th>Ubicación</th>
            <th>Categorías</th>
            <th>Entrada</th>
            <th>Privacidad</th>
            <th>Estado</th>
            <th>Organizador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.title || "Sin título"}</td>
                <td>{event.type || "N/A"}</td>
                <td>{formatDate(event.start)} - {formatDate(event.end)}</td>
                <td>
                  {event.location ? (
                    <>
                      {event.location.address || "Sin dirección"} ({event.location.type || "N/A"})
                    </>
                  ) : "Sin ubicación"}
                </td>
                <td>{formatCategories(event.categories)}</td>
                <td>{formatTicketType(event.ticketType, event.price)}</td>
                <td>{event.privacy || "N/A"}</td>
                <td>
                  <span className={`status ${(event.status?.nameState || "unknown").toLowerCase()}`}>
                    {event.status?.nameState || "Pendiente"}
                  </span>
                </td>
                <td>{event.otherData?.organizer || "Sin organizador"}</td>
                <td className="actions">
                  <button onClick={() => handleView(event.id)}>Ver</button>
                  <button
                    className={event.status?.nameState === "Blocked" ? "unblock" : "block"}
                    onClick={() => handleToggleBlock(event)}
                    style={{
                      marginLeft: "8px",
                      backgroundColor: event.status?.nameState === "Blocked" ? "#4CAF50" : "#e53935",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    {event.status?.nameState === "Blocked" ? "Desbloquear" : "Bloquear"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center", padding: "1rem" }}>
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
