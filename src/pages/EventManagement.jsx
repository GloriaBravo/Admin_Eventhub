import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const EventManagement = () => {
  // ⚠️ Usa arrays vacíos por defecto para prevenir errores
  const { events = [], users = [], addEvent, updateEvent, deleteEvent } = useContext(AdminContext);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    ownerId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.ownerId) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const event = {
      ...formData,
      ownerId: parseInt(formData.ownerId),
    };

    if (editingEvent) {
      updateEvent({ ...event, id: editingEvent.id });
      setEditingEvent(null);
    } else {
      addEvent(event);
    }

    setFormData({ title: "", ownerId: "" });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      ownerId: event.ownerId?.toString() || "",
    });
  };

  const handleDelete = (id) => {
    deleteEvent(id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No definida";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCategories = (categories) => {
    if (!Array.isArray(categories) || categories.length === 0) return "Sin categorías";
    return categories.join(", ");
  };

  const formatTicketType = (ticketType) => {
    if (!ticketType) return "No definido";
    return ticketType === "free" ? "Gratis" : "De pago";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Eventos</h2>

      {/* === Formulario para agregar o editar eventos === */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Título del evento"
          value={formData.title}
          onChange={handleChange}
        />
        <select name="ownerId" value={formData.ownerId} onChange={handleChange}>
          <option value="">Asignar a usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
        <button type="submit">{editingEvent ? "Actualizar" : "Agregar"}</button>
      </form>

      {/* === Tabla de eventos === */}
      {events.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#555" }}>No hay eventos registrados.</p>
      ) : (
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc" }}>Título</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Tipo</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Estado</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Fechas</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Ubicación</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Categorías</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Privacidad</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Entrada</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Responsable</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const owner = users.find((u) => u.id === event.ownerId);
              return (
                <tr key={event.id}>
                  <td>{event.title || "No definido"}</td>
                  <td>{event.type || "No definido"}</td>
                  <td>
                    <span style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      backgroundColor: event.status?.nameState === "Active" ? "#4caf50" :
                                      event.status?.nameState === "Blocked" ? "#f44336" : "#9e9e9e",
                      color: "white",
                      fontSize: "0.8rem"
                    }}>
                      {event.status?.nameState || "Pendiente"}
                    </span>
                  </td>
                  <td>{formatDate(event.start)} - {formatDate(event.end)}</td>
                  <td>{event.location?.address || "No definida"}</td>
                  <td>{formatCategories(event.categories)}</td>
                  <td>{event.privacy || "No definida"}</td>
                  <td>{formatTicketType(event.ticketType)}</td>
                  <td>{owner ? owner.name : "Usuario eliminado"}</td>
                  <td>
                    <button onClick={() => handleEdit(event)}>Editar</button>
                    <button onClick={() => handleDelete(event.id)} style={{ marginLeft: "10px" }}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventManagement;

